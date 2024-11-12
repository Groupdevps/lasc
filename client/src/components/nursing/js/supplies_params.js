module.exports = [
	{
		subtitle : "Relidiquidacion de Cuentas. Salida General",
		cols : 12,
	},
	{
		key : "name",
		text : "name", // Nombre paciente
		type : "text",
		enable : true,
		isDisabled : true,		
		cols : 8
	},
	{
		key : "dateAdmission",
		text : "dateAdmission",
		type : "date_range",
		enable : true,
		isDisabled : true,		
		cols : 4,
		ref : "fecha_i",
	},
	{
		key : "hospitalization",
		text : "hospitalization",
		type : "text",
		enable : true,
	},
	{
		key : "accountCut",
		text : "accountCut",
		type : "number",
		enable : true,
	},
	{
		key : "TypeIDId",
		text : "typeId",
		type : "select",
		global_list : "typeIds",
		item_text : "name",
		item_value: "id",
		isDisabled : true,		
		enable : true,
	},
	{
		key : "departureDate",
		text : "departureDate",
		type : "date_range",
		ref  : "fecha_e",
		enable : true,
		
	},
	{
		key : "membership",
		text : "membership", // Afiliacion
		type : "select",
		enable : true,
		list 	: [
			"Vinculado", "Subsidiado", "Secretaria de Salud", "Empresa"
		],
		
	},
	{
		key : "AttentionId",//na
		text : "attention_number",
		type : "number",
		enable : true,
		isDisabled : true,
		cols : 4
	},
	{
		subtitle : "Observaciones",
		cols 	 : 12,
	},
	{
		key : "IdxIncome", // idx_i
		text : "IDx Ingreso",
		type : "text",
		enable : true,
	},
	{
		key : "IdxEgress", // idx_e
		text : "IDx Egreso",
		type : "text",
		enable : true,
	},
	{
		key : "RelatedIdx", // idx_r
		text : "IDx Rel",
		type : "text",
		enable : true,
	},
	{
		key : "idxDate", // fecha_idx
		text : "idxDate",
		type : "date_range",
		ref  : "fecha_idx",
		enable : true,
		
	},
	{
		key : "diagnoses",
		text : "diagnostics",
		type : "text",
		enable : true,
	},
	/*{
		key : "codigo_qx",
		type : "table",
		header : [
			{ text : "qx", value : "qx" },
			{ text : "codigo", value : "codigo" },
			{ text : "comentario", value : "comentario" },
			{ text : "", value : "action" },
		],
		list : "list_codigos",
		enable : true,
		cols   : 6,

	},*/
	{
		key  		: "QxCodes",
		text 		: "QxCodes",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		placeholder : "Escribir codigos",
		cols   		: 12,
		header 		: [
			{ text : "qx", value : "qx" },
			{ text : "code", value : "code" },
			{ text : "comment", value : "comment" },						
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/qx-code/"
			// update : ""
		} ,
		fields      : [
			{
				subtitle : "Qx",
				cols : 12,
			},
			{
				key 	 		: "qx",
				key_main 		: "QxCodes",
 				type 	 		: "text",
				text 	 		: "qx",
				cols 			: 3,
				placeholder 	: "qx",				

			},
			{
				key 	 		: "code",
				key_main 		: "QxCodes",
 				type 	 		: "text",
				text 	 		: "code",
				// btn_add 		: true,
				placeholder 	: "code",
				action 			: "add_table",
				// cols 			: ,

			},
			{
				key 	 		: "comment",
				key_main 		: "QxCodes",
 				type 	 		: "text",
				text 	 		: "comment",
				btn_add 		: true,
				placeholder 	: "comment",
				action 			: "add_table",
				// cols 			: ,

			}
		],
		// list 		: "render_diagnoses",
		enable 		: true,

	},
	/*{
		key : "insumos",
		text : "Farmacia e insumos Hospitalarios",				
		type : "table",
		top  : true,
		btn  : true,
		icon : 'mdi-plus',
		cols   : 6,		
		header : [
			{ text : "", value : "" },
			{ text : "insumo", value : "insumo" },
			{ text : "", value : "action" },
		],
		list : "list_insumos",
		enable : true,
		
	},*/
	/*{
		key  		: "SubSupplies",
		text 		: "supplies",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		// placeholder : "Escribir codigos",
		cols   		: 6,
		header 		: [
			{ text : "cum", value : "cum" },
			{ text : "input", value : "input" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/qx-code/"
			// update : ""
		} ,		
		fields      : [
			{
				subtitle : "Farmacia e insumos Hospitalarios",
				cols : 12,
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
				action 	   	: "set_cup_input",
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
				key 	 		: "cum",
				key_main 		: "SuppliesLaboratories",
 				type 	 		: "text",
				text 	 		: "cum",
				placeholder 	: "cum",								
				cols 			: 3

			},
			{
				key 	 		: "input",
				key_main 		: "SubSupplies",
 				type 	 		: "text",
				text 	 		: "input",
				
				placeholder 	: "input",				
				btn_add 		: true,
				action 			: "add_table",

			},
			
		],
		// list 		: "render_diagnoses",
		enable 		: true,

	},
	/*{
		key : "laboratorios",
		text : "Laboratorios",		
		type : "table",
		top  : true,
		btn  : true,
		icon : 'mdi-plus',
		cols   : 6,		
		header : [
			{ text : "", value : "" },
			{ text : "laboratorio", value : "laboratorio" },			
			{ text : "", value : "action" },
		],
		list : "list_laboratorios",
		enable : true,

	},/
	
	{
		key  		: "SuppliesLaboratories",
		text 		: "laboratories",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		// placeholder : "Escribir codigos",
		cols   		: 6,
		header 		: [
			{ text : "cups", value : "cups" },
			{ text : "laboratory", value : "laboratory" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/supplies-laboratory/"
			// update : ""
		} ,
		fields      : [
			{
				subtitle : "laboratories",
				cols : 12,
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
				action 	   	: "set_cup_laboratory",
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
				key 	 		: "cups",
				key_main 		: "SuppliesLaboratories",
 				type 	 		: "text",
				text 	 		: "cups",
				placeholder 	: "cups",								
				cols 			: 3

			},
			{
				key 	 		: "laboratory",
				key_main 		: "SuppliesLaboratories",
 				type 	 		: "text",
				text 	 		: "laboratory",
				
				placeholder 	: "laboratory",				
				btn_add 		: true,
				action 			: "add_table",

			},
		
		],
		// list 		: "render_diagnoses",
		enable 		: true,

	},
	/*{
		key : "otros_servicios",
		text : "Otros Servicios",
		type : "table",
		top  : true,
		btn  : true,
		icon : 'mdi-plus',
		cols   : 6,
		header : [
			{ text : "", value : "" },
			{ text : "servicio", value : "servicio" },			
			{ text : "", value : "action" },
		],
		list : "list_otros_servs",
		enable : true,

	},/
	
	{
		key  		: "SuppliesOtherServices",
		text 		: "otherServices",
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		// placeholder : "Escribir codigos",
		cols   		: 6,
		header 		: [
			// { text : "", value : "" },
			{ text : "service", value : "service" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/supplies-otherServices/"
			// update : ""
		} ,		
		fields      : [
			{
				subtitle : "otherServices",
				cols : 12,
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
				action 	   	: "set_cup_service",
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
				key 	 		: "service",
				key_main 		: "SuppliesOtherServices",
 				type 	 		: "text",
				text 	 		: "service",	
				placeholder 	: "service",				
				action 			: "add_table",
				btn_add 		: true,

			},
		
		],
		// list 		: "render_diagnoses",
		enable 		: true,

	},
	/{
		key : "images_diagnoticas",
		text : "Imágenes Diagnosticadas",
		type : "table",
		top  : true,
		btn  : true,
		icon : 'mdi-plus',
		cols   : 6,
		header : [
			{ text : "", value : "" },
			{ text : "laboratorio", value : "laboratorio" },			
			{ text : "", value : "action" },
		],
		list : "list_images_diagnosticas",
		enable : true,

	},/
	
	{
		key  		: "SubDiagnosticImagings",
		text 		: "diagnostic_imaging", // ayudas diagnosticas
		type 		: "table_field",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		// placeholder : "Escribir codigos",
		cols   		: 6,
		header 		: [
			{ text : "", value : "" },
			{ text : "cups", value : "cups" },			
			{ text : "procedures", value : "procedures" },		
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/qx-code/"
			// update : ""
		} ,		
		fields      : [
			{
				subtitle : "diagnostic_aids",
				cols : 12,
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
				action 	   	: "set_cup_procedures",
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
				key 	 		: "cups",
				key_main 		: "SubDiagnosticImagings",
 				type 	 		: "text",
				text 	 		: "cups",
				placeholder 	: "cups",								
				cols 			: 3

			},
			{
				key 	 		: "procedures",
				key_main 		: "SubDiagnosticImagings",
 				type 	 		: "text",
				text 	 		: "procedures",
				action 			: "add_table",
				placeholder 	: "description",								
				btn_add 		: true,

			},
		
		],
		// list 		: "render_diagnoses",
		enable 		: true,

	},
	{
		key : "observations",
		text : "observations",
		type : "text",
		enable : true,
		cols : 12
	},
	{
		key : "whoSuppliedIt",//na
		text : "whoSuppliedIt",
		type : "text",
		enable : true,
		cols : 4
	},
	{
		key : "supplyTime",//na
		text : "supplyTime",
		type : "time_picker",
		enable : true,
		cols : 4
	},
	{
		key : "supplyDate",//na
		text : "supplyDate",
		type : "date_range",
		enable : true,
		cols : 4
	},
	{
		key : "medicineSupplied",//na
		text : "medicines",
		type : "text",
		enable : true,
		cols : 4
	},
	{
		key : "whoAppliesIt",//na
		text : "whoAppliesIt",
		type : "text",
		enable : true,
		cols : 4
	},*/

	


];