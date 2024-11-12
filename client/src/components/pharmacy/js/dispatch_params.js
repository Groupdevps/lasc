export default [

// 	{
//         AttentionId,
//         PersonId,
//         CenterId,
//         UserId,
//         OrderTypeId,
//         StatusId,
//         orderNumber,
//         DispatchDetails
//       }

// {
//     DispatchId: DataTypes.INTEGER, //a que despacho pertenece
//     ProductId: DataTypes.INTEGER,//que producto 
//     StatusId: DataTypes.INTEGER, //estado del despacho del producto
//     MedicineId: DataTypes.INTEGER,//medicamento solicitado
//     OrderProductId: DataTypes.INTEGER, //producto solicitado
//     cant: DataTypes.INTEGER, //cantidad,
//     available: DataTypes.INTEGER,//disponible
//     note: DataTypes.TEXT// notas adicionales
//   }
		// {
		// 	type 		: "title",
		// 	text 		: "info_patient",
		// 	cols 		: 12,		
		// 	class 		: "ma-0 primary"

		// },
		{
			subtitle : "info_patient",
			cols : 12,
			key : "info_patient"
		},
		
		{
			key 		: "fullName",
			type 		: "text",
			text 		: "name",
			icon 		: "",	
			cols 		: 3,		
			isDisabled 	: true,	 
		},
		
		{
			key 		: "numberId",
			type 		: "text",
			text 		: "document",
			icon 		: "",	
			cols 		: 2,		
			isDisabled 	: true,	 

		},
		// {
		// 	key 		: "eps",
		// 	type 		: "text",
		// 	text 		: "eps",
		// 	icon 		: "",	
		// 	cols 		: 2,		
		// 	isDisabled 	: true,	 

		// },
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
			cols : 3,

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
			key 	: "Gender",
			text    : "gender",
			type    : "text",
			icon    : "mdi-gender",
			isDisabled : true,
			cols 	: 1, 
		},
		
		
		
		{
			type 		: "title",
			subtitle 		: "care_information",
			class 		: "ma-0 primary",
			cols 		: "12",
		},
		{
			key  	: "AttentionId",
			text 	: "AttentionId",
			type 	: "number",
			isDisabled : true,
			cols : 2,
		},
		{
			key 		: "orderNumber",
			type 		: "text",
			text 		: "orderNumber",
			icon 		: "",	
			cols 		: 2,		
			isDisabled 	: true,	 

		},
		{
			key 		: "typeOrder",
			type 		: "text",
			text 		: "typeOrder",
			icon 		: "",	
			cols 		: 2,		
			isDisabled 	: true,	 

		},
		{
			key 		: "typeService",
			type 		: "text",
			text 		: "typeService",
			icon 		: "",	
			cols 		: 2,		
			isDisabled 	: true,	 

		},
		{
			key 		: "DeliveredTo",
			type 		: "text",
			text 		: "DeliveredTo",
			icon 		: "",	
			cols 		: 2,		
			isDisabled 	: false,	 

		},
		// {
		// 	key 		: "hospitalization",
		// 	type 		: "text",
		// 	text 		: "hospitalization",
		// 	icon 		: "",	
		// 	cols 		: 4,		
		// 	isDisabled 	: true,	 

		// },
		// {
		// 	key 		: "admission_date",
		// 	type 		: "text",
		// 	text 		: "admission_date",
		// 	icon 		: "",	
		// 	cols 		: 3,		
		// 	isDisabled 	: true,	 

		// },
		// {
		// 	key 		: "diagnostic",
		// 	type 		: "text",
		// 	text 		: "diagnostic",
		// 	icon 		: "",	
		// 	cols 		: 5,		
		// 	isDisabled 	: true,	 

		// },
		{
			// type 		: "title",
			
			subtitle	: "medication_request",
			class 		: "ma-0 primary",
			cols 		: "12",
		},
		// {
		// 	type 		: "component",
		// 	component	: "tableComp",
		// 	class 		: "ma-0 primary",
		// 	cols 		: "12",
		// },
		{
			type 		: "title",
			text 		: "details",
			class 		: "ma-0 primary",
			cols 		: "12",
		},
		// {
		// 	key 		: "Orders",
		// 	type 		: "component",
		// 	text 		: "Orders", 
		// 	cols : 4, 
		// },
		{
			key 		: "DispatchDetails",
			type 		: "component",
			text 		: "DispatchDetails", 
			cols : 12, 
		}
	];