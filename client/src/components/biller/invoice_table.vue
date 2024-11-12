<template>
	<v-card 
		

	>
		<!-- <v-card-title
			v-if 	= "info_comp.title"
			:class  = "info_comp.class_title"
		>
			{{ $t(info_comp.title) }}
		</v-card-title>	 -->
		<v-card-text
			class = "pa-0"
		>
			<v-data-table
				dense
			    fixed-header
			    hide-default-footer
				:headers 			 = "info_comp.headers"
			 	:items 	 			 = "list_render"
			    class 	 			 = "elevation-5"			 			   
			   	:footer-props 		 = "{
			   		showFirstLastPage   : false,
			   		itemsPerPageOptions : [30],
			   		showCurrentPage     : false
			   	}"
			   	loading-text 		= "Loading... Please wait"
			    :height 			= "200"								    
			    :loading  			= "loading"								    			
			>
			    
			 	<template
			 		v-slot:top
			 		v-if = "info_comp && info_comp.tops && info_comp.tops.length > 0"
			 	>
			 		<v-row
			 			dense
			 			class = "mt-1"
			 		>
			 			<v-col
			 				cols = "2"
			 			>
			 				
				 			
				 			<v-btn
								large
								v-for  = "(item_btn, idx_btn) of info_comp.table_options"
								:key   = "idx_btn + info_comp.key  + ref"
								:color = "item_btn.color"
								@click = "actions(item_btn)"
							>
								<v-icon
									small
									:color = "item_btn.color_icon"
								>
									{{ item_btn.icon }}
								</v-icon>
								<span>
									{{ $t(item_btn.text) }}
								</span>
							</v-btn>

			 			</v-col>
			 			<v-divider
					      class="mx-4"
					      vertical
					    ></v-divider>
				 		<template
				 			v-for = "(item_top, idx_top) of info_comp.tops"
				 		>

					 		<v-col
					 			cols = "6"
					 		>
					 			
						 		<v-text-field
									dense
									outlined
									hide-details
									:label 				= "$t(item_top.text)"
									v-model 			= "search[item_top.key]"
									:type 				= "item_top.type"
									v-if 				= "['text','email'].includes(item_top.type)"
									:prepend-inner-icon = "item_top.icon"
									:disabled 			= "item_top.isDisabled"
									@input 		 		= "(v) => search[item_top.key] = v.toUpperCase()"

								></v-text-field>
					 		</v-col>
				 		</template>


				 		<!-- <v-btn-toggle> -->
							
						<!-- </v-btn-toggle> -->
		 			<modal_invoice
						:key 				= "'table_modal_invoice_' + ref + info_comp.key"
						:info_to_component  = "modal"
						:ref_to_component 	= "'table_modal_invoice_' + ref + info_comp.key"
						@close 				= "actions({action : 'close_modal'}, $event)"
			   		></modal_invoice>
			 		</v-row>
					<v-divider
				      class="mt-2"															      
				    ></v-divider>
			 	</template>
				<template
					v-slot:item.action = " { item }"
				>
					<v-btn-toggle>
						<V-btn
							small
							v-for  = "(item_btn, idx_btn) of info_comp.actions"
							:key   = "idx_btn + info_comp.key  + ref"
							:color = "item_btn.color"
							@click = "actions(item_btn, item , info_comp)"
						>
							<v-icon
								small
								:color = "item_btn.color_icon"
							>
								{{ item_btn.icon }}
							</v-icon>
							<span>
								{{ $t(item_btn.text) }}
							</span>
						</V-btn>
					</v-btn-toggle>
				</template>
				<template
			        v-if 	= "info_comp && info_comp.footers && info_comp.footers.length > 0 "
			        v-slot:footer
			    >
			        <v-row
			        	dense
			        >
			        	<template
			        		v-for = "(item_footer, idx_footer) of info_comp.footers"
			        	>
			        		<v-col
			        			:cols = "item_footer.cols"
			        			:offset = "item_footer.offset"
			        		>
			        			<v-chip
			        				small
			        				label
			        				:color 	= "item_footer.color"
			        				v-if 	= "item_footer.type == 'info_total'"
			        			>
			        				{{ item_footer.text }}	
			        			</v-chip>
			        			<v-chip
			        				small
			        				label
			        				:color = "item_footer.color2"
			        				v-if   = "item_footer.type == 'info_total'"
			        			>
			        				{{ $ManagerSmith.formatCurrency(info[item_footer.key]) }}	
			        			</v-chip>
			        		</v-col>
			        	</template>
			        </v-row>
			    </template>
			</v-data-table>
			
		</v-card-text>
	</v-card>
</template>
<script 
	type = "text/javascript"
>
	// src  = "./js/invoice_table.js"
	import modal_invoice	from "@/components/biller/modal_invoice.vue"
export default {
	name 		: "data_table",
	components	: {
		modal_invoice
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
			search : false,
		},
		info 		: {			
			total 		: 0,
			subtotal 	: 0,
		}, 
		info_item 	: null,
		// info_fields  	: [],
		list_options 	: [],
		list_actions 	: [],
		info_input  	: {
			search : ""
		},
		search 		: {},
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
		ref 			: "table_comp",
		bus 			: {},
		related_key 	: null, 
	}), // data
	created(){
		// this.actions({action : "set_info"});
		if (this.info_to_component) {
			this.info_comp  = this.info_to_component;
			if (this.update_to_component) {
				this.list 	= this.update_to_component;
				this.total	= this.list.length;
			}
		}
		// this.height = this.$vuetify.breakpoint.height - 150;
	}, // created

	watch : {
		update_to_component: function(val){
			console.log("update table ", val)
			if (val) {
				this.actions({action : "update_info"}, val);
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
			console.log("set_info table ", action, item, option)
			if (action) {

				if (action.action == "add_item") {}
				if (action.action == "update_info") {
					this.list 	= item;
					this.total 	= this.list.length;

				}
				if (action.action == "set_info") {
					if (this.info_to_component) {
					
						
					}
					if (this.ref_to_component) {
						this.ref += this.ref_to_component;
					}
				}else if (action.action == "add_item") {
					try{	
						// console.log("this " , this.info_comp)
						// this.parameters[action.key_modal].requestss.action 	= "edit";
						this.info_comp.requestss.action = "create";
						this.modal = {
							...this.info_comp,
							info 	 : {}
						};
					}catch(e){
						console.error("error set requests create ", e)
					}
				}else if (action.action == "update_item") {
					try{
						this.info_comp.requestss.action = "edit";						
						this.modal = { ...this.info_comp , info : item }
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
				}
				else if (action.action == "close_modal") {
					if (item) {
						this.list.push({...item});
						this.total++;

						const total = this.list.reduce((acum, currentVal) => {
							console.log("VALS ", acum, currentVal.total, acum + currentVal.total);
							return acum + currentVal.total
						},0);
						console.log("TOTAL ", total);
						this.info.total 		= total;
						this.info.subtotal 		= total;
						const values 			= []
						if (this.info_comp && this.info_comp.total_keys && this.info_comp.total_keys.length > 0) {
							this.info_comp.total_keys.forEach((it)=>{
								values.push({ key : it, value : total,})
							})
							
						}
						this.$emit("receive_info", { 
							list 	: this.list,
							values,
						});

					}
	    			this.modal = null;
	    		}
			}
		}, // actions


		get_search(){
			if (this.search) {

				const api		= this.parameters.search  || "";
				if (api) {
					this.loading 	= true;

					let info_up		= { ...this.search};
					let type 		= this.parameters.type_search;
					this.$Axios[type](api, info_up).then(res =>{
						this.loading = false;
						if (res && res.rows && res.rows.length > 0) {
							this.total = res.count;
							this.list  = [...res.rows];
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
						this.$emit("receive_info", this.list);						
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
					this.$emit("receive_info", this.list);

					this.info_item = null;
					this.$EventBus.$emit("notifications",{
						type  : "success",
						msg   : this.$t("deleted_item")
					});
				}
			}
		}, // delete

	
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

}; // export default
</script>