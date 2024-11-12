<template>
	<FormSessionLayout
		:fields="fields"
		title="FORMULARIO DE CONCEPTO"
		subtitle=""
		reference = "SubConceptForm"
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
		<template v-slot:field-cup="{ itemField }">			
			<MenuCupsListComponent
				:inputField = "info"
				keyField = "cup"
				:isReturnObject = "true"
				labelToMenu = "SELECCIONAR CUP"
				ref = "fieldCupList"
				autoSelectBy = "id"
				:isHideDetails="true"
				:isPersistentHint="true"
			></MenuCupsListComponent>			
		</template>
		<template v-slot:field-soat="{ itemField }">
			<MenuTariffManualComponent
				:inputField = "info"
				keyField="soat"
				:isReturnObject = "true"
				:isHideDetails="true"
				:isPersistentHint="true"
			></MenuTariffManualComponent>
		</template>			
		<template v-slot:field-iss="{ itemField }">
			<MenuISSComponent
				:inputField = "info"
				keyField="iss"
				:isReturnObject = "true"
				:isHideDetails="true"
				:isPersistentHint="true"
			></MenuISSComponent>
		</template>			

	</FormSessionLayout>	
</template>
<script type = "text/javascript">

import fields_params from "@/components/biller/js/concept_params.js"
import ConceptService from "@/services/ConceptService.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import MenuCupsListComponent from "@/components/info/MenuCupsListComponent.vue"
import MenuISSComponent from "@/components/info/MenuIssComponent.vue"
import MenuTariffManualComponent from "@/components/info/MenuTariffManualComponent.vue"

export default {
	name : "SubEntryComponent",
	components : {
		FormSessionLayout, MenuCupsListComponent, MenuISSComponent, MenuTariffManualComponent
	}, //components
	props : ["listToComponent", "infoEdit", "currentPermission"],
	data : (vm) => ({		
		info 		 	: {
			cup : null,
			iss : null,
			soat : null,
		},		
		fields 		: fields_params,		
		diagnoses  	: [],		
		reference 	: 'SubEntryProducts',		
		loading : false,
		
	}), // data

	watch:{
		infoEdit(val){
			if (val) {
				this.info = {
					id : val?.id,
					cup : { code : val?.code_cup,},
					iss : {code : val?.code_iss,},
					soat: { code : val?.code_soat}
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
					if (this.info && this.info.cup && (this.info.iss || this.info.soat)) {					
						
						const service = new ConceptService();
						const res = await service.saveInfo({							
							cup : this.info.cup?.code || '',
							iss : this.info.iss?.code || '',
							soat : this.info.soat?.code || '',																					
							UserId : this.$store.getters["auth/userId"],
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando Concepto")});
						}else
						if (res && res.data) {
							this.info.id = res.data.id;
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
							this.listToComponent.push({
								id : res.data.id,
								code_cup : this.info.cup?.code || '',
								description_cup: this.info.cup?.description || '',
								code_iss: this.info.iss?.code || '',
								code_soat: this.info.soat?.code || '',
								value_iss: this.info.iss?.value || '0',
								value_soat: this.info.soat?.value || '0'
							});
							this.$emit("CloseForm");
							this.info={};
						}
					}else{
						this.$EventBus.$emit("notifications", {
							type 	: "warning",
							msg 	: "Se requiere Cup y Manual"
						});
					}
				}
			}catch(error){
				console.warn("Error save item ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Creando Concepto")
				});
			}finally{
				this.loading = false;
			}
		},
		async update(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
					if (this.info && this.info.cup && (this.info.iss || this.info.soat)) {

						const service = new ConceptService();
						const res = await service.updateInfo({
							id : this.info.id,		
							cup : this.info.cup?.code || '',
							iss : this.info.iss?.code || '',
							soat : this.info.soat?.code || '',													
							UserId : this.$store.getters["auth/userId"],
							
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Concepto")});
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
									code_cup : this.info.cup?.code || '',
									description_cup: this.info.cup?.description || '',
									code_iss: this.info.iss?.code || '',
									code_soat: this.info.soat?.code || '',
									value_iss: this.info.iss?.value || '0',
									value_soat: this.info.soat?.value || '0'
								})
							}					

						}
					}else{
						this.$EventBus.$emit("notifications", { type 	: "warning", msg 	: "Se requiere Cup y Manual" });
					}
				}
			}catch(error){
				console.warn("Error udpate item ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando Concepto")
				});
			}finally{
				this.loading = false;
			}
		},	
	}, // methods
};
</script>