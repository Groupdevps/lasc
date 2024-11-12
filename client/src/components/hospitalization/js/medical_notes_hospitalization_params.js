export default [
	{
		key : "fullName",
		text : "name",
		type : "text",
		enable : true,
		isDisabled : true,
		cols  : 3,
	},
	{
		key : "numberId",
		text : "numberId",
		type : "number",
		enable : true,
		isDisabled : true,
		cols  : 1
	},
	{
		key  			: "assignedAdministrator",// assignedCenter
		// key_main 		: "ServiceProvider",
		text 			: "eps",
		type 			: "select",
		list 			: 'list_eps',
		show_texts    	: ['name', 'nit'],
		text_list 		: "administradora",		
		global_list 	: "current-administrator",
		item_text 		: "name",
		item_value 		: "name",
		key_search   	: "name",
		key_search_1 	: "nit",
		action 			: "set_eps",
		enable 			: true,
		is_object 		: true,
		isDisabled : true,
		cols  : 2

	},
	{
		key  	: "phone",
		text 	: "phone",
		type 	: "number",
		isDisabled : true,
		cols  : 2

	},
	{
		key  	: "address",
		text 	: "address",
		type 	: "text",
		isDisabled : true,
		cols  : 2

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
		key : "AttentionId",
		text : "AttentionId",
		type : "number",
		enable : true,
		readonly : true,
		isDisabled : true,
		cols  : 2
	},
	{
		subtitle : "diagnostics",
		cols : 12,
		key : "Subdiagnostic"
	},
	{
		key  		: "SubDiagnoseLists",
		text 		: "diagnostico",
		type 		: "table-read", //table_field
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
			{ text : "DIAGNOSTICO", value : "name" },			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/subdiagnose-list/"
			// update : ""
		} ,
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
		key 			: "observation",
		subtitle 		: "observation",	
		cols 			: 12,
		ref : "observationNotes",
	},	
	{
		key  		: "ObservationEvolutionNotes",
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
		cols 		: 12,
		request 	: {
			delete 		: "/api/v1/observation-evolution-note/",
			update   	: "/api/v1/observation-evolution-note/",
			// update : ""
		} ,
		enableEdit  : true,
		header 		: [
			{ text : "date", value : "date" },
			{ text : "hour", value : "hour" },			
			{ text : "observacion", value : "observation" },			
			{ text : "", value : "action" },
		],
		fields      : [
			{
				key 			: "observation",
				subtitle 		: "observation",	
				cols 			: 12,

			},	
			{
				key  : 'date',
				text : "date",
				type : "date_range",
				cols : 2,
				ref : "date",
				// auto : true,
			},
			{
				key  : 'hour',
				text : "hour",
				type : "time_picker",
				cols : 2,
				ref : "hour",
			},
			{
				key 	 		: "observation",
				key_main 		: "ObservationEvolutionNotes",
 				type 	 		: "textarea",
				text 	 		: "description",
				btn_add 		: true,
				placeholder 	: "description",
				action 			: "add_table",

			}
		],
		list : "list_observations",
		enable : true,
	}

];