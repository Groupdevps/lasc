export default [
    /* { 
        key : "UserId",
        type : "select",
        text : "Usuario", 
    },
    { 
        key : AttentionId,
        type : "number",
        text : "Numbero de Atencion",
    }, */
    {
        type : "title",
        text : "INFORME DE LA ATENCION INICIAL DE URGENCIAS",
        cols : 12, 
    },
    { 
        key : "attentionNumber",
        type : "number", // string
        text : "Numbero de Atencion",      
    },
    { 
        key : "anexoDate",
        type : "DateAuto",
        text : "Fecha",        
        action : "setDate",
    },
    { 
        key : "anexoTime",
        type : "time_picker", // string
        text : "Hora",        
        action : "setDate",

    },
    {
        type : "title",
        text : "INFORMACION DEL PRESTADOR",
        cols : 12, 
    },
    { 
        key : "providerName",
        type : "text",
        text : "Proveedor",
    },
    { 
        key : "providerCode",
        type : "text",
        text : "Codigo Proveedor",
    },
    { 
        key : "providerTypeId",
        type : "select", // string
        text : "Tipo de proveedor",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "nit"/* "registro-civil" */ , name : "nit"},
            { key : "cc"/* "tarjeta-id" */ , name : "CC"},
        ]
    },
    { 
        key : "providerNumberId",
        type : "text",
        text : "Numero de proveedor",
    },
    { 
        key : "providerAddress",
        type : "text",
        text : "Direccion de Proveedor",
    },
    { 
        key : "providerState",
        type : "text",
        text : "Departamento de proveedor",

        
    },
    { 
        key : "providerCity",
        type : "text",
        text : "Municipio de Proveedor",
    },
    { 
        key : "providerPhoneCode",
        type : "number",
        text : "Codigo telefono proveedor",
    },
    { 
        key : "providerPhoneNumber",
        type : "number",
        text : "Numero proveedor",
    },
    { 
        key : "payerName",
        type : "text",
        text : "Entidad (Pagador)",
    },
    { 
        key : "payerCode",
        type : "number",
        text : "Codigo pagador",
    },
    {
        type : "title",
        text : "DATOS DEL PACIENTE",
        cols : 12, 
    },
    { 
        key : "patientFirstName",
        type : "text",
        text : "Nombre Paciente",
    },
    { 
        key : "patientSecondName",
        type : "text",
        text : "Segundo nombre paciente",
    },
    { 
        key : "patientLastName",
        type : "text",
        text : "Apellido paciente",

    },
    { 
        key : "patientSecondSurname",
        type : "text",
        text : "Segundo Apellido Paciente",
    },
    { 
        key : "patientTypeId",
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
    },
    { 
        key : "patientNumberId",
        type : "number",
        text : "Numero de documento",
    },
    { 
        key : "patientBirthDate",
        type : "DateAuto",
        text : "Fecha de Nacimiento Paciente",
        action : "setDate",

    },
    { 
        key : "patientAddress",
        type : "text",
        text : "Direccion de paciente",
    },
    { 
        key : "patientState",
        type : "text",
        text : "Departamento de paciente",
    },
    { 
        key : "patientCity",
        type : "text",
        text : "Municipio de paciente",
    },
    { 
        key : "patientPhone",
        type : "number",
        text : "Telefono paciente",
    },
    { 
        key : "patientRegime",
        type : "select",
        text : "Regimen de paciente",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "contributivo" , name : "Regimen Contributivo"},
            { key : "subsidiado-total" , name : "Regimen Subsidiado-total"},
            { key : "subsidiado-parcial" , name : "Regimen Subsidiado-parcial"},
            { key : "con-sisben" , name : "Poblacion pobre No asegurada con SISBEN"},
            { key : "sin-sisben" , name : "Poblacion Pobre no asegurada sin SISBEN"},
            { key : "desplazado" , name : "Desplazado"},
            { key : "plan-adicional" , name : "Plan adicional de salud"},
            { key : "otro" , name : "Otro"},
        ]
    },
    {
        type : "title",
        text : "INFORMACION DE LA ATENCION",
        cols : 12, 
    },
    { 
        key : "attentionOrigin",
        type : "select",
        text : "Origen de la atencion",
        itemText : "name",
        itemValue : "key",
        list : [
            { key  : "general", name : "Enfermedad General"},
            { key  : "profesional", name : "Enfermedad Profesional"},
            { key  : "trabajo", name : "Accidente de trabajo"},
            { key  : "transito", name : "Accidente de transito"},
            { key  : "evento", name : "Evento Catastrofico"},
        ]

    },
    { 
        key : "triageClassification",
        type : "select",
        text : "Clasificacion Triage",
        itemText : "name",
        itemValue : "key",
        list : [
            { key  : "1", name : "1. Rojo"},
            { key  : "2", name : "2. Amarillo"},
            { key  : "3", name : "3. Verde"},
           
        ]

    },
    { 
        key : "attentionDate",
        type : "DateAuto",
        text : "Fecha de Atencion",
        action : "setDate",
    },
    { 
        key : "attentionTime",
        type : "time_picker",
        text : "Hora de atencion",
        action : "setDate",
    },
    { 
        key : "refferingProviderTransferred",
        type : "select",
        text : "Paciente viene remitido",
        itemText : "name",
        itemValue : "key",
        list : [
            { key  : "si", name : "si"},
            { key  : "no", name : "no"},            
           
        ]
    },
    { 
        key : "refferingProviderName",
        type : "text",
        text : "Nombre prestador que remite",
    },
    { 
        key : "refferingProviderCode",
        type : "number",
        text : "Codigo prestador que remite",

    },
    { 
        key : "refferingProviderState",
        type : "text",
        text : "Departamento prestador que remite",
    },
    { 
        key : "refferingProviderCity",
        type : "text",
        text : "Ciudad prestador que remite",
    },
    { 
        key : "attentionMotive",
        type : "text",
        text : "Motivo de consulta",
    },
    { 
        key : "diagnosesCIE10Principal",
        type : "text",
        text : "CIE10 Principal",
    },
    { 
        key : "diagnosesCIE10Related1",
        type : "text",
        text : "CIE10 1",
    },
    { 
        key : "diagnosesCIE10Related2",
        type : "text",
        text : "CIE10 2",
    },
    { 
        key : "diagnosesCIE10Related3",
        type : "text",
        text : "CIE103",
    },
    { 
        key : "diagnosesDescriptionPrincipal",
        type : "text",
        text : "Diagnostico principal",
    },
    { 
        key : "diagnosesDescriptionRelated1",
        type : "text",
        text : "Diagnostico 1",
    },
    { 
        key : "diagnosesDescriptionRelated2",
        type : "text",
        text : "Diagnostico 2",
    },
    { 
        key : "diagnosesDescriptionRelated3",
        type : "text",
        text : "Diagnostico 3",
    },
    { 
        key : "patientDestination",
        type : "select",// string
        text : "Destino paciente",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "domicilio", name : "Domicilio"},
            { key : "observacion", name : "Observacion"},
            { key : "internacion", name : "Internacion"},
            { key : "remision", name : "Remision"},
            { key : "contrarremision", name : "Contrarremision"},
            { key : "otro", name : "Otro"},

        ]
    },
    {
        type : "title",
        text : "INFORMACION DE LA PERSONA QUE INFORMA",
        cols : 12, 
    },
    { 
        key : "informantName",
        type : "text",
        text : "Nombre de persona que informa",
    },
    { 
        key : "informantPosition",
        type : "text",
        text : "Cargo o actividad de quien informa",
    },
    { 
        key : "informantPhoneCode",
        type : "number",
        text : "Codigo de telefono de quien informa",
    },
    { 
        key : "informantPhoneNumber",
        type : "number",
        text : "Telefono de quien infrma",
    },
    { 
        key : "informantPhoneExtension",
        type : "number",
        text : "Extension de quien informa",
    },
    { 
        key : "informantCellphone",
        type : "number",
        text : "Celular de quien informa",
    },
]