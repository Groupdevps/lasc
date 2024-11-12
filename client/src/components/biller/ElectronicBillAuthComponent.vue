<template>
	<v-data-table
		dense
		fixed-header
		:height = "(currentHeight-200)+'px'"
      	:headers="headers"
      	:items="renderList"
      	:loading = "loading"
      	item-key="id"
      	class="elevation-1"
      	:options.sync 		 = "options"
	   	:server-items-length = "total"
		:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [30],
	   		showCurrentPage     : true
	   	}"
      	
    >
      	<!-- :search="search" -->
      	<template v-slot:top>
      		<v-toolbar
		        flat
		    >
	        	<!-- <v-text-field
	        		dense
	        		outlined
		          	v-model="search"
		          	label="BUSCAR"
		          	class="mx-4 mt-5"
		          	@input="v => search = v.toUpperCase()"
		          	@keyup.enter="getList"
	        	></v-text-field>
	        	<v-btn color="primary" dark  @click="getList" >              		
              		Buscar 
            	</v-btn> -->
	        	<v-divider
		          	class="mx-4"
		          	inset
		          	vertical
		        ></v-divider>
		        <v-spacer></v-spacer>
            	<v-btn :color="!isForm? 'primary': 'warning'" dark  @click="isForm = !isForm" v-show="currentPermission.canAdd">
              		<v-icon small class="mr-1"> {{!isForm ? 'mdi-plus-box' : 'mdi-close-box'}}</v-icon>
              		{{ !isForm ? 'Agregar' : 'Cerrar' }} 
            	</v-btn>
		       	<!-- <v-btn color="error" class="ml-1" dark  @click="openPdf()">
              		<v-icon small class="mr-1">mdi-download</v-icon>
              		PDF 
            	</v-btn> -->
		          
		    </v-toolbar>
            <SubElectronicBillAuthComponent 
            	v-show="isForm" @CloseForm="closeForm()" 
            	:infoEdit="infoItem" 
            	:listToComponent="list" 
            	:currentPermission="currentPermission"
            	:infoCenter="infoToComponent"
            ></SubElectronicBillAuthComponent>
      	</template>      
      
      	
      	<template v-slot:item.date="{item}">
      		{{ $ManagerSmith.getDateCurrentHour(item.createdAt) }}
      	</template>
      	<template v-slot:item.active="{item}">

      		<v-btn-toggle mandatory>
      			<v-btn x-small :color="item.active? 'success': 'secondary'">{{item.active?'Activo':'Desactivado'}}</v-btn>
      			<!-- <v-btn x-small color="error" @click="openPdfDispatch(item)" v-if="item && item.DispatchId"><v-icon small>mdi-download</v-icon> PDF</v-btn> -->
      			<!-- <v-btn x-small color="primary" @click="confirmEdit(item)"><v-icon small>mdi-pencil</v-icon></v-btn> -->
      			<!-- <v-btn x-small color="error" @click="confirmDelete(item)"><v-icon small>mdi-delete</v-icon></v-btn> -->
      			<!-- <v-btn x-small :color="item.active? 'error': 'secondary'" @click="confirmDeactive(item)"><v-icon small>mdi-cancel</v-icon></v-btn> -->

      		</v-btn-toggle>
      	</template>
    </v-data-table>
</template>

<script type 	= "text/javascript">	
import ElectronicBillAuthService from "@/services/ElectronicBillAuthService.js"
import SubElectronicBillAuthComponent from "@/components/biller/SubElectronicBillAuthComponent.vue"
export default {
	name 		: "ElectronicBillAuthComponent",
	props :["currentHeight", "infoToComponent", "currentPermission"], 
	components 	: { SubElectronicBillAuthComponent },
	data 	: (vm) => ({
		loading : false,
		infoItem:null,
		list : [],
		search : "",
		isForm : false,
		total : 0,
		options : { itemsPerPage:30},
		headers 		: [
			{ text : "NUMERO DE AUTORIZACION" , value: "authorizationNumber"}, // input | output
			{ text : "FECHA", value  : "authorizationDate" },
			{ text : "DESDE", value   : "from" },						
			{ text : "A", value   : "to" },
			{ text : "PREFIJO", value   : "prefix" },			
			{ text : "N. INICIO FACTURA ", value 	: "initialInvoiceNumber" },
			{ text : "ACTIVO", value 	: "active" },

			// { text : "ACCIONES", value 	: "actions" },

			// { text : "CODIGO", value  : "Product.code" },			
			// { text : "STOCK", value : "Product.stock" },
			// { text : "VALOR", value : "Product.productvalue" },
			// { text : "total_quantity_per_product", value : "totalQuantityPerProduct" },
			// { text : "unitValue", value 	: "unitValue" },
			// { text : "vat", value 	: "vat" },
			// { text : "laboratory", value 	: "laboratory" },
			// { text : "expirationDate", value 	: "expirationDate" },
			// { text : "lcte", value 	: "lcte" },			
			// { text : "total", value : "total" },
		],
		fields 			: [],

	}), // data
		watch:{
			options: {
				handler(){
					this.getList();
				}, deep : true				
			}
		},
		mounted(){
			// this.getList();
		},
		computed:{	
			renderList(){
				this.total = this.list.length;
				return this.list.filter(x => x && this.infoToComponent && x.CenterId == this.infoToComponent.id );
				// this.search ? this.list.filter(x => x && x.Product && x.Product.name && x.Product.name.toLowerCase().includes(this.search.toLowerCase())) :
			},
			// currentPermission(){
			// 	return this.$store.getters["auth/getPermission"]("InventoryComponent") 
			// }
		},
		methods:{
			closeForm(){
				this.isForm = false;
			},
			confirmEdit(item){
				this.infoItem = {...item}
				this.isForm = true;
			},
			confirmDelete(item){
				this.infoItem = {...item}
				this.$EventBus.$emit("notifications",{
					type :  "confirm_delete",
					action : this.deleteItem,
					ID : "ElectronicBillAuthComponent", 
				})
			},
			confirmDeactive(item){
				this.infoItem = {...item}
				this.$EventBus.$emit("notifications",{
					type :  "confirm_action",
					action : this.deactiveItem,
					ID : "ElectronicBillAuthComponentDeactive", 
				})
			},
			async getList(){
				try{
					// const { page, itemsPerPage }  = this.options;					
					this.loading = true;
					const service = new ElectronicBillAuthService();
					const res = await service.findInfo();//{  page, itemsPerPage , name : this.search}
					if (res && res.data && res.data.length > 0) {
						this.list = res.data;
						// this.total = res.data.totalItems;
					}

				}catch(error){
					console.warn("Error get Electronic Bill  ", error)
				}finally{
					this.loading = false;
				}
			},
			async deleteItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {
						const service = new ElectronicBillAuthService();
						const res = await service.deleteInfo(this.infoItem);
						if (res && res.error) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Eliminando Autorizacion")});
						}else
						if (res && res.data) {
							const idx = this.list.findIndex(x => x.id == this.infoItem.id)
							if (idx >= 0) {
								this.list.splice(idx, 1);
								this.$EventBus.$emit("notifications",{
									type : "success",
									msg : "Autorizacion Eliminada"
								})
							}
						}
					}
				}catch(error){
					console.warn("Error delete ITem ", error)
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg :  this.$Helper.renderErrorMessage(error, "Eliminando Autorizacion")
					})
				}finally{
					this.loading = false;
				}
			},
			async deactiveItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
						const service = new ElectronicBillAuthService();
						const res = await service.deactiveInfo(this.infoItem);
						if (res && res.error) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Desactivando Autorizacion")});
						}else
						if (res && res.data) {
							const idx = this.list.findIndex(x => x.id == this.infoItem.id)
							if (idx >= 0) {
								this.list.splice(idx, 1, this.infoItem);
								this.$EventBus.$emit("notifications",{
									type : "success",
									msg : "Autorizacion Desactivada"
								})
							}
						}
					}
				}catch(error){
					console.warn("Error delete ITem ", error)
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg :  this.$Helper.renderErrorMessage(error, "Eliminando Autorizacion")
					})
				}finally{
					this.loading = false;
				}
			},
			openPdf(){
				try{
					this.loading = true;				
					const service = new ElectronicBillAuthService();
					this.$Helper.openLink(service.linkPdf()); // this.$route.params.id
				}catch(error){
					console.warn("Error open pdf ", error )
				}finally{
					this.loading=false;
				}
			},
			// openPdfDispatch(item){
			// 	try{
			// 		this.loading = true;				
			// 		const service = new DispatchService();
			// 		this.$Helper.openLink(service.linkPdf({id : item.DispatchId })); // this.$route.params.id
			// 	}catch(error){
			// 		console.warn("Error open pdf ", error )
			// 	}finally{
			// 		this.loading=false;
			// 	}
			// },
		},// methods
}; // export default	
</script>