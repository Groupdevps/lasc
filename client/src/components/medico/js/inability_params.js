export default [
	
	{
		key : "titleInfoInsurance",
		subtitle : "insurance_information",
		cols : 12
	},
	{
		key  	: "assignedAdministrator",
		text 	: "aseguradora",
		type 	: "select",
		list 			: 'list_eps',
		show_texts    	: ['name', 'nit'],
		global_list 	: 'current-administrator',
		item_text 		: "name",
		item_value 		: "name",
		key_search   	: "name",
		key_search_1 	: "nit",
		text_list 		: "administradora",	
		action 			: "set_eps",
		enable 			: true,
		is_object 		: true,
		isDisabled : true,

	},
	{
		key  	: "currentAdministratorNit", // HistoryPerson.
		text 	: "nit",
		type 	: "text",
		isDisabled : true,
	},
	
	{
		key  	: "CurrentAdministratorCode", //Center.
		text 	: "code",
		type 	: "text",
		isDisabled : true,
	},
	{
		key : "titleInfoPatient",
		subtitle : "information_patient",
		cols : 12
	},
	{
		key  	: "fullName",
		text 	: "nombre",
		type 	: "text",
		isDisabled : true,
		cols 		: 3,

	},
	{
		key 		: "TypeID_description",// TypeIDId
		key_main 	: "person",
		text 		: "document_type",
		type 		: "text", // select
		list 		: "list_docs",
		item_text  	: "description",
		item_value 	: "id",	
		global_list : "typeIds",
		isSync  	: true,				
		enable 		: true,
		icon 		: "mdi-format-list-bulleted-type", 
		cols 		: 2,
		minNumber 	: 8,
		isRequired : true,
		rules 	  : [(value) =>  !!value || 'Required.'],
		isDisabled : true,
	},

	{
		key  	: "numberId",
		text 	: "numberId",
		type 	: "number",
		isDisabled : true,
		cols 		: 2,
	},

	{
		key 	: "birthDate",	
		text 	: "date_birth",
		type 	: "date_range",
		enable 	: true,
		action 	: "calculate_age",
		icon 	: "mdi-calendar", 
		cols 	: 2,
		isDisabled :true,

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
		key : "email",
		key_main 	: "person",
		text : "email",
		type : "email",
		enable : true,
		icon 	: "mdi-email", 
		cols 	: 3,
		isDisabled : true,
	},
	{
		key : "GenderId",
		key_main 	: "person",
		text : "gender",
		type : "select",
		enable : true,
		list : [ "M", "F", "Otro"],
		global_list : "genders",				
		isSync  	: true,				
		icon 	: "mdi-gender-male-female", 
		item_text  	: "name",
		item_value 	: "id",	
		cols 	: 2,
		isDisabled : true,
	},

	{
		key  	: "phone",
		text 	: "telefono",
		type 	: "number",
		isDisabled : true,
		cols 		: 2,

	},
	{
		key : "cellphone",
		key_main 	: "person",
		text : "cell_phone",
		type : "number",
		enable : true,
		icon 	: "mdi-cellphone", 
		cols 	: 2,
		isDisabled : true,
		isRequired : true,
		rules 	  : [
			(value) =>  !!value || 'Required.',
			(value) => (value && value.toString().length >= 10)  || 'Requerido minimo 10 caracteres'
		],

	},
	{
		key  	: "address",
		text 	: "direccion",
		type 	: "text",
		isDisabled : true,
		cols 		: 3,

	},
	{
		key 		: "state_name", //State
		key_main 	: "Address",
		// key_2 		: "State",
		text 	: "department",
		type 	: "text", // select //"select_search",
		isSync  	: true,				
		global_list : "states",
		enable	: true,
		icon 	: "mdi-selection-marker", 
		cols 	: 2,
		item_text  	: "name",
		item_value 	: "id",	
		show_texts  : ["name"],
		show_texts    	: ['name'],
		key_search   	: "name",
		return_obj : true,
		action 	   : "set_state",
		isDisabled : true,
	},
	{
		key 	: "city_name",//select
		key_main 	: "Address",
		text 	: "city",
		type 	: "text",//select
		isSync  	: true,				
		// global_list : "cities",
		enable 	: true,
		list 	: "cities",
		item_text  	: "name",
		item_value 	: "id",
		icon 	: "mdi-city", 
		cols 	: 2,
		show_texts    	: ['name'],
		key_search   	: "name",
		return_obj : true,
		action 	   : "set_city",
		isDisabled : true,
	},
	
	{
		key  	: "AttentionId",
		text 	: "AttentionId",
		type 	: "number",
		isDisabled : true,
		cols 		: 2,

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
		cols   		: 12,
		header 		: [
			{ text : "CODIGO", value : "code" },
			{ text : "DIAGNOSTICO", value : "name" }, // diagnosis			
			{ text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/subdiagnose-list/"
		},
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
		list 		: "list_diagnosticos",
		enable 		: true,

	},
	{
		key  : "startDate",
		text : "startDate",
		type : "date_range",
		cols   : 4,
		
	},
	{
		key  : "endDate",
		text : "endDate",
		type : "date_range",
		cols   : 4,
		
	},
	{
		key  	: "disabilityDays",
		text 	: "disabilityDays",
		type 	: "number",
		cols   : 4,
		
	},
	{
		key : "observation",
		text : "observation",
		type : "textarea",
		enable : true,
		cols   : 12,
	},
	{
		key : "titleInfoDoctor",
		subtitle : "prescriber_information",
		cols : 12
	},
	{
		key  	: "DoctorName", // Doctor.
		text 	: "medico",
		type 	: "text",
		cols   : 3,
		isDisabled : true,
		
	},
	{
		key  	: "DoctorRoleName", //Doctor.
		text 	: "position",
		type 	: "text",
		cols   : 3,
		isDisabled : true,
	},
	{
		key  	: "CenterName",
		text 	: "providerIps",
		type 	: "text",
		cols   : 3,
		isDisabled : true,
	},
	{
		key  	: "CenterAddress", // Center.Address.address
		text 	: "ipAddress",
		type 	: "text",
		cols   : 3,
		isDisabled : true,
	},
	{
		key  	: "CenterPhone",
		text 	: "phone",
		type 	: "text",
		cols   : 3,
		isDisabled : true,
	}
	
];