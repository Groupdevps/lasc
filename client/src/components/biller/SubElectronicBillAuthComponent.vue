<template>
	<FormSessionLayout
		:fields="fields"
		title="AUTORIZACION DE FACTURACION ELECTRONICA"
		subtitle=""
		reference = "SubEntryProductsForm"
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
		
	</FormSessionLayout>	
</template>
<script type = "text/javascript">

import fields_params from "@/components/biller/js/electronic_bill_auth_params.js"
import ElectronicBillAuthService from "@/services/ElectronicBillAuthService.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"

export default {
	name : "SubEntryComponent",
	components : {
		FormSessionLayout, 
	}, //components
	props : ["listToComponent", "infoEdit", "currentPermission", "infoCenter"],
	data : (vm) => ({		
		info 		 	: {},		
		fields 		: fields_params,		
		diagnoses  	: [],		
		reference 	: 'SubElectronicBillAuth',		
		loading : false,
		
	}), // data

	watch:{
		infoEdit(val){
			if (val) {
				this.info = {...val};
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
			this.$EventBus.$emit("notifications", { type : "confirm_action", ID : "confirmActionAddElectronicBillAuth", action: this.save })
		},
		confirmUpdate(){
			this.$EventBus.$emit("notifications", { type : "confirm_action", ID : "confirmActionUpdateElectronicBillAuth", action: this.update })
		},		

		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {

					if (this.info && this.info.authorizationNumber && this.info.from && this.info.to) {					
						
						const service = new ElectronicBillAuthService();
						const res = await service.saveInfo({
							...this.info,											
							UserId : this.$store.getters["auth/userId"],
							CenterId :  this.infoCenter?.id || this.$store.getters["infoCenter/getCenterId"],

						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando Autorizacion Electronica")});
						}else
						if (res && res.data) {
							this.info.id=res.data.id;							
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
							this.listToComponent.push({...res.data});
							this.$emit("CloseForm");
							this.info={};
						}
					}else{
						this.$EventBus.$emit("notifications", {
							type 	: "warning",
							msg 	: "Se requiere numero de autorizacion,  desde y hasta"
						});
					}
				}
			}catch(error){
				console.warn("Error save item ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Creando Autorizacion Electronica")
				});
			}finally{
				this.loading = false;
			}
		},
		async update(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
					if (this.info && this.info.authorizationNumber && this.info.from && this.info.to) {

						const service = new ElectronicBillAuthService();
						const res = await service.updateInfo({
							id : this.info.id,		
							...this.info,													
							UserId : this.$store.getters["auth/userId"],
							
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Autorizacion Electronica")});
						}else
						if (res && res.data) {					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
							const idx = this.listToComponent.findIndex(x => x.id == this.info.id)
							if (idx >= 0) {
								this.listToComponent.splice(idx,1, {...this.info})
							}					

						}
					}else{
						this.$EventBus.$emit("notifications", { type 	: "warning", msg 	: "Se requiere numero de autorizacion,  desde y hasta" });
					}
				}
			}catch(error){
				console.warn("Error udpate item ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando Autorizacion Electronica")
				});
			}finally{
				this.loading = false;
			}
		},	
	}, // methods
};
</script>