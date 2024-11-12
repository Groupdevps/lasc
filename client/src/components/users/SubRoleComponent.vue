<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference = "SubRoleForm"
		:inputField="info"
		:ReduceSize="110"

	>
		<template v-slot:field-permissions="{ itemField }">
			<v-divider></v-divider>
			<Permissions :inputField="info" keyField="permissions" :currentHeight="400" :isActive = "isPermissionActive" :currentPermission="currentPermission"></Permissions>
		</template>
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
				@click  = "info.id ? update() : save()"
			>
				{{ info.id ? $t('update') : $t('save') }}
			</v-btn>

				
			<v-spacer></v-spacer>
		</template>
		
		
	</FormSessionLayout>	
</template>
<script type="text/javascript">
 // 

import fields_params from "@/components/users/js/roles_params.js"
import RoleService from "@/services/RoleService.js"

import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import Permissions from "@/components/users/PermissionsComponent.vue"


export default {
	name : "SubRoleComponent",
	components : {
		FormSessionLayout, Permissions
	}, //components
	props : ["infoToComponent", "listToComponent", "currentPermission"],
	data : (vm) => ({		
		info 		: { permissions:[] },		
		fields 		: fields_params,		
		diagnoses  	: [],		
		reference 	: 'SubRole',		
		loading : false,
		isPermissionActive : false,
		
	}), // data
	watch:{
		infoToComponent:function(val){
			if (val) {
				this.renderInput(val)

			}else{
				this.info = {permissions:[]};
			}
		},


	},
	mounted(){
		this.renderInput(this.infoToComponent);
	},
	methods : {
		renderInput(item){			
			this.info = {permissions:[] ,...item};
			this.isPermissionActive = true;
		},
		
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
					if (this.info && !this.info.name) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre "});
					}else{
						const service = new RoleService();
						const res = await service.saveInfo(this.info);
						if (res && res.error) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Creando Perfil")});
						}else
						if (res && res.data) {
							this.info.id = res.data.id;	
							this.listToComponent.push(res.data);		
							this.isPermissionActive=false;		
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
							this.$emit("receiveInfo", res.data);
						}
					}
				}
			}catch(error){
				console.warn("Error save sub role ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Creando Perfil")
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
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre "});
					}else{
						const service = new RoleService();				
						const res = await service.updateInfo(this.info);						
						if (res && res.error) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Perfil")});
						}else
						if (res && res.data) {					
							const idx = this.listToComponent.findIndex(x => x.id == this.info.id );					
							if (idx >= 0) {
								this.listToComponent.splice(idx, 1, {
									...this.info,						
								});
							}
							this.isPermissionActive=false;							
							this.$ManagerSmith.Sound.play("sound1")
							this.$emit("receiveInfo", res.data);
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
						}
					}
				}
			}catch(error){
				console.warn("Error update sub role", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando Perfil")
				});
			}finally{
				this.loading = false;
			}
		},
		
		
	}, // methods

};
</script>