module.exports = [
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
		type 	: "select",
		list 			: 'list_eps',
		show_texts    	: ['name', 'nit'],
		global_list 	: 'current-administrator',
		item_text 		: "name",
		item_value 		: "name",
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
		cols   		: 12,
		header 		: [
			{ text : "CODIGO", value : "code" },
			{ text : "DIAGNOSTICO", value : "name" }, // diagnosis			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/subdiagnose-list/"
		},
		fields      : [
			{
				key 			: "diagnosis",
				subtitle 		: "diagnosis",	
				cols 			: 12,

			},	
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
		key  		: "SubTreatments", // Procedures
		text 		: "procedures",
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
			{ text : "cups", value : "CupsList.code" }, // Order / cups
			{ text : "procedures", value : "treatment" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/sub-treatment/", // order
		},
		fields      : [			
			{
				key 			: "procedures",
				subtitle 		: "procedures",	
				cols 			: 12,

			},	
			{
				key 		: "searcher_laboratories",				
				text 		: "search",
				type 		: "select_search",
				global_list : "cups-list",
				enable		: true,
				key_main  	: "SubTreatments", // Orders
				icon 		: "mdi-selection-marker", 
				cols 		: 12,
				item_text  	: "description",
				item_value 	: "code",	
				show_texts  : ["description"],
				key_search  : "description",
				key_search_1 : "code",
				return_obj 	: true,
				action 	   	: "set_cup_treatment",
				isSync  	: true,
				// sub Select 
				isSubSelect		: true,
				subSelectList 	: "tariff-category",
				sub_item_text   : "name",
				sub_item_value  : "id",
				searchSubSelect : "id",
				sub_placeholder : "category",
				sub_text  		: "category",
				default      	: 1, 
			},
			{
				key 	 		: "date", // Order
				key_main 		: "SubTreatments",
 				type 	 		: "date_range",
				text 	 		: "date",
				cols 			: 3,
				placeholder 	: "code",				

			},
			{
				key 	 		: "cups", // Order
				key_main 		: "SubTreatments",
 				type 	 		: "text",
				text 	 		: "cups",
				cols 			: 3,
				placeholder 	: "cups",				

			},
			{
				key 	 		: "treatment", // procedure
				key_main 		: "SubTreatments",
 				type 	 		: "text",
				text 	 		: "procedures",
				btn_add 		: true,
				placeholder 	: "procedures",
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
			{ text : "order", value : "treatment" },			
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