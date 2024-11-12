<template>

	<v-data-table
		dense
	    :headers 			 = "headers"
	 	:items 	 			 = "listRender"
	    class 	 			 = "elevation-5"			    	   
	   	:options.sync 		 = "options"
	   	:server-items-length = "total"
	   	:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [15, 30],
	   		showCurrentPage     : true
	   	}"
	   	loading-text 		= "CARGANDO... POR FAVOR ESPERE"
	    :height 			= "currentHeight + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	    fixed-header
	>
		<template v-slot:top>
			<v-container fluid>			
				<!-- <v-btn color="primary" @click="openModal(false)">Agregar Centro</v-btn>			 -->
				<v-dialog width="500" v-model = "isModal" persistent>
					<v-card>
						<v-card-title class="primary subtitle-2 pa-1 white--text">
							<v-icon small class="mr-2" color="white">mdi-hospital-building</v-icon>
							<span>{{infoItem? "EDITAR" : "AGREGAR" }}</span>
							<v-spacer></v-spacer>
							<v-btn small icon class="error" @click="closeModal(false)"><v-icon color="white" small>mdi-close</v-icon></v-btn>
						</v-card-title>
						<v-card-text class="pa-0">							
							<SubCenter :infoToComponent="infoItem" @receiveInfo="closeModal(false)" :listToComponent="list" :currentPermission="currentPermission"></SubCenter>
						</v-card-text>
					</v-card>
				</v-dialog>
				<v-dialog width="1000" v-model = "isModalAuth" persistent>
					<v-card outlined>
						<v-card-title class="primary subtitle-2 pa-1 white--text">
							<v-icon class="mr-2" color="white">mdi-receipt</v-icon>
							<span>{{infoItemAuth? "EDITAR" : "AGREGAR" }}</span>
							<v-spacer></v-spacer>
							<v-btn small icon class="error" @click="closeModalAuth(false)"><v-icon color="white" small>mdi-close</v-icon></v-btn>
						</v-card-title>
						<v-card-text class="pa-0">							
							<ElectronicBillAuth :infoToComponent="infoItemAuth" :currentPermission="currentPermission"></ElectronicBillAuth>
						</v-card-text>
					</v-card>
				</v-dialog>
			</v-container>
		</template>
		<template v-slot:item.actions="{item}">
			<v-btn-toggle mandatory>
				<v-btn color="primary" x-small @click="openModal(item)"> <v-icon color="white" small>mdi-pencil</v-icon></v-btn>
				<v-btn color="success" x-small @click="openModalAuth(item)"> <v-icon color="white" small>mdi-cog-box</v-icon></v-btn>

				<!-- <v-btn color="error" x-small @click="confirmDelete(item)"> <v-icon x-small>mdi-delete</v-icon></v-btn> -->
			</v-btn-toggle>
		</template>
	</v-data-table>

</template>
<script type="text/javascript">
 // (nombre, nit, codigo,direccion, ciudad, departamento, firma de representante, correoelectronico, resolucion de facturacion, numero de facturacioninicial, facturacion final, logo)

// import fields_params from "@/components/management/js/management_params.js"
import CenterService from "@/services/CenterService.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import SubCenter from "@/components/management/SubCenterComponent.vue"
import ElectronicBillAuth from "@/components/biller/ElectronicBillAuthComponent.vue"
export default {
	name : "CentersComponent",
	components : {
		FormSessionLayout, SubCenter, ElectronicBillAuth
	}, //components
	data : (vm) => ({		
		headers : [
			{}
		],
		infoItem 		 	: null,		
		infoItemAuth : null,		
		diagnoses  	: [],		
		reference 	: 'LaboratoryOrder',		
		loading : false,
		headers : [
			{ text : "NOMBRE", value : "name"},
			{ text : "NIT", value : "nit"},
			{ text : "TIPO DE CENTRO", value : "TypeCenter.name"},			
			{ text : "CORREO", value : "email"},
			{ text : "DIRECCION", value : "Address.address"},
			{ text : "CIUDAD", value : "Address.City.name"},
			{ text : "DEPARTAMENTO", value : "Address.State.name"},
			{ text : "REPRESENTANTE LEGAL", value : "digitalSignature.name"},
			{ text : "ACCIONES", value : "actions"},
		],
		options : { itemsPerPage : 100 },
		total : 0,
		list : [],
		isModal : false,
		isModalAuth:false,

		
	}), // data
	mounted(){
		this.getInfo();
	}, // created

	computed : {
		currentHeight(){
			return this.$vuetify.breakpoint.height - 95;
		},
		listRender(){
			this.total = this.list.length;
			return this.list;
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("CentersComponent") 
		}
	}, // computed

	methods : {
		
		openModal(item=null){
			this.infoItem = item?{...item}:null;
			this.isModal = true;
		},
		openModalAuth(item=null){
			this.infoItemAuth = item?{...item}:null;
			this.isModalAuth = true;
		},
		closeModal(item){
			this.isModal=false;			
		},
		closeModalAuth(item){
			this.isModalAuth=false;
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
				const service = new CenterService();
				const res = await service.getInfo();				
				if (res && res.data && res.data.length > 0) {
					this.list = res.data.map(x =>{
						x.name = x.name.toUpperCase();
						x.nit = x.nit.toUpperCase();
						x.email = x.email.toUpperCase();						
						return x
					} );					
				}
			} catch (error) {
				console.warn("Error get info  centers ", error)
			}finally{
				this.loading = false;
			}
		},
		
		
		async deleteItem(){
			try {
				this.loading = true;	
				if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {				
					const service = new CenterService();
					const res = await service.deleteInfo({ id : this.infoItem.id });
					if (res && res.error) {
					    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Eliminando Centro")});
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
				console.warn("Error udpate emergency medical ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Eliminando Centro")
				});
			}finally{
				this.loading = false;
			}
		},
		
		
	}, // methods

};
</script>