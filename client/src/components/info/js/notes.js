import medical_notes_params 	from "@/components/medico/js/medical_notes_params.js"
import nursing_notes_params 	from "@/components/nursing/js/nursing_notes_params.js"
import medical_history 			from "@/components/info/MedicalHistoryComponent.vue"

// import notes_params
import dates 			from "@/helpers/dates.vue"
import table_field 		from "@/components/info/table_field.vue"
import searcher 		from "@/helpers/searcher.vue"


export default{
	name 		: "notes",
	components 	: {
		dates,
		table_field,
		searcher,
		medical_history,
	}, // components
	props :[
		"info_to_component",
		"ref_to_component",
		"update_to_component",
		"route",
		"reference_form",
	],
	data : () => ({
		info 			  	: {},
		info_patient 	  	: {},
		info_attention 		: null,
		info_comp  			: {},
		list_observations 	: [ {fecha : "10:30:00", observacion : "lorem ipsum tesd asdo aosdasidaid jas iasjdoasdoiasdj"}],
		info_fields 		: medical_notes_params,
		head : {
			title : 'Notas'
		},		
		btn : {
			title   : 'save',
			color 	: 'success', 
			action  : 'save',
			isDisabled : false,
		},
		show 		: {
			medical_history : false,
		},
		ref 	  	: "notes",
		field_ref 	: "",
		list_fields : {
			medical_notes_params,
			nursing_notes_params,
		}, 
		requests  	: {
			medical_notes : {
				get 	: "/api/v1/evolution-note/",
				find  	: "/api/v1/find/evolution-note/",
				create  : "/api/v1/evolution-note",
				update  : "/api/v1/evolution-note/",
				delete  : "/api/v1/evolution-note/",
			},
			nursing_notes : {
				get 	: "/api/v1/evolution-note-nursing/",
				find  	: "/api/v1/find/evolution-note-nursing/",
				create  : "/api/v1/evolution-note-nursing",
				update  : "/api/v1/evolution-note-nursing/",
				delete  : "/api/v1/evolution-note-nursing/",	
			}
		},

	}), // data

	created(){
		if (this.info_to_component) {
			this.render_info(this.info_to_component);
		}
		if (this.ref_to_component) {
			this.ref += this.ref_to_component; 
		}
	}, // created

	watch : {
		update_to_component : function(item){
			// console.log("update item ", item)
			this.updateInfoNote(item);
		},
	},

	computed : {
		render_observations : function(){
			return this.list_observations;
		}
	}, // computed	

	methods : {
		actions(actionn, item, option){
			if (actionn) {
				const { action } = actionn; 			
				if (action == "action_table") {
					if (item && item.key_main) {
						this.info[item.key_main] = item.values;
					}
				}
				if (action == 'save') {
					// console.log("CHECK SAVE ", this.field_ref, this.requests)
					if (this.requests && this.requests[this.field_ref] && this.requests[this.field_ref].create) {}
					this.save({
						url : this.requests[this.field_ref].create,
					});
				}
				if (action == 'update') {
					if (this.info && this.info.id && this.requests && this.requests[this.field_ref] && this.requests[this.field_ref].update) {
						this.update({
							url : this.requests[this.field_ref].update + this.info.id, 
						});
					}
				}
			}
		}, // action

		// renders
		render_info(item){
			console.log("NOTES LOAD  render ", item)
			if (item) {
				if (item) {
					this.info 		 	= { ...item };
					// this.info_attention = { ...item };
					this.info_patient   = { ...item };
					this.field_ref   	= this.reference_form;					
					this.info_comp 		= { ...this.info_patient }; 
						 	  					
	  					

					
					if (this.route && this.route == "dashboard_nursing") {
						this.show.medical_history = true;
					}
					if (this.field_ref && this.list_fields[this.field_ref + "_params"]) {
						this.info_fields = this.list_fields[this.field_ref + "_params"]; 
					}
					if (this.requests && this.requests[this.field_ref] && this.requests[this.field_ref].find && this.info &&this.info.AttentionId) {
						this.findByAttention({
							url  : this.requests[this.field_ref].find,
							body : { AttentionId : this.info.AttentionId }
						})
					}else{
						console.warn("Not have AttentionId or requests find");
					}
					
				}			
			}
		}, // render info

		updateInfoNote(item){
			if (item) {
				if (item.SubDiagnoseLists && item.SubDiagnoseLists.length > 0) {
					this.info.SubDiagnoseLists = item.SubDiagnoseLists;
				}
			}
		}, // updateInfoNote

		render_listed(item){
			if (item) {
				let temp = []
				if (item.global_list) {;
					temp = this.$ManagerSmith.render_listed(item);
				}
				if (temp && temp.length === 0 && typeof item.list  == "string") {
					temp = this[item];
				}
				// console.log("LIST ", temp)
				return temp;
			}
			return [];				
		}, // render listed

		// requests

		get(req){
			if (req) {

				const api 	= req.url;
				
				this.$Axios.get(api).then( res => {
					this.$EventBus.$emit("notifications", {
						type 	: "success",
						msg 	: this.$t('info_found')
					})
					if (res && res.data) {
						this.info = { ...this.info, ...res.data };
					}
				}).catch( er => {
					console.log("Error get " , er);
					this.$EventBus.$emit("notifications", {
						type 	: "error",
						msg 	: er
					});
				})
			}
		}, // get

		save(req){
			if (req) {

				const api 			= req.url;
				let info_up 		=  { ...this.info };
				this.btn.isDisabled = true;
				this.$EventBus.$emit("notifications", {
            		type 	: "primary",
            		message : this.$t("saving_information"), // login_user
            		loading : true,
            	});

				this.$Axios.post(api, info_up).then( res => {
					this.$EventBus.$emit("notifications", {
						type 	: "success",
						msg 	: this.$t("registered_information")

					});
					this.btn.action = "update";
					this.btn.title  = "update";
					this.btn.isDisabled = false;

					if (res && res.data) {
						this.info = { ...this.info, ...res.data };

					}
					// this.renderFindAttention();					
					this.$ManagerSmith.Sound.play("sound1");
				}).catch( er => {
					this.btn.isDisabled = false;
					// console.log("Error  save ", er);
					this.$EventBus.$emit("notifications", {
						type 	: "error",
						msg 	: er
					});
				});
			}
		}, // save //
		update(req){
			if (req) {

				const api 			= req.url;				
				let info_up 		=  { ...this.info };
				this.btn.isDisabled = true;
				this.$Axios.put(api, info_up).then( res => {
					this.$EventBus.$emit("notifications", {
						type 	: "updated"
					});
					if (res && res.data) {
						this.info = { ...this.info, ...res.data };
					}
					this.btn.isDisabled = false;
					this.$ManagerSmith.Sound.play("sound1")
				}).catch( er => {
					this.btn.isDisabled = false;
					console.log("Error update ", er);
					this.$EventBus.$emit("notifications", {
						type 	: "error",
						msg 	: er
					});
				});
			}
		}, // update //

		findByAttention(req){ 
			if (req) {

				const api 	= req.url;
				
				this.$Axios.post(api, req.body).then( res => {
					this.$EventBus.$emit("notifications", {
						type 	: "success",
						msg 	: this.$t('info_found')
					})

					if (res && res.data) {
						this.info = { ...this.info, ...res.data };
						this.btn.action = "update";
						this.btn.title  = "update";
					}
				}).catch( er => {
					console.log("Error get " , er);
					this.$EventBus.$emit("notifications", {
						type 	: "error",
						msg 	: er
					});
				})
			}
		}, // find
	}, // methods
};