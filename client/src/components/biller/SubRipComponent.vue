<template>
	<FormSessionLayout
		:fields="fields"
		title="FORMULARIO DE RIP"
		subtitle=""
		reference = "SubRipForm"
		:inputField="info"
	>
		<template v-slot:buttons>
			<v-progress-linear
				indeterminate
				color="cyan"
				:active="loading"
				absolute
			></v-progress-linear>
			<br>

			<v-spacer></v-spacer>
				<v-btn
					small
					v-show="info.id ? currentPermission.canEdit : currentPermission.canAdd  "
					:loading="loading"
					color  = "primary"
					@click  = "info.id ? confirmUpdate() : confirmSave()"
				>
					{{ info.id ? $t('update') : $t('save') }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-currentAdministratorName="{ itemField }">
			<MenuCurrentAdministratorComponent
				:inputField="info"
				keyField="currentAdministratorName"
			></MenuCurrentAdministratorComponent>
		</template>
	</FormSessionLayout>	
</template>
<script type = "text/javascript">

import fields_params from "@/components/biller/js/rip_params.js"
import RipService from "@/services/RipService.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import MenuCurrentAdministratorComponent from "@/components/info/MenuCurrentAdministratorComponent.vue"

export default {
	name : "SubRipComponent",
	components : {
		FormSessionLayout, MenuCurrentAdministratorComponent
	}, //components
	props : ["listToComponent", "infoEdit", "currentPermission"],
	data : (vm) => ({		
		info 		 	: {
			startDate : null,
			endDate : null,
			currentAdministratorName : null,
		},		
		fields 		: fields_params,		
		diagnoses  	: [],		
		reference 	: 'SubRip',		
		loading : false,
		
	}), // data

	watch:{
		infoEdit(val){
			if (val) {
				this.info = {
					id : val?.id,
					cup : val?.startDate,
					iss : val?.endDate,
					soat: val?.currentAdministratorName
				};
			}
		}
	},
	mounted(){	
		if (this.infoEdit) {
			if (this.infoEdit) {
				this.info = {...this.infoEdit};
			}
		
		}
	}, // created

	computed : {
		
	}, // computed

	methods : {
		confirmSave(){
			this.$EventBus.$emit("notifications", { type : "confirm_action", ID : "confirmActionAddConcept", action: this.save })
		},
		confirmUpdate(){
			this.$EventBus.$emit("notifications", { type : "confirm_action", ID : "confirmActionUpdateConcept", action: this.update })
		},		
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
					if (this.info && this.info.startDate && (this.info.endDate || this.info.currentAdministratorName)) {					
						
						const service = new RipService();
						const res = await service.saveInfo({							
							cup : this.info.startDate || '',
							iss : this.info.endDate || '',
							soat : this.info.currentAdministratorName || '',													
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],	
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando RIP")});
						}else
						if (res && res.data) {
							this.info.id = res.data.id;
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
							this.listToComponent.push({
								id : res.data.id,
								startDate : this.info.startDate || '',
								endDate : this.info.endDate || '',
								currentAdministratorName : this.info.currentAdministratorName || '',	
							});
							this.$emit("CloseForm");
							this.info={};
						}
					}else{
						this.$EventBus.$emit("notifications", {
							type 	: "warning",
							msg 	: "Se requiere EPS, Fecha inicial y Final"
						});
					}
				}
			}catch(error){
				console.warn("Error save item ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Creando RIP")
				});
			}finally{
				this.loading = false;
			}
		},
		async update(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
					if (this.info && this.info.startDate && (this.info.endDate || this.info.currentAdministratorName)) {

						const service = new RipService();
						const res = await service.updateInfo({
							id : this.info.id,		
							startDate : this.info.startDate || '',
							endDate : this.info.endDate || '',
							currentAdministratorName : this.info.currentAdministratorName || '',													
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],							
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando RIP")});
						}else
						if (res && res.data) {					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
							const idx = this.listToComponent.findIndex(x => x.id == this.info.id)
							if (idx >= 0) {
								this.listToComponent.splice(idx,1, {
									id : this.info?.id || '',
									startDate : this.info.startDate || '',
									endDate : this.info.endDate || '',
									currentAdministratorName : this.info.currentAdministratorName || '',			
								})
							}					

						}
					}else{
						this.$EventBus.$emit("notifications", { type 	: "warning", msg 	: "Se requiere EPS, Fecha inicial y Final" });
					}
				}
			}catch(error){
				console.warn("Error udpate item ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando RIP")
				});
			}finally{
				this.loading = false;
			}
		},	
	}, // methods
};
</script>