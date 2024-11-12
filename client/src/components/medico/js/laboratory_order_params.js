export default [
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
		subtitle : "Laboratorios",
		cols : 12,
		key : "laboratories"
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
		cols   		: 12,
		header 		: [
			{ text : "date", value : "date" }, // Order
			{ text : "cup", value : "CupsList.code" },			
			{ text : "orders", value : "order" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/order/"
			// update : ""
		},
		fields      : [		
			{
				key 			: "laboratories",
				subtitle 		: "laboratories",	
				cols 			: 12,

			},	
			{
				key 			: "searcher_laboratories",				
				text 			: "search",
				type 			: "select_search",
				global_list 	: "cups-list",
				enable			: true,
				key_main  		: "Orders",
				icon 			: "mdi-selection-marker", 
				cols 			: 12,
				item_text  		: "description",
				item_value 		: "code",	
				show_texts  	: ["description"],
				key_search  	: "description",
				key_search_1 	: "code",
				return_obj 		: true,
				action 	   		: "set_cup_order",
				isSync  		: true,
				// sub Select 
				isSubSelect		: true,
				subSelectList 	: "tariff-category",
				sub_item_text   : "name",
				sub_item_value  : "id",
				searchSubSelect : "id",
				sub_placeholder : "category",
				sub_text  		: "category",
				default      	: 2, 
			},
			{
				key 	 		: "date", // Order
				key_main 		: "Orders",
 				type 	 		: "date_range",
				text 	 		: "date",
				cols 			: 2,
				placeholder 	: "date",				

			},
			{
				key 	 		: "cups", // Order
				key_main 		: "Orders",
 				type 	 		: "text",
				text 	 		: "cups",
				cols 			: 2,
				placeholder 	: "cups",				

			},
			{
				key 	 		: "order",
				key_main 		: "Orders",
 				type 	 		: "text",
				text 	 		: "laboratorio",
				btn_add 		: true,
				placeholder 	: "laboratorios",
				action 			: "add_table",
				// cols 			: ,

			}
		],		
		list 		: "list_orders",
		enable 		: true,

	},
	/*{
		key  		: "SubTreatments",
		text 		: "treatment",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		placeholder : "Escribir orden",
		cols   		: 12,
		header 		: [
			{ text : "date", value : "date" },
			{ text : "treatment", value : "treatment" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/treatment/"
		},
		fields      : [			
			
			{
				key 	 		: "treatment",
				key_main 		: "SubTreatments",
 				type 	 		: "text",
				text 	 		: "treatment",
				btn_add 		: true,
				placeholder 	: "treatment",
				action 			: "add_table",
				// cols 			: ,

			}
		],		
		list 		: "treatments",
		enable 		: true,

	},*/
	
];