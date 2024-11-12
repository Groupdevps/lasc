const content_modal = {
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
	};

	
export default {	
	key 	: "medical_records",
	text 	: "medical_records", // clinic_historys
	type 	: "table",
	enable 	: true,
	icon 	: "mdi-account-box-multiple", 
	cols 	: 12,
	height  : 280, 
	headers : [				
		// { text : "", value : "redirect" },
		{ text : "date", value : "assignedDate" },
		{ text : "hour", value : "hour" },		
		{ text : "motive", value : "HistoryInfoMedicPerson.motive" }, // motive / TypeService.name
		{ text : "actions", value : "actions" },
	],
	// getInfoStart  : true,
	content_modal,
	actions 		: [
		// {
		// 	type 			: "btn",				
		// 	action 			: "show_information_modal",			
		// 	icon 			: "mdi-book-information-variant", // arrow-right
		// 	color 			: "primary",
		// 	// key_modal 	: "content_modal",
		// 	class_icon  	: "mr-1",
		// 	fieldNameForm 	: "emergency_medical_history",
			
		// 	// url 		: "/dashboard_medico/",
		// 	// keys  		: ["AttentionId", "numberId"],
		// 	// isSendAttention : true,
					
		// },
		{
			type 		: "pdf",	
			typePdf 	: "medical-history",			
			
		}
		/*{
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
					
		},	*/
	],
	
	options			: [
		/*{
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

		},*/
	],
	// isPaginate  		: true,
	type_search  		: "post",	
	getInfoStartSearch 	: true,
	isObjectSearch  	: false,
	list_search 		: [
		{
			key 		: "numberId",
			key_search 	: "numberId",
		}
	],
	api_search 			: "/api/v1/find/all/emergency-medical-history/", // attentions  	
	requestss 			: {
		// edit 	: "/api/v1/clinic_history/",
		// create 	: "/api/v1/clinic_history",
		// delete 	: "/api/v1/clinic_history/",
		get  		: "/api/v1/clinic-history/",
		find  		: "/api/v1/clinic-history/",

		// action 	: "create",
		// action_key : "content",
		// getPaginate   : "/api/v1/clinic_history",


	},
		
}
			