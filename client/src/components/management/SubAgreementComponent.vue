<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference = "SubAgreementForm"
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
				v-show="!loading && (info.id ? currentPermission.canEdit : currentPermission.canAdd)"
				small
				color  = "primary"
				@click  = "info.id ? confirmUpdate() : confirmSave()"
			>
				{{ info.id ? $t('update') : $t('save') }}
			</v-btn>

				
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-administrator="{ itemField} ">
			<MenuCurrentAdministrator					
				:inputField="info" 
				keyField="administrator" 	
				valueField="name"	
				:isReturnObject="false"							
			></MenuCurrentAdministrator>
		</template>
		<template v-slot:field-tariffManualType="{ itemField} ">
			<MenuTariffManualType					
				:inputField="info" 
				keyField="tariffManualType" 													
			></MenuTariffManualType>
		</template>
		
	</FormSessionLayout>	
</template>
<script type="text/javascript">
 // 

import fields_params from "@/components/management/js/agreement_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import AgreementService 	from "@/services/AgreementService.js"
import MenuCurrentAdministrator from "@/components/info/MenuCurrentAdministratorComponent.vue"
import MenuTariffManualType from "@/components/management/MenuTariffManualTypeComponent.vue"

export default {
	name : "SubAgreementComponent",
	components : {
		FormSessionLayout, MenuCurrentAdministrator, MenuTariffManualType
	}, //components
	props : ["infoToComponent", "listToComponent", "currentPermission"],
	data : (vm) => ({		
		info 		 	: {},		
		fields 		: fields_params,		
		diagnoses  	: [],		
		reference 	: 'SubCenter',		
		loading : false,
		renderSignalDigital : "",
		
	}), // data
	watch:{
		infoToComponent:function(val){
			this.renderInput(val)
		},
	},
	mounted(){
		this.renderInput(this.infoToComponent);
	},
	methods : {
		confirmUpdate(){
			this.$EventBus.$emit("notifications", { type: "confirm_action", ID : "confirmUpdateSubAgreement", action : this.update })
		},

		confirmSave(){
			this.$EventBus.$emit("notifications", { type: "confirm_action", ID : "confirmSaveSubAgreement", action : this.save })
		},
		renderInput(val){			
			if (val) {
				this.info = {
					...val, 									
				};
				
			}
		},
		renderInputJson(){
			return {
				...this.info
			}
		},
		
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {					
					if (this.info && this.info.name && this.info.numberAgreement && this.info.startDate && this.info.finalDate && this.info.administrator) {
						const service = new AgreementService();
						const res = await service.saveInfo(this.renderInputJson());
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando Convenio")});
						}else
						if (res && res.data) {
							this.info.id = res.data.id;					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
							this.listToComponent.unshift({...res.data})
							this.$emit("receiveInfo", res.data);
						}
					}else{						
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre, Numero Convenio, EPS, Fecha de inicio y final"});
					}
				}
			}catch(error){
				console.warn("Error save sub agrrement ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Creando Convenio") 
				});
			}finally{
				this.loading = false;
			}
		},
		async update(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
					if (this.info && this.info.name && this.info.numberAgreement && this.info.startDate && this.info.finalDate && this.info.administrator) {
						const service = new AgreementService();
						const infoUp = this.renderInputJson();
						infoUp.id = this.info.id;
						const res = await service.updateInfo({					
							...infoUp,	
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Convenio")});
						}else
						if (res && res.data) {					
							const idx = this.listToComponent.findIndex(x => x.id == infoUp.id );					
							if (idx >= 0) {
								this.listToComponent.splice(idx, 1, {...res.data});
							}
							this.$ManagerSmith.Sound.play("sound1")
							this.$emit("receiveInfo", res.data);
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
						}
					}else{		
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre, Numero Convenio, EPS, Fecha de inicio y final"});
					}
				}
			}catch(error){
				console.warn("Error update sub agrrement", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando Convenio")
				});
			}finally{
				this.loading = false;
			}
		},
		
		
	}, // methods

};
</script>