import modal 				from "@/components/info/modal.vue"
import audits_params		from "@/components/auditor/js/audits_params.js"
import dates 				from "@/helpers/dates.vue"

export default {
	name 		: "audits",
	components	: {
		modal,
		dates
	},
	data : (vm)=> ({
		list 			: [],
		search 			: [],
		info 			: {},
		info_item 		: null,
		ref 			: "users",
		headers 		: [
			{ text : "form", value : "name" },
			// { text : "name", value : "name" },
			// { text : "center", value : "CenterId" },
			// { text : "position", value : "role" },
			{ text : "amount", value : "amount" },			
			// { text : "actions", value : "action" },
		],
		loading 		: false,
		show 			: {},
		options 		: { itemsPerPage : 50 },
		total 			: 0,
		height 			: 400,
		fields 			: [
			{
				key 		: "module",
				text 		: "module",
				type 		: "select",
				item_text 	: "text",
				item_value 	: "key",
				list 		: [
					{ key : "admissions", text : "Admisiones",},
					{ key : "nursing", text  :"Enfermeria",},
					{ key : "medico", text  :"Medico",},
					{ key : "invoice", text  :"Facturacion",},
					{ key : "pharmacy", text  :"Farmacia",},
				]
			},
			{
				key 		: "startDate",
				text 		: "startDate",
				type 		: "date_range",
				placeholder : "date",				
				show 		: true,
			},
			{
				key 		: "finalDate",
				text 		: "final_date",
				type 		: "date_range",
				placeholder : "date",				
				show 		: true,
			},

			{				
				type 		: "btn",
				color 		: "primary",
				text 		: "search",
				action 		: "search",
			}
		],

		user 			: {
			role : "admin",
		},
		modal 			: null,
		parameters  	: audits_params,
		list_options 	: [
			{
				key 	: "action",
				options : [
					/*{
						key  		: "info_patient",
						action  	: "info_patient",						
						icon 		: "mdi-folder-information-outline",
						show_in 	: ["*"],
						tooltip 	: "info_patient"

					},*/
					{
						key  		: "update_item",
						action  	: "update_item",
						icon 		: "mdi-pencil",						
						show_in 	: ["admin", "manager"],						
						tooltip 	: "edit",
						color 		: "primary",				
						
					},
					{
						key  		: "confirm_delete_item",
						action  	: "confirm_delete_item",
						icon 		: "mdi-delete",		
						color 		: "error",				
						show_in 	: ["admin", "manager"],						
						tooltip 	: "delete",						
					},
				]
			}
		],
		bus 			: {},

	}), // data

	created(){
		this.height = this.$vuetify.breakpoint.height - 150 ;
		this.formatSearch();
	}, // created

	watch : {
		options : {
			handler(val){
				if (val) {
					// console.log("REQUEST ")
					this.request({
						type 	: "post",
						api 	: "/api/v1/statistics/audits",
						key 	: "list",
						body 	: this.info,
 					});
				}
			}, deep : true
		}
	}, // watch
	computed : {
		list_render : function(){
			return this.list;
		},
	}, // computed

	methods : {
		actions(actionn, item, option){
			if (actionn) {			
				if (actionn.action == "search") {
					this.request({
						type 	: "post",
						api 	: "/api/v1/statistics/audits",
						key 	: "list",
						body 	: this.info,
 					});
				}else
				if (actionn.action == "add_item") {
					try{					
						this.parameters.requestss.action 	= "create";
						this.parameters.headd.title 		= "add_staff";						
						this.modal = {...this.parameters, info : {}};
					}catch(e){
						console.error("error set requests create ", e)
					}
				}else if (actionn.action == "update_item") {
					try{
						this.info_item = {
							item,
							action : "edit",
							index : option,
						};
						this.parameters.requestss.action 	= "edit";
						this.parameters.headd.title 		= "update_admin";						
						this.modal = { ...this.parameters , info : item }
					}catch(e){
						console.error("error set requests ", e)
					}
				}else if (actionn.action == "confirm_delete_item") {
					this.$EventBus.$emit("notifications",{
						type : "confirm_delete",
						ID   : this.ref,
					})					
					this.info_item = {
						item   : item,
						action : "delete_item"
					};

				}else if (actionn.action == "delete_item") {
					this.del();
				}
				else if (actionn.action == "close_modal") {
					if (item ) {
						if (item.action == "add") {						
							this.list.push({...item.item});
							this.total++;
						}else{							
							const {index}  = this.info_item; 
							if (index >= 0) {
								this.list.splice(index, 1, {...item.item});
								this.setInfoItemDefault();
							}

						}
					}
	    			this.modal = null;
	    		}
			}
		}, // actions
		
		setInfoItemDefault(){
			this.info_item = null;
		}, // setInfoItemDefault

		formatSearch(){
			let date 		= this.$ManagerSmith.getDateCurrent();			
			let subs  		= date.split("-");
			subs[2]  		= "01";
			const startDate = subs.join("-"); 

			this.info = {
				module : "admissions",
				startDate,
				finalDate : date,
			};
		}, // formatSearch

		request(req){
			if (req) {
				this.loading = true;
				this.$Axios[req.type](req.api, { ...req.body } ).then(res => {
					this.loading = false;
					if (res && res.data) {
						// console.log("RESPONSE ", res.data)
						if (req.key && req.key_main) {
							this[req.key_main][req.key] = res.data;
						}else
						if (req.key && req.key != "list") {
							this[req.key] = res.data; 
						}
						if (req.key == "list") {
							console.log("LIST ")
							this.list = res.data;
							if (res.data.count) {
								this.total = res.data.count;
							}else{
								this.total = this.list.length ;
							}
						}
						if (req.action) {
							this.actions({action : req.action}, res.data);
						}
						if (req.notification) {
							this.$EventBus.$emit("notifications",{
								type 	: req.type_notification,
								msg 	: this.$t(req.notification),
							})
						}
						
					}
				}).catch(er => {	
					this.loading = false;					
					console.log("Error request info ", er);
					if (req.notification) {
							this.$EventBus.$emit("notifications",{
								type 	: "error",
								msg 	: this.$t(req.error_notification),
							})
						}
				})
			}
		}, // request

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
		}, // del

		check_role(item){
			if (item) {
				if (item.show_in && item.show_in.length > 0) {
					if (item.show_in.includes(this.user.role)) {
						return true;
					}else if (item.show_in.includes("*")){
						return true;
					}
				}
			}
			return false;
		}, // check role

		rendered_listed(item){
			if (item) {				
				if (item.global_list) {
					return this.$ManagerSmith.render_listed(item);
				}else
				if (typeof item.list == "string") {
					return this[item];
				}else if (item.list && item.list.length > 0 && Array.isArray(item.list)) {
					return item.list;
				}
			
			}
			return [];
		}, // render listed
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