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
					<MenuOsteosynthesisMaterial 
						:inputField="searchInput"
						keyField="material"
						:isReturnObject="true"
					></MenuOsteosynthesisMaterial>						
				</v-col>
				<template v-for="item in fields ">
					<v-col>
						
						<v-text-field outlined dense v-if="item.type =='text'" class="text-uppercase" v-model="info[item.key]" :label="$t(item.text)" @input="v=>info[item.key]=v.toUpperCase()"></v-text-field>
						<v-text-field outlined dense v-else-if="item.type =='number'" type="number"  class="text-uppercase"v-model.number="info[item.key]" :label="$t(item.text)"></v-text-field>
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
					<v-btn color="primary" :loading="loading" @click="(info.id || info.idx)?updateItem():saveItem()">{{(info.id || info.idx)?"Editar":"Agregar"}}</v-btn>
				</v-col>
			</v-row>
			
		</template>	
		<template v-slot:item.actions="{ item }">
			<v-btn-toggle mandatory>
				<v-btn x-small color="primary" @click="confirmEdit(item)" v-show="currentPermission.canEdit"> <v-icon x-small>mdi-pencil</v-icon></v-btn>
				<v-btn x-small color="error" @click="confirmDelete(item)" v-show="currentPermission.canDelete"><v-icon x-small>mdi-delete</v-icon></v-btn>
			</v-btn-toggle>
		</template>
	</v-data-table>
</template>
<script type="text/javascript">
	import CategoryComponent from "@/components/info/SearcherCategoryComponent.vue"
	// import RequestSuppliesService from "@/services/RequestSuppliesService.js"
	import dates 			from "@/helpers/dates.vue"
	import MenuOsteosynthesisMaterial from "@/components/surgery/MenuOsteosynthesisMaterialComponent.vue"
	import OrderMaterialService from "@/services/OrderMaterialService.js"

	export default{
		name : "SubOstheosynthesisMaterialComponent",
		components: {CategoryComponent, dates, MenuOsteosynthesisMaterial},
		props : ["inputField", "keyField", "currentPermission"],
		data : ()=>({				
			reference : "SubRequestSupplies",			
			searchInput : { material : {}, category : {}},
			headers : [
				{ text : "MATERIAL", value : "Material.name" }, // Order
				{ text : "DESCRIPCION", value : "Material.description" },			
				{ text : "CANTIDAD", value : "cant" },					
				{ text : "NOTA", value : "note" },					
				{ text : "", value : "actions" },
			],
			info : {},			
			loading : false, 
			fields :[
				/*{
					key 	 		: "date", // Order
					key_main 		: "Orders",
	 				type 	 		: "date_range",
					text 	 		: "date",
					cols 			: 2,
					placeholder 	: "date",		
					isDisabled : true,		

				},*/
				
				{
					key 	 		: "cant",
					key_main 		: "Orders",
	 				type 	 		: "number",
					text 	 		: "amount",
					btn_add 		: true,
					placeholder 	: "laboratorios",
					action 			: "add_table",
					cols 			: 2,
				},
				{
					key 	 		: "note", 					
	 				type 	 		: "text",
					text 	 		: "note",
					cols 			: 3,					

				},

			]
		}),// data
		watch:{
			"searchInput.material"(val){
				this.renderCategory(val);
			}
		},
		created(){
			this.setDefault();
		},
		computed:{
			renderList(){
				return this.inputField[this.keyField] || [];
			}
		},
		methods:{
			setDefault(){
				this.info = {
					note : "",
					cant : undefined,					
					MaterialId : undefined,
					// ProductId : null,
					// product : null,					
					// date : this.$ManagerSmith.getDateCurrent(),
					// AttentionId : this.$route.params.id,
				}
				this.searchInput.material={};
			},
			renderCategory(item){			
				if(item){
					// this.info.ProductId =  item.id  || item.code || item.codeAtc || item.cups ;					
					// this.info.product = item.name || item.code || item.codeAtc || item.cups; item.description ;
					this.info.MaterialId=item.id;
					this.info.Material={ name : item.name, description : item.description};


					// this.info.order = item.description;
					// console.log("suppliue add ", item, this.info)
					// item = {};
				}
			},
			confirmEdit(item){				
				this.info = {...item};			
				this.searchInput.material={ id : item.MaterialId, name : item.Material?.name, description : item.Material?.description};
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
					// if (this.inputField[this.keyField]) {			
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {								
						if (!this.info.MaterialId || !this.info.cant) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Material y cantidad"});
						}else{
							this.info.UserId = this.$store.getters["auth/userId"];
							if (this.inputField.id) {
								const service = new OrderMaterialService();
								const res = await service.saveInfo(this.info);
								if (res) {
									if (res.error) {
										this.$EventBus.$emit("notifications", { type : "warning" , msg : this.Helper.renderErrorMessage(res.error, "Error creando Orden")});

									}else if (res.data) {
										this.info.OrderId = this.inputField.id;
										this.inputField[this.keyField].push({...this.info});
										this.$EventBus.$emit("notifications", {
											type: "success",
											msg : "Orden Agregada"
										});
										this.setDefault();
									}
								}
							}else{

								this.inputField[this.keyField].push({...this.info, idx: new Date().getTime()});
								this.$EventBus.$emit("notifications", {
									type: "success",
									msg : "Orden Agregada"
								});
								this.setDefault();
							}
						// }
						}
					}
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
						if (!this.info.MaterialId || !this.info.cant) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Material y cantidad"});
						}else{
							if (this.inputField[this.keyField]) {	
								if (this.info.id && this.inputField.id) {
									const service = new OrderMaterialService();
									const res = await service.updateInfo(this.info);
									if (res) {
										if (res.error) {
											this.$EventBus.$emit("notifications", { type : "warning" , msg : this.Helper.renderErrorMessage(res.error, "Error Actualizando Orden")});
										}else if (res.data) {
											const idx = this.inputField[this.keyField].findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
											if (idx >= 0) {
												this.inputField[this.keyField].splice(idx, 1, {...this.info});
												this.$EventBus.$emit("notifications", {
													type: "success",
													msg : "Orden Editada"
												});
												this.setDefault();
											}	
										}
									}
								}else{									
									const idx = this.inputField[this.keyField].findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
									if (idx >= 0) {
										this.inputField[this.keyField].splice(idx, 1, {...this.info});
										this.$EventBus.$emit("notifications", {
											type: "success",
											msg : "Orden Editada"
										});
										this.setDefault();
									}		
								}
							}
						}
					}

				}catch(error){
					console.warn("Error add order ", error)
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error Editando Orden"
					});
				}finally{
					this.loading = false;
				}
			},
			async deleteItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {		
						if (this.inputField[this.keyField] && this.inputField[this.keyField].length > 0) {					
							if (this.info && this.info.id ) {
								const service = new LaboratorySupplieservice();
								const res = await service.deleteInfo(this.info)
							}
							
							const idx = this.inputField[this.keyField].findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
							if (idx >= 0) {
								this.inputField[this.keyField].splice(idx, 1);
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
						msg : "Error eliminando Orden"
					});
				}finally{
					this.loading = false;
				}
			}
		}, // methods

	};
</script>