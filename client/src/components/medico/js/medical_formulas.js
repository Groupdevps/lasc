import fields_params  	from "@/components/medico/medico/js/clinic_history_params.js"
import dates 			from "@/helpers/dates.vue"
import searcher  		from "@/helpers/searcher.vue"
import table_field 		from "@/components/info/table_field.vue"

export default {
	name : "clinic_history",
	components : {
		dates,
		searcher,
		table_field,
	}, //components
	data : () => ({
		info 		 	: {},
		info_patient 	: {},
		head   			: {
			title 	 : "Historia Clinica",
			subtitle : "",
		},
		button : {
			title  : "Registrar", 
			color  : "primary",
			action : "save"
		},
		info_fields 		: fields_params,
		list_diagnosticos  	: [],
		list_observacions 	: [],
		id_notification 	: 'clinic_history',
		info_table 			: {},
		
		info_del : {
			item   : null,
			table  : null,
			action : null,
		},
		bus 	 	: {},
		options_top : [
			{

			}
		],
		loading : false,
		
	}), // data

	created(){

	}, // created

	computed : {
		render_list_fields(){
			
			return this.info_fields
		}, // 
	}, // computed

	methods : {
		testt(){
			return true
		},

		actions(act, key, item, opt ){
			console.log( "actions clinic_history : ",  act, key, item, opt )
			if (act == 'add_table') {

				if (opt && this[opt]) {
					this[opt].push({ [key] : item });
					// this.info_table[item] = "";
				}

			}
			if (act == 'confirm_del_table') {
				this.$EventBus.$emit('notifications',{
					type : "confirm_delete",
					ID   : this.id_notification,
				})
				this.info_del = {
					item   : item,
					table  : opt,
					action : "del_table"
				};
			}
			if (act == 'del_table') {
				if (opt && this[opt]) {
					let idx = this[opt].indexOf(item);
					console.log(idx, "del")
					if (idx >= 0) {

						this[opt].splice(idx, 1);
						this.info_del = {
							item   : null,
							table  : null,
							action : null,
						};
					}
				}
			}	
			if (act == 'action_table') {
				const { action, key, value, option,  } = item;
				this.actions(action, key, value, option);
			}
			if (act == 'save') {
				this.save();
			}

			if (act == 'del') {
				this.$EventBus.$emit('notifications',{
					type : "confirm_delete",
					ID   : this.id_notification,
				})
				this.info_del = {
					item   : item,
					table  : opt,
					action : "del"
				};
			}
		}, // actions
		
		render_listed(item){
			if (this[item]) {
				return this[item];
			}
		}, // render listed

		get(){
			const api 	= "/enpoint";
			
			this.$axios.get(api).then( res => {
				this.$EventBus.$emit("notifications", {
					type 	: "success",
					msg 	: this.$t('info_found')
				})
			}).catch( er => {
				console.log("Error get " , er);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: er
				});
			})
		}, // get

		save(){
			const api 	= "/enpoint";
			let opt 	= "post";
			let info_up =  { ...this.info };
			this.$axios[opt](api, info_up).then( res => {
				this.$EventBus.$emit("notifications", {
					type 	: opt == "post" ? "saved" : "updated",
				})
			}).catch( er => {
				console.log("Error  " , opt , er);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: er
				});
			});
		}, // save //

		del(){
			const api 	= "/enpoint";
			let info_up =  { ...this.info };
			this.$axios.delete(api).then( res => {
				this.$EventBus.$emit("notifications", {
					type 	: "deleted",
				})
			}).catch( er => {
				console.log("Error del " , er);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: er
				});
			})
		},//  del

	}, // methods

	mounted(){
		let temp = "notifications" + this.id_notification;
		this.$EventBus.$on(temp, this.bus[temp] = (action) => {
			console.log("notifications : ", action)
			if (action) {
				let { table, item, action } = this.info_del;
				this.actions(action, null,item, table);
			}
		});
		


	}, // mounted

	beforeDestroy(){
		this.$Helper.clear_bus(this.$EventBus, this.bus, "clinic_history");

	}, // before destroy
};