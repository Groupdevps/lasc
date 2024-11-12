export default  [
    {
        type : "title",
        text : "FORMATO ESTANDARIZADO DE REFERENCIA DE PACIENTES",
        cols : 12, 
    },
    { 
        key : "AttentionId",
        type : "number", // string
        text : "Numbero de Atencion",      
    },// DataTypes.INTEGER,
    // {
    //     key: "UserId",
    //     type : "text",
    //     text : "",
    // },// DataTypes.INTEGER,
    {
        key: "date",
        type : "DateAuto",
        text : "Fecha",
        action: "setDate",
    },// DataTypes.STRING,
    {
        key: "time",
        type : "time_picker",
        text : "Hora",
        action: "setDate",
    },// DataTypes.STRING,
    {
        type : "title",
        text : "INFORMACIÓN DEL PRESTADOR",
        cols : 12, 
    },
   
    {
        key: "providerName",
        type : "text",
        text : "Nombre Prestador",
    },// DataTypes.STRING,
    {
        key: "providerTypeId",
        type : "select",
        text : "Tipo de identificacion Prestador",        
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "nit", name :"NIT"},
            { key : "cc", name :"CC"},
        ]

    },// DataTypes.STRING,
    {
        key: "providerNumberId",
        type : "text",
        text : "Numero identificacion",
    },// DataTypes.STRING,
    {
        key: "providerCode",
        type : "text",
        text : "Codigo",
    },// DataTypes.STRING,
    {
        key: "providerAddress",
        type : "text",
        text : "Direccion",
    },// DataTypes.STRING,
    {
        key: "providerPhoneCode",
        type : "number",
        text : "Codigo Telefono",
    },// DataTypes.STRING,
    {
        key: "providerPhoneNumber",
        type : "text",
        text : "Numero de Telefono",
    },// DataTypes.STRING,
    {
        key: "providerState",
        type : "text",
        text : "Departamento",
    },// DataTypes.STRING,
    {
        key: "providerCity",
        type : "text",
        text : "Municipio",
    },// DataTypes.STRING,
    {
        type : "title",
        text : "DATOS DEL PACIENTE",
        cols : 12, 
    },
    {
        key: "patientFullName",
        type : "text",
        text : "Nombre Completo",
    },// DataTypes.STRING,
    {
        key: "patientTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "name",
        itemValue : "key",
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
        text : "Numero de Documento",
    },// DataTypes.STRING,
    {
        key: "patientBirthDate",
        type : "DateAuto",
        text : "Fecha de Nacimiento",
        action : "setDate",
    },// DataTypes.STRING,
    {
        key: "patientAddress",
        type : "text",
        text : "Direccion",
    },// DataTypes.STRING,
    {
        key: "patientPhone",
        type : "text",
        text : "Telefono",
    },// DataTypes.STRING,
    {
        key: "patientState",
        type : "text",
        text : "Departamento",
    },// DataTypes.STRING,
    {
        key: "patientCity",
        type : "text",
        text : "Municipio",
    },// DataTypes.STRING,
    {
        key: "patientServiceProviderName",
        type : "text",
        text : "Entidad responsable del pago",
    },// DataTypes.STRING,
    {
        key: "patientServiceProviderCode",
        type : "text",
        text : "Codigo de entidad",
    },// DataTypes.STRING,
    {
        type : "title",
        text : "DATOS DE LA PERSONA RESPONSABLE DEL PACIENTE",
        cols : 12, 
    },
    {
        key: "tutorFullName",
        type : "text",
        text : "Nombre del responsable",
    },// DataTypes.STRING,
    {
        key: "tutorTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "name",
        itemValue : "key",
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
        text : "Numero de Documento",
    },// DataTypes.STRING,
    {
        key : "tutorBirthDate",
        type : "DateAuto",
        text : "Fecha de Nacimiento",
        action : "setDate",
    },
    {
        key: "tutorAddress",
        type : "text",
        text : "Direccion",
    },// DataTypes.STRING,
    {
        key: "tutorPhone",
        type : "number",
        text : "Telefono",
    },// DataTypes.STRING,
    {
        key: "tutorState",
        type : "text",
        text : "Departamento",
    },// DataTypes.STRING,
    {
        key: "tutorCity",
        type : "text",
        text : "Municipio",
    },// DataTypes.STRING,
    {
        type : "title",
        text : "PROFESIONAL QUE SOLICITA LA REFERENCIA Y SERVICIO AL CUAL REMITE",
        cols : 12, 
    },
    {
        key: "personRequestingFullName",
        type : "text",
        text : "Nombre",
    },// DataTypes.STRING,
    {
        key: "personRequestingPhoneCode",
        type : "number",
        text : "Codigo de Telefono",
    },// DataTypes.STRING,
    {
        key: "personRequestingPhoneNumber",
        type : "number",
        text : "Numero de Telefono",
    },// DataTypes.STRING,
    {
        key: "personRequestingPhoneExtension",
        type : "number",
        text : "Numero de extension de Telefono",
    },// DataTypes.STRING,
    {
        key: "personRequestingCellphone",
        type : "number",
        text : "Celular",
    },// DataTypes.STRING,
    {
        key: "ServiceRequesting",
        type : "text",
        text : "Servicio que solicita la referencia",
    },// DataTypes.STRING,
    {
        key: "ServiceReferenceRequested",
        type : "text",
        text : "Servicio para el cual se solicita la referencia",
    },// DataTypes.STRING,
    {
        type : "title",
        text : "INFORMACIÓN CLÍNICA RELEVANTE",
        cols : 12, 
    },
    {
        key: "relevantClinicalInformation",
        type : "textarea",
        text : "Diligenciar informacion",
        cols : 12,
    },// DataTypes.TEXT,
    {
        key: "professionalSignature",
        type : "select",
        text : "Firma Profesional que remite",
        itemText : "name",
        itemValue : "id",
        list : "listDigitalSignature",
    },// DataTypes.STRING,
    {
        key: "professionalRegistrationNumber",
        type : "number",
        text : "Numero de Registro del Profesional",
    },// DataTypes.STRING
]