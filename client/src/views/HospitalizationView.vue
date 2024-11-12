<template>
	<MenuDashboardLayout 
		:currentHeigth="currentHeigth"
		:listMenu="renderList"
		reference="DashboardHospitalization"
		routeToBack="Hospitalization"
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
			<!-- <MedicalHistory	 							
				:key 					= "'medico_medical_history'"
				:reference 					= "'ref_medico_medical_history'"
				:isActiveBtnExpand 		= "true"
				@isExpandMedicalHistory = "resizeHeightTabs($event)"
				:listNotAllowed 		= "listNotAllowedToMedical"
			></MedicalHistory>			 -->
			<router-view v-if="!loading" :ReduceSize="reduceSize" :isDisabledEdit="isDisabled" :GetCurrentTypeServiceByName="getCurrentTypeServiceByName"></router-view>
			
		</div>
		<!-- </div> -->
	</template>
	</MenuDashboardLayout>
</template>
<script type="text/javascript">
	import params 						from "@/views/js/menuDashboardHospitalization.js"
	import MedicalHistory 				from "@/components/info/MedicalHistoryComponent.vue"

	import MenuDashboardLayout from "@/layouts/MenuDashboardLayout.vue"
	import HospitalizationAgendaService from "@/services/AgendaHospitalizationService.js"
	import RemissionService from "@/services/RemissionService.js"

	export default{		
		name : "DashboardHospitalization",
		components 	: {
			MenuDashboardLayout,
			MedicalHistory,			
		},
		data : (vm) => ({		
			items: params,
			loading:false,
			itemOption : null,
			reduceSize : 150,
			listNotAllowedToMedical : [],
			isDisabled  : false,
			options : [
				// { title : "Hospitalizar", action : vm.actionHospitalizar, loading: false},
				// { title : "Remision", action : vm.actionRemission, loading: false},

			]
		}), // data
		created(){			
			if(this.$route.name=="DashboardHospitalization"){	
				this.$router.push({name: "StayFormHospitalization"})
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
			getCurrentTypeServiceByName(){
				return this.$store.getters["listTypeService/getTypeServiceByName"];
			},
		},
		methods:{
			async actionHospitalizar(item){
				try {
					item.loading = true;
					console.log("Hospitalizar ");
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
				this.$store.dispatch("infoPatient/getInfo", this.$route.params.id).then(res=>{				
					this.loading = false;						
					this.$EventBus.$emit("notifications",{
						type: "success",
						msg : "Modulo Cargado",
						timeout : 2000,
					}); 
				}).catch(error=> {
					this.loading = false;						
					this.$EventBus.$emit("notifications",{
						type: "success",
						msg : "Modulo Cargado",
						timeout : 2000,
					}); 
				});
				if (!this.$store.getters["listStatus/isList"]) {
					this.$store.dispatch("listStatus/getList");
				};
			},
			resizeHeightTabs(isResize){				
				this.reduceSize = isResize ? 420 : 200;
			}
		}, // methods
	}
</script>