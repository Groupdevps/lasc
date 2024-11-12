export default [
	{
		key 		: "username",
		text 		: "username",
		type   		: "text",
		cols 		: 12,			
	},
	{
		key 		: "name",
		text 		: "name",
		type   		: "text",													
		cols 		: 12,			
	},
	// {
	// 	key 		: "lastName",
	// 	text 		: "lastname",
	// 	type   		: "text",													
	// 	cols 		: 12,			
	// },
	// {
	// 	key 		: "TypeIDId",
	// 	key_main 	: "person",
	// 	text 		: "document_type",
	// 	type 		: "select",
	// 	list 		: "list_docs",
	// 	item_text  	: "name",
	// 	item_value 	: "id",	
	// 	global_list : "typeIds",
	// 	enable 		: true,
	// 	icon 		: "mdi-format-list-bulleted-type", 
	// 	cols 		: 12,
	// 	minNumber 	: 8,
	// 	isRequired : true,
	// 	rules 	  : [(value) =>  !!value || 'Required.'],
	// },
	// {
	// 	key : "numberId",
	// 	text : "document",
	// 	type : "number",
	// 	cols : 12,
	// }, 
	{
		key 		: "CenterId",
		text 		: "center",
		type   		: "select",
		item_text 	: "name",
		item_value  : "id",
		global_list : "centers",
		cols 		: 12,			
	},
	{
		key 		: "RoleId",
		text 		: "position",
		type   		: "component",
		item_text 	: "name",
		item_value  : "id",		
		global_list : "role",											
		cols 		: 12,			
	},
	{
		key 		: "email",
		text 		: "email",
		type   		: "email",		
		cols 		: 12,			

	},
	/*{
		key 		: "digitalSignature", //signalDigitalFile
		text 		: "Firma Digital",
		type   		: "file",													
		cols 		: 12,			
	},
	{
		key 		: "signalDigital",
		text 		: "Firma Digital",
		type   		: "img",													
	}
	{
		key 		: "TypeCenterId",
		text 		: "TypeCenterId",
		type   		: "text",													
	},*/

]
