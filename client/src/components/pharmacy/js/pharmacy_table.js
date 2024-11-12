export default {	
	key 	: "pharmacy",
	text 	: "pharmacy",
	type 	: "table",
	enable 	: true,
	icon 	: "mdi-account-box-multiple", 
	cols 	: 12,
	height  : 200, 
	headers : [				
		{ text : "", value : "redirect" },
		{ text : "date", value : "assignedDate" },
		{ text : "hour", value : "hour" },		
		{ text : "motive", value : "motive" },					
		{ text : "actions", value : "actions" },
	],
	content_modal : {
		contentt : {
			title  : "",
			fields 	: [
				{
					key 		: "TypeRelationshipId",
					text 		: "relationship",
					type   		: "select",
					item_text  	: "name",
					item_value 	: "id",	
					list 		: "list_relationships",	
					global_list : "typeRelationship",						
					cols 		: 12,			
				},
				{
					key 		: "name",
					text 		: "name",
					type   		: "text",
					cols 		: 12,			
				},
				{
					key 		: "lastName",
					text 		: "lastname",
					type   		: "text",
					cols 		: 12,			
				},
				{
					key 		: "TypeIDId",
					text 		: "type_document",
					type   		: "select",
					item_text  	: "name",
					item_value 	: "id",	
					list 		: "list_type_documents",		
					global_list : "typeIds",
					cols 		: 12,			
				},
				{
					key 		: "numberId",
					text 		: "document",
					type   		: "number",
					cols 		: 12,			
				},
				{
					key 		: "cellphone",
					text 		: "cell_phone",
					type 		: "number",
					enable 		: true,
					icon 		: "mdi-cellphone", 
					cols 		: 12,
				},

			],
		},					
		headd 	: { 
			title : "new_familiar",
		},
		requestss :{
			edit 	: "/api/v1/relationship/",
			create 	: "/api/v1/relationship",
			delete 	: "/api/v1/relationship/",
			get  	: "/api/v1/relationship",
			action 	: "create",
			action_key : "content",

		},
		showw : {
			actions : true,
		},
		listss 	: {},
	},
	/*actions 		: [
		{
			type 		: "btn",				
			action 		: "update_item",			
			icon 		: "mdi-pencil",
			key_modal 	: "content_modal",
			class_icon  : "mr-1",
					
		},		
		{
			type 		: "btn",				
			action 		: "delete_item",			
			icon 		: "mdi-delete",
			key_modal 	: "content_modal",
			class_icon  : "mr-1",
					
		},	
	],
	
	options			: [
		{
			type 		: "btn",
			text 		: "new_familiar",
			action 		: "add_item",			
			icon 		: "mdi-plus",
			key_modal 	: "content_modal",
			class_icon  : "mr-1",
			cols 		: 2,										
		},		
		{
			type  		: "spacer",
			class 		: "",
			cols 		: 10,

		},
	],*/
	required_id_req : true,
	requestsss :{
		// edit 	: "/api/v1/clinic_history/",
		// create 	: "/api/v1/clinic_history",
		// delete 	: "/api/v1/clinic_history/",
		// get  	: "/api/v1/clinic_history",
		// action 	: "create",
		// action_key : "content",
		getPaginate   : "/api/v1/pharmacy",


	},
		
}
			