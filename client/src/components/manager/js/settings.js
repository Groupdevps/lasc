import modal from "../../info/modal.vue"

export default {
	name 	: "settings_manager",
	components : {
		modal,
	}, 
	data 	: (vm) => ({

		info 		: {},
		info_item 	: {},
		head 		: {
			title 				: vm.$t("settings"),
			class_title			: "pa-1 grey white--text body-1 text--upper",
			class_icon_title 	: "mx-1",
			icon_title			: "mdi-cog",
			color_icon			: "white",
 			icon2_title 		: "mdi-plus",
			action_icon2 		: "show_add",
			icon2_btn_color 	: "primary",
			class_text			: "pa-1",
			class_actions		: "",
			hideHeaders 		: false,
			hideFooter 			: false,
			class_table 		: "",
			height_table 		: "400px",
			height_add 			: "25px",
			width_add 			: "25px",
		}, 
		info_req 	: {
			create 		: "",
			update 		: "",
			get 		: "",
			del 		: "",
		},
		ref 				: "settings_manager",
		bus 				: {},
		modal 				: null,
		loading 			: false,
		options 			: { itemsPerPage : 30 },
		total 				: 0,
		list 				: [],
		headers 			: [
			{ text : vm.$t("service_provider") , value : "service_provider" },
			{ text : vm.$t("name_service") , value : "name_service" },
			{ text :  vm.$t("days_response") , value : "days_response" },

		],
		fields 		: [
			{
				key  : "service_provider",
				text : vm.$t("service_provider"),
				type : "select",
				list : "type_services",
				item_value : "key",
				item_text  : "text",
			},
			{
				key  : "name_service",
				text : vm.$t("name_service"),
				type : "text",	

			},
			{
				key  : "days_response",	
				text : vm.$t("days_response"),
				type : "text",	

			},
		],
		type_services : [ 
			{
				key 	: "eps",
				text 	: "EPS",				
			},
			{
				key 	: "ips",
				text 	: "IPS",				
			},
		],
	}), // data

	created(){
		
	}, // created

	watch 	: {
		options : {
			handler(){
				// this.get()
			}, deep : true,
		}, // options
	}, // watch

	computed : {
		render_list : function(){
			if (this.list && this.list.length > 0) {
				this.total += this.list.length; 
			}
			return this.list;
		}, // render list

	}, // computed
	
	methods  : {
		actions(action, item, option){
			console.log("*** actions setting  : " + this.ref, action, "\n item : ", item , "\n option : ", option)
			if (action) {

			if (action.action == "close_modal") {

				this.modal = null;
				if (action.item) {
					this.list.push(action.item);
				}
			}
			if (action.action == "show_add") {
				this.modal = {
					contentt : {
						title  : "",
						fields : [
							{
								key 		: "service_provider",
								text 		: this.$t("service_provider"),
								type 		: "select",
								list 		: "services",
								show 		: true,
								rules 		: "",
								item_value 	: "key",
								item_text 	: "text",
								cols 		: 12,
							},
							{
								key 		: "name_service",
								text 		: this.$t("name_service"),
								type 		: "text",
								
								show 		: true,
								rules 		: "",
								item_value 	: "",
								item_text 	: "",
								cols 		: 12,
							},
							{
								key 		: "days_response",
								text 		: this.$t("days_response"),
								type 		: "number",
								
								show 		: true,
								rules 		: "",
								item_value 	: "",
								item_text 	: "",
								cols 		: 12,
							},
							

						]
					},					
					listss 	: {
						services : [
							{ text : "IPS", key  : "ips" },
							{ text : "EPS", key  : "eps" }
						],
						

					}, 
					headd 	: { 
						title : this.$t("new_service"),
					},					
					requestss :{
						edit 	: "",
						create 	: "",
						action 	: "create",
						action_key : "content",

					},
					showw : {
						actions : true,
					},
				};
			}
			}else{
				console.warn("Required action should exist", action);
			}
		}, // actions

		get(){
			if (this.info_req) {
				const { page } = this.options;
				const api = this.info_req.get + page;
				this.loading = true;
				this.$Axios.get(api).then(res =>{
					this.loading = false;
					if (res && res.data && res.data.rows && res.data.rows.length > 0) {
						this.list = [...res.data.rows];
						/*this.$EventBus.$emit("notifications",{
							type 	: ""
						});*/
					}
				}).catch(er => {
					this.loading = false;
					console.warn("Error get info ", er);

				})
			}else{	
				console.warn("Required request")
			}
		}, // get

		save(){
			if (this.info_req) {
			
				const api 		= this.info_req.create ;
				let info_up 	= { ...this.info };
				this.loading 	= true;
				this.$Axios.post(api, info_up).then(res =>{
					this.loading = false;
					if (res && res.data) {
						this.list.push({...res.data});
						this.$EventBus.$emit("notifications",{
							type 	: "created",
							message : "item",
						});
					}
				}).catch(er => {
					this.loading = false;
					console.warn("Error create info ", er);
					this.$EventBus.$emit("notifications",{
							type 	: "created",
							message : "item",
						});

				})
			}else{	
				console.warn("Required request")
			}
		}, // save

		update(){
			if (this.info_req  && this.info_item &&  this.info_item.id) {
			
				const api 		= this.info_req.update +  this.info_item.id;
				let info_up 	= { ...this.info };
				this.loading 	= true;
				this.$Axios.post(api, info_up).then(res =>{
					this.loading = false;
					if (res && res.data) {
						this.list.push({...res.data});
						this.$EventBus.$emit("notifications",{
							type 	: "updated",
							message : "item",
						});
					}
				}).catch(er => {
					this.loading = false;
					console.warn("Error update info ", er);
					this.$EventBus.$emit("notifications",{
							type 	: "updated",
							message : "item",
						});

				})
			}else{	
				console.warn("Required request or id to udpate")
			}
		}, // update

		del(){
			if (this.info_req && this.info_item &&  this.info_item.id) {
				
				const api = this.info_req.del + this.info_item.id;
				this.loading = true;
				this.$Axios.delete(api).then(res =>{
					this.loading = false;
					if (res && res.data && res.data.rows && res.data.rows.length > 0) {
						this.list = [...res.data.rows];
					}
					let idx = this.list.findIndex(x => (x && x.id == this.info_item));
					if (idx >= 0) {

						this.list.splice(idx, 1);
						this.$EventBus.$emit("notifications",{
							type 	: "deleted",
							message : "item",
						});
					}
				}).catch(er => {
					this.loading = false;
					this.$EventBus.$emit("notifications",{
						type 	: "error",
						message : "delete item",
					});
					console.warn("Error del info ", er);

				})
			}else{	
				console.warn("Required request or id to del")
			}
		}, // del

	}, // methods
	
	mounted(){
		let temp = "notifications" + this.ref;
		this.$EventBus.$on(temp, this.bus[temp] = (action) =>{
			if (action) {
				this.actions(action);
			}
		});

	}, // mounted

	beforeDestroy(){
		this.$Helper.clear_bus(this.$EventBus, this.bus, this.ref);
	}, // beforeDestroy

}; // export default