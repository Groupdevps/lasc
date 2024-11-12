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
	   	loading-text 		= "CARGANDO... POR FAVOR ESPERE"
	    :height 			= "(currentHeight-120) + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	    fixed-header

	>
		<template v-slot:top >
			<FilterComponent 
				:infoToSearch="search" 
				reference="filter-pharmacy" 
				class= "mt-2" 
				@actionToSearch="getFilter()"
				:listAllowStatus="listAllowStatusToFilter"
			></FilterComponent>
			<v-divider class="my-2" color="primary"></v-divider>
		</template>
		<template v-slot:item.Status.name="{item, index}">
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
		<template v-slot:item.Attention.Triage="{item, index}">
			 <v-tooltip bottom>
				<template v-slot:activator = "{ on, attrs }" >
					<v-btn dark small
						:color  = "item && item.Attention && item.Attention.Triage && item.Attention.Triage.LevelTriage ? item.Attention.Triage.LevelTriage.color :'secondary' "
						v-bind 	= "attrs"
						v-on   	= "on"
						:key 	= "'refTriage' + index "
						class  	= "white--text"
					>
						<v-icon small class = "mr-1">mdi-triangle</v-icon>
						{{ item && item.Attention &&  item.Attention.Triage && item.Attention.Triage.LevelTriage ? item.Attention.Triage.LevelTriage.description : "POR TRIAGE" }}				
					</v-btn>
				</template>
				<span>
					{{ $t('triage_classification') }}
				</span>
			</v-tooltip> 
		</template>
		<template v-slot:item.createdAt="{ item }" >
			<span>
				{{ $ManagerSmith.getDateCurrentHour(item.createdAt) }}
			</span>
		</template>
		<template v-slot:item.actions="{item}">
			<v-btn small color="primary" @click="redirect(item)"> <v-icon small>mdi-note-edit</v-icon></v-btn> 
		</template>
	</v-data-table>
	
</template>
<script type="text/javascript">
	import FilterComponent from "@/components/info/FilterComponent.vue"
	import AgendaPharmacyService from "@/services/AgendaPharmacyService.js"
	export default{
		name : "AgendaLaboratory",
		props : [ "currentHeight" ],
		components : { FilterComponent },
		data : (vm)=>({
			list : [],
			options : { itemsPerPage : 30 },
			search : {date : vm.$ManagerSmith.getDateCurrent()},
			total : 0,
			loading : false,
			listAllowStatusToFilter: ['finalizado', 'pendiente'],
			headers : [
				{ text:"ESTADO" , value : "Status.name"},
				{ text:"TRIAGE" , value : "Attention.Triage"}, // .LevelTriage.description
				{ text:"TIPO SERVICIO" , value : "Attention.TypeService.name"},
				{ text:"N. DE ORDEN" , value : "orderNumber"},
				{ text:"FECHA" , value : "createdAt"},
				{ text:"DOCUMENTO" , value : "Attention.HistoryPerson.numberId"},
				{ text:"NOMBRE PACIENTE" , value : "Attention.HistoryPerson.fullName"},
				{ text:"ACCIONES" , value : "actions"},
				// { text:"Laboratorio" , value : "order"},
				// { text:"Documento" , value : "OrderLab.numberId"},
				// { text:"Nombre paciente" , value : "OrderLab.Attention.HistoryPerson.fullName"},
				// { text:"Estado" , value : "status"},
				// { text:"Acciones" , value : "actions"},
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
			}
		},
		methods:{
			redirect(item){				
				if(item && item.Attention && item.Attention.id){
					this.$router.push({ 
						name 	: "Dispatch",
						params 	: {
							id 		 : item.id,
							AttentionId : item.Attention.id,//item.OrderLab.numberId, // change to numberId / PersonId
							option : this.$route.params.option
						}
					});				
				}
			},
			async getFilter(){
				this.loading = true;
				try{					
					const { page, itemsPerPage } = this.options;
					let type = []//[2, 8]; // id tipo de orden
					// let service = 1; // id tipo servicio 
					// let attention =  #ID DE ATTENTION,
					// patient #NOMBRE DEL PACIENTE
					// , patientId #NUMERO DE DOCUMENTO DEL PACIENTE
					const tempOrder1= this.$store.getters["listTypesOrder/getTypeOrderByName"]("SOLICITUD SUMINISTROS")
					const tempOrder2= this.$store.getters["listTypesOrder/getTypeOrderByName"]("ORDEN FORMULA MEDICA")
					if (tempOrder1) {
						type.push(tempOrder1.id)
					}
					if (tempOrder2) {
						type.push(tempOrder2.id)
					}
					const service = new AgendaPharmacyService();
					const res = await service.searchInfoOrder({ 
						page, 
						itemsPerPage, 
						type, 
						triage : this.search?.TriageId, 
						status: this.search?.StatusId,
						patient : this.search?.numberId,
						// name : 
						// service : 
						// attention : 
					});
					if (res &&  res.data && res.data.orders) {
						this.list = res.data.orders;
						this.total = res.data.totalItems;
					}
					//this.list.push({id: 1, name: "test", numberId:123, fullName: "tester test", status: "pending"})
				}catch(error){
					console.warn("Error Get info pharmacy ", error);
				}
				this.loading = false;
			},

		}
	}
</script>