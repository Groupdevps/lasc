<template>
	<v-data-table
		dense
	    fixed-header
		:headers 			 = "headers"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-5 ma-2"			 			   
	   	:footer-props 		 = "{
	   		showFirstLastPage   : false,	   		
	   		itemsPerPageOptions : [100],
	   		showCurrentPage     : false
	   	}"
	   	:loading-text 		= "$t('LoadingPeaseWait')"
	    :height             = "200"			   
	    :loading 			= "loading" 
	>
		<template v-slot:top>
			<v-row dense>
				<v-col cols="3">
					<!-- Medicine -->
					<v-select
						dense
						outlined						
						return-object
						clearable
						v-model= "info.Request" 
						label="SOLICITADO"
						:items="renderListRequest"
						:item-text="keyRequest"
						item-value="id"
					>
        				<template v-slot:item="{item}">

							<v-list-item-content>
				                <v-list-item-title v-html="`${ item?.MedicationList?.description  || item?.Product?.name || ''}`"></v-list-item-title>
				                <v-list-item-subtitle v-html="item?.MedicationList?.pharmaceuticalForm || item?.Product?.description || ''"></v-list-item-subtitle>
				                <v-list-item-subtitle v-html="`Cantidad: ${item.pendingCant || item.amount || item.cant} `"></v-list-item-subtitle>
	                		</v-list-item-content>
	                	</template>
					</v-select>
				</v-col>
				<v-col cols="2">
					<MenuProductInventory :inputField="info" keyField="Product" :isReturnObject="true"></MenuProductInventory>	
				</v-col>
				<template v-for="item in fields">
					<v-col :cols="item.cols || 'auto'">
						
						<v-text-field outlined dense v-if="item.type =='text'" v-model="info[item.key]" :label="$t(item.text)" class="text-uppercase"
							@input 		 	= "(v) => {info[item.key] = v.toUpperCase()}"							
						></v-text-field>
						<v-text-field outlined dense v-else-if="item.type =='number'" type="number" v-model.number="info[item.key]" :label="$t(item.text)" class="text-uppercase"							
						></v-text-field>
										

						<dates
							:key 				= "item.key + reference"
							v-else-if		    = "['date_range', 'time_picker'].includes(item.type)"
							:info_to_component  = "item"
							:info_to_dates 	    = "info[item.key]"
							@receive_info	    = "info[item.key] = $event"
							:ref_to_component   = "item.key + reference"
						></dates>
					</v-col>
				</template>
				<v-col>
					<v-btn color="primary" :loading="loading" v-show="(info.id || info.idx)?currentPermission.canEdit:currentPermission.canAdd" @click="(info.id || info.idx)?updateItem():saveItem()">{{(info.id || info.idx)?"Editar":"Agregar"}}</v-btn>
				</v-col>
			</v-row>
			
		</template>	
		<template v-slot:item.actions="{ item }">
			<v-btn-toggle mandatory>
				<!-- <v-btn x-small color="primary" @click="confirmEdit(item)"> <v-icon x-small>mdi-pencil</v-icon></v-btn> -->
				<v-btn x-small color="error" @click="confirmDelete(item)"><v-icon x-small>mdi-delete</v-icon></v-btn>
			</v-btn-toggle>
		</template>
	</v-data-table>
</template>
<script type="text/javascript">
	
	import LaboratoryOrderService from "@/services/LaboratoryOrderService.js"
	import dates 			from "@/helpers/dates.vue"
	import MenuProductInventory from "@/components/info/MenuProductInventoryComponent.vue"
	export default{
		name : "SubDispatchComponent",
		components: { dates , MenuProductInventory},
		props : ["infoInput", "TypeOrderD", "currentPermission", "keyRequest"],
		data : (vm)=>({				
			reference : "SubDispatch",			
			searchInput : { cup : {}, category : {}},
			headers : [				
				{ text : "PRODUCTO", value : "Product.name" }, // Order
				{ text : "CANTIDAD", value : "cant" },			
				{ text : "NOTA", value : "note" },					
				{ text : "", value : "actions" },
			],
			info : {},			
			loading : false, 
			fields :[
				{
					key 	 		: "cant", // Order
					key_main 		: "Orders",
	 				type 	 		: "number",
					text 	 		: "amount",
					cols 			: 2,
					placeholder 	: "date",		
					isDisabled : true,		

				},
				{
					key 	 		: "note", // Order
					key_main 		: "Orders",
	 				type 	 		: "text",
					text 	 		: "note",
					cols 			: 3,
					placeholder 	: "cups",				

				},
			]
		}),// data
		watch:{
			"info.Product"(val){
				if (val) {
					this.info.ProductId=val.id;
				}
			},
			"info.Request"(val){ //Medicine
				if (val) {
					// console.log("this.infoInput.Medicines.length > 0 " , this.infoInput.Medicines.length > 0, this.infoInput.OrderProduct.length > 0)
					if (this.infoInput.isMedicine) {
						this.info.MedicineId = parseInt(val.id);
						this.info.Medicine = val;
					}else{
						this.info.OrderProductId = val.id;
						this.info.OrderProduct = val;
					}
					this.info.amount = val.amount;
				}
			},
		},
		created(){
			this.setDefault();
		},
		computed:{
			renderList(){
				return this.infoInput.DispatchDetails || [];
			},
			renderListRequest(){
				return this.infoInput.listRequest || [] 
			}
		},
		methods:{
			setDefault(){
				this.info = {
					ProductId : null,
					MedicineId : null,
					OrderProductId : null,
					cant : "",
					note : "",
					// AttentionId : this.$route.params.id,
				}
			},
			renderCategory(item){			
				if(item){
					this.info.CupsList = { code : item.code || item.codeAtc || item.cups};
					this.info.CupsListId = item.id;
					this.info.cups = item.code || item.codeAtc || item.cups; item.description;
					this.info.order = item.description;
					item = {};
				}
			},
			confirmEdit(item){
				this.info = {...item};				
			},
			confirmDelete(item){
				this.info = {...item};
				this.$EventBus.$emit("notifications",{
					type : "confirm_delete",
					ID : this.reference,
					action : this.deleteItem,
				})
			},
			async saveItem(){
				try{
					this.loading = true;
					// if (this.infoInput.Orders) {		
					// this.info.AttentionId =   this.infoInput.AttentionId;	
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {	
						const {cant , Product , Request} = this.info;						
						if (cant && Product && Request) {												
							this.infoInput.DispatchDetails.push({...this.info, idx: new Date().getTime()});
							this.$EventBus.$emit("notifications", {
								type: "success",
								msg : "Orden Agregada"
							});
							this.setDefault();
						}else{
							const requireds = `${!cant? "Cantidad":""} | ${!Request?"Producto Solicitado":""} | ${!Product?"Producto a entregar":""}`
							this.$EventBus.$emit("notifications", { type : "warning", msg : "Requiere : "+requireds})
						}
					}								
					// }
				}catch(error){
					console.warn("Error add order ", error)
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error agregando la Orden"
					});
				}finally{
					this.loading = false;
				}
			},
			async updateItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {	
						if (this.infoInput.DispatchDetails) {										
							const idx = this.infoInput.DispatchDetails.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
							if (idx >= 0) {
								this.infoInput.DispatchDetails.splice(idx, 1, {...this.info});
								this.$EventBus.$emit("notifications", {
									type: "success",
									msg : "Orden Editada"
								});
								this.setDefault();
							}		
						}
					}
				}catch(error){
					console.warn("Error add order ", error)
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : this.$Helper.renderErrorMessage(error, "Error Editando Orden")
					});
				}finally{
					this.loading = false;
				}
			},
			async deleteItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {	
						if (this.infoInput.DispatchDetails && this.infoInput.DispatchDetails.length > 0) {					
							if (this.info && this.info.id ) {
								const service = new LaboratoryOrderService();
								const res = await service.deleteInfo(this.info)
							}							
							const idx = this.infoInput.DispatchDetails.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
							if (idx >= 0) {
								this.infoInput.DispatchDetails.splice(idx, 1);
								this.setDefault();
							}
							this.$EventBus.$emit("notifications", {
								type: "success",
								msg : "Orden eliminada"
							});						
						}
					}
				}catch(error){
					console.warn("Error delete order ", error);
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : this.$Helper.renderErrorMessage(error,"Error eliminando Orden")
					});
				}finally{
					this.loading = false;
				}
			}
		}, // methods

	};
</script>