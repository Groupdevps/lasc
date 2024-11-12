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
				:style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${$vuetify.breakpoint.height-(ReduceSize || 130 )}px;`"
			>

				<v-expansion-panels
					multiple
					v-model="panel"
				>
					<v-expansion-panel 
						dark								
						:height 			= "currentHeght"					
						class = "mb-1" 
						:key="0"
						v-show="false"
					>
						<v-expansion-panel-header
							dark
							dense
							ripple
							color 	= "blue-grey darken-1"
							class 	= "elevation-2 small-pannel body-1 pa-1 font-weight-bold text-uppercase white--text"
							
						>
							{{ $t("info_patient") }}
						</v-expansion-panel-header>
						<v-expansion-panel-content class ="pa-1 pt-3">

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
								<v-col cols = "12" class="d-flex justify-center mt-2">
									<v-btn						
										small
										color  	= "success"
										@click  	= "info.id ? update() : save()"
										:disabled 	= "btn.isDisabled"
										:loading = "loading"
									>
										{{ $t('register') }} 
									</v-btn>
								</v-col>
							</v-row>
						</v-expansion-panel-content>
						
					</v-expansion-panel>
					<v-expansion-panel 
						dark								
						:height 			= "currentHeght"					
						class = "mb-1" 
						:key="1"
					>
						<v-expansion-panel-header
							dark
							dense
							ripple
							color 	= "blue-grey darken-1"
							class 	= "elevation-2 small-pannel body-1 pa-1 font-weight-bold text-uppercase white--text"
							
						>
							APLICAR SUMINISTROS
							<!-- {{ $t("supplies") }} -->
						</v-expansion-panel-header>
							
						<v-expansion-panel-content class ="pa-1 pt-3">
							<SupplesTable :AttentionId="info.AttentionId" :InfoPatient="info" :currentPermission="currentPermission" ></SupplesTable>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
				
			</v-card-text>
			<v-card-actions>
				

			</v-card-actions>
		</v-card>
	</v-container>
</template>
<style scoped>
    .small-pannel{
        min-height: 20px;
    }
</style>
<script 
	type = "text/javascript"
	
>

// nursing
import supplies_params 						from "@/components/nursing/js/supplies_params"
// utils
import dates 								from "@/helpers/dates.vue"
import searcher  							from "@/helpers/searcher.vue"
import table_field 							from "@/components/info/table_field.vue"
import SupplesTable 						from "@/components/nursing/suppliesTableComponent.vue"
import SupplyService 						from "@/services/SupplyService.js"
export default {
	name : "Supplies",
	components : {
		dates,
		searcher,
		table_field,
		SupplesTable
	}, //components
	props : [
		"info_to_component",
		"props",
		"ref_to_component",
		"reference_form",
		"route",
		"update_to_component",
		"ReduceSize",		
	],
	data : (vm) => ({ // pa-0 ma-0
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),			
		},
		// info_patient 	: {},
		panel : [0,1],
		head   			: {
			title 	 	: "",
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
		info_fields 		: supplies_params,
		list_fields  		: {
			supplies_params
		},
		diagnoses  	: [],
		list_observacions 	: [],
		ref 				: 'supplies',
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
			
			supplies : {
				get 	: "/api/v1/supply/",
				find  	: "/api/v1/find/supply/",
				create  : "/api/v1/supply",
				update  : "/api/v1/supply/",
				delete  : "/api/v1/supply/",		
			}

		},
		
	}), // data
	watch:{
		"info.size" :function(val){			
			this.actions({action : "setISC"})			
		},
		"info.weight": function(val){			
			this.actions({action : "setISC"});
		},
		"typesIsLoaded"(val){
			if (val) {
				this.getInfo();
			}
		}
		

	}, // watch

	created(){		
		this.field_ref   = "supplies"; //this.reference_form; // item.reference
	}, // created

	mounted(){
		let temp = "notifications" + this.ref;
		if (this.typesIsLoaded) {						
			this.getInfo();			
		}
		
		


	}, // mounted


	computed : {
		render_list_fields(){			
			return this.info_fields
		}, // 

		render_diagnoses: function(){
			return this.diagnoses; 
		}, 
		currentHeght: function(){
			return this.$vuetify.breakpoint.height + 'px';
		},
		currentPatient(){			
			return this.$store.getters["infoPatient/patient"];			
		},
		typesOrder(){							
			return this.$store.getters["listTypesOrder/list"];
		},
		typesIsLoaded(){
			return this.$store.getters["listTypesOrder/isLoaded"]
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("supplies") 
		}
	}, // computed

	methods : {
		testt(){
			return true
		},

		actions(action, item, option ){
			// console.log( "actions   " + this.ref + ": act ",  action," item ",  item, " option ", option )
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
				

				if (action.action == 'del') {
					this.$EventBus.$emit('notifications',{
						type : "confirm_delete",
						ID   : this.ref,
					})
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

		async getInfo(req){
			try{
				this.loading = true;
				const service = new SupplyService();
				const res = await service.findInfo({AttentionId: this.$route.params.id})
				if (res && res.data) {					
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					this.info = {...this.info, ...res.data} 
					
				}else{
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					this.info.dateAdmission = this.currentPatient ? this.currentPatient.assignedDate : vm.$ManagerSmith.getDateCurrent();
					delete this.info.id;
				}
					
			}catch(error){
				console.warn("error get info supply ", error)
			}finally{
				this.loading = false;
			}
	
		}, // get


		async save(){
			try{
				
				this.loading = true;
				let info_up 		=  { ...this.info };
				this.btn.isDisabled = true;
				const service = new SupplyService();
				const res = await service.saveInfo(info_up);
				
			
				if (res && res.data) {
					this.info 	= { ...this.info, ...res.data };
					this.$EventBus.$emit("notifications", {
						type 	: "success",
						msg 	: this.$t("registered_information"),
					});
					this.$ManagerSmith.Sound.play("sound1");
				}
				
				
			}catch(error){
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: error
				});
				console.warn("error get info supply ", error)
			}finally{
				this.btn.isDisabled = false;
				this.loading = false;
			}
		}, // save //
		async update(){
			try{				
				this.loading = true;
				let info_up 		=  { ...this.info };
				this.btn.isDisabled = true;
				const service = new SupplyService();
				const res = await service.updateInfo(info_up); 
				if (res && res.data) {
					this.$vuetify.goTo("#tab_sub_dashboard");					
					this.$EventBus.$emit("notifications", {
						type 	: "updated"
					});
					this.info = { ...this.info, ...res.data };
					this.$ManagerSmith.Sound.play("sound1")
					
				}
			}catch(error){
				console.log("Error update ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: error
				});

			}finally{
				this.btn.isDisabled = false;
				this.loading = false;
			}
			
		}, // update //
		async del(){
			try{
				this.loading = true;
				const service = new SupplyService();
				const res = await service.updateInfo(info_up); 
				if (res && res.data) {
					let info_up =  { ...this.info };
					this.$EventBus.$emit("notifications", {
						type 	: "deleted",
					})			
				}

			}catch(error)  {
				console.log("Error del " , er);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: er
				});
			}finally{
				this.loading = false;
			}
			
		},//  del

	}, // methods


};

</script>