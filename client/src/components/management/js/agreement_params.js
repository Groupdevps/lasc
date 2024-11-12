export default [
	{
		key 		: "numberAgreement",
		text 		: "numberAgreement",
		type   		: "text",													
		cols 		: 12,			
	},
	{
		key 		: "name",
		text 		: "name",
		type   		: "text",													
		cols 		: 12,			
	},		
	{
		key 		: "tariffManualType",
		text 		: "tariffManualType",
		type   		: "menu",													
		cols 		: 12,			
	},		
	{
		key 		: "startDate",
		text 		: "startDate",
		type   		: "date_range",													
		cols 		: 12,			
	},
	{
		key 		: "finalDate",
		text 		: "validUntil",
		type   		: "date_range",													
		cols 		: 12,			
	},
	{
		key 		: "administrator",
		text 		: "administrator",
		type   		: "select",
		item_text   : "name",
		item_value  : "id",					
		global_list : "current-administrator", 
		cols 		: 12,			
	},

	{
		key 		: "percent",
		text 		: "discountRate",
		type   		: "number",
		cols 		: 12,			
		suffix 		: "%", 
	},
	
	/*{
		key 		: "TypeCenterId",
		text 		: "TypeCenterId",
		type   		: "text",													
	},*/

]
// requestss :{
// 	edit 	: "/api/v1/agreement/",
// 	create 	: "/api/v1/agreement",
// 	get  	: "/api/v1/agreement/",
// 	action 	: "create",
// 	action_key : "content",

// delete 	: "/api/v1/agreement/",		

// },