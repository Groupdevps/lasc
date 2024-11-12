export default  [
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
		key  			: "assignedAdministrator",
		// key_main 		: "ServiceProvider",
		text 			: "eps",
		type 			: "select", //_search
		list 			: 'list_eps',
		show_texts    	: ['name', 'nit'],
		text_list 		: "administradora",		
		global_list 	: "current-administrator",
		item_text 		: "name",
		item_value 		: "name", // id
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
		key  	: "address",
		text 	: "address",
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
		subtitle : "diagnostico",
		cols : 12,
		key : "diagnostic"
	},
	{
		subtitle : "diagnostics",
		cols : 12,
		key : "Subdiagnostic"
	},
	{
		key  		: "SubDiagnoseLists",
		text 		: "diagnostico",
		type 		: "table-read",//"table_field",
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
			{ text : "DIAGNOSTICO", value : "name" },// diagnosis
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
		list 		: "render_diagnoses",
		enable 		: true,

	},
	{
		subtitle : "formulas",
		cols : 12,
		key : "medical_formulas"
	},
	{
		key  		: "Medicines",
		text 		: "medicines",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		icon 		: 'mdi-plus',
		type_field 	: "text",
		color_icon 	: "white",
		color 	   	: "primary",
		action 	   	: "add_table", 
		placeholder : "Escribir observacion",
		cols   		: 12,
		header 		: [
			// { text : "", value : "" },
			{ text : "medicine", value : "medicine" },			
			{ text : "amount", value : "amount" },			
			{ text : "dosage", value : "dosage" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/medicine/"
			// update : ""
		} ,
		fields      : [
			{
				key 			: "medicine",
				subtitle 		: "medicine",	
				cols 			: 12,

			},	
			{
				key 		: "searcher_orders",				
				text 		: "search",
				type 		: "select_search",
				global_list : "tariff-manual",
				enable		: true,
				key_main  	: "Orders",
				icon 		: "mdi-selection-marker", 
				cols 		: 12,
				item_text  	: "description",
				item_value 	: "code",	
				show_texts  : ["description", "code"],
				key_search  : "description",
				key_search_1 : "code",
				return_obj 	: true,
				action 	   	: "set_medicine",
				isSync  	: true,
				// sub Select 
				isSubSelect		: true,
				subSelectList 	: "tariff-category",
				sub_item_text   : "name",
				sub_item_value  : "id",
				searchSubSelect : "id",
				sub_placeholder : "category",
				sub_text  		: "category",
				default      	: 3, 
			},
			{
				key 	 		: "medicine",
				key_main 		: "Medicines",
 				type 	 		: "text",
				text 	 		: "medicine",			
				placeholder 	: "medicine",
				action 			: "",
			},
			{
				key 	 		: "amount",
				key_main 		: "Medicines",
 				type 	 		: "number",
				text 	 		: "amount",

				placeholder 	: "amount",
				action 			: "",
				cols 			:  3

			},
			/*{
				key 	 		: "via",
				key_main 		: "Medicines",
 				type 	 		: "text",
				text 	 		: "via",
				placeholder 	: "via",
				action 			: "",
			},
			{
				key 	 		: "frequency",
				key_main 		: "Medicines",
 				type 	 		: "text",
				text 	 		: "frequency",
				placeholder 	: "frequency",
				action 			: "",
			},
			{
				key 	 		: "duration",
				key_main 		: "Medicines",
 				type 	 		: "text",
				text 	 		: "duration",
				placeholder 	: "duration",
				action 			: "",
			},*/
			{
				key 	 		: "dosage",
				key_main 		: "Medicines",
 				type 	 		: "text",
				text 	 		: "dosage",
				btn_add 		: true,
				placeholder 	: "dosage",
				action 			: "add_table",

			},
			/*{
				key 	 		: "treatment",
				key_main 		: "medicines",
 				type 	 		: "text",
				text 	 		: "treatment",
				btn_add 		: true,
				placeholder 	: "treatment",
				action 			: "add_table",
			}*/

		],
		list : "list_observacions",
		enable : true,
	},
	/*{
		key  	: "SubTreatments",
		text 	: "Treatments",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		icon 		: 'mdi-plus',
		type_field 	: "text",
		color_icon 	: "white",
		color 	   	: "primary",
		action 	   	: "add_table", 
		placeholder : "Escribir observacion",		
		cols   		: 12,
		header 		: [
			// { text : "", value : "" },
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
				placeholder 	: "description",
				action 			: "add_table",

			}
		],
		list : "list_observacions",
		enable : true,
	},*/
];