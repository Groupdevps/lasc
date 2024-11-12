<template>
	<v-card
		outlined
		class = "pa-1"
	>
		<v-data-table
			dense
		    :headers 			 = "headers"
		 	:items 	 			 = "list_render"
		    class 	 			 = "elevation-5 my-custom-table"			    
		    :hide-default-footer = "list_render.length > 20 ?  false : true"
		   	:options.sync 		 = "options"
		   	:server-items-length = "total"
		   	:footer-props 		 = "{
		   		showFirstLastPage   : true,
		   		itemsPerPageOptions : [15, 30],
		   		showCurrentPage     : true
		   	}"
		   	loading-text 		= "Loading... Please wait"
		    :height 			= "height + 'px'"
		    item-key 			= "index"
		    :loading 			= "loading"
		    :show-select  		= "parameters.isSelection"
		    :single-select 		= "parameters.isSingleSelect"
		    v-model 			= "selections"
		    :item-key 			= "parameters.item_key_selection"
			:single-expand 		= "true"
			:expanded.sync 		= "expanded" 
			:show-expand 		= "parameters.isExpand"
		    fixed-header
		>
			<template v-slot:top >
				<v-row
					dense
				>		
					<template
						v-for = "(info_field, idx_field) of render_options"
					>						
						<v-col
							:cols = "info_field.cols"
							:key  = "idx_field + ref_to_component"
						>									
							<v-text-field
								dense
								outlined
								hide-details
								:label  	 	= "info_field.text"
								v-model 	 	= "info_input.search" 
								:type   	 	= "info_field.type_field"
								:placeholder 	= "info_field.placeholder"
								v-if 			= "['text', 'number'].includes(info_field.type)"
								
								
							>
								<template
									v-slot:append
									v-if  = "info_field.type_field"
								>
									<v-btn
										small
										color = "primary"
										@click = "actions(info_field.action, info_field.key, info_input, info_field.list )"
									>
										
										<v-icon
										>
											mdi-plus
										</v-icon>
									</v-btn>
								</template>
							</v-text-field>	
					 		<v-spacer
								v-if 			= "['spacer'].includes(info_field.type)"
								:class 			= "info_field.class"
					 		></v-spacer>
					 		<v-btn
					 			small
					 			@click 	= "actions(info_field)"
					 			color  	= "primary"
								v-if 	= "['btn'].includes(info_field.type)"

					 		>
					 			<v-icon
					 				small
					 				:class = "info_field.class_icon"
					 			>
					 				{{ info_field.icon }}
					 			</v-icon>	
					 			<span
					 				v-if = "info_field.text" 
					 			>
					 				{{ $t(info_field.text) }}
					 			</span>
					 		</v-btn>
						</v-col>				
					</template>
					<v-col offset="10">
						<BtnDownloadPdf 
							v-show = "show.pdf" 
							:infoToComponent ="update_to_component" 
							:typeFormToDownload="typePdf"
						></BtnDownloadPdf>
					</v-col>
					<modal
						:key 				= "'table_modal_' + ref_to_component"
						:info_to_component  = "modal"
						:ref_to_component 	= "'table_modal_' + ref_to_component"
						@close 				= "actions({action : 'close_modal'}, $event)"
			   		></modal>
			   		
				</v-row>
			</template>
			<template
				v-slot:item.TypeIDId  = "{ item }"
			>						
				{{ render_typeId(item.TypeIDId) }}	
			</template>			
			<template
				v-slot:item.TypeRelationshipId  = "{ item }"
			>
				<v-chip
					small
					color = "primary"
				>				
					{{ render_relationshipId(item.TypeRelationshipId) }}
				</v-chip>
			</template>
			<template
				v-slot:item.actions  = "{ item, index }"
			>
				<v-btn-toggle>
					<template v-for 	= "(btn, idx_btn) of render_actions">

						
						<v-btn
							small
							:key  	= "btn.key + ref + idx_btn"
							:color 	= "btn.color"
							@click 	= "actions(btn, item, index)"
							v-if    = "btn.type == 'btn'"
							>
							<v-icon
								small
							>
								{{ btn.icon }}
							</v-icon>
						</v-btn>
						<BtnDownloadPdf 
							v-else-if="btn.type == 'pdf'"							
							:infoToComponent ="{AttentionId : item.AttentionId || 'null'}" 
							:typeFormToDownload="btn.typePdf"
						></BtnDownloadPdf>
					</template>
				</v-btn-toggle>
			</template>
			<template
				v-for 			= "head of headers"
				:slot	 		= "`header.${head.value}`" 
	 			slot-scope 		= "{header}"
			>
				<!-- v-slot:[`header.${head.text}`] = "{ header, index }"  -->			
				<span>					
					{{ $t(head.text) }} 
				</span>
				<!-- {{ head.text}} -->
			</template>
				<!-- v-slot:`header.${head.text}`="{ header }" -->			
			<template v-slot:header.data-table-select = "{ header }">
				<span>
					{{ $t(parameters.text_key_selection) }}
				</span>
			</template>	
			<template v-slot:item.isCompanion = "{ item }">
		        <v-simple-checkbox
		          v-model="item.isCompanion" 
		        ></v-simple-checkbox>
		    </template>
			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					
					<infoModal
			   			:key 					= "'info_modal_' + ref_to_component"
						:update_to_component  	= "{infoShow : item , fieldName : 'emergency_medical_history'}"
						:ref_to_component 		= "'info_modal_' + ref_to_component"
					></infoModal>
						<!-- @close 					= "actions({action : 'close_info_modal'}, $event)" -->
				</td>
			</template>
		</v-data-table>
	</v-card>
</template>
<style scoped="scoped">
.my-custom-table .v-data-footer {
  /* height: 100px; Establecer el tamaño deseado */
   min-height: 80px;
}
</style>
<script type = "text/javascript" >
	// src  = "./js/table.js"
	import modal 		from "@/components/info/modal.vue"
import infoModal 	from "@/components/info/infoModal.vue" 
import BtnDownloadPdf from "@/components/info/BtnDownloadPdfComponent.vue"
export default {
	name 		: "data_table",
	components	: {
		modal,
		infoModal,
		BtnDownloadPdf
	},
	props 		: [
		"update_to_component",
		"info_to_component",
		"ref_to_component",
	],
	data 		: (vm) => ({
		headers : [
			{ text : "", value: "" },
		],
		// list_render
		height  	: 300,
		options 	: { itemsPerPage : 30 },
		total   	: 0, 
		loading 	: false,
		list 		: [],
		search  	: null,
		show 		: {
			search 	: false,
			pdf 	: false, 
		},
		selections  : [],
		info 		: {}, 
		info_item 	: null,
		// info_fields  	: [],
		list_options 	: [],
		list_actions 	: [],
		info_input  	: {
			search : ""
		},
		parameters 	: {
			/*
			create,
			get,
			edit,
			del,
			search,
			type_search  : post || get
			text_edit 	 : 
			text_edit_er :
			text_create
			text_create_er
			*/
		},
		modal 			: null,		
		modal_info 		: null,
		ref 			: "table_comp",
		bus 			: {},
		related_key 	: null, 		 
		typePdf 		: "",
		expanded 		: []
												
	}), // data
	created(){
		this.actions({action : "set_info"});
		// this.height = this.$vuetify.breakpoint.height - 150;
	}, // created

	watch : {
		update_to_component: function(val){
			console.log("update table ", val)
			if (val) {
				this.actions({action : "update_info"}, val);
			}
		}, 
		selections : function(val){
			console.log("VAL selections ", val)
			if (val) {
				this.$emit("receive_selections", val);
			}
		}, 
		options : {
			handler(val){			
				if (this.search && this.show.search) {
					this.get_search();
				}else{
					this.get_list();
				}				
			}, deep : true,
		}, // options
	}, // watch

	computed : {
		list_render : function(){
			this.$emit("receive_info", this.list);
			if (this.list && this.list.length > 0) {
				this.total = this.list.length;
			}
			return this.list;
		},

		render_options : function() {
			return this.list_options && this.list_options.length > 0 ? this.list_options : [];
		},

		render_actions : function(){
			return this.list_actions && this.list_actions.length > 0 ? this.list_actions : [];
		}, // return 
	}, // computed

	methods : { 
		actions(action, item, option){
			console.log("set_info table ", action,  item, option,  this.info_to_component)
			if (action) {

				if (action.action == "update_info") {
					if (item && item) {
						if (this.parameters) {
							const { key, key_related_main, isSetOtherKey, isAutoUpdate } = this.parameters;
							if (this.parameters.key && item[key] && isAutoUpdate) {
								this.list 		= item[key];

								// this.selections = [];
							}else{
								if (isAutoUpdate) {
									this.list 		= [];
								}
								// this.selections = [];
							}
							if (key_related_main && item[key_related_main]) {
								let id;
								if (item && item[key_related_main] && item[key_related_main].id) {
									id = item[key_related_main].id;
								}
								this.related_key = {
									key 			: key_related_main,
									main_id   		: id,
									isSetOtherKey,
								}		
							}else{
								this.related_key = null;
							}
						}
					}

				}
				if (action.action == "set_info") {
					if (this.info_to_component) {
						this.parameters 		= { ...this.info_to_component };
						if(this.parameters.isPdf){
							// info_to_component
							this.show.pdf = true;
							this.typePdf = this.parameters.typePdf;
						}else{
							this.show.pdf = false;							
						}
						console.log("parameters ", this.parameters)
						if (this.parameters && this.parameters.headers && this.parameters.headers.length > 0) {
							this.headers	= [ ...this.parameters.headers ];
							/*this.headers.forEach((it)=>{								
								if (it && it.text) {
									it.text = this.$t(it.text);
								}
							})*/
						}
						if (this.parameters.options) {
							this.list_options = this.parameters.options;
						}
						if (this.parameters.height) {
							this.height = this.parameters.height;
						}
						if (this.parameters.btns) {
							this.info_btn = this.parameters.btns;
						}
						if (this.parameters.actions) {
							this.list_actions = this.parameters.actions; 
						}
						if (this.parameters.getInfoStartSearch) {
							this.show.search = true;
							if (this.parameters.list_search && this.parameters.list_search.length > 0) {								
								this.search = {};
								console.log("FIN D ", this.update_to_component)
								this.parameters.list_search.forEach((it)=>{
									if (this.update_to_component && this.update_to_component[it.key]) {
										this.search[it.key_search] = this.update_to_component[it.key];
									}
								})
								
								// this.get_search();							
							}
						}
					}
					if (this.ref_to_component) {
						this.ref += this.ref_to_component;
					}
				}else if (action.action == "add_item") {
					try{
					// console.log("add item", item)
						this.parameters[action.key_modal].requestss.action 	= "create";
						this.parameters[action.key_modal].headd.title 		= "new";
						// this.parameters[action.key_modal].requestss.action 	= "edit";
						this.modal = {...this.parameters[action.key_modal], info : {}, related_key : this.related_key};
					}catch(e){
						console.error("error set requests create ", e)
					}
				}else if (action.action == "update_item") {
					try{
						this.info_item = {
							item,
							action : "edit",
							index : option,
						};
						this.parameters[action.key_modal].requestss.action 	= "edit";
						this.parameters[action.key_modal].headd.title 		= "edit";
						// console.log("UPDATE  : ", this.parameters)
						this.modal = { ...this.parameters[action.key_modal] , info : item }
					}catch(e){
						console.error("error set requests ", e)
					}
				}else if (action.action == "confirm_delete_item") {
					this.$EventBus.$emit("notifications",{
						type : "confirm_delete",
						ID   : this.ref,
					})					
					this.info_item = {
						item   : item,
						action : "delete_item"
					};

				}else if (action.action == "delete_item") {
					this.del();
				}else if (action.action == "redirect_window") {
					if (action.url) {
						/*const redirect = action.url;
						if (action.keys && action.keys.length > 0) {
							this.$Helper.set_local("Attention", item);

							redirect += action.keys.map(it => this.update_to_component.info_attention[it] + '/')
						}
						
						
						
						this.$router.push({ 
							path 	: `${redirect}`, // ${item.id}/${numberId} 									
						});		*/
					}
				}else if(action.action == "show_information_modal"){
					this.modal_info = { 
						infoShow  : { ...item },
						fieldName : action.fieldNameForm,  
					};					
				}
				else if (action.action == "close_modal") {
					if (item ) {
						if (item.action == "add") {						
							this.list.push({...item.item});
							this.total++;
						}else{
							// console.log("INFO ITEM ", this.info_item)
							const {index} =this.info_item; 
							if (index >= 0) {
								this.list.splice(index, 1, {...item.item});
								this.setInfoItemDefault();
							}

						}
					}
	    			this.modal = null;
	    		}else if (action.action == "close_info_modal") {
	    			console.log("CLOSE INFO MODAL ");
	    		}
			}
		}, // actions

		setInfoItemDefault(){
			this.info_item = {
				item   : null,
				action : null,				
			}
		}, // setInfoItemDefault

		get_list(){
			

			if (this.parameters && this.parameters.requestss && this.parameters.requestss.get) {				
				const { page } 	= this.options;
				const api		= this.parameters.requestss.get + "/page?=" + page || "";
			
				
				if (api) {
			
					this.loading 	= true;

					this.$Axios.get(api).then(res =>{
						this.loading = false;
						if (res && res.data && res.data.rows && res.data.rows.length > 0) {
							
							if (this.parameters.isFormat && this.parameters.key_row_res) {
								res.data.rows = this.$ManagerSmith.formatListTable([...res.data.rows], this.parameters.formated, this.parameters.keyRowRes);
							}
							console.log("CHEK LIST new ", res.data.rows)
							this.list  = [...res.data.rows];

							if (res.data.count) {
								this.total = res.data.count;
							}else{
								this.total = this.list.length;	
							}
						}
					}).catch(er => {
						this.loading = false;
					})
				}else{
					this.$EventBus.$emit("notifications",{
						type 	: "warning",
						message : this.$t("not_found_route")
					})
				}
			}
		}, // get list

		get_search(){
			if (this.search) {

				const api		= this.parameters.api_search  || "";
				if (api) {
					this.loading 	= true;
					
					let info_up		= { ...this.search};
					if (this.parameters.isObjectSearch) {
						info_up 	= { search : info_up };
					}
					let type 		= this.parameters.type_search;
					this.$Axios[type](api, info_up).then(res =>{
						this.loading = false;
						if (res && res.data.rows && res.data.rows.length > 0) {
							if (this.parameters.isFormat) {
								res.data.rows = this.$ManagerSmith.formatListTable([...res.data.rows], this.parameters.formated, this.parameters.keyRowRes);
							}
							console.log("CHEK LIST new ", res.data.rows)
							this.total = res.data.count;
							this.list  = [...res.data.rows];
						}
					}).catch(er => {
						this.loading = false;
						this.$EventBus.$emit("notifications", {
							type 	: "error",
							message : this.$t("not_found_information")
						})
					})
				}else{
					this.$EventBus.$emit("notifications",{
						type 	: "warning",
						message : this.$t("not_found_route")
					})
				}
			}else{
				this.$EventBus.$emit("notifications",{
					type 	: "warning",
					message : this.$t("required_info_to_search")
				})
			}
		}, // get search

		create(){
			if (this.info) {

				const api		= this.parameters.edit + "/" + this.info.id || "";
				if (api) {

					this.loading 	= true;
					let info_up		= { ...this.info };
					this.$Axios.post(api, info_up).then(res =>{
						this.loading = false;
					
						if (res && res.data) {
							this.list.unshift({...res.data});
							this.$EventBus.$emit("notifications", {
								type 	: "created",
								message : this.$t(this.parameters.text_create)
							})
						}
							
						

					}).catch(er => {
						this.loading = false;
						this.$EventBus.$emit("notifications",{
							type 	: "error",
							message : this.$t(this.parameters.text_create_er)
						})
					})
				}else{
					this.$EventBus.$emit("notifications",{
						type 	: "warning",
						message : this.$t("not_found_route")
					})
				}
			}else{
				this.$EventBus.$emit("notifications",{
					type 	: "warning",
					message : this.$t("required_info_create")
				})
			}
		}, //  create

		edit(){
			if (this.info && this.info.id) {

				const api		= this.parameters.edit + "/" + this.info.id || "";
				if (api) {

					this.loading 	= true;
					let info_up		= { ...this.info };
					this.$Axios.put(api, info_up).then(res =>{
						this.loading = false;
						let idx 	 = this.list.findIndex(x => (x && x.id == info_up.id));
						if (idx >= 0) {							
							this.list.splice(idx, 1, info_up);
							this.$EventBus.$emit("notifications",{
								type 	: "updated",
								message : this.$t(this.parameters.text_edit)
							})
						}	
						

					}).catch(er => {
						this.loading = false;
						this.$EventBus.$emit("notifications",{
							type 	: "error",
							message : this.$t(this.parameters.text_edit_er)
						})
					})
				}else{
					this.$EventBus.$emit("notifications",{
						type 	: "warning",
						message : this.$t("not_found_route")
					})
				}
			}else{
				this.$EventBus.$emit("notifications",{
					type 	: "warning",
					message : this.$t("required_id_to_up")
				})
			}
		}, // edit

		del(){
			const { item } 		 = this.info_item;
			const { requests }   = this.parameters;
			if (item && item.id && requests && requests.delete) {
				const api		= requests.delete +  (item.id || "");
				this.loading 	= true;
				if (api) {

					this.$Axios.delete(api).then(res =>{
						this.loading = false;						
						this.total --;
						this.list.splice(this.list.indexOf(item), 1);
						this.info_item = null;
						this.$EventBus.$emit("notifications",{
							type  : "success",
							msg   : this.$t("deleted_item")
						});
						
					}).catch(er => {
						this.loading = false;
					})
				}else{
					this.$EventBus.$emit("notifications",{
						type 	: "warning",
						message : this.$t("error_deleting_information")
					})
				}
			}else{
				if (item && !item.id) {
					this.total --;
					this.list.splice(this.list.indexOf(item), 1);
					this.info_item = null;
					this.$EventBus.$emit("notifications",{
						type  : "success",
						msg   : this.$t("deleted_item")
					});
				}
			}
		}, // delete

		render_typeId(item){
			if (typeof item === "number") {
				return this.$ManagerSmith.get_typeId_string(item);
			}
			return item;
		}, // render_typeId

		render_relationshipId(item){
			if (typeof item === "number") {
				return this.$ManagerSmith.get_relationshipId_string(item);
			}
			return item;
		}, // render_relationshipId

	}, // methods

	mounted(){
		
		let temp = "notifications" + this.ref;
		this.$EventBus.$on(temp, this.bus[temp] = (actions) => {
			// console.log("notifications : "+ this.ref, actions)
			if (actions) {
				// console.log("item  action ", this.info_item)
				this.actions(this.info_item);
			}
		});
	}, // mounted

	beforeDestroy(){
		this.$Helper.clear_bus(this.$EventBus, this.bus, this.ref);
	}, // before destroy


};
</script>