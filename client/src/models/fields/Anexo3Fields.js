export default  [
    
    /* {
        key : "UserId",
        typen : "number",
    }, */
        
    {
        type : "title",
        text : "SOLICITUD DE AUTORIZACION DE SERVICIOS DE SALUD",
        cols : 12, 
    },
    { 
        key : "AttentionId",
        type : "number", // string
        text : "Numbero de Atencion",      
    },
    {
        key:  "requestNumber",
        type : "number",
        text : "Numero de solicitud",
    },
    //fecha y hora
    {
        key:  "anexoDate",
        type : "DateAuto",
        text : "Fecha Anexo",
        action : "setDate",

    },
    {
        key:  "anexoTime",
        type : "time_picker",
        text : "hora",
        action : "setDate",

    },
    {
        type : "title",
        text : "INFORMACION DEL PRESTADOR (solicitante)",
        cols : 12, 
    },
    //proveedor 
    {
        key:  "providerName",
        type : "text",
        text  : "Nombre Proveedor"
    },//nombre
    {
        key:  "providerCode",
        type : "number",
        text : "Codigo Proveedor"
    }, //codigo
    {
        key:  "providerTypeId",
        type : "select",
        text : "Tipo Proveedor",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "nit", name :"NIT"},
            { key : "cc", name :"CC"},
        ]
    },//typeId
    {
        key:  "providerNumberId",
        type : "text",
        text : "Numero Proveedor",
    }, //numero
    {
        key:  "providerAddress",
        type : "text",
        text : "Direccion Proveedor",
    },//direccion
    {
        key:  "providerState",
        type : "text",
        text : "Departamento Proveedor",
    },//departamento
    {
        key:  "providerCity",
        type : "text",
        text : "Ciudad Proveedor",
    },//municipio
    {
        key:  "providerPhoneCode",
        type : "number",
        text : "Indicativo Proveedor",
    },// telefono indicativo
    {
        key:  "providerPhoneNumber",
        type : "number",
        text : "Telefono Proveedor"
    },// telefono numero
    //pagador
    {
        type : "title",
        text : "ENTIDAD A LA QUE SE LE SOLICITA (PAGADOR)",
        cols : 12, 
    },
    {
        key: "payerName",
        type : "text",
        text : "Nombre Pagador",
    },// nombre
    {
        key: "payerCode",
        type : "text",
        text : "Codigo Pagador",
    },//codigo
    //paciente
    {
        type : "title",
        text : "DATOS DEL PACIENTE",
        cols : 12, 
    }, 
    {
        key: "patientFirstName",
        type : "text",
        text : "Primer nombre Paciente",
    },//primer nombre
    {
        key : "patientSecondName",
        type : "text",
        text : "Segundo Nombre Paciente"
    },//segundo nombre
    {
        key: "patientLastName",
        type : "text",
        text : "Apellido Paciente",
    },//primer apellido
    {
        key: "patientSecondSurname",
        type : "text",
        text : "Segundo Apellido Paciente",
    },//segundo apellido
    {
        key: "patientTypeId",
        type : "select",
        text : "Tipo de Docuemento Paciente",
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
    },//typeId
    {
        key: "patientNumberId",
        type : "number",
        text : "Numero Documento Paciente",
    },//numero de identificacion
    {
        key: "patientBirthDate",
        type : "DateAuto",
        action : "setDate",
        text : "Fecha de Nacimiento Paciente",
    },//fecha de nacimiento
    {
        key: "patientAddress",
        type : "text",
        text : "Direccion Paciente",
    },//direccion
    {
        key: "patientState",
        type : "text",
        text : "Departamento Paciente",
    },//departamento
    {
        key: "patientCity",
        type : "text",
        text : "Ciudad Paciente",
    },//municipio
    {
        key: "patientPhone",
        type : "number",
        text : "Telefono Paciente",
    },//telefono
    {
        key: "patientCellphone",
        type : "number",
        text : "Celular Paciente",
    },//celular
    {
        key: "patientEmail",
        type : "text",
        text : "Correo Electronico Paciente",
    }, //correo
    {
        key: "patientRegime",
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
    },//regimen
    //atencion---
    {
        type : "title",
        text : "INFORMACION DE LA ATENCION Y SERVICIOS SOLICITADOS",
        cols : 12, 
    }, 

    {
        key: "attentionOrigin",
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
    },//origen de la atencion
    {
        key: "typeAttention",
        type : "select",
        text : "Tipo de Servicio Solicitado",
        itemText : "name",
        itemValue : "key",
        list:[
            {key:"post-atencion", name : "Posterior a la atención inicial de urgencias"},
            {key:"servicio-electivos", name :"Servicios electivos" }
        ]
    },//tipo de servicio solicitado
    {
        key: "attentionPriority",
        type : "select",
        text : "Prioridad de la atención",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "prioritaria", name : "Prioritaria"},
            { key : "no-prioritaria", name : "No Prioritaria"}
        ]
    },   

    {
        key : "locationPatient",
        type : "select",
        text : "Ubicación del Paciente al momento de la solicitud de autorizacion",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "external-consultation", name : "Consulta Externa"},
            { key : "urgency", name : "Urgencias"},
            { key : "hospitalization", name : "Hospitalización"}
        ]
    },
    {
        key : "locationService",
        type : "text",
        text : "Servicio", 
    },
    {
        key : "locationBed",
        type : "number",
        text : "Cama",
    },
    {
        key: "guide",
        type : "text",
        text : "Manejo integral según Guía de",
    },//manejo de guia
    {
        key : "AnexCups",
        type : "table",
        component : "AnexCups",       
        cols : "12" 
    },
    {
        key: "justification",
        type : "textarea",
        text : "Justificación Clínica",
        cols : 12,
    },//justificacion clinica
    //diagnosticos
    { 
        key : "diagnosesCIE10Principal",
        type : "text",
        text : "Diagnóstico principal",
    }, //codigo
    { 
        key : "diagnosesCIE10Related1",
        type : "text",
        text : "Diagnóstico relacionado 1",
    },
    { 
        key : "diagnosesCIE10Related2",
        type : "text",
        text : "Diagnóstico relacionado 2",
    },
    { 
        key : "diagnosesDescriptionPrincipal",
        type : "text",
        text : "Descripcion Diagnóstico principal",
    },//descripcion
    { 
        key : "diagnosesDescriptionRelated1",
        type : "text",
        text : "Descripcion Diagnóstico relacionado 1",
    },
    { 
        key : "diagnosesDescriptionRelated2",
        type : "text",
        text : "Descripcion Diagnóstico relacionado 2",
    },
    //informante
    {
        type : "title",
        text : "INFORMACION DE LA PERSONA QUE SOLICITA",
        cols : 12, 
    }, 
    { 
        key : "informantName",
        type : "text",
        text : "Nombre de que solicita",
    }, //nombre
    { 
        key : "informantPosition",
        type : "text",
        text : "Cargo o actividad",
    }, //cargo
    //telefono
    { 
        key : "informantPhoneCode",
        type : "number",
        text : "Codigo de Telefono de quien solicita",
    }, // indicativo 
    { 
        key : "informantPhoneNumber",
        type : "number",
        text : "Numero de Telefono de quien solicita",
    }, //numero
    { 
        key : "informantPhoneExtension",
        type : "number",
        text : "Extension de Telefono de quien solicita",
    }, //extension
    { 
        key : "informantCellphone",
        type : "number",
        text : "Celular de Telefono de quien solicita",
    } //celular
]