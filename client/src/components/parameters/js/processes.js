export default {
	name 	: "processes",
	data 	: (vm) => ({
		info 		: {},
		ref 		: "processes",
		info_item 	: null,
		bus 		: {},
		height 		: "",
		headers 	: [
			{ text  : vm.$t("name"), value : "name" },
			{ text  : vm.$t("description"), value : "description" },
			{ text  : "", value : "data-table-expand" },

		],
		head 		: {	
			class_title 	: "",
			title 			: "",
			class_text 		: "",
			single_expanded : false,
			title_toolbar 	: vm.$t("processes"),
			color_toolbar 	: "primary",
			icon_toolbar_class 	: "mx-1",
			icon_toolbar 		: "mdi-vector-circle",
			icon_toolbar_color 	: "white",
 			class_toolbar 	: "pa-0 body-1 white--text",
			height_toolbar 	: "30px",
			width_expand	: 1000,
			sheet_class 	: "my-1", // mx-auto
			slide_class 	: "mr-2", // pa-4
			slide_item_class 	: "mx-1", 
			color_slide 		: "success",
			class_card_slide 	: "",
			height_card_slide 	: "230",
			width_card_slide 	: "250",
			card_icon 			: "mdi-progress-pencil", // 'mdi-close-circle-outline'
			card_icon_class 	: "mr-1",
			card_icon_color 	: "primary",
			card_icon_size 		: 48,
			card_icon1 			: "mdi-delete", // 'mdi-close-circle-outline'
			card_icon1_color 	: "error",
			card_icon1_size 		: 48,
			card_text 			: "",
			card_class_title 	: "pa-0 pl-1 body-1 secondary white--text",			
			card_row_class 		: "fill-height",
			card_row_align 		: "center",
			card_row_justify 	: "center",
			card_text_class		: "pa-1",
			card_action_class 	: "pa-1",
			key_select 			: "process",			
			key_roles 			: "roles",
			key_description 	: "description",
			action_color_1 		: "error",
			action_btn_1 		: "cancel_sub_proccess",
			action_text_1 		: "cancel",
			action_color_2 		: "primary",
			action_btn_2 		: "save_sub_proccess",
			action_text_2 		: "update",
			btn_add_icon 		: "mdi-view-grid-plus",
			btn_add_color 		: "primary",
			btn_add_action 		: "add_new_sub_proccess",
			btn_new_icon 		: "mdi-table-row-plus-before",
			btn_new_color 		: "white",
			btn_new_action 		: "add_new_proccess",

		} ,
		slide_group 	: null, 	
		expanded 		: [],
		roles 			: [],
		show 			: {
			edit_step 	: true,
			edition 	: true,
		},
		loading 		: false, 	
		info_proccesses : [],		
		processes 		: [
			{
				key 	: "case_1",				
				case  	: "urgency",
				name 	: "urgency",
				description : "Order para proceso en casos de urgencias",
				sub_process : [
					{ 
						name 	: "admissions",						
						roles 	: [],
						description : "Registrar ingreso paciente con asignacion de urgencias",
						step 	: 0,
					},
					{ 
						
						name  	:  "triage",
						roles 	: [],
						description : "",
						step 	: 1,

					},
					{ 
						name 	: "medico",
						roles 	: [],
						description : "",
						step 	: 2,
					},
					{ 
						name 	: "suministers",

						roles 	: [],
						description : "",
						step 	: 3,
					},
					{ 
						name 	: "procediment",
						name  	:  "",
						description : "",
						step 	: 4,
					},

					{ 
						name 	: "revision",
						roles 	: [],
						description : "",
						step 	: 5,
					},
					{ 
						name 	: "high_medica",
						roles 	: [],
						description : "",
						step 	: 6,
					},
					{ 
						name 	: "high_nurse",
						roles 	: [],
						description : "",
						step 	: 7,
					},
					{ 
						name 	: "Facture",												
						roles 	: [],
						description : "",
						step 	: 8,
					},
				],	
			},
			{
				key 	: "case_2", 
				case  	: "date",
				name 	: "date",
				description : "Order para proceso en casos de realizar citas",

				sub_process : [
					{ 
						
						name  	:  "admissions",
						type 	: "view",
						roles 	: [],
						description : "",
						step 	: 0,
					},
					{
						
						name  		:  "agenda",
						roles 		: [],						
						type 		: "",						
						description : "",
						step 		: 1,
					},
					{
						key 	: "medico",
						name  	:  "",
						roles 	: [],						
						type 	: "",
						description : "",
						step 	: 2,
					}
				],
			},
			{
				key 	: "case_3", 
				case  	: "odontologia",
				name 	: "odontologia",
				description : "Order para proceso en casos de odontologia",
				sub_process : [
					{ 
						name 	: "admissions",						
						roles 	: [],
						description : "",
						step 	: 0,
					},
					{ 
						name 	: "medico_odontologic",						
						roles 	: [],
						description : "",
						step 	: 1,
					},
					{ 
						name 	: "facture",						
						roles 	: [],
						description : "",
						step 	: 2,
					},
				],
			}
		],
		  
	}), // data

	created(){
		
	}, // created

	computed : {
		width_expand : {
			 get() {
				// console.log("width ++++++++++++ ", this.width_expand = this.$vuetify.breakpoint.width)
				return (this.$vuetify.breakpoint.width - 100);
			},
			set(val){
				
			} 
		}, // width expand

		render_processes:function(){
			return this.processes;
		},
		
	}, // computed

	methods : {
		
		actions(action, item, option){
			if (action) {
				console.log("actions ", action, item, option, this.processes)
				if (action.action == "reorder_sub_process") {
					if (action.index >= 0) {						
						action.list[action.item.step].step = action.index;
						let temp = action.list[action.item.step];						
						action.list.splice(action.item.step, 1);
						action.list.splice(action.item.step, 0, action.list[action.index]);						
						action.list.splice(action.item.index, 1);
						action.list.splice(action.item.index, 0, temp);				
						// [ action.list[action.index],action.list[action.item.step] ] = [ action.list[action.item.step], action.list[action.index] ]							
					}
				}
			}

		}, // actions


		
		render_order(val){
			if (val && val.length > 0) {
				return val.sort((a, b)=>{
					return a.step - b.step;
				})
			}
			return [];
		}, // render order

		get(){
			
			const api 		= "/api/process";
			this.loading 	= true;
			this.$axios.get(api).then(res => {
				this.loading = false;
				if (res && res.data && res.data.rows) {
					this.processes = res.data.rows;

				}
			}).catch( er => {
				this.loading = false;				
				console.log("er get processes ", er)
			})
		

		}, // get
		
		save_process(){
			const api 		= "/api/process";
			let info_up		= {...this.info };

			this.loading 	= true;
			this.$axios.post(api, info_up).then(res => {
				this.loading = false;
				if (res && res.data) {
					this.processes.push(res.data);
					this.$EventBus.$emit("notifications",{
						type 		: "saved",
						message 	: this.$t("process"),
					});
				}
			}).catch( er => {
				this.loading = false;				
				this.$EventBus.$emit("notifications",{
					type 		: "error",
					message 	: this.$t("process"),
				});
				console.log("er create processes ", er);
			})

		}, // save

		save_sub_process(){
			const api 		= "/api/sub_process";
			let info_up		= {...this.info };

			this.loading 	= true;
			this.$axios.post(api, info_up).then(res => {
				this.loading = false;
				if (res && res.data) {
					let idx = findIndex(x => (x && x.id == info_up.processId));
					if (idx >= 0) {
						this.processes[idx].sub_process.push(res.data);
						this.$EventBus.$emit("notifications",{
						type 		: "saved",
						message 	: this.$t("sub_process"),
					});
					}
				}
			}).catch( er => {
				this.loading = false;				
				this.$EventBus.$emit("notifications",{
					type 		: "error",
					message 	: this.$t("sub_process"),
				});
				console.log("er create sub processes ", er)
			})
		},

		update(item){
			if (item && item.id) {

				const api 		= "/api/process/" + item.id;
				let info_up		= { ...item };

				this.loading 	= true;
				this.$axios.put(api, info_up).then(res => {
					this.loading = false;
					this.$EventBus.$emit("notifications",{
						type 		: "update",
						message 	: this.$t("process"),
					});
					if (res && res.data) {
						// this.processes.push(res.data);
					}
				}).catch( er => {
					this.loading = false;				
					this.$EventBus.$emit("notifications",{
						type 		: "error",
						message 	: this.$t("process"),
					});
					console.log("er update processes ", er)
				})
			}
		}, // update

		update_sub_process(item){
			if (item && item.id) {

				const api 		= "/api/sub_process/" + item.id;
				let info_up		= { ...item };

				this.loading 	= true;
				this.$axios.put(api, info_up).then(res => {
					this.loading = false;
					this.$EventBus.$emit("notifications",{
						type 		: "updated",
						message 	: this.$t("sub_process"),
					});
					if (res && res.data) {
						// this.processes.push(res.data);
					}
				}).catch( er => {
					this.loading = false;		
					this.$EventBus.$emit("notifications",{
						type 		: "error",
						message 	: this.$t("sub_process"),
					});
					console.log("er update sub processes ", er)
				})
			}
		},
		
		del(item){
			if (item && item.id) {

				const api 		= "/api/process/" + item.id;
				let info_up 	= { ...item }; 

				this.loading 	= true;
				this.$axios.delete(api).then(res => {
					this.loading = false;
					let idx = findIndex(x => (x && x.id == info_up.id));
					if (idx >= 0) {
						this.processes[idx].splice(idx, 1);
						this.$EventBus.$emit("notifications",{
							type 		: "deleted",
							message 	: this.$t("process"),
						});
					}
				}).catch( er => {
					this.loading = false;				
					this.$EventBus.$emit("notifications",{
						type 		: "error",
						message 	: this.$t("process"),
					});
					console.log("er delete processes ", er)
				})
			}
		},// del

		del_sub_process(item){
			if (item && item.id) {

				const api 		= "/api/process/" + item.id;
				let info_up 	= { ...item }; 

				this.loading 	= true;
				this.$axios.delete(api).then(res => {
					this.loading = false;
					let idx = findIndex(x => (x && x.id == info_up.processId));
					if (idx >= 0) {
						let idx2 = this.processes[idx].sub_process.findIndex(z => (z && z.id == info_up.id));
						if (idx2 >= 0) {

							this.processes[idx].sub_process.splice(idx2, 1);
							this.$EventBus.$emit("notifications",{
								type 		: "deleted",
								message 	: this.$t("sub_process"),
							});
						}
					}
				}).catch( er => {
					this.loading = false;				
					this.$EventBus.$emit("notifications",{
						type 		: "error",
						message 	: this.$t("sub_process"),
					});
					console.log("er delete sub process ", er);
				})
			}
		},// del


	}, // methods
	
	mounted(){
		let temp = "notifications" + this.ref;
		this.$EventBus.$on(temp , this.bus[temp] = (action)=>{
			if (action) {
				this.actions(action);
			}
		})
		
	}, // mounted

	beforeDestroy(){
		this.$Helper.clear_bus(this.$EventBus, this.bus, "processes");
	}, // beforeDestroy

}; // export default