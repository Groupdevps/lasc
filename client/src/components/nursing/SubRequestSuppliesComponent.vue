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
				<v-col cols="12">
					<CategoryComponent startCategory="SUMINISTROS" :inputField="searchInput" keyField="supply" :isDisabledCategory="true"></CategoryComponent>							
				</v-col>
				<template v-for="item in fields ">
					<v-col>
						
						<v-text-field outlined dense v-if="item.type =='text'" class="text-uppercase" v-model="info[item.key]" :label="$t(item.text)"></v-text-field>
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
	import RequestSuppliesService from "@/services/RequestSuppliesService.js"
	import dates 			from "@/helpers/dates.vue"

	export default{
		name : "SubLaboratoryComponent",
		components: {CategoryComponent, dates},
		props : ["infoInput", "currentPermission"],
		data : ()=>({				
			reference : "SubRequestSupplies",			
			searchInput : { supply : {}, category : {}},
			headers : [
				{ text : "FECHA", value : "date" }, // Order
				{ text : "PRODUCTO", value : "product" },			
				{ text : "CANTIDAD", value : "amount" },					
				{ text : "", value : "actions" },
			],
			info : {},			
			loading : false, 
			fields :[
				{
					key 	 		: "date", // Order
					key_main 		: "Orders",
	 				type 	 		: "date_range",
					text 	 		: "date",
					cols 			: 2,
					placeholder 	: "date",		
					isDisabled : true,		

				},
				{
					key 	 		: "product", // Order
					key_main 		: "Orders",
	 				type 	 		: "text",
					text 	 		: "product",
					cols 			: 2,
					placeholder 	: "cups",				

				},
				{
					key 	 		: "amount",
					key_main 		: "Orders",
	 				type 	 		: "number",
					text 	 		: "amount",
					btn_add 		: true,
					placeholder 	: "laboratorios",
					action 			: "add_table",
					// cols 			: ,

				}
			]
		}),// data
		watch:{
			"searchInput.supply"(val){
				this.renderCategory(val);
			}
		},
		created(){
			this.setDefault();
		},
		computed:{
			renderList(){
				return this.infoInput.Supplies || [];
			}
		},
		methods:{
			setDefault(){
				this.info = {
					ProductId : null,
					product : null,					
					date : this.$ManagerSmith.getDateCurrent(),
					// AttentionId : this.$route.params.id,
				}
			},
			renderCategory(item){			
				if(item){
					this.info.ProductId =  item.id  || item.code || item.codeAtc || item.cups ;					
					this.info.product = item.name || item.code || item.codeAtc || item.cups; item.description ;
					// this.info.order = item.description;
					// console.log("suppliue add ", item, this.info)
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
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {								
						if (!this.info.product || !this.info.amount) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Product y cantidad"});
						}else{
							this.infoInput.Supplies.push({...this.info, idx: new Date().getTime()});
							this.$EventBus.$emit("notifications", {
								type: "success",
								msg : "Orden Agregada"
							});
							this.setDefault();
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
						if (!this.info.product || !this.info.amount) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Product y cantidad"});
						}else{
							if (this.infoInput.Supplies) {										
								const idx = this.infoInput.Supplies.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
								if (idx >= 0) {
									this.infoInput.Supplies.splice(idx, 1, {...this.info});
									this.$EventBus.$emit("notifications", {
										type: "success",
										msg : "Orden Editada"
									});
									this.setDefault();
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
						if (this.infoInput.Supplies && this.infoInput.Supplies.length > 0) {					
							if (this.info && this.info.id ) {
								const service = new LaboratorySupplieservice();
								const res = await service.deleteInfo(this.info)
							}
							
							const idx = this.infoInput.Supplies.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
							if (idx >= 0) {
								this.infoInput.Supplies.splice(idx, 1);
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