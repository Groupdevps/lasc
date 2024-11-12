<template>
	<v-container fluid>
			<v-card
				outlined
				:elevation = "7"
			>
				<v-card-title
					class  = "primary body-1 pa-1 white--text text-uppercase"
					v-show = "false"
				>
					<span>
						{{ head.title }}
					</span>
				</v-card-title>
				<v-card-subtitle
					class = "body-2 pa-0 "
				>
					<span>
						{{ head.subtitle }}
					</span>
				</v-card-subtitle>
				<v-card-text
					class = "pa-1 pt-5"
				>
					<v-row
						dense
					>
						<template
							v-for = "(item_field, idx_field) of render_list_fields"
						>		
						
							<v-col
								:key  = "idx_field + ref + 'comp'" 	
								:cols = "item_field.cols ? item_field.cols : 4 "
							>
								<span
									v-if  = "item_field.subtitle"
									class = "text-uppercase font-weight-medium"
 								>
									{{ $t(item_field.subtitle) }}
									<v-divider
										class = "pa-0 ma-0 primary"
										:inset = "true"
									></v-divider>
								</span>
								
								<v-text-field
									dense
									outlined
									hide-details
									v-else-if		= "['text', 'email'].includes(item_field.type)"
									:label 			= "$t(item_field.text)"
									v-model 		= "info[item_field.key]"
									:type 			= "item_field.type"
									:disabled 		= "item_field.isDisabled"
									@input 		 	= "(v) => info[item_field.key] = v.toUpperCase()"
									class 			= "text-uppercase"

								></v-text-field>
								<v-text-field
									dense
									outlined
									hide-details
									v-else-if		= "['number'].includes(item_field.type)"
									:label 			= "$t(item_field.text)"
									v-model.number	= "info[item_field.key]"
									:type 			= "item_field.type"
									:disabled 		= "item_field.isDisabled"
									@input 		 	= "(v) => {info[item_field.key] = v.toUpperCase()}"
									class 			= "text-uppercase"

								></v-text-field>
									<!-- @blur  			= "item_field && item_field.action ? item_field.action : '' " -->
								<v-select
									dense
									outlined
									hide-details
									:label 		= "$t(item_field.text)"
									v-model 	= "info[item_field.key]"
									:items 		= "render_listed(item_field)"
									:item-value	= "item_field.item_value"
									:item-text  = "item_field.item_text"
									v-else-if 	= "'select' == item_field.type"
									
									class 			= "text-uppercase"
									@change 	= "actions(item_field)"

								></v-select>
								<v-textarea
									dense
									outlined
									hide-details
									auto-grow          
							        counter
							        rows 			= "2"
							        row-height 		= "25"
									v-else-if		= "['textarea'].includes(item_field.type)"
									:label 			= "$t(item_field.text)"
									class 			= "text-uppercase"
									v-model 		= "info[item_field.key]"
									@input 		 	= "(v) => {info[item_field.key] = v.toUpperCase()}"
								></v-textarea>
								<table_field
									:key 				 = "'table_field_' + item_field.key"
									v-else-if			 = "item_field.type == 'table_field'" 
									:info_to_component   = "{...item_field, info_comp : info, nameForm : field_ref }"
									:update_to_component = "info[item_field.key]"					
									:ref_to_component  	 = "ref + item_field.key"		
																			
									@receive_info 		 = "actions({action : 'action_table'}, $event)"
								></table_field>
								
								<searcher
									v-else-if 	  			= "item_field.type == 'select_search'"
									:info_to_component 		= "item_field"
									:list_to_component 		= "render_listed(item_field)"
									:update_to_component 	= "info[item_field.key]"
									@receive_info 	 		= "actions(item_field, $event)"
								></searcher>
								<dates
									v-else-if		   = "	item_field.type == 'date_range' 	||
															item_field.type == 'time_picker'
														"
									:info_to_component = "item_field"
									:info_to_dates 	   = "info[item_field.key]"
									@receive_info	   = "info[item_field.key] = $event"
								></dates>
								<v-card outlined
									v-else-if   = "item_field.type == 'multi-text' "
								>
									<v-card-title
										class = "body-2 info pa-1 white--text text-uppercase"
									>
										<span>
											{{ item_field.text }}
										</span>
									</v-card-title>
									<v-card-text
										class = "pa-1"
									>
										<v-row
											dense

										>
											<template 
												v-for = "(item_field_sub, idx_sub) of item_field.sub_fields"
											>
												<v-col
													:key = "idx_sub"
												>
													<v-text-field
														dense
														outlined
														hide-details
														:label 		= "item_field_sub.text"
														v-model 	= "info[item_field_sub.key]"
														:type 		= "item_field_sub.type"
														v-if 		= "['text', 'number', 'email'].includes(item_field_sub.type)"
													></v-text-field>
												</v-col>
											</template>
										</v-row>
									</v-card-text>
								</v-card>
							</v-col>					
						</template>
					</v-row>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn						
						:color  	= "btn.color"
						@click  	= "actions(btn)"
						:disabled 	= "btn.isDisabled"
					>
						{{ $t(btn.title) }}
					</v-btn>
					<v-spacer></v-spacer>

				</v-card-actions>
			</v-card>
		</v-container>
</template>
<script 
	type = "text/javascript"	
>
	// params
import clinic_history_params  				from "@/components/medico/js/clinic_history_params.js"
import diagnostic_help_params  				from "@/components/medico/js/diagnostic_help_params.js"
import emergency_medical_history_params  	from "@/components/medico/js/emergency_medical_history_params.js"
import medical_formulas_params 				from "@/components/medico/js/medical_formulas_params"
import laboratory_order_params 				from "@/components/medico/js/laboratory_order_params"
import outpatient_orders_params  			from "@/components/medico/js/outpatient_orders_params"
import medical_orders_params  				from "@/components/medico/js/medical_orders_params"

// nursing
import supplies_params 						from "@/components/nursing/js/supplies_params"

// utils
import dates 								from "@/helpers/dates.vue"
import searcher  							from "@/helpers/searcher.vue"
import table_field 							from "@/components/info/table_field.vue"

export default {
	name : "medics_form",
	components : {
		dates,
		searcher,
		table_field,
	}, //components
	props : [
		"info_to_component",
		"props",
		"ref_to_component",
		"reference_form",
		"route",
		"update_to_component",
	],
	data : (vm) => ({ // pa-0 ma-0
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),			
		},
		// info_patient 	: {},
		head   			: {
			title 	 	: "Historia Clinica",
			class_title : "primary body-1 pa-1 white--text",
			subtitle 	: "",
			class_subtitle : "body-2 pa-0 ",
			class_text 		: "pa-1 pt-5",
		},
		btn 	: {
			title  : "register", 
			color  : "success",
			action : "save",
			isDisabled : false,
		},
		info_fields 		: clinic_history_params,
		list_fields  		: {
			clinic_history_params,
			diagnostic_help_params,
			emergency_medical_history_params,
			medical_formulas_params,
			laboratory_order_params,
			outpatient_orders_params,
			medical_orders_params,
			supplies_params
		},
		diagnoses  	: [],
		list_observacions 	: [],
		ref 				: 'clinic_history',
		field_ref 			: "",
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
		loading  : false,
		requests : {
			clinic_history : {
				get 	: "/api/v1/clinic-history/",
				find  	: "/api/v1/find/clinic-history/",
				create  : "/api/v1/clinic-history",
				update  : "/api/v1/clinic-history/",
				delete  : "/api/v1/clinic-history/",
			},
			diagnostic_help : {
				get 	: "/api/v1/diagnostic-help/",
				find  	: "/api/v1/find/diagnostic-help/",
				create  : "/api/v1/diagnostic-help",
				update  : "/api/v1/diagnostic-help/",
				delete  : "/api/v1/diagnostic-help/",	
			},
			emergency_medical_history : {
				get 	: "/api/v1/emergency-medical-history/",
				find  	: "/api/v1/find/emergency-medical-history/",
				find_1  : "/api/v1/find/triage",
				create  : "/api/v1/emergency-medical-history",
				update  : "/api/v1/emergency-medical-history/",
				delete  : "/api/v1/emergency-medical-history/",	
			},		
			medical_formulas: {
				get 	: "/api/v1/medical-formula/",
				find  	: "/api/v1/find/medical-formula/",
				create  : "/api/v1/medical-formula",
				update  : "/api/v1/medical-formula/",
				delete  : "/api/v1/medical-formula/",	
			},
			laboratory_order: {
				get 	: "/api/v1/laboratory-order/",
				find  	: "/api/v1/find/laboratory-order/",
				create  : "/api/v1/laboratory-order",
				update  : "/api/v1/laboratory-order/",
				delete  : "/api/v1/laboratory-order/",	
			},
			outpatient_orders: {
				get 	: "/api/v1/outpatient-order/",
				find  	: "/api/v1/find/outpatient-order/",
				create  : "/api/v1/outpatient-order",
				update  : "/api/v1/outpatient-order/",
				delete  : "/api/v1/outpatient-order/",	
			},
			medical_orders: {
				get 	: "/api/v1/medical-order/",
				find  	: "/api/v1/find/medical-order/",
				create  : "/api/v1/medical-order",
				update  : "/api/v1/medical-order/",
				delete  : "/api/v1/medical-order/",	
			},
			supplies : {
				get 	: "/api/v1/supply/",
				find  	: "/api/v1/find/supply/",
				create  : "/api/v1/supply",
				update  : "/api/v1/supply/",
				delete  : "/api/v1/supply/",		
			}

		}
		
	}), // data
	watch:{
		"info.size" :function(val){			
			this.actions({action : "setISC"})			
		},
		"info.weight": function(val){			
			this.actions({action : "setISC"});
		},
		update_to_component : function(item){
			console.log("update item ", item)
			this.updateInfo(item);
		},

	}, // watch

	created(){
		if (this.info_to_component) {
			this.render_info(this.info_to_component);
		}
		if (this.ref_to_component) {
			this.ref = "forms" + this.ref_to_component;
		}

	}, // created

	computed : {
		render_list_fields(){			
			return this.info_fields
		}, // 

		render_diagnoses: function(){
			return this.diagnoses; 
		}, 
	}, // computed

	methods : {
		testt(){
			return true
		},

		actions(action, item, option ){
			console.log( "actions   " + this.ref + ": act ",  action," item ",  item, " option ", option )
			if (action) {
				if (action.action == "set_eps") {
					// console.log("SET EPS ", item)
					const { id , name } = item;
					this.info[action.key_main] = {...this.info.ServiceProvider , assignedCenterId : id, nit :  name, assignedCenter : name };												
				}
				
				if (action.action == "action_table") {
					if (item && item.key_main) {
						this.info[item.key_main] = item.values;
					}
				}
				if (action.action == 'save') {
					// console.log("CHECK SAVE ", this.field_ref, this.requests)
					if (this.requests && this.requests[this.field_ref] && this.requests[this.field_ref].create) {}
					this.save({
						url : this.requests[this.field_ref].create,
					});
				}
				if (action.action == 'update') {
					if (this.info && this.info.id && this.requests && this.requests[this.field_ref] && this.requests[this.field_ref].update) {
						this.update({
							url : this.requests[this.field_ref].update + this.info.id, 
						});
					}
				}

				if (action.action == 'del') {
					this.$EventBus.$emit('notifications',{
						type : "confirm_delete",
						ID   : this.ref,
					})
					this.info_del = {
						item   : item,
						table  : option,
						action : "del"
					};
				}
				if (action.action == "setISC") {
					const { weight, size} = this.info;
					if (weight && size) {
						this.info.isc = Math.sqrt((parseInt(weight)*parseInt(size))/3600).toFixed(2);
					}
					// console.log("SET ISC ", this.info.isc)
				}
			}
		}, // actions
		
		render_listed(item){
			if (item) {				
				if (item.global_list) {
					return this.$ManagerSmith.render_listed(item);
				}
				if (typeof item.list  == "string") {
					return this[item];
				}else{
					return item.list;
				}
			}
			return [];
		}, // render listed


		render_info(item){
			if (item) {
				if (item) {
					console.log("INFO MEDICS ", item,  " \n route" , this.route,
					" \n reference_form " , this.reference_form, 
					" \n ref to component ",  this.ref_to_component)
					this.info 		 = { ...item };
					this.field_ref   = this.reference_form; // item.reference
					let field 		 =`${this.field_ref}_params`;
					// console.log("charge ", this.info, item.info_patient)
					if (this.list_fields && this.list_fields[field]) {
						this.info_fields = this.list_fields[field];
					}
					if (this.field_ref == "emergency_medical_history") {
						this.info.name 			= item.fullName;
						this.info.assignedDate 	= this.$ManagerSmith.getDateCurrent();
						this.info.hour 			= this.$ManagerSmith.getTimeCurrent();
						this.info.isc 			= 0;

					}
					if (this.field_ref == "supplies") {						
						this.info.name 				= item.fullName; 
						this.info.dateAdmission  	= item.assignedDate;
						this.info.diagnoses 		= "";
						
					}
					
					this.renderFindAttention();
				}
			}
		}, // render info

		updateInfo(item){
			if (item) {
				if (item.SubDiagnoseLists && item.SubDiagnoseLists.length > 0) {
					this.info.SubDiagnoseLists = item.SubDiagnoseLists;
				}
			}
		}, // updateInfo

		renderFindAttention(){
			if (this.requests && this.requests[this.field_ref] && this.requests[this.field_ref].find && this.info &&this.info.AttentionId) {
				this.findByAttention({
					url  : this.requests[this.field_ref].find,
					url1 : this.requests[this.field_ref].find_1 ? this.requests[this.field_ref].find_1 : null,
					body : { AttentionId : this.info.AttentionId }
				})
			}
		}, // renderFindAttention

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

		getDiagnoses(){
			if (this.info &&  this.info.AttentionId) {				
				const api = "/api/v1/find/all/subdiagnose-list/";
				this.$Axios.post(api, { AttentionId : this.info.AttentionId }).then( res => {
					if (res && res.data) {
						if (res.data.rows && res.data.rows.length > 0) {

							if (this.field_ref == "supplies") {
								const diagnoses_concat = res.data.rows.map(x => {
									if ( x && x.SubDiagnose) {
										return x.SubDiagnose.code
									}
								})
								if (diagnoses_concat && diagnoses_concat.length > 0) {
									this.info.diagnoses = diagnoses_concat.join(",")
								}
								console.log("check ", this.info.diagnoses)
							}
						}
					}
				}).catch(er => {
					console.log("Error get diagnoses ", er)
				})
			}
		}, // get diagnoses

		findByAttention(req){ 
			if (req) {

				const api 	= req.url;
				
				this.$Axios.post(api, req.body).then( res => {
					this.$EventBus.$emit("notifications", {
						type 	: "success",
						msg 	: this.$t('info_found')
					})

					if (res && res.data) {

						// this.info = { ...this.info, ...res.data };

						this.info 		= this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, this.field_ref);
						if (this.field_ref != "emergency_medical_history") {
							this.btn.action = "update";
							this.btn.title  = "update";
							if (this.field_ref == "supplies") {
								if (this.info && !this.info.diagnoses) {
									this.getDiagnoses();
								}
							}
						}else if (this.field_ref == "emergency_medical_history") {
							if (req.url1){								
								this.btn.action = "update";
								this.btn.title  = "update";
							}
							if (req.url == "/api/v1/find/triage") {
								delete this.info.id;
							}
							this.sendDiagnoses(res.data);
						}
					}else{
						
						if (req.url1) {
							req.url = req.url1;
							delete req.url1;
							this.findByAttention(req);
						}
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

		sendDiagnoses(item){
			if (item && item.SubDiagnoseLists && item.SubDiagnoseLists.length > 0) {
				this.$emit("receive_info", { 
					key 	: "SubDiagnoseLists" , 
					action 	: "set_diagnosis_form" , 
					item 	: item.SubDiagnoseLists 
				});
			}
		}, // sendDiagnoses

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
						msg 	: this.$t("registered_information"),
					});
					this.btn.action = "update";
					this.btn.title  = "update";
					this.btn.isDisabled = false;
					// this.$vuetify.goTo("#tab_sub_dashboard");
					if (res && res.data) {
						if (this.field_ref == "emergency_medical_history") {
							const { HistoryInfoMedicPersonId } = res.data;
							this.info.HistoryInfoMedicPersonId = HistoryInfoMedicPersonId;
							this.sendDiagnoses(res.data);
						}
						this.info 	= { ...this.info, ...res.data };

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
					this.$vuetify.goTo("#tab_sub_dashboard");					
					this.$EventBus.$emit("notifications", {
						type 	: "updated"
					});
					if (res && res.data) {
						this.info = { ...this.info, ...res.data };
						if (this.field_ref == "emergency_medical_history") {
							// const { HistoryInfoMedicPersonId } = res.data;
							// this.info.HistoryInfoMedicPersonId = HistoryInfoMedicPersonId;
							this.sendDiagnoses(res.data);							
						}
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
		del(req){
			if (req) {

				const api 	= req.url;
				let info_up =  { ...this.info };
				this.$Axios.delete(api).then( res => {
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
			}
		},//  del

	}, // methods

	mounted(){
		let temp = "notifications" + this.ref;
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
</script>