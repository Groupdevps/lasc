<template>
	
	<v-row
		dense
		justify = "center"
	>
		<v-col
			cols = "11"
		>
			<v-card
				outlined
				:elevation = "head.elevation"
			>
				<v-card-title
					:class = "head.class_title"
				>
					<v-icon
						
						:class = "head.class_icon_title"
						:color = "head.color_icon_title"
					>
						{{ head.icon_title}}
					</v-icon>
					<span>
						{{ $t(head.title) }}
					</span>
				</v-card-title>
				<v-card-subtitle
					class = "body-2 pa-0 "
				>
					<span>
						{{ $t(head.subtitle) }}
					</span>
				</v-card-subtitle>
				<v-card-text
					:class = "head.class_text"
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
									v-if  = "item_field.type == 'title'"
									class = "text-uppercase font-weight-medium"
								>
									{{ $t(item_field.text) }}
									<v-divider
										class = "pa-0 ma-0"
										:inset = "true"
										color = "primary"
									></v-divider>
								</span>
								
								<v-text-field
									dense
									outlined
									hide-details
									v-else-if		= "['text', 'number', 'email'].includes(item_field.type)"
									:label 			= "$t(item_field.text)"
									v-model 		= "info[item_field.key]"
									:type 			= "item_field.type"
								></v-text-field>		
								<v-select
									dense
									outlined
									hide-details
									v-else-if		= "['select'].includes(item_field.type)"
									:label 			= "$t(item_field.text)"
									v-model 		= "info[item_field.key]"
									:item-text 		= "item_field.item_text"
									:item-value 	= "item_field.item_value"
									:items 			= "render_listed(item_field)"
								></v-select>			
								<v-textarea
									dense
									outlined
									hide-details
									no-resize
      								rows 			= "1"
									v-else-if		= "['textarea'].includes(item_field.type)"					
									v-model 		= "info[item_field.key]"
									:label 			= "$t(item_field.text)"
								></v-textarea>											
								<dates
									v-else-if		   = "['date_range', 'time_picker'].includes(item_field.type)"
									:info_to_component = "item_field"
									:info_to_dates 	   = "info[item_field.key]"
									@receive_info	   = "info[item_field.key] = $event"
								></dates>
								<searcher
									v-else-if 	  			= "item_field.type == 'select_search'"
									:info_to_component 		= "item_field"
									:update_to_component 	= "info[item_field.key]"									
									:list_to_component 		= "render_listed(item_field)"
									@receive 	 			= "actions(item_field, $event)"
								></searcher>


								<template
									v-else-if 			= "['tabs'].includes(item_field.type)"
								>
									<v-card>
										
										<v-tabs
									      	dark
									      	fixed-tabs 
									      	v-model 		 	= "tab"
									      	background-color 	= "secondary"
										    active-class 	 	= "teal accent-4"
										    height 				= "25"
										     

									    >
									      	<v-tab
									        	v-for = "(item_tab, idx_tab) of item_field.tabs_menus"
									        	:key  = "idx_tab"
									      	>
									        	{{ $t(item_tab.text) }}
									      	</v-tab>
									    </v-tabs>
									</v-card>
								     <v-tabs-items 
								    	v-model = "tab"
								    >
								      	<v-tab-item
								        	v-for = "(item_tab, idx_tab_i) of item_field.tabs_items"
								        	:key  = "idx_tab_i"
								      	>
											<invoice_table
												:key 					= "'table_invoice' + item_tab.key"
												v-if 			 		= "['table'].includes(item_tab.type)"
												:info_to_component 		= "item_tab"
												:update_to_component 	= "info[item_tab.key]"
												@receive_info 			= "actions({action : 'set_table_info'}, $event, item_tab)"
											></invoice_table>
										</v-tab-item>
				    				</v-tabs-items>
								</template>
							</v-col>					
						</template>
					</v-row>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn						
						:color  = "btn.color"
						@click  = "actions(btn)"
					>
						{{ $t(btn.text) }}
					</v-btn>
					<v-spacer></v-spacer>

				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>

</template>
<script 
 	type 	= "text/javascript"
>
 	// src 	= "./js/invoice.js"
	import fields_params  	from "@/components/biller/js/invoice_params.js"
import dates 			from "@/helpers/dates.vue"
import searcher  		from "@/helpers/searcher.vue"
// import modal_invoice	from "@/components/biller/modal_invoice.vue"
import invoice_table  	from "@/components/biller/invoice_table.vue"
// import table_field 		from "../../info/table_field.vue"

export default {
	name : "invoice",
	components : {
		dates,
		searcher,
		// modal_invoice,
		invoice_table,
		// table_field,
	}, //components
	data : (vm) => ({ // pa-0 ma-0
		info 		 	: {
			/*patient 	: {},
			attention 	: {},
			medicine 	: {},
			tariff 		: {},*/

		},
		info_attention  : {},
		info_patient 	: {},
		tab 			: null, 
		head   			: {
			elevation 			: 7,
			title 	 			: "billing",
			class_title 		: "primary body-1 justify-center text-uppercase pa-1 white--text",
			class_icon_title 	: "mx-1",
			color_icon_title 	: "white",
			icon_title 			: "mdi-cash-register",
			subtitle 			: "",
			class_subtitle 		: "body-2 pa-0 ",
			class_text 			: "pa-2 pt-5 ", 
		},
		btn : {
			text  : "save", 
			color  : "success",
			action : "save"
		},
		fields 				: fields_params,
		list_diagnosticos  	: [],
		list_observacions 	: [],
		ref 				: 'clinic_history',
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
		requests : {
			create 	: "/api/v1/invoice",
			get 	: "/api/v1/invoice/",
			edit 	: "/api/v1/invoice/",
			del 	: "/api/v1/invoice/",

		},
		invoices 		: [],
		medications 	: [],
		tariffs 		: [],
		loadings 		: {
			InvoiceInformations : false,
			AddedMedications 	: false,
			SubTariffManuals 	: false,
		},
		search 	: {
			medicine : "",
			tariff   : "",
			invoice  : "",
		},
		modal 		: {
			InvoiceInformations : null,
			AddedMedications : null,
			SubTariffManuals : null,
		},
		
	}), // data

	created(){
		if (this.$route && this.$route.params.id) {
			this.render_info(this.$route.params);
		}

	}, // created

	computed : {
		render_list_fields(){			
			return this.fields;
		}, // 
	}, // computed

	methods : {
		testt(){
			return true
		},

		actions(actionn, item, option){
			console.log( "actions invoice : ",  actionn, item, option )
			if (actionn) {
				
				if (actionn.action == 'add_table') {

					if (option.list && this[option.list]) {
						this[option.list].push({ [actionn.key] : item });
						// this.info_table[item] = "";
					}

				}
				if (actionn.action == 'confirm_del_table') {
					this.$EventBus.$emit('notifications',{
						type : "confirm_delete",
						ID   : this.ref,
					})
					this.info_del = {
						item   : item,
						table  : option.list,
						action : "del_table"
					};
				}
				if (actionn.action == 'del_table') {
					if (option.list && this[option.list]) {
						let idx = this[option.list].indexOf(item);
						console.log(idx, "del")
						if (idx >= 0) {

							this[option.list].splice(idx, 1);
							this.info_del = {
								item   : null,
								table  : null,
								action : null,
							};
						}
					}
				}	
				if (actionn.action == 'action_table') {
					const { action, value, option } = item;
					// key,
					this.actions(action, value, option);
				}
				if (actionn.action == 'save') {
					this.save();
				}
				if (actionn.action == 'update') {
					this.update();
				}

				if (actionn.action == 'del') {
					this.$EventBus.$emit('notifications',{
						type : "confirm_delete",
						ID   : this.ref,
					})
					this.info_del = {
						item   : item,
						table  : option.list,
						action : "del"
					};
				}
				if (actionn.action == "add_invoice") {
					this.modal = {};
				}
				if (actionn.action == "set_table_info") {
					if (option && option.key && item) {
						if (item.list) {
							this.info[option.key] = item.list;
						}
						if (item.values && item.values.length > 0) {
							item.values.forEach((it)=>{
								this.info[it.key] = it.value;
							});
						}
					}
				}
				if (actionn.action == "set_eps") {
					const { id, name, nit } = item;
					this.info = { ...this.info, assignedCenterId : id, nit :  nit, }
				}
			} // action
		}, // actions
		

		// renders 

		render_listed(item){
			if (item) {
				let temp = []
				if (item.global_list) {;
					temp = this.$ManagerSmith.render_listed(item);
				}

				// console.log("CHECK LIST ", temp)
				if (temp && temp.length === 0 && typeof item.list  == "string") {
					temp = this[item];
				}
				
				// console.log("LIST ", temp)
				return temp;
			}
			return [];
			
		}, // render listed

		render_info(item){
			if (item) {
				this.info_attention 				= this.$Helper.get_local("Attention");
				if (this.info_attention) {
					const { HistoryPerson } = this.info_attention;
					this.$ManagerSmith.formatInfoPerson(this.info_attention, this.info, "basic");

					this.info.AttentionId = this.info_attention.id;
					console.log("AttentionId", this.info);
					if (this.info_attention &&  this.info_attention.id) {

						this.findByAttention({
							url : "/api/v1/find/invoice",
							body : {
								AttentionId : this.info_attention.id
							}
						});
					}
				}

			}
		}, // render_info

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
						console.log("DATA RED ", res.data, this.info)
						this.btn.action = "update";
						this.btn.text  	= "update";
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

		get(){
			const api 	= this.requests.get;
			
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
			const api 	= "/api/v1/invoice";			
			let info_up =  { ...this.info };
			if (this.info && this.info.id) {
				delete this.info.id;
			}
			this.$Axios.post(api, info_up).then( res => {
				this.btn.action = "update";
				this.btn.text 	= "update";
				if (res && res.data) {
					this.info.id = res.data.id;
				}
				this.$EventBus.$emit("notifications", {
					type 	: "success",
					msg 	: this.$t("invoiced")
				})
			}).catch( er => {
				console.log("Error save invoice " ,  er);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: er
				});
			});
		}, // save //

		update(){
			if (this.info && this.info.id) {				
				const api 	= "/api/v1/invoice/" + this.info.id;			
				let info_up =  { ...this.info };
				this.$Axios.put(api, info_up).then( res => {
					this.$EventBus.$emit("notifications", {
						type 	: "success",
						msg 	: this.$t("updated_invoice")
					})
				}).catch( er => {
					console.log("Error save invoice " ,  er);
					this.$EventBus.$emit("notifications", {
						type 	: "error",
						msg 	: er
					});
				});
			}else{
				this.$EventBus.$emit("notifications",{
					type 	: "warning",
					msg 	: this.$t("error"),

				})
			}
		}, // save //

		del(){
			const api 	= "/enpoint";
			let info_up =  { ...this.info };
			this.Axios.delete(api).then( res => {
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
// UserId: DataTypes.INTEGER,
// AttentionId: DataTypes.INTEGER,
// billNumber: DataTypes.INTEGER,
// billExpeditionDate: DataTypes.DATE,
// billDueDate: DataTypes.DATE,
// payerName: DataTypes.STRING,
// payerNit: DataTypes.STRING,
// payerAddress: DataTypes.STRING,
// payerPhone: DataTypes.STRING,
// payerCity: DataTypes.STRING,
// patientNumberId: DataTypes.STRING,
// patientTypeId: DataTypes.STRING,
// patientAddress: DataTypes.STRING,
// patientCity: DataTypes.STRING,
// patientPhone: DataTypes.STRING,
// serviceType: DataTypes.STRING,
// entryDate: DataTypes.DATE,
// billSubtotal: DataTypes.INTEGER,
// billSubtotalLetters: DataTypes.STRING,
// filingDate: DataTypes.DATEONLY,
// filingHour: DataTypes.TIME,
// filing: DataTypes.STRING,
// DigitalSignatureId: DataTypes.INTEGER,
</script>