<template>
	<v-data-table
		:headers = "headers"
		:items = "renderListLaboratory"
		dense
		class 	 			 = "elevation-5"			    
	    :hide-default-footer = "false"
	   	:options.sync 		 = "options"
	   	:server-items-length = "total"
	   	:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [30],
	   		showCurrentPage     : true
	   	}"
	   	loading-text 		= "Cargando... por favor espere"
	    :height 			= "(currentHeight-120) + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	    fixed-header

	>
		<template v-slot:top >
			<v-row dense>
				<v-col cols="9">
					<FilterComponent 
						:infoToSearch="search" reference="filter-lab" class= "mt-2" @actionToSearch="getFilter()" :ArrayNotShowFields="['TriageId']"
					></FilterComponent>				
				</v-col>
				<v-col cols="auto">
					<v-divider
			          	class="mx-1 mt-1"
			          	color="white"			          	
			          	vertical
			        ></v-divider>

				</v-col>		
				<v-col cols="2">
					<v-btn color="warning" class="mt-3" @click="redirectToSettingStay()">Organizar Camas <v-icon>mdi-arrow-top-right</v-icon></v-btn>					
				</v-col>
			</v-row>
			<v-divider class="my-2" color="primary"></v-divider>
		</template>
		<template v-slot:item.actions="{item}">
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">	
					<v-btn small color="primary" @click="redirect(item)" v-show ="isShowToRoles" v-bind="attrs" v-on="on"> <v-icon small>mdi-note-edit</v-icon></v-btn> 
				</template>
				<span>IR A MODULO DE HOSPITALIZACION</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">					
				  <v-btn small color="success" @click="redirectToMedico(item)" v-show ="isShowToRoles" v-bind="attrs" v-on="on"> <v-icon small>mdi-stethoscope</v-icon></v-btn>
			  </template>
			  <span>IR A MODULO MEDICO</span>
		  </v-tooltip>
		</template>
	</v-data-table>
	
</template>
<script type="text/javascript">
	import FilterComponent from "@/components/info/FilterComponent.vue"
	import HospitalizationAgendaService from "@/services/AgendaHospitalizationService.js"
	export default{
		name : "AgendaHospitalization",
		props : [ "currentHeight" ],
		components : { FilterComponent },
		data : (vm)=>({
			list : [],
			options : { itemsPerPage : 30 },
			search : {date : vm.$ManagerSmith.getDateCurrent()},
			total : 0,
			loading : false,
			headers : [
				// { text:"HABITACION" , value : "bed"},
				{ text:"DOCUMENTO" , value : "HistoryPerson.numberId"},
				{ text:"NOMBRE PACIENTE" , value : "HistoryPerson.fullName"},
				{ text:"ESTADO" , value : "Status.name"},
				{ text:"ACCIONES" , value : "actions"},
			]
		}),
		watch:{
			options: {
				handler(){
					this.getFilter();
				}, deep : true				
			}
		},
		computed:{
			renderListLaboratory(){
				// this.total = this.list.length;
				return this.list
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("AgendaHospitalizacionComponent") // this.$route.name
			},
			isShowToRoles(){				
				return this.currentPermission.canAdd | this.currentPermission.canEdit;
				// return ['admissionist', 'admin', 'manager'].some(x=> this.$store.getters["auth/userRoles"].includes(x) )				 
			}

		},
		methods:{
			redirect(item){				
				if(item && item.id){
					this.$router.push({ 
						name 	: "DashboardHospitalization",
						params 	: {
							id 		 : item.id,
							numberId : item.PersonId, // change to numberId
							option : this.$route.params.option
						}
					});				
				}
			},
			redirectToMedico(item){
				console.log("rEDIREct to item", item)
				if(item && item.id){					
					this.$router.push({ 
						name 	: "DashboardMedico",
						params 	: {
							id 		 : item.id,
							numberId : item?.HistoryPerson?.numberId,//item.OrderLab.numberId, // change to numberId / PersonId
							option : this.$route.params.option,
							routeBack : "Hospitalization",
						}
					});				
				}
			},
			redirectToSettingStay(){
				this.$router.push({ 
					name 	: "SettingsBedsHospitalization",					
				});				
			},
			async getFilter(){
				this.loading = true;
				try{					
					const service = new HospitalizationAgendaService();
					const res = await service.searchInfo(this.search);
					console.log("HospitalizationAgendaService ", res.data)
					if (res &&  res.data && res.data.data && res.data.data.length > 0) {
						this.total = res.data.totalItems;
						this.list = res.data.data;
					}
					//this.list.push({id: 1, name: "test", numberId:123, fullName: "tester test", status: "pending"})
				}catch(error){
					console.warn("Error Get info HospitalizationAgendaService ", error);
				}
				this.loading = false;
			},

		}
	}
</script>