import modal from "../../info/modal.vue"
export default {
	name 	: "manager",
	props 	: ["info_to_comp"],
	components : {
		modal,
	}, 
	data 	: (vm) => ({
		info 		: {},
		info_item 	: null,
		list 		: [],
		head 		: {
			title 				: "", 
			class_title 		: "body-2 blue-grey  pa-1 white--text text-uppercase",
			icon_title 			: "mdi-human-capacity-increase",
			color_icon_title 	: "white",
			class_icon_title 	: "mx-1",
			class_text 			: "",
			class_actions		: "",
			btn_action 			: "",
			class_btn_action 	: "",
			color_btn_action 	: "",						 
			btn_action2 		: "",
			class_btn_action 	: "",
			color_btn_action 	: "",
			class_table   		: "elevation-1",
			class_card_table 	: "",
			hideHeaders 		: true,
			hideFooter 			: true,
			icon2_color 		: "white",
			action_icon2 		: "show_add",
			icon2_title 		: "mdi-plus",
			icon2_btn_color 	: "primary",	
			height_table 		: "400px",
			width_add 			: "25px",
			height_add 			: "25px",
		},	
		loading 	: false,
		ID_notification 	: "",
		headers 	: [],
		fields 		: [],
		card_texts 	: [],
		options 	: { itemsPerPage : 30 },
		total 		: 0,
		modal 		: null,
		info 		: {},
		bus 		: {},
		show 		: {
			btn_add : false,
		},
	}), // data

	created(){
		this.render_props();	

	}, // created
	watch 	: {
		options : {
			handler(){
				this.get();
			}, deep : true,
		}, // options

	}, // watch

	computed : {
		render_list: function(){
			return this.list;
		}, // render list

		
	}, // computed

	methods : {
		actions(action, item, option){
			console.log("action : ", action, "\n item : ", item, "\n option : ", option);
			if (action.action == "show_add") {

			}else
			if (action.action == "close_modal") {
				this.modal = null;
			}else
			if (action.action == "add_new_procedure") {
				/*
					Requiere Autorizacion
					Selecionar Proveedor
					Selecionar EPS
					Centros de Laboratorio
					Centros de Radiologia
					Farmacia
					Suministro
					Seleccione Archivo
					Seleccione Anexo
				*/
				this.modal = {
					contentt : {
						title  : "",
						fields : [
							{
								key 		: "requires_authorization",
								text 		: this.$t("requires_authorization"),
								type 		: "select",
								list 		: "requirements",
								show 		: true,
								rules 		: "",
								item_value 	: "key",
								item_text 	: "text",
								cols 		: 12,
							},
							{
								key 		: "supplier",
								text 		: this.$t("supplier"),
								type 		: "select",
								list 		: "suppliers",
								show 		: false,
								rules 		: "",
								item_value 	: "",
								item_text 	: "",
								cols 		: 12,
							},
							{
								key 		: "eps",
								text 		: this.$t("EPS"),
								type 		: "select",
								list 		: "centers",
								show 		: false,
								rules 		: "",
								item_value 	: "",
								item_text 	: "",
								cols 		: 12,
							},
							{
								key 		: "laboratory_centers",
								text 		: this.$t("laboratory_centers"),
								type 		: "select",
								list 		: "laboratories",
								show 		: false,
								rules 		: "",
								item_value 	: "",
								item_text 	: "",
								cols 		: 12,
							},
							{
								key 		: "radiology_centers",
								text 		: this.$t("radiology_centers"),
								type 		: "select",
								list 		: "radiologys",
								show 		: false,
								rules 		: "",
								item_value 	: "",
								item_text 	: "",
								cols 		: 12,
							},
							{
								key 		: "pharmacy",
								text 		: this.$t("pharmacy"),
								type 		: "select",
								list 		: "pharmacys",
								show 		: true,
								rules 		: "",
								item_value 	: "",
								item_text 	: "",
								cols 		: 12,
							},
							{
								key 		: "supplies",
								text 		: this.$t("supplies"),
								type 		: "select",
								list 		: "supplies",
								show 		: true,
								rules 		: "",
								item_value 	: "",
								item_text 	: "",
								cols 		: 12,
							},
							{
								key 		: "file",
								text 		: this.$t("file_selection"),
								type 		: "file",
								show 		: true,
								rules 		: "",
								item_value 	: "",
								item_text 	: "",
								cols 		: 12,
							},

						]
					},					
					listss 	: {
						requirements : [
							{ text : "si", key  : "si" },
							{ text : "no", key  : "no" }
						],
						suppliers : [],
						centers   : [],
						laboratories : [],
						radiologys : [],
						pharmacys  : [],
						supplies  : [],

					}, 
					headd 	: { 
						title : this.$t("new_procedure"),
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
				}
			}
		}, // actions

		render_props(){
			console.log("load props ", this.info_to_comp)
			if (this.info_to_comp) {
			 	if (this.info_to_comp.title){
			 		this.head.title = this.info_to_comp.title;
			 		this.ref 		= this.info_to_comp.title;
			 	}
			 	if (this.info_to_comp.requests) {
			 		this.info_req =  this.info_to_comp.requests;
			 	}
			 	if (this.info_to_comp.btn_add) {
			 		this.show.btn_add = true;
			 		if (this.info_to_comp.btn_action_add) {
			 			this.head.action_icon2 = this.info_to_comp.btn_action_add;
			 		}
			 	}
			}
		}, // render props 

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
		let temp = "notifications" + this.ID_notification 
		this.$EventBus.$on(temp, this.bus[temp] = (action)=>{
			if (action) {
				this.actions(action);
			}
		});
	}, // mounted

	beforeDestroy(){
		this.$Helper.clear_bus(this.$EventBus, this.bus, "manager");
	}
}; // export default