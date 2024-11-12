export default [
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
		key  	: "ambit",
		text 	: "ambit",
		type 	: "text",
		isDisabled : false,
		cols : 3,
	},
	
	{
		subtitle : "SelectBed",
		cols : 12,
		key : "SelectBed"
	},
	{
		key : "BedId",
		text : "bed",
		type : "component",
		cols : 12,
	},
]