MODULE.exports = [
	{
		key  	: "fullName",
		text 	: "name",
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
		key  			: "assignedCenter",
		// key_main 		: "ServiceProvider",
		text 			: "eps",
		type 			: "select_search",
		list 			: 'list_eps',
		show_texts    	: ['name', 'nit'],
		text_list 		: "administradora",		
		global_list 	: "current-administrator",
		item_text 		: "name",
		item_value 		: "id",
		key_search   	: "name",
		key_search_1 	: "nit",
		action 			: "set_eps",
		enable 			: true,
		is_object 		: true,
		isDisabled : true,

	},
	{
		key  	: "phone",
		text 	: "phone",
		type 	: "number",
		isDisabled : true,

	},
	{
		key  	: "address",
		text 	: "address",
		type 	: "text",
		isDisabled : true,

	},
	{
		key  	: "AttentionId",
		text 	: "N. Atencion",
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
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		placeholder : "Escribir diagnostico",
		cols   		: 6,
		header 		: [
			{ text : "code", value : "code" },
			{ text : "diagnoses", value : "diagnosis" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/subdiagnose-list/"
			// update : ""
		} ,
		fields      : [
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
		key  		: "Observations",
		text 		: "observations",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		icon 		: 'mdi-plus',
		type_field 	: "text",
		color_icon 	: "white",
		color 	   	: "primary",
		action 	   	: "add_table", 
		placeholder : "Escribir observacion",
		cols   		: 6,
		header 		: [
			// { text : "", value : "" },
			{ text : "observacion", value : "observation" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/observation/"
			// update : ""
		} ,
		fields      : [
			{
				key 	 		: "observation",
				key_main 		: "Observations",
 				type 	 		: "text",
				text 	 		: "observation",
				btn_add 		: true,
				placeholder 	: "observation",
				action 			: "add_table",

			}
		],
		list : "list_observacions",
		enable : true,
	}
];