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
					<CategoryComponent startCategory="CUPS" :inputField="searchInput" keyField="cup" :isDisabledCategory="true"></CategoryComponent>							
				</v-col>
				<template v-for="item in fields ">
					<v-col>
						
						<v-text-field outlined dense v-if="item.type =='text'" v-model="info[item.key]" :label="$t(item.text)"></v-text-field>
						<v-text-field outlined dense v-else-if="item.type =='number'" type="number" v-model.number="info[item.key]" :label="$t(item.text)"></v-text-field>
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
	import OutpatientOrderService from "@/services/OutpatientOrdersService.js"	
	import dates 			from "@/helpers/dates.vue"

	export default{
		name : "SubOutpatientComponent",
		components: {CategoryComponent, dates},
		props : ["infoInput", "currentPermission"],
		data : (vm)=>({				
			info : {
				dateOrder: vm.$ManagerSmith.getDateCurrent(),
				AttentionId : vm.$route.params.id,
			},			
			reference : "SubOutpatient",			
			searchInput : { cup : {}, category : {}},
			headers : [
				{ text : "date", value : "dateOrder" }, // dateOrder
				{  text : "code_cups", value : "CupsList.code" },			
				{ text : "description", value : "order" },			
				{ text : "", value : "actions" },
			],
			loading : false, 
			fields :[
				{
					key 	 		: "dateOrder",
					key_main 		: "Orders",
	 				type 	 		: "date_range",
					text 	 		: "date",
					cols 			: 3,
					placeholder 	: "date",				
					isDisabled : true,

				},
				{
					key 	 		: "code_cups",
					key_main 		: "Orders",
	 				type 	 		: "text",
					text 	 		: "code_cups",
					cols 			: 3,
					placeholder 	: "code_cups",				

				},
				{
					key 	 		: "order",
					key_main 		: "Orders",
	 				type 	 		: "text",
					text 	 		: "description",
					btn_add 		: true,
					placeholder 	: "description",
					action 			: "add_table",
					// cols 			: ,

				}
			]
		}),// data
		watch:{
			"searchInput.cup"(val){
				this.renderCategory(val);
			}
		},
		created(){
			this.setDefault();
		},
		computed:{
			renderList(){
				return this.infoInput.Orders || [];
			}
		},
		methods:{
			setDefault(){
				this.info = {
					CupsList : null,
					CupsListId : null,
					code_cups : "",
					order : "",
					dateOrder : this.info.dateOrder ? this.info.dateOrder : "",  
					AttentionId : this.$route.params.id,
				}
			},
			renderCategory(item){			
				if(item){
					this.info.CupsList = { code : item.code || item.codeAtc || item.cups};
					this.info.CupsListId = item.id;
					this.info.code_cups = item.code || item.codeAtc || item.cups;
					this.info.order = item.description;
					if (item.isLink) {
						this.info.listLink=item.listLink;
					}else{
						this.info.listLink=[];
					}
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
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
						if (this.info && !this.info.cups && !this.info.order ) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Cup y Orden"});
						}else{
						// if (this.infoInput.Orders) {			
							if (this.info.listLink && this.info.listLink.length) {
								this.info.listLink.forEach((it)=>{
									if (it) {
										this.infoInput.Orders.push({
											...this.info, 
											idx: new Date().getTime(),
											CupsList : { code : it.code},
											CupsListId : it.id,
											cups : it.code,
											order : it.description,
										});								
									}
								})
							}else{								
								this.infoInput.Orders.push({...this.info, idx: new Date().getTime()});
							}
							this.$EventBus.$emit("notifications", {
								type: "success",
								msg : "Orden Agregada"
							});
							this.setDefault();
						// }
						}
					}
				}catch(error){
					console.warn("Error add  " + this.reference, error)
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
						if (this.info && !this.info.cups && !this.info.order ) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Cup y Orden"});
						}else{
							if (this.infoInput.Orders) {										
								const idx = this.infoInput.Orders.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
								if (idx >= 0) {
									this.infoInput.Orders.splice(idx, 1, {...this.info});
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
					console.warn("Error add "+ this.reference, error)
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
						if (this.infoInput.Orders && this.infoInput.Orders.length > 0) {					
							if (this.info && this.info.id ) {
								const service = new OutpatientOrderService();
								const res = await service.deleteInfo(this.info)
							}
							
							const idx = this.infoInput.Orders.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
							if (idx >= 0) {
								this.infoInput.Orders.splice(idx, 1);
								this.setDefault();
							}
							this.$EventBus.$emit("notifications", {
								type: "success",
								msg : "Orden eliminada"
							});						
						}
					}
				}catch(error){
					console.warn("Error delete "+ this.reference, error);
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