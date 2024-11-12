<template>
	<v-row>
		<v-col
			cols = "12"
		>
			<v-card 				
				class 		= "pa-0 body-1 rounded-ms"				
				elevation 	= "15"
			>		
				<v-card-text
					class = "pa-0"
				>
					<v-card>
						<v-tabs
							dark
							fixed-tabs 
							v-model 		 	= "tab"
							background-color 	= "cyan"
							active-class 	 	= "teal accent-5"
							height 				= "35"
						>
							<v-tab
								class 				= "white--text"
								v-for = "(item_tab, idx_tab) of tab_items"
								:key  = "idx_tab"
							>
								{{ item_tab.text }}
							</v-tab>
						</v-tabs>
					</v-card>
					<v-tabs-items 
						v-model = "tab"
						:style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${heightText}px;`"
						>
						<v-tab-item
							v-for = "(item_tab_i, idx_tab_i) of tab_items"
							:key  = "idx_tab_i"
							
							
							>
							<v-card flat
							>
								<v-card-text class="pa-0">
									<component	 
										:key = "item_tab_i.key + currentRoute"
										:is  = "item_tab_i.component"
										:info_to_comp  	= "item_tab_i.props"
									></component>
									<!-- <admisiones/> -->
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs-items>
					
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>
<script
	type = "text/javascript"
	
>
	import params 						from "@/views/js/dashboards_params.js"

	import ingresos 					from "@/components/admissions/PatientAdmissionComponent.vue"
	import agendas 						from "@/components/info/agendas.vue"
	import medical_history 				from "@/components/info/MedicalHistoryComponent.vue"
	import autorizacion 				from "@/views/AuthorizationView.vue"
	/*import clinic_history 				from "@/components/medico/medico/clinic_history.vue"
	import emergency_medical_history 	from "@/components/medico/medico/emergency_medical_history.vue"
	import medical_formulas 			from "@/components/medico/medico/medical_formulas.vue"
	import laboratory_order 			from "@/components/medico/medico/laboratory_order.vue"
	import outpatient_orders 			from "@/components/medico/medico/outpatient_orders.vue"
	import diagnostic_help 				from "@/components/medico/medico/diagnostic_help.vue"*/
	import notas 						from "@/components/info/notes.vue"
	import manager	 					from "@/components/manager/manager.vue"
	import settings_manager 			from "@/components/manager/settings.vue"
	import inventory 					from "@/components/pharmacy/inventory.vue"
	import current_administrators 		from "@/components/management/current_administrators.vue"
	import users 						from "@/components/users/users.vue"
	import roles 						from "@/components/users/roles.vue"
	import agreements 					from "@/components/management/agreements.vue"
	import audits 						from "@/components/auditor/audits.vue"
	// import support  					from "@/components/system/support.vue"
	import ListsTariffs 				from "@/components/management/ListsTariffsComponent.vue"

	
	export default {
		name : "dashboards",
		components : {
			ingresos,
			agendas,
			notas,
			autorizacion,
			/*clinic_history,
			emergency_medical_history,
			medical_formulas,
			laboratory_order,
			outpatient_orders,
			diagnostic_help,*/
			medical_history,
			manager,
			settings_manager,
			inventory,		
			current_administrators,
			users,
			roles,
			agreements,
			audits,
			ListsTariffs
			// support,
		},
		data : (vm) => ({
			title 	: "",
			tab 	: null,  
			tab_items 	: [],
			heightText	: 800, 
		}), // data

		created(){
			// route_name     =  this.$route.name;
			// console.log(route_name, "route_name")
			this.currentRoute;
			// console.log("ROUTE : ", this.$route.name)
			this.heightText = this.$vuetify.breakpoint.height -100;
		}, // created
		computed : {
			currentRoute(){
				let name_route = this.$route.name;
				this.title 	   = name_route;
				if (params && params[name_route]) {
					// console.log("find params ")
					this.tab_items = params[name_route];
				}
				return name_route;
			}, // currentRoute
		}, // computed
	};
</script>