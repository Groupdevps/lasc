<template>	
	<v-card class = "pa-0 ma-0 elevation-1">				
		<v-card-title class="pa-0 caption pl-2 justify-center"  v-show = "show.information" >
			<!-- <strong class="mr-5"> Historial de Paciente</strong> -->
			<v-menu bottom offset-y>
		      	<template v-slot:activator="{ on: menu, attrs }">
		        	<v-tooltip top>
		          		<template v-slot:activator="{ on: tooltip }">

		            		<v-btn
				              	color="primary"
				              	dark
				              	x-small
				              	v-bind="attrs"
				              	v-on="{ ...tooltip, ...menu }"
				            >
		              			Numero Atencion : {{selectedAttention?.id || ''  }}
		               			<v-icon
						        	right
						        	dark
				      			>
				        			{{ menu ? 'mdi-chevron-down' : 'mdi-chevron-up'}}
				      			</v-icon>
		            		</v-btn>
		          		</template>
		          		<span>SELECCIONAR ATENCION</span>
		        	</v-tooltip>
		      	</template>
		      	<v-list dense two-line>
			      	<v-list-item-group v-model="selectedAttention">
				        <v-list-item
				          	v-for="(item, index) in renderListAttentions"
				          	:key="index"
				          	:value = "item"
				        >
				        	<v-list-item-content>						        		
					          	<v-list-item-title> FECHA : {{ item?.assignedDate}} </v-list-item-title>
					          	<v-list-item-subtitle> SERVICIO: {{item?.TypeService?.name}} </v-list-item-subtitle>
				        	</v-list-item-content>
				        </v-list-item>
				    </v-list-item-group>
		      	</v-list>
		    </v-menu>				
		</v-card-title>
		<v-card-text class = "pa-0 px-1" v-show = "show.information">
			<!-- body-1 pa-0 justify-center -->

			<v-row dense>
				<v-col cols = "2">
					<v-card    class="mx-auto"  >	 <!-- teal accent-4 / max-height="170"-->
						<v-list shapped dense dark color="blue-grey" class="py-0"  
						:style = "`overflow-y : auto; overflow-x : hidden; max-height: 200px;`">
					      	
					      	<v-list-item-group
					        	v-model="selectedHistory"					        	
					        	active-class="grey darken-3"
					        	dense

					      	>
					        	<v-list-item
					          		v-for="(item, i) in renderListReports"
					          		:key="i"
					          		dense
					          		class="py-0"
					          		:value="item"
					        	>
						          	<!-- v-if = "listNotAllowed.length > 0 &&  listNotAllowed.includes(item.key)"  -->
						          	
						          	<v-list-item-content class="py-0">
						            	<v-list-item-title v-text="item.text"></v-list-item-title>
							        </v-list-item-content>
					        	</v-list-item>
					      	</v-list-item-group>
					    </v-list>					
					</v-card>
				</v-col>
				<v-col cols="10">
					<component
						v-if="selectedHistory"
						:is="selectedHistory.component"
						:key="selectedHistory.key + reference"
						:reference="reference + selectedHistory.key"
						:formActive="selectedHistory.component"		

						:attention="selectedAttention?.id"
						:patient="selectedAttention?.patient"										
				  	></component>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions
			class = "justify-center"
		>
			<v-btn

				absolute
				x-small
				color = "success"
				@click = "show.information = !show.information"
			>
				<v-icon x-small> {{ !show.information ? 'mdi-chevron-down' : 'mdi-chevron-up'}}</v-icon>
				{{ $t("history") }}
			</v-btn>
		</v-card-actions>
	</v-card>	
	
</template>
<script type = "text/javascript" >
// src  = "./js/medical_history.js"
// import tableComp 					from "@/components/info/table.vue"
// import informationComp  			from "@/components/info/information.vue"
import ClinicHistory from "@/components/info/medicalHistory/TableClinicHistoryComponent.vue"
import MedicalNotes from "@/components/info/medicalHistory/TableMedicalNotesComponent.vue"
import NursingNotes from "@/components/info/medicalHistory/TableNursingNotesComponent.vue"
import LaboratoryOrders from "@/components/info/medicalHistory/TableLaboratoryOrdersComponent.vue"
import MedicalFormulas from "@/components/info/medicalHistory/TableMedicalFormulasComponent.vue"
import DiagnosticAids from "@/components/info/medicalHistory/TableDiagnosticAidsComponent.vue"
import Dispatched from "@/components/info/medicalHistory/TableDispatchedComponent.vue"

// import clinic_history_table 		from "@/components/medico/js/clinic_history_table.js"  
// import dental_historys_table 		from "@/components/medico/js/dental_historys_table.js"  
// import medical_notes_table 			from "@/components/medico/js/medical_notes_table.js"  
// import nursing_notes_table 			from "@/components/nursing/js/nursing_notes_table.js"  
// import laboratory_order_table 		from "@/components/medico/js/laboratory_order_table.js"  
// import medical_orders_table 		from "@/components/medico/js/medical_orders_table.js"  
// import diagnostic_aids_table 		from "@/components/medico/js/diagnostic_aids_table.js"  
// import nursing_supply_sheet_table 	from "@/components/nursing/js/nursing_supply_sheet_table.js"  
// import formula_table 				from "@/components/medico/js/formula_table.js"  
// import diagnoses_table 				from "@/components/medico/js/diagnoses_table.js"  
// import pharmacy_table 				from "@/components/pharmacy/js/pharmacy_table.js"  
// import hospital_expenses_table 		from "@/components/nursing/js/hospital_expenses_table.js"  
// import inability_table 				from "@/components/medico/js/inability_table.js"  
// import epicrisis_table 				from "@/components/medico/js/epicrisis_table.js"  
// import audit_notes_table 			from "@/components/auditor/js/audit_notes_table.js"  

import AttentionService from "@/services/AttentionService.js";
export default {
	name 		: "medicalHistory",
	components 	: {
		// tableComp,
		// informationComp,
		ClinicHistory,
		MedicalNotes,
		NursingNotes,
		LaboratoryOrders,
		MedicalFormulas,
		DiagnosticAids,
		Dispatched
	}, 
	props 	: [
		"reference",
		"isActiveBtnExpand",
		"listNotAllowed"
	],
	data 	: () => ({		
		selectedAttention : null,
		selectedHistory : null,
		list 			: [],			
		ref 			: "medicalHistory",
		tab 			: null,
		show : {
			information : true
		},
		listReports : [
			{
				key : "EmergencyClinicHistory",
				text : "HISTORIA CLINICA",
				component : "ClinicHistory", 	
			},
			{
				key : "MedicalNotes",
				text : "NOTAS DE EVOLUCION",//MEDICAS
				component : "MedicalNotes", 	
			},
			{
				key : "NursingNotes",
				text : "NOTAS DE ENFERMERIA",
				component : "NursingNotes", 	
			},
			{
				key : "LaboratoryOrders",
				text : "ORDENES DE LABORATORIO",
				component : "LaboratoryOrders", 	
			},
			{
				key : "MedicalFormulas",
				text : "FORMULAS MEDICAS",
				component : "MedicalFormulas", 	
			},			
			
			// {
			// 	key : "MedicalOrders",
			// 	text : "ORDENES MEDICAS",
			// 	component : "MedicalOrders", 	
			// },
			{
				key : "DiagnosticAids",
				text : "ORDENES DE INTERCONSULTA",
				component : "DiagnosticAids", 	
			},			
			{//pharmacy
				key : "Dispatched",
				text : "DESPACHADO",
				component : "Dispatched", 	
			},			
			// { //inability
			// 	key : "NursingNotes",
			// 	text : "NOTAS DE ENFERMERIA",
			// 	component : "NursingNotes", 	
			// },
			
			
			// {
			// 	key  	  : "",
			// 	text 	  : "info_patient",
			// 	type 	  : "information",
			// 	component : "informationComp",
			// 	table 	  : "",
			// 	requests  : "", 
			// },
			// {
			// 	// key  	 	: "medical_records",
			// 	// text 	 	: "medical_records",
			// 	// type 	 	: "table",
			// 	component 		: "tableComp",
			// 	// table 	 	: "",
			// 	// requests 	: "", 
			// 	isExpand 		: true,
			// 	...clinic_history_table,
			// },
			// /*{
			// 	key  	 	: "dental_stories",
			// 	text 	 	: "dental_stories",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	...dental_historys_table
			// },*/
			// {
			// 	key  	 	: "medical_notes",
			// 	text 	 	: "medical_notes",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	isPdf 		: true,
			// 	typePdf 	: "notes/medico",
			// 	...medical_notes_table
			// },
			// {
			// 	key  	 	: "nursing_notes",
			// 	text 	 	: "nursing_notes",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	isPdf 		: true,
			// 	typePdf 	: "notes/nursing",
			// 	...nursing_notes_table
			// },
			// {
			// 	key  	 	: "laboratory_orders",
			// 	text 	 	: "laboratory_orders",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	isPdf 		: true,
			// 	typePdf 	: "order/lab",
			// 	...laboratory_order_table
			// },
			// /*{
			// 	key  	 	: "medical_orders",
			// 	text 	 	: "medical_orders",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	...medical_orders_table
			// },*/
			// {
			// 	key  	 	: "diagnostic_aids",
			// 	text 	 	: "diagnostic_aids",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	isPdf 		: true,
			// 	typePdf 	: "diagnostic-aid",
			// 	...diagnostic_aids_table
			// },
			// /*{
			// 	key  	 	: "supplies",
			// 	text 	 	: "supplies", // nursing_supply_sheet
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	...nursing_supply_sheet_table
			// },*/
			// {
			// 	key  	 	: "medical_formulas",
			// 	text 	 	: "medical_formulas",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	isPdf 		: true,
			// 	typePdf 	: "order/medical-formula",
			// 	...formula_table
			// },
			// {
			// 	key  	 	: "diagnoses",
			// 	text 	 	: "diagnoses",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
				
			// 	...diagnoses_table
			// },
			// {
			// 	key  	 	: "pharmacy",
			// 	text 	 	: "pharmacy",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	...pharmacy_table
			// },
			// /*{
			// 	key  	 	: "hospital_expenses",
			// 	text 	 	: "hospital_expenses",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	...hospital_expenses_table
			// },*/
			// /*{
			// 	key  	 	: "inability",
			// 	text 	 	: "inability",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	...inability_table
			// },*/
			// /*{
			// 	key  	 	: "epicrisis",
			// 	text 	 	: "epicrisis",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	...epicrisis_table
			// },	*/		
			// {
			// 	key  	 	: "audit_notes",
			// 	text 	 	: "audit_notes",
			// 	component  	: "tableComp",
			// 	type 	 	: "table",
			// 	table 	 	: "",
			// 	requests 	: "", 
			// 	...audit_notes_table
			// },
			
			
		],

	}), // data
	watch:{
		"show.information" : function(val){
			this.$emit("isExpandMedicalHistory", val);
		},
	}, //watch

	created(){

		if(this.isActiveBtnExpand){
			this.show.information = false;
		}
	}, // created
	mounted(){
		this.getList();
	},

	computed:{
		renderListAttentions(){
			return this.list;
		},
		renderListReports(){
			return this.listReports;
		}
	},
	methods : {
		async getList(){
			try{
				this.loading = true;
				const service = new AttentionService();
				const res = await service.searchAttentionsByParams({ patient  	 : this.$route.params.numberId }, {page:null, itemsPerPage:null});
				if (res &&  res.data && res.data.rows && res.data.rows.length > 0) {						
					this.list = res.data.rows;
					if (this.$route.params.id) {
						const obj = this.list.find(x => x.id == this.$route.params.id)
						// console.log("Attention ", obj)
						if (obj) {
							this.selectedAttention=obj;
							this.selectedHistory=this.listReports[0]
						}else{
							this.selectedAttention=null
						}
					}
				}else{
					this.selectedAttention = null
					this.list = [];
				}
			}catch(error){
				console.warn("Error get info attention ", error);
				this.selectedAttention = null				
			}finally{
				this.loading = false;

			}
		},
		
	}, // methods
};
</script>