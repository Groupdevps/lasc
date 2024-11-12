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
	    :height             = "100"			   
	    :loading 			= "loading" 
	>
		<template v-slot:top>
			<v-row dense v-show="!isDisabled">
				<v-col cols="12" >
					<CategoryComponent startCategory="CUPS" :inputField="searchInput" keyField="cup" :isDisabledCategory="true"></CategoryComponent>
				</v-col>
				<template v-for="item in renderFields ">
					<v-col :cols="item.cols || 'auto'">
						
						<v-text-field outlined dense v-if="item.type =='text'" v-model="info[item.key]" :label="$t(item.text)" :disabled="item.isDisabled" ></v-text-field>
						<v-text-field outlined dense v-else-if="item.type =='number'" type="number" v-model.number="info[item.key]" :label="$t(item.text)"></v-text-field>
						<v-textarea
							dense outlined hide-details fixed counter
					        rows 			= "2"
					        row-height 		= "25"
							v-else-if		= "['textarea'].includes(item.type)"
							:label 			= "item.text"
							v-model 		= "info[item.key]"
							@keyup.enter 	= "actions(item)"
							class 			= "text-uppercase"
							@input 			= "(v) => info[item.key] = v.toUpperCase()"
						></v-textarea>
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
					<v-btn color="primary" :loading="loading" @click="isEditing?updateItem():saveItem()">{{isEditing?"Editar":"Agregar"}}</v-btn>
				</v-col>
			</v-row>
			
		</template>	
		<template v-slot:item.actions="{ item }">
			<v-btn-toggle mandatory>
				<!-- <v-btn x-small color="primary" @click="confirmEdit(item)" v-show="currentPermission.canEdit"> <v-icon x-small>mdi-pencil</v-icon></v-btn> -->
				<v-btn x-small color="error" @click="confirmDelete(item)" v-show="currentPermission.canDelete"><v-icon x-small>mdi-delete</v-icon></v-btn>
			</v-btn-toggle>
		</template>
	</v-data-table>
</template>
<script type="text/javascript">
	import CategoryComponent from "@/components/info/SearcherCategoryComponent.vue"
	import QxCupListService from "@/services/QxCupListService.js"
	import dates 			from "@/helpers/dates.vue"

	export default{
		name : "SubSurgeryDescriptionComponent",
		components: {CategoryComponent, dates},
		props : ["inputField", "currentPermission", "keyField", "isDisabled"],
		data : (vm)=>({	
			infoItem : null,
			info : {
				date: vm.$ManagerSmith.getDateCurrent(),
				hour : vm.$ManagerSmith.getTimeCurrentHS(),
				AttentionId : vm.$route.params.id,
				CupsList : null,
				code : "",
				description : "",
			},			
			searchInput : { cup : {}, category : {}}, 
			reference : "SubMedicalNotes",						
			headers : [
				{ text : "CODIGO", value : "CupsList.code" },
				{ text : "DESCRIPCION", value : "CupsList.description" },//hour							
				{ text : "", value : "actions" },
			],
			loading : false, 
			isEditing : false,
			fields :[
				{
					key  : 'code',
					text : "code",
					type : "text",
					cols : 2,
					isDisabled : true,
					// auto : true,
				},			
				{
					cols : 6,
					key 	 		: "description",
	 				type 	 		: "text",
					text 	 		: "description",										
					isDisabled : true,
				}
			]
		}),// data		
		created(){
			this.setDefault();
		},
		watch:{
			"searchInput.cup"(val){
				this.renderCategory(val);
			}
		},
		computed:{
			renderList(){
				return this.inputField[this.keyField] || [];
			},
			renderFields(){		
				return this.fields.map(x=>{
					if (this.currentPermission && ["date","time"].includes(x.key)) {						
						if(this.currentPermission.canEdit && this.info && this.info.id){
							x.isDisabled=false;
						} else if (this.currentPermission.canAdd && this.info ) {
							x.isDisabled=false;
						}else{
							x.isDisabled=true;
						}						
					}
					return x
				})				
			},
			
		},
		methods:{
			setDefault(){
				this.info = {					
					code : "",
					// date : this.info.date ? this.info.date : "",  
					// time : this.$ManagerSmith.getTimeCurrentHS(),
					// AttentionId : this.$route.params.id,
					description : "",
					CupsList : null,
					CupsListId : undefined,
				}				
				if (this.$route.params && this.$route.params.order) {
					this.info.OrderId=parseInt(this.$route.params.order);
				}
				this.isEditing=false;
				// this.renderDisabledFields();
			},
			renderCategory(item){			
				if(item){										
					// this.info.CupsList = { code : item.code || item.codeAtc || item.cups};
					this.info.CupsListId = item.id;
					this.info.code = item.code; //|| item.codeAtc || item.cups; item.description;
					this.info.description = item.description;
					this.info.CupsList = {...item};
					if (item.isLink) {
						this.info.listLink=item.listLink;
					}else{
						this.info.listLink=[];
					}
					this.$nextTick(()=>{
						this.searchInput.cup= null;
					});
					// item = {};
				}
			},
			
			confirmEdit(item){
				this.info = {...item};		
				this.isEditing=true;
				// this.renderDisabledFields();		
			},
			confirmDelete(item){
				this.infoItem = {...item};
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
						if (this.info && !this.info.description ) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Cup"});
						}else{													
							this.info.UserId=this.$store.getters["auth/userId"];
							const service = new QxCupListService();
							const res = await service.saveInfo(this.info)								
							if (this.inputField && this.inputField.id) {
								this.inputField[this.keyField].push({...this.info, /*id: res.data.id*/});
									this.$EventBus.$emit("notifications", {
										type: "success",
										msg : "Cup Agregado"
									});
									this.setDefault();
							}else{

								if (res) {
									if (res.error){
										this.$EventBus.$emit("notifications", { type : "warning" , msg : this.Helper.renderErrorMessage(res.error, "Error creando Cup")});

									}else if (res.data) {	
										this.inputField[this.keyField].push({...this.info, id: res.data.id});
										this.$EventBus.$emit("notifications", {
											type: "success",
											msg : "Cup Agregado"
										});
										this.setDefault();
									}
								}
							}
						}
					}
				}catch(error){
					console.warn("Error add  " + this.reference, error)
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error agregando la Cup"
					});
				}finally{
					this.loading = false;
				}
			},
			async updateItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
						if (this.info && !this.info.description ) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Cup"});
						}else{							
							if (this.inputField &&  this.inputField[this.keyField] &&  this.inputField[this.keyField].length) {		
								if (this.info && this.info.id ) {									
									const service = new QxCupListService();
									const res = await service.updateInfo(this.info)								
									
									if (res) {
										if (res.error){
											this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Editando Cup")});
										}else if (res.data) {	
											const idx = this.inputField[this.keyField].findIndex(x => x && (x.id == this.info.id)) // || (this.info.idx && x.idx == this.info.idx)
											if (idx >= 0) {
												this.inputField[this.keyField].splice(idx, 1, {...this.info});
												this.$EventBus.$emit("notifications", {
													type: "success",
													msg : "Cup Editado"
												});
												this.setDefault();
											}
										}		
									}
								}else{
									if (this.inputField && !this.inputField.id) {
										const idx = this.inputField[this.keyField].findIndex(x => x && (x.id == this.info.id)) // || (this.info.idx && x.idx == this.info.idx)
										if (idx >= 0) {
											this.inputField[this.keyField].splice(idx, 1, {...this.info});
											this.$EventBus.$emit("notifications", {
												type: "success",
												msg : "Cup Editado"
											});
											this.setDefault();
										}
									}

								}
							}
						}
					}
				}catch(error){
					console.warn("Error edit  "+ this.reference, error)
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error Editando Cup"
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
							if (this.infoItem && this.infoItem.id ) {
								const service = new QxCupListService();
								const res = await service.deleteInfo(this.infoItem)
								if (res) {
									if (res.error){
										this.$EventBus.$emit("notifications", { type : "warning" , msg : this.Helper.renderErrorMessage(res.error, "Error Eliminando Cup")});

									}else if (res.data) {	
										const idx = this.inputField[this.keyField].findIndex(x => x && (x.id == this.infoItem.id )); // || (this.infoItem.idx && x.idx == this.infoItem.idx)
										if (idx >= 0) {
											this.inputField[this.keyField].splice(idx, 1);
											this.setDefault();
											this.infoItem=null;
										}
										this.$EventBus.$emit("notifications", {
											type: "success",
											msg : "Cup eliminado"
										});						
									}
								}
							}else{
								if (this.inputField && !this.inputField.id) {
									const idx = this.inputField[this.keyField].findIndex(x => x && (x.id == this.infoItem.id )); // || (this.infoItem.idx && x.idx == this.infoItem.idx)
									if (idx >= 0) {
										this.inputField[this.keyField].splice(idx, 1);
										this.setDefault();
										this.infoItem=null;
									}
									this.$EventBus.$emit("notifications", {
										type: "success",
										msg : "Cup eliminado"
									});
								}
							}
						}
					}
				}catch(error){
					console.warn("Error delete "+ this.reference, error);
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error eliminando Cup"
					});
				}finally{
					this.loading = false;
				}
			}
		}, // methods

	};
</script>