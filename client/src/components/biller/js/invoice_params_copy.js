export default  [
	
	{
		key   : "info_patient",
		text  : "info_patient",		
		type  : "title",
		class : "",
		cols  : 12,
	},
	{
		key  	: "name",
		text 	: "name",
		type 	: "text",
		cols 	: 3,
		class 	: "",
	},
	{
		key  	: "lastName",
		text 	: "lastname",
		type 	: "text",
		cols 	: 3,
		class 	: "",
	},
	{
		key  	: "birthDate",
		text 	: "date_birth",
		type 	: "date_range",
		cols 	: 3,
		class 	: "",
	},
	{
		key  		: "TypeIDId",
		type 		: "select",
		text 		: "document_type",
		global_list : "typeIds",
		cols 		: 3,
		class 		: "",
		list 		: "list_type_documents",
		item_text 	: "name",
		item_value 	: "id",
	},
	{
		key  	: "numberId",
		text 	: "document",
		type 	: "number",
		cols 	: 3,
		class 	: "",
	},
	{
		key  		: "Gender",
		type 		: "select",
		text 		: "gender",
		cols 		: 3,
		class 		: "",
		list 		: "list_type_gender",
		global_list : "genders",
		item_text 	: "name",
		item_value 	: "key",

	},
	{
		key  	: "phone",
		type 	: "number",
		text 	: "phone",
		cols 	: 3,
		class 	: "",
	},

	{
		key  	: "address",
		type 	: "text",
		text 	: "address",
		cols 	: 3,
		class 	: "",
	},
	{
		key  	: "city",
		type 	: "text",
		text 	: "city",
		cols 	: 3,
		class 	: "",
	},
	{
		key  		: "assignedCenter",
		type 		: "select_search",
		cols 		: 3,
		text 		: "eps",
		class 		: "",
		global_list : "current-administrator",
		show_texts    	: ['name', 'nit'],
		key_search   	: "name",
		key_search_1 	: "nit",
		action 			: "set_eps",
		list 		: "list_centers",
		item_text 	: "name",
		item_value 	: "id", // id

	},
	{
		key  	: "nit",
		type 	: "text",
		text 	: "nit",
		cols 	: 3,
		class 	: "",
	},
	{ // ============================================================
		key   : "attention",
		type  : "title",
		text  : "care_information",
		class : "",
		cols  : 12,
	}, 
	{
		key  	: "dateAdmission",
		type 	: "date_range",
		text 	: "dateAdmission",
		cols 	: 3,
		class 	: "",
	},
	{
		key  	: "dateService",
		type 	: "date_range",
		text 	: "date_service",
		cols 	: 3,
		class 	: "",
	},
	{
		key  	: "medicoOnDuty",
		type 	: "text",
		text 	: "medico_on_duty",
		cols 	: 3,
		class 	: "",
	},
	{
		key  	: "triage",
		type 	: "text",
		text 	: "triage",
		cols 	: 3,
		class 	: "",
	},
	{
		key  	: "AttentionId",
		type 	: "number",
		text 	: "attention_number",
		cols 	: 3,
		class 	: "",
	},
	{
		key  	: "diagnosis",
		type 	: "textarea",
		text 	: "diagnosis",
		cols 	: 9,
		class 	: "",
	},
	{ // ============================================================
		key   : "invoice",
		type  : "title",
		text  : "invoice",
		class : "",
		cols  : 12,
	},
	{
		type : "tabs",
		cols : 12,
		tabs_menus : [
			{
				key 			: "invoice_information",
				text 			: "invoice_information",
			},
		/*	{
				key 			: "added_medications",
				text 			: "add_medicine",
			},*/
			{
				key 			: "tariff_manual",
				text 			: "tariff_manual",
			},
		],
		tabs_items:[
			{
				key 			: "InvoiceInformations",
				// title 			: "invoice_information",
				type  			: "table",
				cols 			: 12,
				height_table 	: 400,
				class 			: "",
				list 			: "invoices",				
				headers 		: [		
					{ text : "medicine", value 	: "medicine" }, 
					{ text : "code", value 		: "code" }, 
					{ text : "price", value 	: "price" }, 
					{ text : "quantity", value 	: "quantity" }, 
					{ text : "service", value 	: "service" }, 
					{ text : "total", value 	: "total" }, 			
					{ text : "actions", value 	: "actions" }, 			
				],
				tops  			: [
					{
						key 	: "invoice",
						text 	: "search",
						icon 	: "mdi-magnify",
						action 	: { action : "search_invoice" },
						type 	: "text_",
						class 	: "",
						list 	: "medicine",
						cols 	: 12,
					}
				],
				table_options 	: [
					{

						key : "invoice",
						color : "primary",
						icon   : "mdi-plus",
						action : "add_item",
						text   :"add",
						title  : "new_invoice",
						
					},
				],

				actions  		: [
					{
						key  	: "edit",
						type 	: "btn",
						color 	: "primary",
						title   : "update_invoice",
						icon 	: "mdi-pencil",
						action 	: "update_item", // edit_invoice_item
						
		 			},
					{
						key  	: "confirm_delete",
						type 	: "btn",
						color 	: "error",
						action 	: {
							action : "delete_invoice_item"
						},
		 			},
				],
				total_keys : [ "totalInvoiceInformations","subTotalInvoiceInformations"],
				headd 	 : { title : "new_invoice", },
				requestss :{
					action 		: "create",
					edit 		: "/api/v1/invoice-information"
 				},
 				showw : {
					actions : true,
				},
				contentt : {  
					fields : [
						{ 
							key 	: "service",  
							type 	: "text", 
							text 	: "service", 
							value 	: "" , 
							cols 	: 12,
						},
						{ 
							key 	: "search",  
							type 	: "searcher_bd", 
							text 	: "medicine", 
							value 	: "medicine" , 
							cols 	: 12,
						},
						{ 
							key 	: "medicine",  
							type 	: "text", 
							text 	: "medicine", 
							value 	: "medicine" , 
							cols 	: 12,
						},
						{ 
							key 	: "code",  
							type 	: "text", 
							text 	: "code", 
							value 	: "code" , 
							cols 	: 12,
						},
						{ 
							key 	: "price",  
							type 	: "number", 
							text 	: "price", 
							value 	: "0" , 
							cols 	: 12,
						},
						{ 
							key 	: "quantity",  
							type 	: "number", 
							text 	: "quantity", 
							value 	: "0" , 
							cols 	: 12,
						},
						
						{ 
							key 	: "total",  
							type 	: "number", 
							text 	: "total", 
							value 	: "0" ,
							action  : "format_total",						 
							cols 	: 12,
						},
					],
				},
				footers 		: [
					{ 
						key 	: "total",
						type 	: "info_total",
						text 	: "total",
						cols 	: 2,
						offset  : 5,
						color 	: "secondary",
						color2  : "success",
					},
					{ 
						key 	: "subtotal",
						text 	: "subtotal",
						type 	: "info_total",
						cols 	: 2,
						offset  : 0,
						color 	: "secondary",
						color2  : "success",
					},
				],

			},
			/*{
				key 			: "AddedMedications",
				title 			: "added_medications",
				cols 			: 12,
				type  			: "table",
				height_table 	: 400,
				class 			: "",		
				list 			: "medications",
				btns 			: [
					{
						key 	: "add_medicine",
						action 	: "add_medicine",
						color 	: "primary",
						icon 	: "mdi-plus",
					}
				],
				tops  			: [
					{
						key 	: "medicine",
						text 	: "search",
						icon 	: "mdi-magnify",
						action 	: { action : "search_medicine" },
						type 	: "search",
						class 	: "",
						cols 	: 12,
					}
				],
				table_options 	: [
					{

						key 	: "medicine",
						color 	: "primary",
						icon   	: "mdi-plus",
						action 	: "add_item", // add_medicine
						text   	: "add",
					}
				],
				total_keys : [ "totalAddedMedications","subTotalAddedMedications"],

				headers 		: [		
					{ text : "description", value 	: "description" }, 
					{ text : "purchaseValue", value 		: "purchaseValue" }, 
					{ text : "units", value 	: "units" }, 
					{ text : "code", value 	: "code" }, 
					{ text : "epsValue", value 	: "epsValue" }, 
					{ text : "hourValue", value 	: "hourValue" }, 			
					{ text : "value30Min", value 	: "value30Min" }, 
					{ text : "total", value 	: "total" }, 			
					{ text : "actions", value 	: "actions" }, 			

				],
				headd 	 : { title : "new_medicine", },
				requestss :{
					action 		: "create",
					edit 		: "/api/v1/added-medication"
 				},
 				showw : {
					actions : true,
				},
				contentt : {  
					fields 			: [
						{ 
							key 	: "description",  
							type 	: "text", 
							text 	: "description", 
							value 	: "description",
							cols 	: 12,
						}, 
						{ 
							key 	: "purchaseValue",  
							type 	: "number", 
							text 	: "purchase_value", 
							value 		: "purchase_value",
							cols 	: 12,
						}, 
						{ 
							key 	: "units",  
							type 	: "number", 
							text 	: "units", 
							value 	: "units",
							cols 	: 12,							
						}, 
						{ 
							key 	: "code",  
							type 	: "text", 
							text 	: "code", 
							value 	: "code", show_in : ['oxigeno'], 
							cols 	: 12,
						}, 
						{ 
							key 	: "epsValue",  
							type 	: "number", 
							text 	: "eps_value", 
							value 	: "eps_value", show_in : ['oxigeno'], 
							cols 	: 12,
						}, 
						{ 
							key 	: "hourValue",  
							type 	: "number", 
							text 	: "hourValue", 
							value 	: "hourValue", show_in : ['oxigeno'], 
							cols 	: 12,
						}, 			
						{ 
							key 	: "value30Min",  
							type 	: "number", 
							text 	: "Value_30Min", 
							value 	: "Value_30Min", show_in : ['oxigeno'], 
							cols 	: 12,
						},
						{
							key 	: "total",
							text 	: "total", 
							type 	: "number",
							cols 	: 12,
						}
					],
				},

				actions  		: [
					{
						key  	: "edit_medicine",
						type 	: "btn",
						color 	: "primary",
						title   : "update_medicine",
						icon 	: "mdi-pencil",
						action 	: "update_item", // edit_medicine_item
						
		 			},
					{
						key  	: "delete_medicine",
						type 	: "btn",
						color 	: "error",
						action 	: {
							action : "delete_medicine_item"
						},
		 			},
				],
				footers 		: [
					
					{ 
						key 	: "subtotal",
						type 	: "info_total",
						text 	: "subtotal",
						class 	: "",
						cols 	: 2,								
						offset  : 7,
						color 	: "secondary",
						color2  : "success",
					},
				],

			},*/
			{
				key 			: "SubTariffManuals",
				title 			: "tariff_manual",
				class_title 	: "pa-0 body-1 ",
				cols 			: 12,
				type  			: "table",
				height_table 	: 400,
				class 			: "",		
				list 			: "tariffs",				
				btns 			: [
					{
						key 	: "add_tariff",
						action 	: "add_tariff",
						color 	: "primary",
						icon 	: "mdi-plus",
					}
				],
				tops  			: [
					{
						key 	: "tariff",
						text 	: "search",
						icon 	: "mdi-magnify",
						action 	: { action : "search_tariff" },
						type 	: "select_search",
						class 	: "",
						list 	: "medicine",
						cols 	: 12,
					}
				],
				table_options 	: [
					{

						key : "tariff",
						color : "primary",
						icon   : "mdi-plus",
						action : "add_item", //  add_tariff
						text   :"add",
					}
				],
				total_keys : [ "totalSubTariffManuals","subTotalSubTariffManuals"],
				
				headers 		: [		
					{ text : "medicine", value 	: "medicine" }, 
					{ text : "code", value 	: "code" }, 
					{ text : "price", value 		: "price" }, 
					{ text : "amount", value 	: "amount" }, 
					{ text : "total", value 	: "total" }, 			
					{ text : "actions", value 	: "actions" }, 			

				],
				headd 	 : { title : "new_tariff", },
				requestss :{
					action 		: "create",
					edit 		: "/api/v1/added-medication"
 				},
 				showw : {
					actions : true,
				},
				contentt : {  
					fields 			: [
						{ 
							key 	: "medicine" ,
							text 	: "medicine", //description
							type 	: "text",
							cols 	: 12,
						}, 
						{ 
							key 	: "code" ,
							text 	: "code", 
							type 	: "text",		
							cols 	: 12,
						}, 

						{ 
							key 		: "amount",
							text 	: "amount", 
							type 	: "number",
							cols 	: 12,
						}, 
						{ 
							key 	: "price" ,
							text 	: "change_price", 
							type 	: "number",
							cols 	: 12,
						}, 
						{ 
							key 	: "total",
							text 	: "total", 
							type 	: "number",
							cols 	: 12,
						}, 
					],
				},
				actions  		: [
					{
						key  	: "edit_tariff",
						type 	: "btn",
						color 	: "primary",
						title   : "update_tariff",
						icon 	: "mdi-pencil",
						action 	: "update_item", // edit_tariff_item
						
		 			},
					{
						key  	: "delete_tariff",
						type 	: "btn",
						color 	: "error",
						action 	: {
							action : "delete_tariff_item"
						},
		 			},
				],
				footers 		: [
					
					{ 
						key 	: "subtotal",
						text 	: "subtotal",
						type 	: "info_total",
						class 	: "",
						cols 	: 2,
						offset  : 7,
						color 	: "secondary",
						color2  : "success",
					},
				],

			},
			// other possible table
		]
	},

]; // module exports