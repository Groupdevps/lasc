module.exports = [
	{
		key  	: "fullName",
		text 	: "nombre",
		type 	: "text",

	},
	{
		key  	: "numberId",
		text 	: "numberId",
		type 	: "number",

	},
	{
		key  	: "assignedCenter",
		text 	: "eps",
		type 	: "select_search",
		list 			: 'list_eps',
		show_texts    	: ['name', 'nit'],
		global_list 	: 'current-administrator',
		item_text 		: "name",
		item_value 		: "id",
		key_search   	: "name",
		key_search_1 	: "nit",
		text_list 		: "administradora",	
		action 			: "set_eps",
		enable 			: true,
		is_object 		: true,

	},
	{
		key  	: "phone",
		text 	: "telefono",
		type 	: "number",

	},
	{
		key  	: "address",
		text 	: "direccion",
		type 	: "text",

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
		cols   		: 6,
		header 		: [
			// { text : "dates", value : "date" },			
			{ text : "CODIGO", value : "code" },
			{ text : "DIAGNOSTICO", value : "diagnosis" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/diagnosis/"
			// update : ""
		},
		fields      : [
			{
				key 	 		: "date",
				key_main 		: "SubDiagnoseLists",
 				type 	 		: "date_range",
				text 	 		: "date",
				cols 			: 3,
				placeholder 	: "code",				

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
		list 		: "list_diagnosticos",
		enable 		: true,

	},
	
	{
		key  		: "Orders",
		text 		: "order",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		placeholder : "Escribir orden",
		cols   		: 6,
		header 		: [
			{ text : "date", value : "dateOrder" },
			{ text : "orders", value : "order" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/order/"
			// update : ""
		},
		fields      : [			
			{
				key 	 		: "dateOrder",
				key_main 		: "Orders",
 				type 	 		: "date_range",
				text 	 		: "date",
				cols 			: 3,
				placeholder 	: "code",				

			},
			{
				key 	 		: "order",
				key_main 		: "Orders",
 				type 	 		: "text",
				text 	 		: "order",
				btn_add 		: true,
				placeholder 	: "order",
				action 			: "add_table",
				// cols 			: ,

			}
		],		
		list 		: "list_orders",
		enable 		: true,

	},
	
	
];