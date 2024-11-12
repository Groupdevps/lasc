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
			<FilterComponent 
				:infoToSearch="search" 
				reference="filter-lab" 
				class= "mt-2" 
				@actionToSearch="getFilter()" 
				:ArrayNotShowFields="['TriageId']"
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
						{{item?.Status?.name || "" }}				
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
			<v-btn-toggle mandatory>				
				<v-tooltip bottom>
      				<template v-slot:activator="{ on, attrs }">					
						<v-btn small color="primary" @click="redirect(item)" v-show ="isShowToRoles" v-bind="attrs" v-on="on"> <v-icon small>mdi-needle</v-icon></v-btn> 
					</template>
					 <span>IR A MODULO DE CIRUGIA</span>
				</v-tooltip>
				<v-tooltip bottom>
      				<template v-slot:activator="{ on, attrs }">					
						<v-btn small color="success" @click="redirectToMedico(item)" v-show ="isShowToRoles" v-bind="attrs" v-on="on"> <v-icon small>mdi-stethoscope</v-icon></v-btn>
					</template>
					<span>IR A MODULO MEDICO</span>
				</v-tooltip>
			</v-btn-toggle>
		</template>
	</v-data-table>
	
</template>
<script type="text/javascript">
	import FilterComponent from "@/components/info/FilterComponent.vue"
	import OrderService from "@/services/OrderService.js"
	
	export default{
		name : "AgendaSurgery",
		props : [ "currentHeight" ],
		components : { FilterComponent },
		data : (vm)=>({
			list : [],
			options : { itemsPerPage : 30 },
			search : {date : vm.$ManagerSmith.getDateCurrent()},
			total : 0,
			loading : false,
			listAllowStatusToFilter: [ 'finalizado', 'pendiente', 'sin cama asignada', 'cirugia en espera', 'recuperacion', 'en proceso'], //
			headers : [
				{ text:"ESTADO" , value : "Status.name"},
				{ text:"TRIAGE" , value : "Attention.Triage"},//.LevelTriage.description
				// { text:"HABITACION" , value : "bed"},
				{ text:"TIPO SERVICIO" , value : "Attention.TypeService.name"},
				{ text:"N. DE ORDEN" , value : "orderNumber"},
				{ text:"FECHA" , value : "createdAt"},
				{ text:"DOCUMENTO" , value : "Attention.HistoryPerson.numberId"},
				{ text:"NOMBRE PACIENTE" , value : "Attention.HistoryPerson.fullName"},
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
				this.total = this.list.length;
				return this.list
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("AgendaSurgeryComponent") // this.$route.name
			},
			isShowToRoles(){				
				return this.currentPermission.canAdd | this.currentPermission.canEdit;						 
			}
		},
		methods:{
			redirect(item){				
				if(item && item.AttentionId){
					this.$router.push({ 
						name 	: "DashboardSurgery",
						params 	: {
							id 		: item.AttentionId, // change for attention
							order 	: item.id, 
							option 	: this.$route.params.option
						}
					});				
				}
			},
			redirectToMedico(item){
				if(item && item.id){					
					this.$router.push({ 
						name 	: "DashboardMedico",
						params 	: {
							id 		 : item.AttentionId,
							numberId : item?.Attention?.HistoryPerson?.numberId,//item.OrderLab.numberId, // change to numberId / PersonId
							option : this.$route.params.option,
							routeBack : "Surgery",

						}
					});				
				}
			},
			async getFilter(){
				try{					
					this.loading = true;
					const {page, itemsPerPage} = this.options;
					let type = [this.$store.getters["listTypesOrder/getTypeOrderByName"]("ORDEN CIRUGIA")?.id || 5];
					const service = new OrderService();
					const res = await service.searchOrders({
						page, 
						itemsPerPage, 
						type, 
						status: this.search.StatusId || null,					
						triage : this.search.TriageId, 
						patient : this.search.numberId,
						assignedDate : this.search.date || null,
					});
					if (res &&  res.data && res.data.orders && res.data.orders.length > 0) {
						this.total = res.data.totalItems;
						this.list = res.data.orders;
					}else{
						this.total = 0;
						this.list = [];
					}
				}catch(error){
					console.warn("Error Get info Surgery ", error);
				}finally{
					this.loading = false;
				}
			},

		}
	}
</script>