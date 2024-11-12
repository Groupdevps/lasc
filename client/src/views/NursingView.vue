<template>
	<MenuDashboardLayout 
		:currentHeigth="currentHeigth"
		:listMenu="renderList"
		reference="DashboardNursing"
		routeToBack="Nursing"
		:listOptions="options"
	>
	<template v-slot:default="{item}">
		
		
		<div>			
			<v-progress-linear
				indeterminate
				color="cyan"
				:active="loading"
				absolute
			></v-progress-linear>			

			<MedicalHistory	 							
				:key 					= "'nursing_medical_history'"
				:reference 					= "'ref_nursing_medical_history'"
				:isActiveBtnExpand 		= "true"
				@isExpandMedicalHistory = "resizeHeightTabs($event)"
				:listNotAllowed 		= "listNotAllowedToMedical"
			></MedicalHistory>					
			<router-view v-if="!loading" :ReduceSize="reduceSize" :isDisabledEdit="isDisabled" :GetCurrentTypeServiceByName="getCurrentTypeServiceByName"></router-view>
			
		</div>
		<!-- </div> -->
	</template>
	</MenuDashboardLayout>
</template>
<script type="text/javascript">
	import params 						from "@/views/js/menuDashboardNursing.js"
	import MedicalHistory 				from "@/components/info/MedicalHistoryComponent.vue"
	import MenuDashboardLayout from "@/layouts/MenuDashboardLayout.vue"
	import NursingNotesService from "@/services/NursingNotesService.js"
	
	export default{		
		name : "DashboardNursing",
		components 	: {
			MenuDashboardLayout,
			MedicalHistory,			
		},
		data : (vm) => ({		
			items: params,			
			reduceSize : 150,
			loading  : true,		
			listNotAllowedToMedical : [],
			isDisabled  : false,
			itemOption : null,
			options : [
				// { title : "Hospitalizar", action : vm.actionHospitalizar, loading: false},
				// { title : "Remision", action : vm.actionRemission, loading: false},
				{ key: "highNursingOption", title : "Alta Enfermeria", action : vm.confirmStatusNursing, loading: false, isDisabled : true},

			]
		}), // data

		created(){			
			if(this.$route.name=="DashboardNursing"){	
				this.$router.push({name: "NursingNotes"})
			}
			this.getInfoPatient();
		}, // created	
		mounted(){
			if (this.isLoadedRole) {					 
				this.items = this.$Helper.renderPermissionToShow(this.items, this.$store.getters["auth/getPermission"], this.currentPermission);
			}	
		},
		watch:{
			isLoadedPatient(val){
				if (val) {
					this.loading = false;	
					this.renderEnableOptions();				
				}
			},
			isLoadedRole(val){				
				if (val) {
					this.items = this.$Helper.renderPermissionToShow(this.items, this.$store.getters["auth/getPermission"], this.currentPermission);
				}
			}
		},
		computed:{
			currentHeigth: function(){
				return this.$vuetify.breakpoint.height - 95
			},
			renderList(){			
				return this.items; 
			},
			renderOptions(){
				return this.options;
			},
			isLoadedPatient(){
				return this.$store.getters["infoPatient/isLoaded"]
			},		
			isLoadedRole(){	
				return this.$store.getters["auth/getIsRoleLoaded"];
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("DashboardNursing") 
			},
			currentPatient(){
				return this.$store.getters["infoPatient/patient"];
			},
			isLastNote(){
				return this.$store.getters["infoPatient/getLastNote"];	
			},
			getCurrentTypeServiceByName(){
				return this.$store.getters["listTypeService/getTypeServiceByName"];
			},
		},
		methods:{			
			renderEnableOptions(){
				if (this.currentPatient ) {					
					// console.log("this.currentPatient " , this.currentPatient, this.isLastNote)
					if (this.currentPatient.Status && this.currentPatient.Status.name == "ALTA MEDICA") {						
						this.options.forEach((x)=>{
							if(x.key == 'highNursingOption' && this.currentPatient.Status && this.currentPatient.Status.name == "ALTA MEDICA" ){
								x.isDisabled = false;
							}else{
								x.isDisabled = true;							
							}
						})
					}
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
				
				if (!this.$store.getters["listTypesOrder/isList"]) {
					this.$store.dispatch("listTypesOrder/getList");
				}
			},
			confirmStatusNursing(item){
				this.itemOption = item;
				this.$EventBus.$emit("notifications",{ type : "confirm_action", ID : "confirmStatusNursing", action : this.setStatusNursing })
			},
			async setStatusNursing(){
				try{						
					this.itemOption.loading = true;
					this.loading = true;						
					if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {	

						const service = new NursingNotesService();
						const res = await service.dischargeStatusInfo({
							UserId: this.$store.getters["auth/userId"],
							AttentionId : this.$route.params.id,
							date : this.$ManagerSmith.getDateCurrent(),
							hour : this.$ManagerSmith.getTimeCurrentHS(),
						});
						if (res && res.data) {										
							
							this.$store.commit("infoPatient/setLastNote", res.data)						
							this.isDisabled = true;
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "success",
								msg 	:  "Alta de Enfermeria Realizado"
							});
						}
					}
				
				}catch(error){
					console.warn("Error dischargeS notes ", error);
					this.$EventBus.$emit("notifications", {
						type 	: "error",
						msg 	: "Realizando Alta de Enfermeria"
					});
				}finally{
					this.itemOption.loading = false;
					this.loading = false;						

				}
			},
			resizeHeightTabs(isResize){				
				this.reduceSize = isResize ? 360 : 150;
			}
		}, // methods
	}
</script>