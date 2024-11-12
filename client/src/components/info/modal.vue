<template>
	<v-dialog
		v-model = "dialog"
		:width 	= "sett_modal.width"
		persistent
	> 
		<v-card 
			outlined
		>
			<v-card-title
				:class = "head.class_title"
			>
				<v-icon
					small
					:color = "head.color_icon"
					:class = "head.class_icon"
				>
					{{ head.icon }}	
				</v-icon>
				<span>
					{{ $t(head.title) }}
				</span>
				<v-spacer></v-spacer>
				<span>
					{{ head.date }}
				</span>
				<v-btn

					fab
					x-small
					color 	= "error"
					@click 	= "actions({ action : head.close_action})"
					:class 	= "head.class_close" 
					:height	= "head.height_close"
					:width 	= "head.width_close"
				>
					<v-icon
						x-small
						color = "white"
					>
						mdi-close	
					</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text
				:class = "head.class_text"
			>
				<v-row
					dense
				>	
					<template
						v-for = "(item_info, key_info, idx_info) of info_contents"
					>
						
						<v-col
							:key 	= "key_info + ref + idx_info"
							:cols 	= "item_info.cols"
						>
							<!-- v-if  = "!sett_modal.no_shows.includes(key_info)"  -->
						
							<v-card 
								:outlined 	= "item_info.outlined"
								:color 		= "item_info.color_card"
							>
								<v-card-title
									:class = "item_info.class_title"
								>
									<span>
										{{ item_info.title }}
									</span>
								</v-card-title>
								<v-card-text
									:class = "item_info.class_text"
								>
									
									<v-row
										dense
										:justify 	= "item_info && item_info.justify ? item_info.justify : ''"
										:align 		= "item_info && item_info.align ? item_info.align :  ''"
									>
												
										<template 
											v-if  = "item_info && item_info.fields && item_info.fields.length > 0"
											v-for = "(item_field, idx_field) of item_info.fields"
										>
											<v-col
												:cols = "item_field.cols"
											>							
												<v-card
													:color 	= "item_field.color"
													v-if 	= "item_field.type == 'txt'"
													:class 	= "item_field.class"
												>
													{{ item_field.title }} : {{ item_field.text }}
												</v-card>				
												<v-divider
													v-if 	= "item_field.type == 'divider'"
													:class 	= "item_field.class"
												></v-divider>
												<v-text-field
													dense
													outlined
													hide-details
													v-model = "info[key_info][item_field.key]"
													:label 	= "$t(item_field.text)"
													:type 	= "item_field.type"
													v-if 	= "['text', 'email'].includes(item_field.type)"
													:class 	= "item_field.class"
													@input 	= "(v) => info[key_info][item_field.key] = v.toUpperCase()"

												></v-text-field>
												<v-text-field
													dense
													outlined
													hide-details
													v-model.number = "info[key_info][item_field.key]"
													:label 	= "$t(item_field.text)"
													:type 	= "item_field.type"
													v-if 	= "['number'].includes(item_field.type)"
													@input 	= "(v) => info[key_info][item_field.key] = v.toUpperCase()"
													:class 	= "item_field.class"
												></v-text-field>
												<v-textarea											      	
											      	outlined											      	
											      	no-resize
											      	hide-details
													v-if	 	= "item_field.type == 'textarea'"
											      	rows 		= "1"
								            		:value 		= "item_field.placeholder"
								            		:name 		= "'input-7-1'+ item_field.key + key_info"
											      	:label 		= "$t(item_field.text)"
											      	v-model  	= "info[key_info][item_field.key]"
													@input 		= "(v) => info[key_info][item_field.key] = v.toUpperCase()"
								            	></v-textarea>
												<dates
													v-if	 			= "item_field.type == 'date_range'"
													:info_to_component 	= "item_field"
													@receive_info 		= "info[key_info][item_field.key] = $event"
												></dates>
												<v-select
													dense
													outlined
													hide-details
													v-model 	= "info[key_info][item_field.key]"
													:label 		= "$t(item_field.text)"
													:items 	 	= "render_listed(item_field)"
													:item-value = "item_field.item_value"
													:item-text  = "item_field.item_text"
													v-if 		= "item_field.type == 'select'" 
													:class 		= "item_field.class"
													:multiple 	= "item_field.isMultiple"
												></v-select>
											</v-col>
										</template>
									</v-row>
								</v-card-text>
								<v-card-actions
									:class = "item_info.class_actions"
								>
									<v-row>
										<template
											v-if  = "item_info && item_info.actions && item_info.actions.length > 0"
											v-for = "(item_action, idx_action) of item_info.actions" 
										>
											<v-col
												:cols = "item_action.cols"
											>
												<v-btn																								
													:color 	 = "item_action.color"
													@actions = "actions(item_action.action)"
												>
													{{ $t(item_action.text) }}
												</v-btn>
											</v-col>
										</template>	
									</v-row>
								</v-card-actions>
							</v-card>
						</v-col>
					</template>
				</v-row>
			</v-card-text>
			<v-card-actions
				:class = "head.class_actions"		
				v-show = "show.actions"			
			>
				<v-progress-linear
			      	indeterminate
			      	color  = "cyan"
			      	v-show = "loadings.content"
			    ></v-progress-linear>
				<v-spacer></v-spacer>
				<v-btn
					color 	= "success"
					@click 	= "actions({ 
						action  : head.action,
					})"
					:disabled 	= "disabled.content"
					:class 		= "head.class_btn" 
				>
					{{ head.action_btn}}
				</v-btn>
				<v-spacer></v-spacer>

			</v-card-actions>
		</v-card>
	</v-dialog> 
</template>
<script type = "text/javascript">
	// src  = "./js/modal.js" 
	import dates from "@/helpers/dates.vue"

export default {
	name 		: "modal",
	components	: {
		dates,
	}, 
	props 		: [
		"ref_to_component",
		"info_to_component",
	],
	data 	: (vm) => ({ 
		ref 		: "",
		info 		: {
			content : {},
		},
		info_item 	: {},
		dialog 		: false,
		requests 	: {
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
		head 		: {
			class_title 	: "primary body-1 pa-0 white--text",
			title 			: "",
			date 			: "",
			icon 			: "mdi-information",
			color_icon 		: "white",
			class_icon 		: "mx-1", 
			class_text  	: "pa-2",
			class_actions 	: "pa-1",
			close_action 	: "close_modal",
			width_close 	: "23px",
			height_close 	: "23px",			
			class_btn 		: "mx-1",
			action_btn 		: "confirm",
			action 			: "confirm",

		}, 
		sett_modal 	: {
			cols 		: 12,
			width 		: 500,
			no_shows 	: [],
		},
		lists 				: {},
		info_contents 		: {},
		default_contents 	: {
			content : {
				justify 	: "start",
				align 		: "start",
				outelned 	: false,
				title  		: "",
				class_title : "pa-0",
				class_text  : "",
				texts 		: [],
				fields 		: [],
				class_actions 	: "",
				actions 		: [],
			},
		}, 
		loadings : {
			content : false, 
		},
		show 	: {
			actions : false,
		},
		disabled  : {
			content : false,
		},
		is_closed   	 : false,
		info_related_key : null, 

	}), // data

	created(){
		this.ref 			= this.ref_to_component;
		this.info_contents 	= { ...this.default_contents };
	}, // created
		
	watch : {
		dialog : function(val){
			if (!val) {
				if (!this.is_closed) {
				
					this.actions({action : "close_modal"});
				}else{					
					this.is_closed = false;
				}
			}
		}, // dialog

		info_to_component: function(val){
			console.log("open modal ", val)
			if (val) {

				this.render_info(val);
			}
		}, // info_to_component


	}, // watch

	methods : {
		actions(action, item, option){
			console.log("actions modal : " + this.ref + " action : ", action, "\n item : ", item , "\n option : ", option)
			if (action.action == "close_modal") {			
				console.log("close_modal ", action);
				this.$emit("close", { action : action.subAction, item});
				this.dialog 		= false;				
				this.is_closed		= true;
				// this.modal 			= null;
				this.info.content 	= {};
			}else
			if (action.action == "confirm") {
				console.log("requests ", this.requests)
				if (this.requests) {
					if (this.requests.action == "edit" ) {
						this.update(this.info[this.requests.action_key]);
					}else 
					if (this.requests.action == "create") {						
						this.save(this.info[this.requests.action_key]);
					}else
					if (this.requests.action == "del") {
						this.$EventBus.$emit("notifications",{
							type 	: "confirm_delete",
							ID 		: this.ref,
						});
						this.info_item = { ...this.info[this.requests.action_key]};
					}else
					if (this.requests.action == "get") {
						this.get(this.info[this.requests.action_key]);
					}
				}
			}
		}, // actions

		render_info(item){
			if (item) {
				let { contentt, requestss, headd, listss, showw, info, related_key } = { ...item };
				
					
				this.info_contents = {
					content :  { ...this.info_contents.content, ...contentt },
				}
				console.log("info content ", this.info_contents)
				if (headd) {
					this.head = { ...this.head,...headd};
					
				}
				if (requestss) {
					this.requests = { ...requestss };
				}
				if (listss) {
					this.lists = { ...listss };
				}
				if (showw) {
					this.show = { ...this.show, ...showw };
					console.log("show" , this.show, showw)
				}
					
				if (info) {
					this.info.content 		= { ...info };
				}

				if (related_key) {
					this.info_related_key 	= { ...related_key }; 
				}
				this.dialog = true;
			}else{
				console.warn("Not get info to show modal ", item);
			}
		}, // render info

		render_listed(item){
			if (item) {
				let list = item.list;
				if (Array.isArray(list)) {
					return list;
				}else
				if(item && item.global_list){
					let temp = this.$ManagerSmith.getLists(item.global_list);
					return temp && temp.length > 0 ? temp : [];
				}else
				if (this.lists && this.lists[list]) {
					return Array.isArray(this.lists[list]) ? this.lists[list] : [ ];
				}
			}
			return [];
		}, // render listed

		get(item){
			const api = this.requests.get;
			this.loadings.content = true;
			this.$Axios.get(api).then(res => {
				console.log("REs get modal ", res);
				if (res && res.data) {

				}
				this.loadings.content = false;
			}).catch(er=>{
				console.log("Error get modal ", er );
				this.loadings.content = false;

			})
		}, // get

		save(item){
			if (this.info_related_key && (this.info_related_key.main_id || this.info_related_key.isCreate)) {		
				this.loadings.content = true;
				if (this.info_related_key.isSetOtherKey && this.info_related_key.key) {
					item[this.info_related_key.key] = this.info_related_key.main_id;
				}					
				const api = this.requests.create;
				this.$Axios.post(api, item).then(res => {
					// console.log("REs create modal ", res);
					if (res && res.data) {
						this.$EventBus.$emit("notifications",{
							type 	: "saved",
							msg : this.$t("information"),
						});
						// if (this.requests && this.requests.close_with_req) {
						item.id = res.data.id
						this.actions({action:"close_modal", subAction : "add", }, item);
							
						// }
					}
					this.loadings.content = false;
				}).catch(er => {
					console.log("Error create modal ", er );
					this.loadings.content = false;
					this.$EventBus.$emit("notifications",{
						type 	: "error",
						msg : er,
					})
				})
			}else{
				this.actions( {action :"close_modal",  subAction : "add", }, {...item})

			}
		}, // save

		update(item){
			if (item && item.id) {
				const api = this.requests.edit + item.id;
				this.loadings.content = true;
				this.disabled.content = true;
				this.$Axios.put(api, item).then(res => {
					console.log("REs update modal ", res);
					if (res && res.data) {
						this.$EventBus.$emit("notifications",{
							type 	: "updated",
							msg : this.$t("information"),
						});
						// if (this.requests && this.requests.close_with_req) {
						this.actions({action :"close_modal", subAction : "edited"}, {...item});							
						// }
					}
					this.disabled.content = false;
					this.loadings.content = false;
				}).catch(er => {
					console.log("Error update modal ", er );
					this.disabled.content = false;
					this.loadings.content = false;
					this.$EventBus.$emit("notifications",{
						type 	: "error",
						msg : er,
					});
				})
			}else{
				this.actions( {action :"close_modal", subAction : "edited"}, {...item});
				this.$EventBus.$emit("notifications",{
					type 	: "updated",
					msg : this.$t("information"),
				});
			}
		}, // update

		del(item){
			if (item && item.id) {

				const api = this.requests.del + item.id;
				this.loadings.content = true;
				this.$Axios.delete(api).then(res => {
					console.log("REs del modal ", res);
					this.$EventBus.$emit("notifications",{
						type 	: "deleted",
						msg : this.$t("information"),
					})
					if (this.requests && this.requests.close_with_req) {
						this.actions("close_modal", item);							
					}
					this.loadings.content = false;
				}).catch(er=>{
					console.log("Error del modal ", er );
					this.$EventBus.$emit("notifications",{
						type 	: "error",
						msg : er,
					});
					this.loadings.content = false;

				})
			}
		}, // del

	}, // methods

	mounted(){

	}, // mounted

	beforeDestroy(){
		this.$Helper.clear_bus(this.$EventBus, this.bus, this.ref);
	}, // beforeDestroy

}; // export default
</script>