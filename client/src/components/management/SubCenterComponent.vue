<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference = "SubCenterForm"
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
		<template v-slot:field-state="{ itemField} ">
			<MenuStateComponent :inputField="info" keyField="state" :isReturnObject="false" autoSetInField="State"></MenuStateComponent>
		</template>
		<template v-slot:field-city="{ itemField} ">
			<MenuCityComponent :inputField="info" keyField="city" itemValue="id" :infoState="info.State" 
				:isRequiredState="true" :isStateObject="true"> </MenuCityComponent>
		</template>
		<template v-slot:field-TypeCenter="{ itemField} ">
			<MenuTypeCenterComponent :inputField="info" keyField="TypeCenter"></MenuTypeCenterComponent>
		</template>
		<template v-slot:field-logo="{ itemField }">
			<div>
				
			<UploadFile
                @FileConverted          = "setFile('logo', $event)" 
                textComponent           = "Logo" 
            ></UploadFile>
            <img
	            v-if   =    "renderSignalDigital"
	            :src        ="renderSignalDigital"                            
	            width       = "200px"
	            height      = "100px"
	            class       = "pa-1 ma-0"
	            aspect-ratio="1.4"
	            style       = "border:2px solid grey;border-radius: 5px; border-style: dashed;"
            	contain
            />
			</div>
		</template>
	</FormSessionLayout>	
</template>
<script type="text/javascript">
 // 

import fields_params from "@/components/management/js/management_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import UploadFile           from "@/components/info/UploadFileComponent.vue"
import CenterService 	from "@/services/CenterService.js"
import MenuCityComponent from "@/components/info/MenuCityComponent.vue"
import MenuStateComponent from "@/components/info/MenuStateComponent.vue"
import MenuTypeCenterComponent from "@/components/info/MenuTypeCenterComponent.vue"


export default {
	name : "SubCenterComponent",
	components : {
		FormSessionLayout, UploadFile, MenuCityComponent, MenuStateComponent, MenuTypeCenterComponent
	}, //components
	props : ["infoToComponent", "listToComponent", "currentPermission"],
	data : (vm) => ({		
		info 		 	: {State : null},		
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
			this.$EventBus.$emit("notifications", { type: "confirm_action", ID : "confirmUpdateCenter", action : this.update })
		},

		confirmSave(){
			this.$EventBus.$emit("notifications", { type: "confirm_action", ID : "confirmSaveCenter", action : this.save })
		},
		setFile(field, file){

		},
		renderInput(val){			
			if (val) {
				this.info = {
					...val, 					
					digitalSignature : val.digitalSignature || "",
					State : null,
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
				
				name : this.info.name,
				nit : this.info.nit,
				code : this.info.code,
				email : this.info.email,
				phone : this.info.phone,
				description : this.info.description,				
				TypeCenterId : this.info.TypeCenterId,								
				Address : {
					address : this.info.address,
					district : this.info.district,
					CityId : this.info.city,
					StateId : this.info.state,
					zone : this.info.zone,
					CenterId : this.info.id,
				},
				// digitalSignature : {
				// 	name : this.info.digitalSignature.name,
				// 	base64 : this.info.digitalSignature.base64,
				// }
			}
		},
		
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
					if (this.info && !this.info.name &&  !this.info.nit && !this.info.TypeCenterId) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre, NIT, Tipo de Centro"});
					}else{						
						const service = new CenterService();
						const params = this.renderInputJson();
						params.UserId = this.$store.getters["auth/userId"];
						const res = await service.saveInfo(params);
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando Centro")});
						}else
						if (res && res.data) {
							this.info.id = res.data.id;					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
							this.$emit("receiveInfo", res.data);
						}
					}
				}
			}catch(error){
				console.warn("Error save sub center ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Creando Centro") 
				});
			}finally{
				this.loading = false;
			}
		},
		async update(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
					if (this.info && !this.info.name &&  !this.info.nit && !this.info.TypeCenterId) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre, NIT, Tipo de Centro"});
					}else{		
						const service = new CenterService();
						const infoUp = this.renderInputJson();
						infoUp.id = this.info.id;
						const res = await service.updateInfo({					
							...infoUp,	
						});
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Centro")});
						}else
						if (res && res.data) {					
							const idx = this.listToComponent.findIndex(x => x.id == infoUp.id );					
							if (idx >= 0) {
								this.listToComponent.splice(idx, 1, {
									...res.data,
									// ...infoUp.center,
									// Address : res.data.address
								});
							}
							this.$ManagerSmith.Sound.play("sound1")
							this.$emit("receiveInfo", res.data);
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
						}
					}
				}
			}catch(error){
				console.warn("Error update sub center", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando Centro")
				});
			}finally{
				this.loading = false;
			}
		},
		
		
	}, // methods

};
</script>