export default[
	{
		key  	: "fullName",
		text 	: "nombre",
		type 	: "text",
		isDisabled : true,

	},
	{
		key  	: "numberId",
		text 	: "numberId",
		type 	: "number",
		isDisabled : true,

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

	},
	{
		key  	: "phone",
		text 	: "telefono",
		type 	: "number",
		isDisabled : true,

	},
	{
		key  	: "address",
		text 	: "direccion",
		type 	: "text",
		isDisabled : true,

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
		key  	: "AttentionId",
		text 	: "AttentionId",
		type 	: "number",
		isDisabled : true,

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
			{ text : "", value : "action" },
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
	// {
	// 	key  	: "observation",
	// 	text 	: "observation",
	// 	type 	: "textarea",
	// 	cols : 12,
	// },

	{
        subtitle : "standardized_patient_referral",        
        cols : 12, 
        key : "standardized_patient_referral",
    },
	{ 
        key : "AttentionId",
        type : "number", // string
        text : "AttentionId",      
    },// DataTypes.INTEGER,
    // {
    //     key: "UserId",
    //     type : "text",
    //     text : "",
    // },// DataTypes.INTEGER,
    {
        key: "date",
        type : "DateAuto",
        text : "date",
        action: "setDate",
    },// DataTypes.STRING,
    {
        key: "time",
        type : "time_picker",
        text : "hour",
        action: "setDate",
    },// DataTypes.STRING,
    {
        type : "title",
        text : "info_provider",
        cols : 12, 
    },
   
    {
        key: "providerName",
        type : "text",
        text : "providerName", //
    },// DataTypes.STRING,
    {
        key: "providerTypeId",
        type : "select",
        text : "providerTypeId",        
        item_text : "name",
        item_value : "key",
        list : [
            { key : "nit", name :"NIT"},
            { key : "cc", name :"CC"},
        ]

    },// DataTypes.STRING,
    {
        key: "providerNumberId",
        type : "text",
        text : "providerNumberId",
    },// DataTypes.STRING,
    {
        key: "providerCode",
        type : "text",
        text : "providerCode",
    },// DataTypes.STRING,
    {
        key: "providerAddress",
        type : "text",
        text : "providerAddress",
    },// DataTypes.STRING,
    {
        key: "providerPhoneCode",
        type : "number",
        text : "providerPhoneCode",
    },// DataTypes.STRING,
    {
        key: "providerPhoneNumber",
        type : "text",
        text : "providerPhoneNumber",
    },// DataTypes.STRING,
    {
        key: "providerState",
        type : "text",
        text : "providerState",
    },// DataTypes.STRING,
    {
        key: "providerCity",
        type : "text",
        text : "providerCity",
    },// DataTypes.STRING,
    {
        subtitle : "info_patient",
        key : "",//DATOS DEL PACIENTE
        cols : 12, 
    },
    {
        key: "patientFullName",
        type : "text",
        text : "fullName", //Nombre Completo
    },// DataTypes.STRING,
    {
        key: "patientTypeId",
        type : "select",
        text : "type_document", //Tipo de Documento
        item_text : "name",
        item_value : "key",
        list : [
            { key : "5"/* "registro-civil" */ , name : "Registro Civil"},
            { key : "2"/* "tarjeta-id" */ , name : "Tarjeta de identidad"},
            { key : "1"/* "cedula" */ , name : "Cedula de ciudadania"},
            { key : "3", name : "Cédula de extranjería"},
            { key : "4"/* "pasaporte" */ , name : "Pasaporte"},
            { key : "7"/* "adulto-sin-id" */ , name : "Adulto sin identificacion"},
            { key : "8"/* "menor-sin-id" */ , name : "Menor sin identificacion"},
        ]
    },// DataTypes.STRING,
    {
        key: "patientNumberId",
        type : "number",
        text : "document", //Numero de Documento
    },// DataTypes.STRING,
    {
        key: "patientBirthDate",
        type : "DateAuto",
        text : "date_birth", //Fecha de Nacimiento
        action : "setDate",
    },// DataTypes.STRING,
    {
        key: "patientAddress",
        type : "text",
        text : "address", //Direccion
    },// DataTypes.STRING,
    {
        key: "patientPhone",
        type : "text",
        text : "phone", //Telefono
    },// DataTypes.STRING,
    {
        key: "patientState",
        type : "text",
        text : "providerState", //Departamento
    },// DataTypes.STRING,
    {
        key: "patientCity",
        type : "text",
        text : "providerCity",//Municipio
    },// DataTypes.STRING,
    {
        key: "patientServiceProviderName",
        type : "text",
        text : "patientServiceProviderName",
    },// DataTypes.STRING,
    {
        key: "patientServiceProviderCode",
        type : "text",
        text : "patientServiceProviderCode",
    },// DataTypes.STRING,
    {
        subtitle : "info_responsible_patient",
        key : "info_responsible_patient",
        cols : 12, 
    },
    {
        key: "tutorFullName",
        type : "text",
        text : "tutorFullName",
    },// DataTypes.STRING,
    {
        key: "tutorTypeId",
        type : "select",
        text : "type_document",
        item_text : "name",
        item_value : "key",
        list : [
            { key : "5"/* "registro-civil" */ , name : "Registro Civil"},
            { key : "2"/* "tarjeta-id" */ , name : "Tarjeta de identidad"},
            { key : "1"/* "cedula" */ , name : "Cedula de ciudadania"},
            { key : "3", name : "Cédula de extranjería"},
            { key : "4"/* "pasaporte" */ , name : "Pasaporte"},
            { key : "7"/* "adulto-sin-id" */ , name : "Adulto sin identificacion"},
            { key : "8"/* "menor-sin-id" */ , name : "Menor sin identificacion"},
        ]
    },// DataTypes.STRING,
    {
        key: "tutorNumberId",
        type : "number",
        text : "document", // Numero de Documento
    },// DataTypes.STRING,
    {
        key : "tutorBirthDate",
        type : "DateAuto",
        text : "date_birth", //Fecha de Nacimiento
        action : "setDate",
    },
    {
        key: "tutorAddress",
        type : "text",
        text : "address", // Direccion
    },// DataTypes.STRING,
    {
        key: "tutorPhone",
        type : "number",
        text : "phone", //Telefono
    },// DataTypes.STRING,
    {
        key: "tutorState",
        type : "text",
        text : "state",//Departamento
    },// DataTypes.STRING,
    {
        key: "tutorCity",
        type : "text",
        text : "city", // Municipio
    },// DataTypes.STRING,
    {
        subtitle : "professional_who_requests_service",
        key : "professional_who_requests_service",
        cols : 12, 
    },
    {
        key: "personRequestingFullName",
        type : "text",
        text : "name",
    },// DataTypes.STRING,
    {
        key: "personRequestingPhoneCode",
        type : "number",
        text : "code_phone",
    },// DataTypes.STRING,
    {
        key: "personRequestingPhoneNumber",
        type : "number",
        text : "phone", //Numero de Telefono
    },// DataTypes.STRING,
    {
        key: "personRequestingPhoneExtension",
        type : "number",
        text : "ext_phone",
    },// DataTypes.STRING,
    {
        key: "personRequestingCellphone",
        type : "number",
        text : "cellphone", //Celular
    },// DataTypes.STRING,
    {
        key: "ServiceRequesting",
        type : "text",
        text : "ServiceRequesting",
    },// DataTypes.STRING,
    {
        key: "ServiceReferenceRequested",
        type : "text",
        text : "ServiceReferenceRequested",
    },// DataTypes.STRING,
    {
        subtitle : "relevant_clinical_information",
        key : "relevant_clinical_information",
        cols : 12, 
    },
    {
        key: "relevantClinicalInformation",
        type : "textarea",
        text : "relevantClinicalInformation",
        cols : 12,
    },// DataTypes.TEXT,
    // {
    //     key: "professionalSignature",
    //     type : "select",
    //     text : "professionalSignature",
    //     item_text : "name",
    //     item_value : "id",
    //     list : "listDigitalSignature",
    // },// DataTypes.STRING,
    {
        key: "professionalRegistrationNumber",
        type : "number",
        text : "professionalRegistrationNumber",
    },// DataTypes.STRING
	
]