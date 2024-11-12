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
	        	<v-text-field
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
            	</v-btn>
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
		       	<v-btn color="error" class="ml-1" dark  @click="openPdf()">
              		<v-icon small class="mr-1">mdi-download</v-icon>
              		PDF 
            	</v-btn>
		          
		    </v-toolbar>
            <SubEntryComponent v-show="isForm" @CloseForm="closeForm()" :infoEdit="infoItem" :listToComponent="list" :currentPermission="currentPermission"></SubEntryComponent>
      	</template>      
      	<template v-slot:item.type="{item}">
      		<v-btn x-small :color="item.type =='input'? 'success': 'error'"> {{ item.type =='input'? "ENTRADA" : "SALIDA" }} </v-btn>
      	</template>
      	
      	<template v-slot:item.date="{item}">
      		{{ $ManagerSmith.getDateCurrentHour(item.createdAt) }}
      	</template>
      	<template v-slot:item.actions="{item}">
      		<v-btn-toggle mandatory>
      			<v-btn x-small color="error" @click="openPdfDispatch(item)" v-if="item && item.DispatchId"><v-icon small>mdi-download</v-icon> PDF</v-btn>
      			<!-- <v-btn x-small color="primary" @click="confirmEdit(item)"><v-icon small>mdi-pencil</v-icon></v-btn> -->
      			<!-- <v-btn x-small color="error" @click="confirmDelete(item)"><v-icon small>mdi-delete</v-icon></v-btn> -->
      		</v-btn-toggle>
      	</template>
    </v-data-table>
</template>

<script type 	= "text/javascript">
	
	
import InventoryService from "@/services/InventoryService.js"
import DispatchService from "@/services/DispatchService.js"
import SubEntryComponent from "@/components/pharmacy/SubEntryComponent.vue"
export default {
	name 		: "InventoryComponent",
	props :["currentHeight"],
	components 	: { SubEntryComponent },
	data 	: (vm) => ({
		loading : false,
		infoItem:null,
		list : [],
		search : "",
		isForm : false,
		total : 0,
		options : { itemsPerPage:30},
		headers 		: [
			{ text : "TIPO" , value: "type"}, // input | output
			{ text : "FECHA", value  : "date" },
			{ text : "TIPO PRODUCTO", value   : "Product.ProductType.name" },						
			{ text : "PRODUCTO", value   : "Product.name" },
			{ text : "DESCRIPCION", value   : "Product.description" },			
			{ text : "CANTIDAD", value 	: "cant" },
			{ text : "ACCIONES", value 	: "actions" },

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
				return this.search ? this.list.filter(x => x && x.Product && x.Product.name && x.Product.name.toLowerCase().includes(this.search.toLowerCase())) : this.list;
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("InventoryComponent") 
			}
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
					ID : "ProdutcsComponent", 
				})
			},
			async getList(){
				try{
					// const { page, itemsPerPage }  = this.options;					
					this.loading = true;
					const service = new InventoryService();
					const res = await service.findInfo();//{  page, itemsPerPage , name : this.search}
					if (res && res.data && res.data.length > 0) {
						this.list = res.data;
						// this.total = res.data.totalItems;
					}

				}catch(error){
					console.warn("Error get entrada ", error)
				}finally{
					this.loading = false;
				}
			},
			async deleteItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {
						const service = new InventoryService();
						const res = await service.deleteInfo(this.infoItem);
						if (res && res.error) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Eliminando Producto")});
						}else
						if (res && res.data) {
							const idx = this.list.findIndex(x => x.id == this.infoItem.id)
							if (idx >= 0) {
								this.list.splice(idx, 1);
								this.$EventBus.$emit("notifications",{
									type : "success",
									msg : "Entrada Eliminada"
								})
							}
						}
					}
				}catch(error){
					console.warn("Error delete ITem ", error)
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg :  this.$Helper.renderErrorMessage(error, "Eliminando Entrada")
					})
				}finally{
					this.loading = false;
				}
			},
			openPdf(){
				try{
					this.loading = true;				
					const service = new InventoryService();
					this.$Helper.openLink(service.linkPdf()); // this.$route.params.id
				}catch(error){
					console.warn("Error open pdf ", error )
				}finally{
					this.loading=false;
				}
			},
			openPdfDispatch(item){
				try{
					this.loading = true;				
					const service = new DispatchService();
					this.$Helper.openLink(service.linkPdf({id : item.DispatchId })); // this.$route.params.id
				}catch(error){
					console.warn("Error open pdf ", error )
				}finally{
					this.loading=false;
				}
			},
		},// methods
}; // export default	
</script>