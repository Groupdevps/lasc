<template>
	<MenuDashboardLayout 
		:currentHeigth="currentHeigth"
		:listMenu="renderList"
		reference="DashboardMedico"
		:routeToBack="$route.params.routeBack || 'Medico'"
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
				:key 					= "'medico_medical_history'"
				:reference 					= "'ref_medico_medical_history'"
				:isActiveBtnExpand 		= "true"
				@isExpandMedicalHistory = "resizeHeightTabs($event)"
				:listNotAllowed 		= "listNotAllowedToMedical"
			></MedicalHistory>					
			<router-view  v-if="!loading" :ReduceSize="reduceSize" :isDisabledEdit="isDisabled" :GetCurrentTypeServiceByName="getCurrentTypeServiceByName"></router-view>
			
		</div>
		<!-- </div> -->
	</template>
	</MenuDashboardLayout>
</template>
<script type="text/javascript">
	import params 						from "@/views/js/menuDashboardMedico.js"
	import MedicalHistory 				from "@/components/info/MedicalHistoryComponent.vue"
	
	// import medical_formulas 			from "@/components/medico/medics_form.vue"
	// import laboratory_order 			from "@/components/medico/medics_form.vue"
	// import outpatient_orders 			from "@/components/medico/medics_form.vue"
	// import diagnostic_help 				from "@/components/medico/medics_form.vue"
	// import medical_orders 				from "@/components/medico/medics_form.vue"
	
	import MenuDashboardLayout from "@/layouts/MenuDashboardLayout.vue"
	import HospitalizationAgendaService from "@/services/AgendaHospitalizationService.js"
	import RemissionService from "@/services/RemissionService.js"
	import AttentionService from "@/services/AttentionService.js"

	export default{
		name 		: "DashboardMedico",
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
				{ title : "Hospitalizar", action : vm.confirmActionHospitalize, loading: false, isDisabled: false},
				// { title : "Remision", action : vm.confirmActionRemission, loading: false},
				{ title : "Alta Medica", action : vm.confirmActionMedicalDischarge, loading: false},
			]
		}), // data
		created(){			
			this.getInfoPatient();
			if(this.$route.name=="DashboardMedico"){	
				this.$router.push({name: "EmergencyMedicalHistory"})
			}
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
				return this.items
			},
			isLoadedPatient(){
				return this.$store.getters["infoPatient/isLoaded"]
			},		
			isLoadedRole(){				
				return this.$store.getters["auth/getIsRoleLoaded"];
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("DashboardMedico") 
			},
			getCurrentTypeServiceByName(){
				return this.$store.getters["listTypeService/getTypeServiceByName"];
			},
		},
		methods:{
			confirmActionHospitalize(item){
				this.itemOption = item;
				this.$EventBus.$emit("notifications",{ type : "confirm_action", ID : "confActionHospitalize", action : this.actionHospitalize })
			},
			confirmActionRemission(item){
				this.itemOption = item;
				this.$EventBus.$emit("notifications",{ type : "confirm_action", ID : "confActionRemission", action : this.actionRemission })
			},
			confirmActionMedicalDischarge(item){
				this.itemOption = item;
				this.$EventBus.$emit("notifications",{ type : "confirm_action", ID : "confActionMdicalDischarge", action : this.actionMedicalDischarge })
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
			
			async actionRemission(){
				try {
					this.itemOption.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {					
						const service = new RemissionService();
						const res = await service.saveInfo({AttentionId : this.$route.params.id });
						if (res && res.data) {
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "success",
								msg 	:  "Paciente Remitido",

							});
						}
					}
				} catch (error) {
					console.warn("Error send hozpitalization ", error)
				}finally{
					this.itemOption.loading = false;
				}


			},
			async actionMedicalDischarge(){
				try {
					this.itemOption.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {					
						const statusTemp = this.$store.getters["listStatus/getStatusByName"]("ALTA MEDICA");
						const service = new AttentionService();
						const res = await service.updateAttention({id : parseInt(this.$route.params.id), StatusId: statusTemp?.id || this.$store.getters["infoPatient/patient"]?.StatusId  });
						if (res && res.data) {
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "success",
								msg 	:  "Alta Medica Generada ",

							});
						}
					}
				} catch (error) {
					console.warn("Error send status medical discharge ", error)
				}finally{
					this.itemOption.loading = false;
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
					if (res && res.data && res.data.TypeService && res.data.TypeService.name=="HOSPITALIZACION") {
						this.options = this.options.map(x=>{
							if (x && x.title=='Hospitalizar') {
								x.isDisabled=true;
							}
							return x
						})
					}
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
				if (!this.$store.getters["listStatus/isList"]) {
					this.$store.dispatch("listStatus/getList");
				}
			}, // getInfoPatient
			resizeHeightTabs(isResize){				
				this.reduceSize = isResize ? 420 : 200;
			}
		}, // methods
	}
</script>