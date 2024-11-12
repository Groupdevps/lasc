export default [
	{
		key : "LevelTriageId", // level
		text : "Nivel",
		type : "component",
		component : "MenuLevelTriage",
		enable : true,
		item_value : "id",
		item_text : "description",
		isAutofocus : true,
		global_list : "level-triage",
		list  : [
			{ name  : "Reanimacion",},
           	{ name :"Emergencia",},
           	{ name :"Urgencia",},
           	{ name :"Urgencia menor",},
           	{ name : "Sin urgencia",},
           	  	
		],
		action : "",
		default : "Urgencia",

	},
	{
		key : "date",
		text : "date",
		type : "date_range",
		enable   : true,
		action : "get_date",
		ref : "fecha",
		isDisabled : true,
	},
	{
		key : "hour",
		text : "hour",
		type : "time_picker",
		enable : true,
		action : "get_hour",
		ref : "hora",		
		isDisabled : true,
	},
	{
		subtitle : "Informacion paciente",
		cols 	 : 12,
		key 		  : "patient",

	},
	{
		key : "name",
		text : "name",
		type : "text",
		enable : true,
		isDisabled : true,
		isReadOnly :true,
	},
    

	{
		key : "lastName",
		text : "lastname",
		type : "text",
		enable : true,
		isDisabled : true,
		isReadOnly :true,
	},
	{
		key : "GenderId",
		text : "gender",
		type : "component",
		component : "MenuGenderComponent",
		global_list : "genders",		
		item_value : "id",
		item_text : "name",
		enable : true,
		list : [ "M", "F"],
		action : "show_gender",
		isDisabled : true,
		isReadOnly :true,
	},
	{
		key : "age",
		text : "age",
		type : "text",
		enable : true,
		isDisabled : true,
		isReadOnly :true,
		// isDisable : true,
	},
	{
		key : "numberId",
		text : "numberId",
		type : "number",
		enable : true,
		isDisabled : true,
		isReadOnly :true,
	},

	{
		key : "TypeIDId",
		text : "typeId",
		type : "component",
		component : "MenuTypeDocumentComponent",
		list : "list_docs",
		global_list : "typeIds",
		item_value 	: "id",
		item_text 	: "name",
		enable : true,
		isDisabled : true,
		isReadOnly :true,
	},
	/*{
		key : "eps",
		text : "eps",
		type : "select_search",
		global_list : "centers",		
		enable : true,
	},*/
	{
		key 			: "assignedAdministrator",
		text 			: "eps",
		component 		: "MenuCurrentAdministratorComponent",
		type 			: "component",
		list 			: 'list_eps',
		show_texts    	: ['administradora', 'nit'],
		text_list 		: "administradora",
		key_search   	: "administradora",
		item_text 		: "name",
		item_value 		: "name",
		key_search_1 	: "nit",
		action 			: "set_eps",
		global_list  	: "current-administrator",
		enable 			: true,
		isDisabled 		: true,
		is_object 		: true,
		isReadOnly :true,
	},
	

	{
		key : "phone",
		text : "phone",
		type : "text",
		enable : true,
		isDisabled : true,
		isReadOnly :true,
	},

	{
		key : "cellphone",
		text : "cellphone",
		type : "text",
		enable : true,
		isReadOnly :true,
		isDisabled : true,
	},
	{
		key : "address",
		text : "address",
		type : "text",
		enable : true,
		isDisabled : true,
		isReadOnly :true,
	},
	{
		key : "email",
		text : "email",
		type : "email",
		enable : true,
		isDisabled : true,
		isReadOnly :true,
	},

	{
		key : "motive",
		text : "reason_for_consultation",
		type : "text",
		enable : true,
		cols   : 12,
	},
	{
		subtitle : "pathological_history",
		cols 	 : 12,
		key 		  : "Patologics",

	},
	{
		key : "personalHistory",
		text : "Personales",
		type : "text",
		enable : true,
		cols 	 : 12,
		
	},

	{
		key : "familyBackground",
		text : "Familiares",
		type : "text",
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
		subtitle : "vital_parameters",
		cols 	 : 12,
		key 		  : "parameters",

	},
	
	{
		key : "weight",
		text : "weight",
		type : "number",
		enable : true,
		suffix : "Kg",
	},

	{
		key : "size",
		text : "size",
		type : "number",
		enable : true,
		suffix : "M",
	},
	
	
	{
		key : "imc", //
		text : "imc",
		type : "number",
		enable : true,
	},
	{
		key : "isc", //imc
		text : "isc",
		type : "number",
		enable : true,
	},

	{
		key : "pa",
		text : "blood_pressure",
		placeholder : "mm/Hg",
		type : "text",
		enable : true,
		suffix : "mm/Hg",
	},

	{
		key : "fc",
		text : "heart_rate",
		type : "text",
		enable : true,
		suffix : "pulso(bpm)",
	},

	{
		key : "fr",
		text : "respiratory_rate",
		type : "text",
		enable : true,
		suffix : "bpm",
	},

	{
		key : "temperature",
		text : "temperature",
		type : "number",
		enable : true,
		suffix : "°C",
	},

	{
		key : "glucometry",
		text : "glucometry",
		placeholder : "Mg/dl",
		type : "text",
		enable : true,
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
		
	},
	// {
	// 	subtitle : "obstetric_history",
	// 	cols 	 : 12,
	// 	condition_key : "genter",
	// 	key 		  : "Obstetrics",
	// 	condition 	  : "2",
	// },
	// {
	// 	key : "pregnancy",
	// 	text : "pregnancy",
	// 	type : "select",
	// 	list : [ 
	// 		{ text : "Si", value : true },{ text : "No", value : false }
	// 	],
	// 	enable : true,
	// 	condition_key : "gender",
	// 	item_value : "value",
	// 	item_text  : "text",
	// 	condition 	  : "2",
	// },
	// {
	// 	key : "fur",
	// 	text : "FUR",
	// 	type : "multi-text",
	// 	enable : true,
	// 	sub_fields : [
	// 		{
	// 			key : "f",
	// 			text : "f",
	// 			type : "text",
	// 			enable : true,
	// 		},
	// 		{
	// 			key : "u",
	// 			text : "u",
	// 			type : "text",
	// 			enable : true,
	// 		},
	// 		{
	// 			key : "r",
	// 			text : "r",
	// 			type : "text",
	// 			enable : true,
	// 		},

	// 	],
	// },

	// {
	// 	key : "tg",
	// 	text : "tg",
	// 	type : "text",
	// 	placeholder : "Sem",
	// 	append : "Sem.",
	// 	condition_key : "GenderId",
	// 	condition 	  : "2",
	// 	enable : true,
	// },
	
	// {
	// 	key : "fpp",
	// 	text : "FPP",
	// 	type : "multi-text",
	// 	condition_key : "sexo",
	// 	condition 	  : "2",
	// 	sub_fields : 
	// 	[

	// 		{
	// 			key : "f1",
	// 			text : "f",
	// 			type : "text",
	// 			enable : true,
	// 		},
	// 		{
	// 			key : "p",
	// 			text : "p",
	// 			type : "text",
	// 			enable : true,
	// 		},
	// 		{
	// 			key : "p1",
	// 			text : "p",
	// 			type : "text",
	// 			enable : true,
	// 		}
	// 	],	
	// 	enable : true,
	// },

	// {
	// 	key : "ho",
	// 	text : "HO",
	// 	type : "multi-text",
	// 	enable : true,
	// 	condition_key : "sexo",
	// 	condition 	  : "2",
	// 	sub_fields : 
	// 	[
	// 		{
	// 			key : "g",
	// 			text : "g",
	// 			type : "text",
	// 			enable : true,
	// 		},
	// 		{
	// 			key : "p2",
	// 			text : "p",
	// 			type : "text",
	// 			enable : true,
	// 		},
	// 		{
	// 			key : "a",
	// 			text : "a",
	// 			type : "text",
	// 			enable : true,
	// 		},
	// 		{
	// 			key : "c",
	// 			text : "c",
	// 			type : "text",
	// 			enable : true,
	// 		}
	// 	],
	// },
	// {
	// 	key : "pregnancyTime",
	// 	text : "pregnancyTime",
	// 	type : "number",
	// 	enable : true,
	// 	condition_key : "gender",
	// 	condition 	  : "2",
	// },

	// {
	// 	key : "cause",
	// 	text : "cause",
	// 	type : "text",
	// 	condition_key : "gender",
	// 	condition 	  : "2",
	// 	enable : true,
	// },
	// {
	// 	key : "cytology",
	// 	text : "recent_cytology",
	// 	type : "select",
	// 	list : [ "Si", "No"],		
	// 	condition_key : "Gender",
	// 	condition 	  : "2",
	// 	enable : true,
	// },
	// {
	// 	key : "result",
	// 	text : "result",
	// 	type : "text",
	// 	condition_key : "gender",
	// 	condition 	  : "2",
	// 	enable : true,
	// },
	{
		subtitle : "who_performs_triage",
		cols 	 : 12,		
		key 		  : "triageEnd",		
	},
	{
		key : "userPosition", // assignedUserId
		text : "userPosition",
		type : "text",		
		enable : true,
		isDisabled :true,
	},
	{
		key 		: "professionalCardNumber", // medicalSignature
		text 		: "RegistrationNumber", //medico
		type 		: "number",
		isDisabled :true,
		// global_list : "doctors",
		// item_value  : "User.name",
		// item_text 	: "User.name",
		cols 		: 4,
		action 		: "",
	},
	/*{
		key : "medicalSignature", // fsmedico
		text : "Firma y Sello del Médico ",
		type : "text",
		enable : true,
	},*/
	{
		key : "isReEntry", // reingresado / translado / transferred
		text : "PatientReadmitted", //transfer_to_another_center
		type : "select",		
		item_value : "value",
		item_text  : "text",
		list : [ 
			{ text : "Si", value : true },{ text : "No", value : false }			
		],		

		enable : true,
	},
];