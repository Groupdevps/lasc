<template>
	<v-data-table
		dense
	    fixed-header
		:headers = "headers"
		:items = "renderList"
		class 	 			 = "elevation-5"			    
	    :hide-default-footer = "false"
	   	:options.sync 		 = "options"
	   	:server-items-length = "total"
	   	:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [30],
	   		showCurrentPage     : true
	   	}"
	   	loading-text 		= "CARGANDO... POR FAVOR ESPERE"
	    :height 			= "(currentHeight-150) + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"

	>
		<template v-slot:top >
			<v-toolbar height="60">
				<FilterComponent 
					:infoToSearch="search" 
					reference="filter-nur" 
					class= "mt-2" 
					@actionToSearch="getFilter()"
					:listAllowStatus="listAllowStatusToFilter"
					:ArrayNotShowFields="['TriageId', 'StatusId', 'numberId']"
					v-show="!isHospitalizate"
				></FilterComponent>

				<v-divider vertical class="my-1 mx-3" color="success" v-show="!isHospitalizate"></v-divider>				
				<v-btn :color="isHospitalizate ? 'success':'secondary' " @click="getHospitalization()" > Mostrar hopitalizados</v-btn>
				<v-btn color="error" class="ml-1" v-show="isHospitalizate" @click="openPdf()" > 
					<v-icon class="mr-1">mdi-download-circle</v-icon>
					PDF </v-btn>
			</v-toolbar>

			<v-divider class="my-1" color="success"></v-divider>
			<!-- add session for load hostpitalization -->
			<template v-for="itemCount in renderCount">
				<strong class="mt-2 primary--text">{{ itemCount.name }} :</strong> {{ itemCount.count }} 
			</template>

			<v-divider class="my-2" color="primary"></v-divider>
		</template>
		<template v-slot:item.CAU = "{ item, index}">
			<v-btn dark small :color = "item.colorCAU" class ="pa-1 pb-3"> 
				<v-input
					error-count ="2"
					disabled					
					error			
					:error-messages="[item.CAU, item.timeCAU]"	
				></v-input>
			</v-btn>
		</template>

		<template v-slot:item.Status="{item, index}">
			 <v-tooltip bottom>
				<template v-slot:activator = "{ on, attrs }" >
					<v-btn dark small
						color  = "secondary"
						v-bind 	= "attrs"
						v-on   	= "on"
						:key 	= "'refStatus' + index "
						class  	= "white--text"
					>
						<v-icon small class = "mr-1">mdi-progress-question</v-icon>
						{{item?.Status?.name || ''}}				
					</v-btn>
				</template>
				<span>
					{{ $t('process_status') }}
				</span>
			</v-tooltip> 
		</template>

		<template v-slot:item.Triage="{item, index}">
			 <v-tooltip bottom>
				<template v-slot:activator = "{ on, attrs }" >
					<v-btn dark small
						:color  = "item.Triage && item.Triage.LevelTriage ? item.Triage.LevelTriage.color :'secondary' "
						v-bind 	= "attrs"
						v-on   	= "on"
						:key 	= "'refTriage' + index "
						class  	= "white--text"
					>
						<v-icon small class = "mr-1">mdi-triangle</v-icon>
						{{ item.Triage && item.Triage.LevelTriage ? item.Triage.LevelTriage.description : "POR TRIAGE" }}				
					</v-btn>
				</template>
				<span>
					{{ $t('triage_classification') }}
				</span>
			</v-tooltip> 			
		</template>
		<template v-slot:item.available="{item}">
			<v-btn :color="item.available?'success':'secondary'">{{item.available?'Disponible':'No Disponible'}}</v-btn>
		</template>
		
		<template v-slot:item.actions="{item}" v-show ="isShowToRoles">
			
			<v-btn 				
				small color="primary" v-if="!item.Triage" @click="redirect({...item, redirectTo: 'TriageClassification'})"> <v-icon small>mdi-medical-cotton-swab</v-icon></v-btn> 
			<v-btn v-else small color="primary" @click="redirect({...item, redirectTo: 'DashboardNursing'})"> <v-icon small>mdi-medical-cotton-swab</v-icon></v-btn> 
			
		</template>
	</v-data-table>
	
</template>
<script type="text/javascript">
	import FilterComponent from "@/components/info/FilterComponent.vue"
	import AttentionService from "@/services/AttentionService.js";
	
	export default{
		name : "CensusComponent",
		props : [ "currentHeight" ],
		components : { FilterComponent },
		data : (vm)=>({
			list : [],
			infoCensus : null,
			options : { itemsPerPage : 30 },
			search : {/*date : [vm.$ManagerSmith.getDateCurrent(), vm.$ManagerSmith.getDateCurrent()], StatusId : 1*/},
			total : 0,
			loading : false,
			isHospitalizate : false,
			headers : [				
				{ text :"ESTADO" , value : "Status"},
				{ text : "SERVICIO", value : "TypeService.name" },
				{ text :"FECHA" , value : "assignedDate"},
				{ text : "HORA", value : "hour" },
				{ text : "TIEMPO TRANSCURRIDO", value : "timeElapsed" },
				{ text : "EPS", value : "HistoryPerson.currentAdministratorName" },			
				{ text :"DOCUMENTO" , value : "HistoryPerson.numberId"},
				{ text :"NOMBRE PACIENTE" , value : "HistoryPerson.fullName"},
										
			],
			listAllowStatusToFilter: ['en espera', 'triage', 'revision medica', 'alta medica', 'hospitalizado', 'finalizado', 'observacion', 'pendiente', 'revision enfermeria'],
		}),
		watch:{
			options: {
				handler(){
					this.getFilter();
				}, deep : true				
			}
		},
		computed:{
			renderList(){
				this.total = this.list.length;
				return this.list
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("AgendaNursingComponent") // this.$route.name
			},
			isShowToRoles(){
				// console.log("ROLES ", this.$store.getters["auth/userRoles"])
				// return ['nurser', 'admin', 'manager'].some(x=> this.$store.getters["auth/userRoles"].includes(x) )				 
				return this.currentPermission.canAdd | this.currentPermission.canEdit;
			},
			renderCount(){
				let counts={};
				if (this.isHospitalizate) {
					if(this.infoCensus){
						counts={
							totalBeds :{ name : "TOTAL DE CAMAS", count : this.infoCensus.totalBeds},
							occupiedBeds :{ name : "CAMAS OCUPADAS", count : this.infoCensus.occupiedBeds},
							unoccupiedBeds : { name : "CAMAS DESOCUPADAS", count :this.infoCensus.unoccupiedBeds},  
						}	
					}
				}else{
					this.renderList.forEach((it)=>{

						if (it && it.TypeService && it.TypeService.name) {
							if (!counts[it.TypeService.name]) {
								counts[it.TypeService.name]={ name : it.TypeService.name, count: 0};
							}
							counts[it.TypeService.name].count++;
						}
					}) 					
				}
				return counts
			},
		},
		methods:{
			redirect(item){				
				if(item && item.id){
					this.$router.push({ 
						name 	: item.redirectTo,//"DashboardNursing",
						params 	: {
							id 		 : item.id,
							numberId : item.HistoryPerson.numberId,//item.OrderLab.numberId, // change to numberId / PersonId
							option : this.$route.params.option
						}
					});				
				}
			},
			formatSearch(){
				let format = {
					patient  	 : this.search.numberId,
					TriageId 		 : this.search.TriageId, 
				};
				if (this.search) {
					if (this.search.StatusId) {
						format.StatusId =  this.search.StatusId;//status.id
					}
					if (this.search.date) {
						format.assignedDate = this.search.date;
					}
				}
				return format; 
						// patient  	 : this.search.numberId,
						// assignedDate : this.search.date || null,
						// TriageId 		 : this.search.TriageId, 	
					// StatusId 	 : this.search.status && this.search.status.id ? this.search.status.id : null,
					
				
			}, // formatSearch
			async getHospitalization(){
				this.isHospitalizate=!this.isHospitalizate;
				this.getFilter();
 			},

			async getFilter(){
				this.loading = true;
				try{					
					const { page, itemsPerPage }  = this.options;
					
					const service = new AttentionService();
					if (this.isHospitalizate) {
						const res = await service.getCensus();
						this.headers = [				
							{ text : "CODIGO CAMA" , value : "code"},
							{ text : "HABITACION", value : "room.name" },
							{ text : "TIPO HABITACION", value : "room.roomType.name" },
							{ text : "AREA" , value : "room.area.name"},							
							{ text : "DISPONIBILIDAD", value : "available" },
							{ text : "AMBITO" , value : "stayOrder.ambit"},
							{ text : "DOCUMENTO" , value : "stayOrder.Person.numberId"},
							{ text : "PACIENTE", value : "stayOrder.Person.fullName" },			
													
						]						
						if (res &&  res.data && res.data.census && res.data.census.length > 0) {
							this.list = res.data.census;
							this.total = res.data.census.length;
						}else{
							this.total = 0;
							this.list = [];
						}
						const {totalBeds, occupiedBeds, unoccupiedBeds}=res.data;
						this.infoCensus={totalBeds, occupiedBeds, unoccupiedBeds}

					}else{						
						const res = await service.searchAttentionsByParams(this.formatSearch(), {page, itemsPerPage});

						if (res &&  res.data && res.data.rows && res.data.rows.length > 0) {
							this.headers = [				
								{ text :"ESTADO" , value : "Status"},
								{ text : "SERVICIO", value : "TypeService.name" },
								{ text :"FECHA" , value : "assignedDate"},
								{ text : "HORA", value : "hour" },
								{ text : "TIEMPO TRANSCURRIDO", value : "timeElapsed" },
								{ text : "EPS", value : "HistoryPerson.currentAdministratorName" },			
								{ text :"DOCUMENTO" , value : "HistoryPerson.numberId"},
								{ text :"NOMBRE PACIENTE" , value : "HistoryPerson.fullName"},
														
							]
							this.total = res.data.count
							this.list = this.sortTable( res.data.rows.map(x=>{
								return service.formatCAU(x);
							}));
						}else{
							this.total = 0;
							this.list = [];
						}
					}
					//this.list.push({id: 1, name: "test", numberId:123, fullName: "tester test", status: "pending"})
				}catch(error){
					console.warn("Error Get info Laboratory ", error);
				}
				this.loading = false;
			},
			sortTable(items){

				const { sortBy, sortDesc, page, itemsPerPage } = this.options;			
				if (sortBy.length === 1 && sortDesc.length === 1) {
					items = items.sort((a, b) => {
					  const sortA = a[sortBy[0]]
					  const sortB = b[sortBy[0]]				  
					  if (sortDesc[0]) {
						if (sortA < sortB) return 1
						if (sortA > sortB) return -1
						return 0
					  } else {
						if (sortA < sortB) return -1
						if (sortA > sortB) return 1
						return 0
					  }
					})
				}
				if (itemsPerPage > 0) {
					items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
				  }
				return items;
			},
			
			openPdf(){
			try{
				this.loading = true;				
				const service = new AttentionService();
				this.$Helper.openLink(service.linkPdfCensus()); 

			}catch(error){
				console.warn("Error open pdf ", error )
			}finally{
				this.loading=false;
			}
		},

		}
	}
</script>