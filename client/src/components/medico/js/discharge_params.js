export default[
	{
		key  	: "fullName",
		text 	: "nombre",
		type 	: "text",
		isDisabled : true,

	},
	{
		key  	: "numberId",
		text 	: "numberId",
		type 	: "number",
		isDisabled : true,

	},
	{
		key  	: "assignedAdministrator",
		text 	: "eps",
		type 	: "select", // _search
		list 			: 'list_eps',
		show_texts    	: ['name', 'nit'],
		global_list 	: 'current-administrator',
		item_text 		: "name",
		item_value 		: "name",//id
		key_search   	: "name",
		key_search_1 	: "nit",
		text_list 		: "administradora",	
		action 			: "set_eps",
		enable 			: true,
		is_object 		: true,
		isDisabled : true,

	},
	{
		key  	: "phone",
		text 	: "telefono",
		type 	: "number",
		isDisabled : true,

	},
	{
		key  	: "address",
		text 	: "direccion",
		type 	: "text",
		isDisabled : true,

	},
	{
		key 	: "age",
		text    : "age",
		type    : "text",
		icon    : "mdi-calendar",
		isDisabled : true,
		cols 	: 2, 
	},
	{
		key  	: "AttentionId",
		text 	: "AttentionId",
		type 	: "number",
		isDisabled : true,

	},
	{
		subtitle : "diagnostics",
		cols : 12,
		key : "Subdiagnostic"
	},
	{
		key  		: "SubDiagnoseLists",
		text 		: "diagnostico",
		type 		: "table-read",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		placeholder : "Escribir diagnostico",
		isReadonly 	: true,
		cols   		: 12,
		header 		: [
			// { text : "date", value : "date" },
			{ text : "CODIGO", value : "code" },
			{ text : "DIAGNOSTICO", value : "name" },	//description		
			// { text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/subdiagnose-list/"
			// update : ""
		},
		fields      : [
			{
				key 			: "diagnosis",
				subtitle 		: "diagnosis",	
			}
			
		],		
		list 		: "list_diagnosticos",
		enable 		: true,

	},	
	
	{
		subtitle : "vital_signs",
		cols: 12,
		key : "vital_signs", 
	},
	{
		key  	: "weight",
		text 	: "weight",
		type 	: "number",		// INTEGER
		suffix : "Kg",
		cols : 2,
	},
	{
		key : "size",
		text : "size",
		type : "number", // INTEGER
		enable : true,
		suffix : "M",
		cols : 2,
	},
	{
		key : "arterialTsn",
		text : "arterialTsn",
		type : "text",
		enable : true,
		cols : 2,
		// suffix : "M",
	},    
	{
		key : "cardiacFr",
		text : "heart_rate",
		type : "number", // INTEGER
		enable : true,
		cols : 3,
		suffix : "pulso(bpm)",
		// suffix : "M",
	},    
	{
		key : "respiratoryFr",
		text : "respiratory_rate",
		type : "number", // INTEGER
		enable : true,
		cols : 3,
		suffix : "bpm",
		// suffix : "M",
	},  
	{
		key : "pulse",
		text : "pulse",
		type : "number", // INTEGER
		enable : true,
		cols : 2,
		suffix : "bpm",
		// suffix : "M",
	},    
	{
		key : "temperature",
		text : "temperature",
		type : "number", // FLOAT
		enable : true,
		cols : 2,
		suffix : "°C",
		// suffix : "M",
	},    
	{
		key : "eyeOpening",
		text : "eyeOpening",
		type : "number", // INTEGER
		enable : true,
		cols : 2,
		// suffix : "M",
	},  
	{
		key : "verbalResponse",
		text : "verbalResponse",
		type : "number", // INTEGER
		enable : true,
		cols : 2,
		// suffix : "M",
	},  
	{
		key : "motorResponse",
		text : "motorResponse",
		type : "number", // INTEGER
		enable : true,
		cols : 2,
		// suffix : "M",
	},  
    // {
	// 	key : "generalConditionsUponDeparture",
	// 	text : "generalConditionsUponDeparture",
	// 	type : "textarea", // TEXT
	// 	enable : true,
	// 	cols : 12,
	// 	// suffix : "M",
	// },
	{
		subtitle : "generalConditionsUponDeparture",
		cols: 12,
		key : "generalConditionsUponDeparture", 
	},  
	{
		key : "headAndNeck",
		text : "headAndNeck",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,
		prependIcon : "mdi-clipboard-text",		
		actionIcon : "copyText",
		msg_default : "msg_headAndNeck",

		// suffix : "M",
	},
	{
		key : "chest",
		text : "chest",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,
		prependIcon : "mdi-clipboard-text",		
		actionIcon : "copyText",
		msg_default : "msg_chest",
		// suffix : "M",
	},
	{
		key : "abdomen",
		text : "abdomen",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,
		prependIcon : "mdi-clipboard-text",		
		actionIcon : "copyText",
		msg_default : "msg_abdomen",
		// suffix : "M",
	},
    {
		key : "extremities",
		text : "extremities",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,
		prependIcon : "mdi-clipboard-text",		
		actionIcon : "copyText",
		msg_default : "msg_extremities",
		// suffix : "M",
	},
	{
		key : "neurological",
		text : "neurological",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,

		prependIcon : "mdi-clipboard-text",		
		actionIcon : "copyText",
		msg_default : "msg_neurological",
		// suffix : "M",
	},
	{
		key : "genitourinary",
		text : "genitourinary",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,	

		prependIcon : "mdi-clipboard-text",		
		actionIcon : "copyText",
		msg_default : "msg_genitourinary",
	},
	{
		key : "skinFannels",
		text : "SkinFannels",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,	

		prependIcon : "mdi-clipboard-text",		
		actionIcon : "copyText",
		msg_default : "msg_skinFannels",
	},
	{
		key : "lumbarOsteotendinous",
		text : "LumbarOsteotendinous",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,	
		
		prependIcon : "mdi-clipboard-text",		
		actionIcon : "copyText",
		msg_default : "msg_lumbarOsteotendinous",
	},
	{
		subtitle : "graduation_evolution",
		key : "graduation_evolution",
		cols : 12
	},
	{
		key : "evolutions",
		text : "",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,
		// suffix : "M",
	},
	{
		subtitle : "hospitalizationJustification",
		key : "hospitalizationJustification_",
		cols : 12
	},
	{
		key : "hospitalizationJustification",
		text : "",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,
		// suffix : "M",
	},
	{
		subtitle : "orders_discharge",
		key : "orders_discharge",
		cols : 12
	},
	{
		key : "orders",
		text : "",
		type : "textarea", // TEXT
		enable : true,
		cols : 12,
		// suffix : "M",
	},
	{
		key : "mainDischargeDiagnosis",
		text : "mainDischargeDiagnosis",
		type : "number", // INTEGER
		enable : true,
		cols : 3,
		// suffix : "M",
	},
	{
		key : "diagnosis1Discharge",
		text : "diagnosis1Discharge",
		type : "number", // INTEGER
		enable : true,
		cols : 3,
		// suffix : "M",
	},
	{
		key : "diagnosis2Discharge",
		text : "diagnosis2Discharge",
		type : "number", // INTEGER
		enable : true,
		cols : 3,
		// suffix : "M",
	},
	{
		key : "diagnosis3Discharge",
		text : "diagnosis3Discharge",
		type : "number", // INTEGER
		enable : true,
		cols : 3,
		// suffix : "M",
	},
	// {
	// 	key : "consultationSPurpose",
	// 	text : "consultationSPurpose",
	// 	type : "text", // 
	// 	enable : true,
	// 	cols : 3,
	// 	// suffix : "M",
	// },
	{
		key : "externalCause",
		text : "externalCause",
		type : "select", // 
		enable : true,
		cols : 3,
		item_text : "name",
		item_value : "name",
		list : [
			{ name : "ENFERMEDAD GENERAL" },
			{ name : "ENFERMEDAD PROFESIONAL" },
			{ name : "ACCIDENTE DE TRABAJO"},
			{ name : "ACCIDENTE DE TRANSITO"},
			{ name : "ACCIDENTE RABICO"},
			{ name : "ACCIDENTE OFIDICO"},			
			{ name : "MALTRATO FISICO"},
			{ name : "SOSPECHA ABUSO SEXUAL"},
			{ name : "SOSPECHA VIOLENCIA SEXUAL"},
			{ name : "LESION POR AGRESION"},
			{ name : "LESION AUTO-INFLINGIDA"},
		]
		// suffix : "M",
	},
	{
		key : "departureReason",
		text : "departureReason",
		type : "select", // 
		item_text : "name",
		item_value : "name",
		list : [
			{ name : "REMISIÓN" },
			{ name : "RETIRO VOLUNTARIO" },
			{ name : "MEJORÍA DEL CUADRO" },
			{ name : "VIVO" },
			{ name : "MUERTO" },
		],
		enable : true,
		cols : 3,
		// suffix : "M",
	},
	{
		key : "exitStatus",
		text : "exitStatus",
		type : "select", // 
		enable : true,
		cols : 3,
		item_text : "name",
		item_value : "name",
		list :[
			{ name : "VIVO" },
			{ name : "MUERTO" },
		],
		// suffix : "M",
	},   
    
]