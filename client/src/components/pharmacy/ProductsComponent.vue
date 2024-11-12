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
		          	label="BUSCAR PRODUCTO"
		          	class="mx-4 mt-7"
		          	@keyup.enter="getList"
		          	@input=" v => {search = v.toUpperCase() } "
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
		       
            	<v-btn :color="!isForm? 'primary': 'warning'" dark  @click="isForm = !isForm"  v-show="currentPermission.canAdd">
              		<v-icon small class="mr-1"> {{!isForm ? 'mdi-plus-box' : 'mdi-close-box'}}</v-icon>
              		{{ !isForm ? 'Agregar' : 'Cerrar' }} 
            	</v-btn>
		          
		    </v-toolbar>
            <SubProductsComponent v-show="isForm" @CloseForm="closeForm()" :infoEdit="infoItem" :listToComponent="list" :currentPermission="currentPermission"></SubProductsComponent>
      	</template>      
      	<template v-slot:item.actions="{item}">
      		<v-btn-toggle mandatory>
      			<v-btn x-small color="primary" @click="confirmEdit(item)"><v-icon small>mdi-pencil</v-icon></v-btn>
      			<!-- <v-btn x-small color="error" @click="confirmDelete(item)"><v-icon small>mdi-delete</v-icon></v-btn> -->
      		</v-btn-toggle>
      	</template>
    </v-data-table>
</template>
<script type="text/javascript">
	import SubProductsComponent from "@/components/pharmacy/SubProductsComponent.vue"
	import ProductsService from "@/services/ProductsService.js"
	export default{
		name : "ProdutcsComponent",
		props :["currentHeight"],
		components : { SubProductsComponent },
		data : ()=>({	
			loading : false,
			infoItem:null,
			list : [],
			search : "",
			isForm : false,
			total : 0,
			options : { itemsPerPage:30},
			headers:[
				{ text : "CODIGO", value : "code" },
				{ text : "TIPO", value : "ProductType.name" },
				{ text : "NOMBRE", value : "name" },
				{ text : "DESCRIPCION", value : "description" },
				{ text : "UNIDADES", value : "units" },
				{ text : "CANTIDAD DISPONIBLE", value : "stock" },
				{ text : "ATC", value : "atc" },
				{ text : "CUM", value : "cum" },
				{ text : "INVIMA", value : "invima" },
				{ text : "VALOR UNITARIO", value : "unitValue" },
				{ text : "VALOR DE PRODUCTO", value : "productValue" },
				{ text : "REGISTRADO POR", value : "User.name" },				
				{ text : "ACCIONES", value : "actions" },
			]
		}),
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
				const filterList = this.list.filter(x => x && x.name && x.name.toLowerCase().includes(this.search.toLowerCase()))
				return  filterList ;
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("ProdutcsComponent") 
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
					const { page, itemsPerPage }  = this.options;					
					this.loading = true;
					const service = new ProductsService();
					const res = await service.findInfo({  page, itemsPerPage , name : this.search});					
					if (res && res.data && res.data.rows && res.data.rows.length > 0) {
						this.list = res.data.rows;
						this.total = res.data.totalItems;
					}else{
						this.list = [];
						this.total = res.data.totalItems;						
					}

				}catch(error){
					console.warn("Error get products ", error)
				}finally{
					this.loading = false;
				}
			},
			async deleteItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {	
						const service = new ProductsService();
						const res = await service.findInfo();
						if (res && res.error) {
						    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Eliminando Producto")});
						}else
						if (res && res.data) {
							const idx = this.list.findIndex(x => x.id == this.infoItem.id)
							if (idx >= 0) {
								this.list.splice(idx, 1);
								this.$EventBus.$emit("notifications",{
									type : "success",
									msg : "Producto Eliminado"
								})
							}
						}
					}
				}catch(error){
					console.warn("Erro delete ITem ", error)
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg : this.$Helper.renderErrorMessage(error, "Eliminando Producto")
					})
				}finally{
					this.loading = false;
				}
			}
		},
	}
</script>