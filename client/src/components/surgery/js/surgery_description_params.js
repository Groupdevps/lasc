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
		key : "startDate",
		text : "initialExecutionDate",
		type : "date_range",
		cols : 3,
	},
	{
		key : "startTime",
		text : "hour",
		type : "time_picker",
		cols : 2,
	},
	{
		key : "endDate",
		text : "executionEndDate",
		type : "date_range",
		cols : 3,
	},
	{
		key : "endTime",
		text : "hour",
		type : "time_picker",
		cols : 3,
	},
	{
		key : "surgeonId",
		text : "surgeon",
		type : "component", // integer
		cols : 3,
	},
	{
		key : "anesthesiologistId",
		text : "anesthesiologist",
		type : "component", // integer
		cols : 2,
	},
	{
		key : "AnestheticTechniqueId", //anesthesiaTypeId
		text : "anesthesiaType",
		type : "component", // integer
		cols : 3,
	},
	// {
	// 	key : "diagnosis1Admission",
	// 	text : "diagnosis1Admission",
	// 	type : "component", // integer
	// 	cols : 3,
	// },
	// {
	// 	key : "diagnosis2Admission",
	// 	text : "diagnosis2Admission",
	// 	type : "component", // integer
	// 	cols : 3,
	// },
	{
		key : "instrumenterId",
		text : "instrumenter",
		type : "component", // integer
		cols : 2,
	},
	{
		key : "assistantId",
		text : "assistant",
		type : "component", // integer
		cols : 2,
	},
   	
    {
		key : "description",
		text : "description",
		type : "textarea",
		cols : 12,
	},	    

	// {
	// 	key : "cupOrSoatProcedure",
	// 	text : "cupOrSoatProcedure",
	// 	type : "component", // integer
	// 	cols : 3,
	// },
	// {
	// 	key : "cupOrSoatProcedure2",
	// 	text : "cupOrSoatProcedure2",
	// 	type : "component", // integer
	// 	cols : 3,
	// },
	{
		subtitle : "DiagnoseSurgery",
		cols : 12,
		key : "infoDiagnoseSurgery"
	},
	{
		key : "QxDiagnosticLists",
		text : "DiagnosticList",
		type : "component", // integer
		cols : 12,
	},
	{
		subtitle : "PROCEDIMIENTOS",
		cols : 12,
		key : "infoProcedures"
	},
	{
		key : "QxCupsLists",
		text : "Procedures",
		type : "component", // integer
		cols : 12,
	},
]