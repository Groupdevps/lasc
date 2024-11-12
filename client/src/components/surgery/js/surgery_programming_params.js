export default[
	{
		key  	: "fullName",
		text 	: "nombre",
		type 	: "text",
		isDisabled : true,
		cols : 3,

	},
	{
		key  	: "numberId",
		text 	: "numberId",
		type 	: "number",
		isDisabled : true,
		cols : 2,

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
		cols : 2,

	},
	{
		key  	: "phone",
		text 	: "telefono",
		type 	: "number",
		isDisabled : true,
		cols : 2,

	},
	{
		key  	: "address",
		text 	: "direccion",
		type 	: "text",
		isDisabled : true,
		cols : 3,

	},
	
	{
		key  	: "AttentionId",
		text 	: "AttentionId",
		type 	: "number",
		isDisabled : true,
		cols : 2,

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
			/*{
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

			}*/
		],		
		list 		: "list_diagnosticos",
		enable 		: true,

	},
	{
		key  	: "Date",
		text 	: "date",
		type 	: "DateAuto",
		// isDisabled : true,
		cols : 3,
	},
	{
		key  	: "Hour",
		text 	: "hour",
		type 	: "time_picker",
		// isDisabled : true,
		cols : 3,
	},
	{
		key  	: "orderNumber",
		text 	: "orderNumber",
		type 	: "text",
		isDisabled : true,
		cols : 3,
	},

	// {
	// 	key  	: "Place",
	// 	text 	: "place",
	// 	type 	: "text",
	// 	// isDisabled : true,
	// 	cols : 3,
	// },
	
	{
		key  	: "SurgeryLiquidationId",
		text 	: "TypeSurgery",
		type 	: "component",
		cols : 3,
	},
	{
		key  	: "SurgeonA",
		text 	: "SurgeonA",
		type 	: "component",
		cols : 3,
	},
	{
		key  	: "SurgeonB",
		text 	: "SurgeonB",
		type 	: "component",
		cols : 3,
		isDisabled : true,

	},
	{
		subtitle : "formAccessRoutes",
		cols : 12,
		key : "FormAccessRoutes"
	},
	{
		key  	: "accessRoutes",
		text 	: "accessRoutes",
		type 	: "component",
		cols : 12,

	},

	/*{
		key  	: "OperatingRoom",
		text 	: "operating_room",
		type 	: "text",
		isDisabled : true,
		cols : 3,
	},*/
]