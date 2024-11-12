<template>
	<MenuDashboardLayout 
		:currentHeigth="currentHeigth"
		:listMenu="renderList"
		reference="DashboardSurgery"
		routeToBack="Surgery"
		:listOptions="options"
	>
	<template v-slot:default="{item}">
		
		<!-- <div :style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${currentHeigth-10}px;`"> -->
		<div>		
			<v-progress-linear
				indeterminate
				color="cyan"
				:active="loading"
				absolute
			></v-progress-linear>		
			<MedicalHistory	 							
				:key 					= "'surgery_medical_history'"
				:reference 					= "'ref_surgery_medical_history'"
				:isActiveBtnExpand 		= "true"
				@isExpandMedicalHistory = "resizeHeightTabs($event)"
				:listNotAllowed 		= "listNotAllowedToMedical"
			></MedicalHistory>					
			<router-view v-if="!loading" :ReduceSize="reduceSize" :isDisabledEdit="isDisabled" ></router-view>
			
		</div>
		<!-- </div> -->
	</template>
	</MenuDashboardLayout>
</template>
<script type="text/javascript">
	import params 						from "@/views/js/menuDashboardSurgery.js"
	import MedicalHistory 				from "@/components/info/MedicalHistoryComponent.vue"

	import MenuDashboardLayout from "@/layouts/MenuDashboardLayout.vue"
	import HospitalizationAgendaService from "@/services/AgendaHospitalizationService.js"
	import RemissionService from "@/services/RemissionService.js"
	import OrderService from "@/services/OrderService.js"

	export default{		
		name : "DashboardSurgery",
		components 	: {
			MenuDashboardLayout,
			MedicalHistory,			
		},
		data : (vm) => ({		
			items: params,		
			loading : false,
			itemOption : null,			
			reduceSize : 150,
			listNotAllowedToMedical : [],			
			isDisabled  : false,
			options : [
				{ title : "Hospitalizar", action : vm.confirmActionHospitalize, loading: false},
				// { title : "Remision", action : vm.actionRemission, loading: false},

			]
		}), // data
		created(){			
			if(this.$route.name=="DashboardSurgery"){	
				this.$router.push({name: "SurgeryProgramming"})
			}			
			this.getInfoPatient();

		}, // created	
		computed:{
			currentHeigth: function(){
				return this.$vuetify.breakpoint.height - 95
			},
			renderList(){
				return this.items
			},

		},
		methods:{
			confirmActionHospitalize(item){
				this.itemOption = item;
				this.$EventBus.$emit("notifications",{ type : "confirm_action", ID : "confActionHospitalizeSurgery", action : this.actionHospitalize })
			},
			async actionHospitalizar(item){
				try {
					item.loading = true;					
					const service = new HospitalizationAgendaService();
					const res = await service.saveInfo({AttentionId : this.$route.params.id });

				} catch (error) {
					console.warn("Error send hozpitalization ", error)
				}finally{
					item.loading = false;
				}
			},
			
			async actionRemission(item){
				try {
					item.loading = true;
					console.log("Remission ");
					const service = new RemissionService();
					const res = await service.saveInfo({AttentionId : this.$route.params.id });

				} catch (error) {
					console.warn("Error send hozpitalization ", error)
				}finally{
					item.loading = false;
				}
			},
			getInfoPatient(){
				this.$EventBus.$emit("notifications",{
					type: "success",
					loading : true,
					msg : "Cargando Modulo",
					persistent : true,					
					direction : 1,
				}); 
				this.loading = true;
				
				this.$store.dispatch("infoPatient/getInfo", this.$route.params.id).then(res=>{				
					this.getOrder(); 
				}).catch(error=> {
					this.getOrder();
					
				});
				if (!this.$store.getters["listStatus/isList"]) {
					this.$store.dispatch("listStatus/getList");
				}
				
			},
			resizeHeightTabs(isResize){				
				this.reduceSize = isResize ? 420 : 200;
			},

			async getOrder(){
				try{
					let type = [this.$store.getters["listTypesOrder/getTypeOrderByName"]("ORDEN CIRUGIA")?.id || 5];
					
					const service = new OrderService();
					const res = await service.searchOrders({
						type,
						attention : this.$route.params.id
					})
					if (res &&  res.data && res.data.orders && res.data.orders.length > 0) {
						const item = res.data.orders.find(x=> x.id == parseInt(this.$route.params.order));						
						this.$store.commit("infoPatient/setOrder", item)						
					}else{
						this.$store.commit("infoPatient/setOrder", null)												
					}
				}catch(error){

				}finally{
					this.loading = false;						
					this.$EventBus.$emit("notifications",{
						type: "success",
						msg : "Modulo Cargado",
						timeout : 2000,
					});
				}
			},
			async actionHospitalize(){
				try {
					this.itemOption.loading = true;	
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {					
						const service = new HospitalizationAgendaService();
						const res = await service.saveInfo({AttentionId : this.$route.params.id });
						if (res) {
							this.$EventBus.$emit("notifications",{
								type: "success",
								msg : "Paciente enviado a Hospitalizar"
							});
						}
					}
				} catch (error) {
					console.warn("Error send hozpitalization ", error)
					this.$EventBus.$emit("notifications",{
						type: "error",
						msg : "Enviando paciente a Hospitalizar",
					});
				}finally{
					this.itemOption.loading = false;
				}


			},
		}, // methods
	}
</script>