export default [
	{
		key : "fullName",
		text : "name",
		type : "text",
		enable : true,
		isDisabled : true,

	},
	{
		key : "numberId",
		text : "numberId",
		type : "number",
		enable : true,
		isDisabled : true,

	},
	{
		key  			: "assignedAdministrator",
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
		key  	: "cellphone",
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
		key : "AttentionId",
		text : "AttentionId",
		type : "number",
		enable : true,
		readonly : true,
		isDisabled : true,
	},	
	{
		subtitle : "observations",
		cols : 12,
		key : "SubtitleObservationNursings"
	},
	
	{
		key  		: "ObservationNursings",
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
			delete 		: "/api/v1/observation-nursing/",
			update   	: "/api/v1/observation-nursing/",
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
				key_main 		: "ObservationNursings",
 				type 	 		: "textarea",
				text 	 		: "observation",
				btn_add 		: true,
				placeholder 	: "observation",
				action 			: "add_table",

			}
		],
		list : "list_observations",
		enable : true,
	}

];