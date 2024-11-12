<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference = "SubCurrentAdministratorForm"
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
		<template v-slot:field-TypeCenterId="{ itemField} ">
			<MenuTypeCenter					
				:inputField="info" 
				keyField="TypeCenterId" 					
				:isReturnObject="false"							
			></MenuTypeCenter>
		</template>
		<template v-slot:field-state="{ itemField} ">
			<MenuStateComponent :inputField="info" keyField="state" :isReturnObject="false" autoSetInField="State"></MenuStateComponent>
		</template>
		<template v-slot:field-city="{ itemField} ">
			<MenuCity					
				:inputField="info" 			
				keyField="city" 
				itemValue="id"		
				:infoState="info.State" 
				:isRequiredState="true"		
				:isStateObject="true"																
			></MenuCity>
		</template>

	</FormSessionLayout>	
</template>
<script type="text/javascript">
 // 

import fields_params from "@/components/management/js/current_administrators_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import CurrentAdministratorService 	from "@/services/CurrentAdministratorService.js"
import MenuStateComponent from "@/components/info/MenuStateComponent.vue"
import MenuCity from "@/components/info/MenuCityComponent.vue"
import MenuTypeCenter from"@/components/info/MenuTypeCenterComponent.vue"
export default {
	name : "CurrentAdministratorsComponent",
	components : {
		FormSessionLayout, MenuCity, MenuTypeCenter, MenuStateComponent
	}, //components
	props : ["infoToComponent", "listToComponent", "currentPermission"],
	data : (vm) => ({		
		info 		 	: { State : null },		
		fields 		: fields_params,	
		loading : false,
		
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
			this.$EventBus.$emit("notifications", { type: "confirm_action", ID : "confirmUpdateSubCurrentAdministrator", action : this.update })
		},

		confirmSave(){
			this.$EventBus.$emit("notifications", { type: "confirm_action", ID : "confirmSaveSubCurrentAdministrator", action : this.save })
		},
		renderInput(val){			
			if (val) {
				this.info = {
					...val, 
														
				};
				if (val.Address) {
					this.info.address = val.Address.address || "";
					this.info.district = val.Address.district || "";
					this.info.city =  val.Address.CityId || "" ;
					if (val.Address.StateId) {
						this.info.State={ id : val.Address.StateId} 
						this.info.state=val.Address.StateId;
					}else{
						this.info.state=""; 
					}
				}
				
			}
		},
		renderInputJson(){
			return {
				...this.info,
				Address : {
					address : this.info.address,
					// district : this.info.district,
					CityId : this.info.city,
					StateId : this.info.state,
					// zone : this.info.zone,
					CenterId : this.info.id,
				},
			}
		},		
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
					if (this.info && !this.info.name) {// || !this.info.code || !this.info.regime || !this.info.phone
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre"});
					}else{						

						const params = this.renderInputJson();
						params.UserId = this.$store.getters["auth/userId"];
						const service = new CurrentAdministratorService();
						const res = await service.saveInfo(params);
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando Admintrador")});
						}else
						if (res && res.data && res.data.currentAdministrator) {
							this.info.id = res.data.currentAdministrator.id;					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
							this.listToComponent.unshift({...this.info})
							this.$emit("receiveInfo", this.info);
							this.info={};

						}
					}
				}
			}catch(error){
				console.warn("Error save sub administrator ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Creando Administrador") 
				});
			}finally{
				this.loading = false;
			}
		},
		async update(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
					if (this.info && !this.info.name) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre"});
					}else{		
						const service = new CurrentAdministratorService();
						const infoUp = {...this.renderInputJson()};
						infoUp.id = this.info.id;
						delete infoUp.UserId; 
						const res = await service.updateInfo({					
							...infoUp,	
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Administrador")});
						}else
						if (res && res.data) {					
							const idx = this.listToComponent.findIndex(x => x.id == infoUp.id );					
							if (idx >= 0) {
								this.listToComponent.splice(idx, 1, {...infoUp});
							}
							this.$ManagerSmith.Sound.play("sound1")
							this.$emit("receiveInfo", res.data);
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
							this.info={};
						}
					}
				}
			}catch(error){
				console.warn("Error update sub administrator", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando Administrador")
				});
			}finally{
				this.loading = false;
			}
		},
		
		
	}, // methods

};
</script>