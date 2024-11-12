<template>
	<v-container fluid>
		<v-row
			dense
		>
			<v-col
				cols = "2"
			>
				<v-tabs
					dark
					vertical				      	
					v-model 		 	= "tab"
					background-color 	= "secondary"
					active-class 	 	= "teal accent-4"
					id 					= "tab_sub_dashboard"
					:height 			= "height_tabs"
				>
					
					<v-list
						dense
						color = "transparent"
						v-for = "(item_tab, idx_tab) of tab_items"
						v-show  = "!item_tab.isSubMenu"
						:key 	= "'list_'+item_tab.key"
					>
						<v-list-item
							v-if 	= "idx_tab === 0"
							@click 	= "$router.go(-1)"
							class 	= "warning"
						>
							<v-list-item-icon
								class  = "pa-0 mx-0"
							>
								<v-icon>
									mdi-arrow-left-circle
								</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title 
									class = "text-uppercase body-1 white--text text-center"
								>
									{{ $t('go_back') }}
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-tab
							v-show = "!item_tab.isSubMenu && !item_tab.isMenu"							    
							:key = "idx_tab"					        	
						>
							{{ $t(item_tab.text) }}
				
						</v-tab>
						
						<v-list-group 
							dense
							v-show 		= "!item_tab.isSubMenu && item_tab.isMenu"
							class 		= "white--text"						
						>						
							<template v-slot:activator>
								<v-list-item-content>
									<v-list-item-title 
										class = "text-uppercase body-1 white--text text-center"
									>
										{{ $t(item_tab.text) }}
									</v-list-item-title>
								</v-list-item-content>
							</template>
							<v-list-item-group
								dense
								v-model 		= "tab_active"
								active-class	= "teal accent-4--text"
								class 			= "light-blue darken-3 white--text"
							> 
								<v-list-item
									v-if  	= "item_tab.sub_menus && item_tab.sub_menus.length > 0"
									v-for 	="(sub_item, idx_sub) of item_tab.sub_menus"
									link
									:key 	= "item_tab.key + idx_sub + ref"
									@click  = "renderTabItem(sub_item)"		
								>
									<template v-slot:default="{ active }">							
										<v-list-item-content>
												<v-list-item-title 
													class  = "text-uppercase"						        			
												> 
													{{ $t(sub_item.text) }}
												
												</v-list-item-title>
										</v-list-item-content>
									</template>
								</v-list-item>
							</v-list-item-group>
						</v-list-group>
					

					</v-list>

				</v-tabs>
			</v-col>
			<v-col
				cols = "10"
			>
				<v-card outlined
					class = "pa-0 body-1"
				>

					<v-card-text
						class = "pa-0"
					>							
						<component	 							
							:key 					= "ref + '_medical_history'"
							:ref 					= "ref + '_medical_history'"
							is 						= "medical_history"								
							:info_to_component  	= "info_comp"      					 
							:ref_to_component 		= "'MedicalHistory' +ref + currentRoute"
							reference_form			= "medical_history"
							:update_to_component 	= "info_comp"
							:route  				= "currentRoute"
							@receive_info  			= "actions($event)" 
							:isActiveBtnExpand 		= "true"
							@isExpandMedicalHistory = "resizeHeightTabs($event)"
						></component>
							
						<v-tabs-items 
							v-model = "tab"
						>
							<v-tab-item
								v-for = "(item_tab_i, idx_tab_i) of tab_items"
								:key  = "item_tab_i.key"					
							>
								<v-card flat>
									<v-card-text					    
										:style = "`overflow-y 	: auto; max-height:  ${heightContentTabs}px;`"
									>			          			
										<component	 
											:key 					= "item_tab_i.key"
											:is 					= "item_tab_i.component"
											:info_to_comp  			= "item_tab_i.props"
											:info_to_component  	= "info_comp"      					 
											:ref_to_component 		= "item_tab_i.key + ref + currentRoute"
											:reference_form			= "item_tab_i.key"
											:update_to_component 	= "info_comp"
											:route  				= "currentRoute"
											@receive_info  			= "actions($event)" 
										></component>
											
									</v-card-text>
								</v-card>
							</v-tab-item>
						</v-tabs-items>
							
							
					</v-card-text>
				</v-card>			
			</v-col>
		</v-row>
	</v-container>
</template>
<script	type = "text/javascript"	>
	import medical_history 				from "@/components/info/MedicalHistoryComponent.vue"
	import autorizacion 				from "@/views/AuthorizationView.vue"
	import params 						from "@/views/js/dashboards_params.js"
	import clinic_history 				from "@/components/medico/medics_form.vue"
	import emergency_medical_history 	from "@/components/medico/medics_form.vue"
	import medical_formulas 			from "@/components/medico/medics_form.vue"
	import laboratory_order 			from "@/components/medico/medics_form.vue"
	import outpatient_orders 			from "@/components/medico/medics_form.vue"
	import diagnostic_help 				from "@/components/medico/medics_form.vue"
	import medical_orders 				from "@/components/medico/medics_form.vue"
	import supplies 					from "@/components/nursing/supplies.vue"
	import triage 						from "@/views/triage_classification.vue"
	import notas 						from "@/components/info/notes.vue"
	import centers 						from "@/components/centers/centers.vue"
	import services 					from "@/components/info/ServicesComponent.vue"
	
	export default{
		name 		: "dashboards_sub",
		components 	: {
			// ingresos,
			// agendas,
			notas,
			// autorizacion,
			clinic_history,
			emergency_medical_history,
			medical_formulas,
			laboratory_order,
			outpatient_orders,
			diagnostic_help,
			medical_orders,
			medical_history,
			centers,
			services,
			supplies,
			triage,
			
		
		},
		data : (vm) => ({
			title 	: "",
			tab 	: null,  
			tab_items 		: [],
			info_patient 	: {},
			info_attention 	: null,
			ref 			: "sub_",
			tab_params :{

				isFixed  : true,
				isCenter : false
			},
			height_tabs  : 400,
			tab_active   : null,
			info_comp 	 : {},		
			heightContentTabs : 300,	
		}), // data

		created(){
			// route_name     =  this.$route.name;
			// console.log(route_name, "route_name")
			this.currentRoute;
			// console.log("ROUTE : ", this.$route.name)
			this.height_tabs 		= this.$vuetify.breakpoint.height - 95;
			// this.heightContentTabs 	= this.$vuetify.breakpoint.height - 155;


		}, // created
		computed : {
			currentRoute(){
				if (this.$route) {
					if (this.$route.name) {
						if (this.$route.params) {
							this.render_info_patient(this.$route.params);
						}

						let name_route = this.$route.name;
						// console.log("dashboards route ", name_route)
						// this.title 	   = name_route;
						if (name_route == "DashboardMedico") {
							this.tab = 1;
						}
						if (params && params[name_route]) {
							console.log("find params ")
							this.tab_items = params[name_route];
							// this.renderTabs();
						}
						return name_route;
					}
				}
				return null;
			}, // currentRoute
		}, // computed

		methods : {
			actions(actionn, item, option){
				if (actionn) {
					if (actionn.action == "set_diagnosis_form") {
						if (actionn.item && actionn.item.length > 0) {
							this.info_comp.SubDiagnoseLists = [...actionn.item];
							this.info_comp 					= { ...this.info_comp };
						}

					}
				}
			}, // actions 

			render_info_patient(item){
				if (item) {
					this.info_patient["numberId"] 			= item.numberId;
					this.info_patient["AttentionId"] 		= item.id;
					this.info_attention 					= this.$Helper.get_local("Attention");
					if (this.info_attention) {
						this.$ManagerSmith.formatInfoPerson({...this.info_attention}, this.info_patient, "basic");						
					}
					this.info_patient["info_attention"] = { ...this.info_attention };
					this.info_comp = this.info_patient;
					
				}
			}, // render_info_patient

			renderTabs(){
				if (this.tab_params) {
					// console.log("PARAMS TABS ", this.tab_items.length)
					if (this.tab_items && this.tab_items.length < 4) {
						this.tab_params.isCenter = true;
					}else{
						this.tab_params.isCenter = false;
					}				
				}

			}, // renderTabs

			renderTabItem(item){				
				if (item) {
					console.log("RENDER TAB ", item)
					if (this.tab_items && this.tab_items.length > 0) {
						const idx = this.tab_items.findIndex(x => x && x.key == item.key);
						if (idx >= 0) {
							this.tab = idx;
						}
					}

				}
			}, // renderTabItem

			resizeHeightTabs(isResize){
				this.$nextTick(()=>{
					const reference = this.$refs[this.ref+"_medical_history"];
					if(reference && reference.$el){						
						this.heightContentTabs 	= this.$vuetify.breakpoint.height - (reference.$el.clientHeight) - 98;					
					}
				})
			}
		}, // methods
	};
</script>