import EmergencyMedicalHistoryService from "@/services/EmergencyMedicalHistoryService.js"
const service = new EmergencyMedicalHistoryService();
export default [
	{
		key  	: "fullName",
		text 	: "name",
		type 	: "text",
		isDisabled :true,
	},
	{
		key  	: "numberId",
		text 	: "numberId",
		type 	: "number",
		cols 	: 2,
		isDisabled :true,
	},
	{
		key : "GenderId",		
		text : "gender",
		type : "select",
		enable : true,
		list : [ "M", "F", "Otro"],
		global_list : "genders",				
		icon 	: "mdi-gender-male-female", 
		item_text  	: "name",
		item_value 	: "id",	
		cols 	: 2,
		isDisabled :true,
	},
	{
		key 	: "birthDate",	
		text 	: "date_birth",
		type 	: "date_range",
		enable 	: true,
		action 	: "calculate_age",
		icon 	: "mdi-calendar", 
		cols 	: 2,
		isDisabled :true,

	},
	{
		key 	: "age",
		text    : "age",
		type    : "text",
		icon    : "mdi-calendar",
		cols 	: 2, 
		isDisabled :true,
	},
	{
		key 	: "authorizationNumber",
		text 	: "authorizationNumber",
		type 	: "text",
		enable 	: true,		
		// icon 	: "mdi-", 
		cols 	: 2,
		isDisabled :true,

	},
	{
		key 	: "MaritalStatusId",
		text 	: "MaritalStatus",
		type 	: "select",
		global_list : "marital-status",				
		enable 	: true,		
		item_text  	: "name",
		item_value 	: "id",	
		// icon 	: "mdi-", 
		cols 	: 2,
		isDisabled :true,

	},
	{
		key 	: "occupation",
		text 	: "occupation",
		type 	: "text",						
		enable 		: true,		
		item_text  	: "name",
		item_value 	: "id",	
		// icon 	: "mdi-", 
		cols 	: 2,
		isDisabled :true,

	},
	/*{
		key 	: "CompanionId",
		text 	: "companion",
		type 	: "text",						
		enable 		: true,		
		item_text  	: "name",
		item_value 	: "id",	
		// icon 	: "mdi-", 
		cols 	: 2,

	},*/
	{
		key 	: "companionName",
		text 	: "companion",
		type 	: "text",						
		enable 		: true,		
		item_text  	: "name",
		item_value 	: "id",	
		// icon 	: "mdi-", 
		cols 	: 4,
		isDisabled : true,
		
	},
	{
		key 	: "TypeRelationshipName",
		text 	: "typeRelationship",
		type 	: "text",						
		enable 		: true,		
		item_text  	: "name",
		item_value 	: "id",	
		// icon 	: "mdi-", 
		cols 	: 2,
		isDisabled : true,
		
	},
	{
		key  	: "phone",
		text 	: "phone",
		type 	: "number",
		cols 	: 2,
		isDisabled :true,
	},
	{
		key  	: "assignedAdministrator",
		text 	: "eps",
		type 	: "select",//select_search
		list 			: 'list_eps',
		global_list 	: "current-administrator",
		show_texts    	: ['name', 'nit'],
		text_list 		: "administradora",
		item_text 		: "name",
		item_value 		: "name",
		key_search   	: "name",
		key_search_1 	: "nit",
		action 			: "set_eps",
		enable 			: true,
		is_object 		: true,
		isDisabled :true,

	},
	
	{
		key  	: "address",
		text 	: "address",
		type 	: "text",
		cols 	: 2,
		isDisabled :true,

	},
	{
		key  	: "AttentionId",
		text 	: "attention_number",
		type 	: "number",
		cols 	: 2,
		isDisabled : true,

	},

	{
		subtitle : "patient_reception",
		cols : 12,
		key : "reception"
	},
	{
		key  : "assignedDate",
		text : "date",
		type : "date_range",
		cols   : 4,
		isDisabled : true,
	},
	{
		key  : "hour",
		text : "hour",
		type : "time_picker",
		cols   : 4,
		isDisabled : true,
	},
	{
		key  : "typeAttention",
		text : "typeAttention",
		type : "Autocomplete", // select
		item_value : "",
		item_text: "",
		list : [
			"ENFERMEDAD GENERAL",
			"ENFERMEDAD PROFESIONAL",
			"ACCIDENTE DE TRABAJO",
			"ACCIDENTE DE TRANSITO",
			"ACCIDENTE RABICO",
			"ACCIDENTE OFIDICO",
			"ACCIDENTE DE TRABAJO",
			"SOSPECHA MALTRATO FISICO",
			"SOSPECHA ABUSO SEXUAL",
			"SOSPECHA VIOLENCIA SEXUAL",
			"SOSPECHA MALTRATO",
			"OTRO TIPO DE ACCIDENTE",
			"EVENTO CATASTROFICO",
			"LESION POR AGRESION",
			"LESION AUTO-INFLINGIDA",
			"ACCIDENTE RABICO",
			"SOSP. MALTRATO EMOCIONAL",
			"OTRAS",
			"ATENCION AL PARTO",
			"ATENCION AL RECIEN NACIDO",
			"ATENCION A LA PLANIFICACION FAMILIAR",
			"DETECCION DE ALTERACIONES DEL DESARROLLO JUVENIL",
			"DETECCION DE ENFERMEDAD PROFESIONAL",
			"NO APLICA",
			"OTRO TIPO DE ACCIDENTE",
			"IMPRESION DIAGNOSTICA",
			"CONFIRMADO NUEVO",
			"CONFIRMADO REPETIDO",
		]
	},
	{
		subtitle : "motive",
		cols : 12,
		key : "line1"
	},
	{
		key : "motive",
		text : "reason_for_consultation",
		type : "textarea",
		enable : true,
		cols   : 12,
	},
	{
		key : "reviewBySystem",
		text : "review_by_system",
		type : "textarea",
		enable : true,
		cols   : 12,
	},
	
	{
		subtitle : "background",
		cols 	 : 12,
		key 	 : "Patologics",

	},
	{
		key : "personalHistory",
		text : "current_disease_previous_personal",
		type : "textarea",
		enable : true,
		cols 	 : 12,
		
	},

	{
		key : "familyBackground",
		text : "familyBackground",
		type : "textarea",
		enable : true,
		cols 	 : 12,
	},

	{
		key : "allergic",
		text : "allergic",
		type : "text",
		enable : true,
	},	
	{
		subtitle : "ObstetricHistory",
		cols 	 : 12,
		condition_key : "sexo",
		key 		  : "Obstetrics",
		condition 	  : "2",
	},
	{
		key : "pregnancy",
		text : "pregnancy", // Estado de Embarazo
		type : "select",
		list : [ 
			{ text : "Si", value : true },{ text : "No", value : false }
		],
		enable : true,
		condition_key : "sexo",
		item_value : "value",
		item_text  : "text",
		condition 	  : "2",
	},
	{
		key : "fur",
		text : "FUR",
		type : "multi-text",
		enable : true,
		sub_fields : [
			{
				key : "f",
				text : "f",
				type : "text",
				enable : true,
			},
			{
				key : "u",
				text : "u",
				type : "text",
				enable : true,
			},
			{
				key : "r",
				text : "r",
				type : "text",
				enable : true,
			},

		],
	},

	{
		key : "tg",
		text : "tg",
		type : "text",
		placeholder : "Sem",
		append : "Sem.",
		condition_key : "GenderId",
		condition 	  : "2",
		enable : true,
	},
	
	{
		key : "fpp",
		text : "FPP",
		type : "multi-text",
		condition_key : "sexo",
		condition 	  : "2",
		sub_fields : 
		[

			{
				key : "f1",
				text : "f1",
				type : "text",
				enable : true,
			},
			{
				key : "p",
				text : "p",
				type : "text",
				enable : true,
			},
			{
				key : "p1",
				text : "p1",
				type : "text",
				enable : true,
			}
		],	
		enable : true,
	},

	{
		key : "ho",
		text : "HO",
		type : "multi-text",
		enable : true,
		condition_key : "sexo",
		condition 	  : "2",
		sub_fields : 
		[
			{
				key : "g",
				text : "g",
				type : "text",
				enable : true,
			},
			{
				key : "p2",
				text : "p",
				type : "text",
				enable : true,
			},
			{
				key : "a",
				text : "a",
				type : "text",
				enable : true,
			},
			{
				key : "c",
				text : "c",
				type : "text",
				enable : true,
			}
		],
	},
	{
		key : "pregnancyTime",
		text : "pregnancyTime",
		type : "number",
		enable : true,
		condition_key : "sexo",
		condition 	  : "2",
	},

	{
		key : "cause",
		text : "cause",
		type : "text",
		condition_key : "sexo",
		condition 	  : "2",
		enable : true,
	},
	{
		key : "cytology",
		text : "cytology", // Citologia reciente
		type : "select",
		list : [ "Si", "No"],		
		condition_key : "Gender",
		condition 	  : "2",
		enable : true,
	},
	{
		key : "result",
		text : "result",
		type : "text",
		condition_key : "sexo",
		condition 	  : "2",
		enable : true,
	},

	{
		subtitle : "personal_background",
		cols : 12,
		key : "personal_background"
	},

	{
		key  		: "PersonalBackgrounds",
		text 		: "PersonalBackgrounds", // diagnostico
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',		
		placeholder : "Escribir diagnostico",
		cols   		: 12,
		field_ref : "",
		headers 		: [
			{ text : "antecedent", value : "antecedent" },
			{ text : "description", value : "description" },			
			{ text : "actions", value : "action" },
		],
		requests 	: {
			delete : service.deletePersonalBackground, //"/api/v1/personal-background/"
		} ,
		fields      : [
			{
				key 	 		: "antecedent",
				key_main 		: "PersonalBackgrounds",
 				type 	 		: "Autocomplete", //select
				text 	 		: "antecedent",
				cols 			: 3,
				placeholder 	: "antecedent",	
				isRequired 		: true,
				list 			: [
					"Patologicos",
					"Quirurgicos",
					"Hospitalarios",
					"Tranfusiones",
					"Toxicos",
					"Alergicos",
					"Farmacologicos",
					"Otros"
				],			

			},
			{
				cols 			: 7,				
				key 	 		: "description",
				key_main 		: "PersonalBackgrounds",
 				type 	 		: "text",
				text 	 		: "description",
				isRequired 		: true,
				btn_add 		: true,
				placeholder 	: "description",
				action 			: "add_table",
				// cols 			: ,

			}
		],
		list 		: "render_diagnoses",
		enable 		: true,

	},
	
	

	//
	{
		subtitle : "vital_parameters",
		cols 	 : 12,
		key 		  : "parameters",

	},
	
	{
		key : "weight",
		text : "weight",
		type : "number",
		enable : true,
		cols  		: 2,
		suffix : "Kg",
	},


	{
		key : "size",
		text : "size",
		type : "number",
		enable : true,
		cols  		: 2,
		action : "setISC",
		suffix : "M",
	},
	{
		key : "imc", //
		text : "imc",
		type : "number",
		enable : true,
	},
	{
		key : "isc",
		text : "isc",
		type : "number",
		enable : true,
		cols  		: 2,
	},

	{
		key : "pa",
		text : "blood_pressure",
		placeholder : "mm/Hg",
		type : "text",
		suffix : "mm/Hg",
		enable : true,
		cols  		: 2,
	},

	{
		key : "fc",
		text : "heart_rate",
		type : "text",
		enable : true,
		suffix : "pulso(bpm)",
		cols  		: 2,
	},

	{
		key : "fr",
		text : "respiratory_rate",
		type : "text",
		suffix : "bpm",
		enable : true,
		cols  		: 2,
	},

	{
		key : "temperature",
		text : "temperature",
		type : "text",
		enable : true,
		suffix : "°C",
		cols  		: 2,

	},

	{
		key : "glucometry",
		text : "glucometry",
		placeholder : "Mg/dl",
		type : "text",
		enable : true,
		cols  		: 3,
		suffix : "Mg/dl",
	},
	{
		key : "spo2",
		text : "oxygen_saturation",
		type : "text",
		enable : true,
		suffix : "SpO2",
	},
	{
		key : "glasgow",
		text : "glasgow", // Escala de Glasgow
		type : "text",
		enable : true,
		cols : 2
	},
	/*{
		key : "userPosition", // assignedUserId
		text : "Nombre y Cargo de Quien realiza el triage ",
		type : "text",
		
		enable : true,
	},
	{
		key : "medicalSignature", // fsmedico
		text : "Firma y Sello del Médico ",
		type : "text",
		enable : true,
	},
	{
		key : "transferred", // translado
		text : "Recomendacion de translado a otro Centro",
		type : "select",		
		item_value : "value",
		item_text  : "text",
		list : [ 
			{ text : "Si", value : true },{ text : "No", value : false }			
		],		

		enable : true,
	},*/
	{
		subtitle : "physical_exam",
		cols : 12,
		key : "physical_exam"
	},
	{
		key  		: "PhysicalExams",
		text 		: "diagnosticImpression",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		placeholder : "Escribir diagnostico",
		cols   		: 12,
		headers 		: [
			{ text : "examined", value : "examined" },
			{ text : "normal_altered", value : "status" },			
			{ text : "description", value : "description" },			
			{ text : "actions", value : "action" },
		],
		requests 	: {
			delete : service.deletePhisicalExam, //"/api/v1/physical-exam/"
		} ,
		fields      : [
			{
				key 	 		: "examined",
				key_main 		: "PhysicalExams",
 				type 	 		: "Autocomplete", //select
				text 	 		: "examined",
				cols 			: 2,
				placeholder 	: "name",		
				global_list 	: "",
				isRequired 		: true,
				list 			: [
					"Cabeza",
					"Ojos",
					"Nariz",
					"Boca",
					"Oidos",
					"Cuello",
					"Torax",
					"Pulmones",
					"Corazon",
					"Abdomen",
					"Genico-Urinario",
					"Extremidades",
					"Neurologia",
					"Piel y Faneras",
				]		

			},
			{
				key 	 		: "status",
				key_main 		: "PhysicalExams",
 				type 	 		: "Autocomplete", //select
				text 	 		: "normal_altered",
				isRequired 		: true,
				cols 			: 3,
				placeholder 	: "normal_altered",				
				list 			: [
					"Normal",
					"Alterado",
				]

			},
			{
				cols 			: 5,				
				key 	 		: "description",
				key_main 		: "PhysicalExams",
 				type 	 		: "text",
				text 	 		: "description",
				isRequired 		: true,
				btn_add 		: true,
				placeholder 	: "description",
				action 			: "add_table",
				// cols 			: ,

			}
		],
		list 		: "render_diagnoses",
		enable 		: true,

	},

	{
		key : "observations",
		text : "analysis",
		type : "textarea",
		enable : true,
		cols   : 12,
	},
	// {
	// 	key : "paraclinical",
	// 	text : "paraclinical",
	// 	type : "textarea",
	// 	enable : true,
	// 	cols   : 12,
	// },
	
	{
		subtitle : "diagnosticImpression",
		cols : 12,
		key : "diagnosticImpression"
	},
	{
		key  		: "SubDiagnoseLists",		
		text 		: "diagnostico",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		placeholder : "Escribir diagnostico",
		cols   		: 12,
		header 		: [
			{ text : "code", value : "code" },
			{ text : "diagnosis", value : "diagnosis" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/subdiagnose-list/"
		} ,
		fields      : [
			{
				key 			: "searcher_diagnosis",				
				text 			: "search",
				key_main  		: "SubDiagnoseLists",
				type 			: "select_search",
				global_list		: "diagnostic-list", // diagnostic_list
				isSync  		: true,
				enable			: true,
				icon 			: "mdi-selection-marker", 
				cols 			: 12,
				item_text  		: "description",
				item_value 		: "code",	
				show_texts  	: ["code", "description"],
				key_search  	: "code",
				key_search_1 	: "description",
				return_obj 		: true,
				action 	   		: "set_diagnosis",
			},
			{
				key 	 		: "code",
				key_main 		: "SubDiagnoseLists",
 				type 	 		: "text",
				text 	 		: "code",
				cols 			: 3,
				placeholder 	: "code",				

			},
			{
				key 	 		: "diagnosis",
				key_main 		: "SubDiagnoseLists",
 				type 	 		: "text",
				text 	 		: "diagnosis",
				btn_add 		: true,
				placeholder 	: "diagnosis",
				action 			: "add_table",
				// cols 			: ,

			}
		],
		list 		: "render_diagnoses",
		enable 		: true,

	},
	{
		key : "plan",
		text : "plan",
		type : "textarea",
		enable : true,
		cols   : 12,
	},
	
];