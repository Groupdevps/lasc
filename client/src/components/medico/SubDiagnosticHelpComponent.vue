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
	import DiagnosticHelpService from "@/services/DiagnosticHelpService.js"
	// import OutpatientOrderService from "@/services/OutpatientOrdersService.js"	
	import dates 			from "@/helpers/dates.vue"

	export default{
		name : "SubDiagnosticHelpComponent",
		components: {CategoryComponent, dates},
		props : ["infoInput", "currentPermission"],
		data : (vm)=>({				
			info : {
				date: vm.$ManagerSmith.getDateCurrent(),
				AttentionId : vm.$route.params.id,
			},			
			reference : "SubTreatments",			
			searchInput : { cup : {}, category : {}},
			headers : [
				{ text : "date", value : "date" }, // dateOrder
				{  text : "cups", value : "CupsList.code" },			
				{ text : "procedures", value : "treatment" },			
				{ text : "", value : "actions" },
			],
			loading : false, 
			fields :[
				{
					key 	 		: "date", // Order
					key_main 		: "SubTreatments",
	 				type 	 		: "date_range",
					text 	 		: "date",
					cols 			: 3,
					placeholder 	: "code",		
					isDisabled : true,		

				},
				{
					key 	 		: "cups", // Order
					key_main 		: "SubTreatments",
	 				type 	 		: "text",
					text 	 		: "cups",
					cols 			: 3,
					placeholder 	: "cups",				

				},
				{
					key 	 		: "treatment", // procedure
					key_main 		: "SubTreatments",
	 				type 	 		: "text",
					text 	 		: "procedures",
					btn_add 		: true,
					placeholder 	: "procedures",
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
				return this.infoInput.SubTreatments || [];
			}
		},
		methods:{
			setDefault(){
				this.info = {
					CupsList : null,
					CupsListId : null,
					cups : "",
					treatment : "",
					date : this.info.date ? this.info.date : "",  
					AttentionId : this.$route.params.id,
				}
			},
			renderCategory(item){			
				if(item){					
					this.info.CupsList = { code : item.code || item.codeAtc || item.cups};
					this.info.CupsListId = item.id;
					this.info.cups = item.code || item.codeAtc || item.cups;
					this.info.treatment = item.description;
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
										this.infoInput.SubTreatments.push({
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
								this.infoInput.SubTreatments.push({...this.info, idx: new Date().getTime()});
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
							if (this.infoInput.SubTreatments) {										
								const idx = this.infoInput.SubTreatments.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
								if (idx >= 0) {
									this.infoInput.SubTreatments.splice(idx, 1, {...this.info});
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
						if (this.infoInput.SubTreatments && this.infoInput.SubTreatments.length > 0) {					
							if (this.info && this.info.id ) {
								const service = new DiagnosticHelpService();
								const res = await service.deleteSubInfo(this.info)
							}
							
							const idx = this.infoInput.SubTreatments.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
							if (idx >= 0) {
								this.infoInput.SubTreatments.splice(idx, 1);
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