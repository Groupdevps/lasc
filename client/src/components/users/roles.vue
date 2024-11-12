<template>
	<div>
		<v-data-table
			dense
		    fixed-header
		    :headers 			 = "headers"
		 	:items 	 			 = "listRender"
		    class 	 			 = "elevation-5"			    	   
		   	:options.sync 		 = "options"
		   	:server-items-length = "total"	   	
		   	loading-text 		= "CARGANDO... POR FAVOR ESPERE"
		    :height 			= "currentHeight + 'px'"
		    item-key 			= "index"
		    :loading 			= "loading"
		    :footer-props 		 = "{
		   		showFirstLastPage   : true,
		   		itemsPerPageOptions : [100],
		   		showCurrentPage     : true
		   	}"
		>
			<template v-slot:top>
				<v-container fluid>			
					<v-btn color="primary" @click="openModal(null)">Agregar</v-btn>			
					<v-dialog fullscreen hide-overlay v-model = "isModal" persistent>
						 <!-- transition="dialog-bottom-transition" -->
						<v-card>
							<v-card-title class="primary subtitle-2 pa-0 white--text">
								<v-btn tile class="warning" @click="closeModal(false)" v-show="currentPermission.canAdd"><v-icon color="white" small>mdi-chevron-left</v-icon> {{ $t('go_back') }} </v-btn>
								<v-spacer></v-spacer>
								<v-icon  class="mr-2" color="white">mdi-account</v-icon>
								<strong class="text-h6 font-weight-bold">{{infoItem? "EDITAR" : "AGREGAR" }}</strong>
								<v-spacer></v-spacer>
							</v-card-title>
							<v-card-text class="pa-0">							
								<SubRole :infoToComponent="infoItem" @receiveInfo="closeModal(false)" :listToComponent="list" :currentPermission="currentPermission"></SubRole>
							</v-card-text>
						</v-card>
					</v-dialog>
				</v-container>
			</template>
			<template v-slot:item.actions="{item}">
				<v-btn-toggle mandatory>
					<v-btn color="primary" x-small @click="openModal(item)"> <v-icon color="white" x-small v-show="currentPermission.canEdit" >mdi-pencil</v-icon></v-btn>
					<!-- <v-btn color="error" x-small @click="confirmDelete(item)"> <v-icon x-small v-show="currentPermission.canDelete">mdi-delete</v-icon></v-btn> -->
				</v-btn-toggle>
			</template>
		</v-data-table>
	</div>
</template>
<script type="text/javascript">
 // (nombre, nit, codigo,direccion, ciudad, departamento, firma de representante, correoelectronico, resolucion de facturacion, numero de facturacioninicial, facturacion final, logo)

import fields_params from "@/components/management/js/management_params.js"
import RoleService from "@/services/RoleService.js"

import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import SubRole from "@/components/users/SubRoleComponent.vue"

export default {
	name : "RolesComponent",
	components : {
		FormSessionLayout, SubRole
	}, //components
	data : (vm) => ({		
		headers : [
			{}
		],
		infoItem 		 	: null,		
		fields 		: fields_params,		
		diagnoses  	: [],		
		reference 	: 'LaboratoryOrder',		
		loading : false,
		headers : [
			{ text : "NOMBRE", value : "name"},									
			{ text : "ACCIONES", value : "actions"},
		],
		options : { itemsPerPage : vm.total || 100 },
		total : 0,
		list : [],
		isModal : false,
		
	}), // data
	mounted(){
		this.getInfo();
	}, // created

	computed : {
		currentHeight(){
			return this.$vuetify.breakpoint.height - 230;
		},
		listRender(){
			this.total = this.list.length;
			return this.list;
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("RolesComponent") 
		}
	}, // computed

	methods : {
		
		openModal(item){
			this.infoItem = item ? {...item} : null;
			this.isModal = true;
		},
		closeModal(item){
			this.isModal=false;		
			this.infoItem = null;	
		},
		confirmDelete(item){
			this.infoItem = { ...item };			
			this.$EventBus.$emit("notifications",{
				type : "confirm_delete",
				action : this.deleteItem,
				ID : "CenterComponent",
			});
		},
		async getInfo(){
			try {
				this.loading = true;
				const service = new RoleService();
				const res = await service.getInfo();				
				if (res && res.data && res.data.length > 0) {
					this.list = res.data;	
				}
			} catch (error) {
				console.warn("Error get info  role ", error)
			}finally{
				this.loading = false;
			}
		},
		
		
		async deleteItem(){
			try {
				this.loading = true;				
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {	
					const service = new RoleService();
					const res = await service.deleteInfo({ id : this.infoItem.id });
					if (res && res.error) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Eliminando Perfil")});
					}else
					if (res && res.data) {
						const idx = this.list.findIndex(x=> x.id == this.infoItem.id);
						if (idx >= 0) {
							this.list.splice(idx, 1);
							this.$EventBus.$emit("notifications", {
								type 	: "deleted",
								msg : "Centro"
							});
						}
					}
				}
			}catch(error){
				console.warn("Error udpate role ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Eliminando Perfil")
				});
			}finally{
				this.loading = false;
			}
		},
		
		
	}, // methods

};
</script>