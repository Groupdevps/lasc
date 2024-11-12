module.exports = [
    { 
        key : "attentionNumber",
        type : "boxes", // string
        isInverted : true,
        x : 338, 
        y : 107,
        len : 3,
        space : 9,
        size : 8
    },
    
     { 
        key : "anexoDate",
        type : "boxes",
        split : "-",
        x : 375, 
        y : 107,
        len : 10,
        space : 9,
        size : 8
    },
    { 
        key : "anexoTime",
        type : "boxes", // string
        x : 495, 
        y : 107,
        len : 5,
        space : 9,
        size : 8
    },
    { 
        key : "providerName",
        type : "text",   
        x : 70, 
        y : 140,   
    },
    { 
        key : "providerCode",
        type : "boxes",
        isInverted : true,
        x : 207,
        y : 151,
        len : 12,
        space : 9,
        size : 8
    },
    { 
        key : "providerTypeId",
        type : "select", // string
        text : "Tipo de proveedor",
        option : {
            "nit" : { key : "nit" , x : 411, y: 129 , w: 5, h : 5},
            "cc" : { key : "cc" , x : 411, y : 139 , w: 5, h : 5},
        }
    },
    { 
        key : "providerNumberId",
        type : "condition",
        text : "Numero de proveedor",        
        keyCondition : "providerTypeId",
        len : 12,
        option : {
            nit : { key : "nit", x : 429.8 , y : 129, len: 11,  space : 9, size : 8 },
            cc  : { key : "cc", x : 450, y : 140,  isText : true}
        }
    },
    { 
        key : "providerAddress",
        type : "text",
        x : 218,
        y : 164,
    },
    { 
        key : "providerState",
        type : "text",
        text : "Departamento de proveedor",
        x : 218,
        y : 180,

        
    },
    { 
        key : "providerCity",
        type : "text",
        text : "Ciudad de Proveedor",
        x : 376,
        y : 180,

    },
    { 
        key : "providerPhoneCode",
        type : "boxes",
        isInverted : true,
        text : "Codigo telefono proveedor",
        len : 5,
        x : 143,
        y : 165,        
        space : 9,
        size : 8
    },
    { 
        key : "providerPhoneNumber",
        type : "boxes",
        text : "Numero proveedor",
        isInverted : true,
        len : 7,
        x : 207,
        y : 165,        
        space : 9,
        size : 8
    },
    { 
        key : "payerName",
        type : "text",
        text : "Entidad (Pagador)",
        x : 195,
        y : 193,        
    },
    { 
        key : "payerCode",
        type : "boxes",
        len : 6,
        isInverted : true,
        x : 531,
        y : 193,   
        text : "Codigo pagador",
        space : 9,
        size : 8
    },
    { 
        key : "patientFirstName",
        type : "text",
        text : "Nombre Paciente",
        x : 60,
        y : 215,   
    },
    { 
        key : "patientSecondName",
        type : "text",
        text : "Segundo nombre paciente",
        x : 180,
        y : 215,   
    },
    { 
        key : "patientLastName",
        type : "text",
        text : "Apellido paciente",
        x : 302,
        y : 215,   

    },
    { 
        key : "patientSecondSurname",
        type : "text",
        text : "Segundo Apellido Paciente",
        x : 420,
        y : 215,   
    },
    { 
        key : "patientTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "name",
        itemValue : "key",
        option : {            
            "5": { key : "5"/* "registro-civil" */ , name : "Registro Civil", x : 59.8, y: 247 , w: 5, h : 5},
            "2": { key : "2"/* "tarjeta-id" */ , name : "Tarjeta de identidad", x : 59.8, y: 258 , w: 5, h : 5},
            "1": { key : "1"/* "cedula" */ , name : "Cedula de ciudadania", x : 59.8, y: 269 , w: 5, h : 5},
            "3": { key : "3", name : "Cédula de extranjería", x : 59.8, y: 280 , w: 5, h : 5},
            "4": { key : "4"/* "pasaporte" */ , name : "Pasaporte", x : 170.8, y: 246.8 , w: 5, h : 5},
            "7": { key : "7"/* "adulto-sin-id" */ , name : "Adulto sin identificacion", x : 170.8, y: 258 , w: 5, h : 5},
            "8": { key : "8"/* "menor-sin-id" */ , name : "Menor si identificacion", x : 170.8, y: 269 , w: 5, h : 5},
        }
    },
    {  // =====================================
        key : "patientNumberId",
        type : "boxes",
        isInverted : true,
        x : 503,
        y: 247,
        space : 9,
        size : 8,
        len : 17
    },
    { 
        key : "patientBirthDate",
        type : "boxes",
        text : "Fecha de Nacimiento Paciente",
        x : 421, 
        y : 281,
        len : 10,
        space : 9,
        size : 8
        
    },
    { 
        key : "patientAddress",
        type : "text",
        text : "Direccion de paciente",
        x : 148, 
        y : 293,
    },
    { 
        key : "patientState",
        type : "text",
        text : "Departamento de paciente",
        x : 109, 
        y : 303,
    },
    { 
        key : "patientCity",
        type : "text",
        text : "Ciudad de paciente",
        x : 335, 
        y : 303,
    },
    { 
        key : "patientPhone",
        type : "boxes",
        text : "Telefono paciente",
        isInverted : true,
        x : 531,
        y: 293,
        space : 9,
        size : 8,
        len : 8
    },
    { 
        key : "patientRegime",
        type : "select",
        text : "Regimen de paciente",
        itemText : "name",
        itemValue : "key",
        option : {
            "contributivo" : { key : "contributivo" , name : "Regimen Contributivo" , x : 59.8, y: 326 , w: 5, h : 5},
            "subsidiado-total" : { key : "subsidiado-total" , name : "Regimen Subsidiado-total", x : 59.8, y: 338.8 , w: 5, h : 5},
            "subsidiado-parcial" : { key : "subsidiado-parcial" , name : "Regimen Subsidiado-parcial", x : 161.5, y: 326 , w: 5, h : 5},
            "con-sisben":{ key : "con-sisben" , name : "Poblacion pobre No asegurada con SISBEN", x : 161.5, y: 338.5 , w: 5, h : 5},
            "sin-sisben":{ key : "sin-sisben" , name : "Poblacion Pobre no asegurada sin SISBEN", x : 310.3, y: 326.5 , w: 5, h : 5},
            "desplazado":{ key : "desplazado" , name : "Desplazado", x : 310.3, y: 338.8 , w: 5, h : 5},
            "plan-adicional":{ key : "plan-adicional" , name : "Plan adicional de salud", x : 438.8, y: 326.5 , w: 5, h : 5},
            "otro":{ key : "otro" , name : "Otro", x : 439, y: 338.5 , w: 5, h : 5},
        }
    },
    { 
        key : "attentionOrigin",
        type : "select",
        text : "Origen de la atencion",
        itemText : "name",
        itemValue : "key",
        option :{
            "general 1" : { key  : "general", name : "Enfermedad General", x : 59.8, y: 378.9 , w: 5, h : 5},
            "profesional"  : { key  : "profesional", name : "Enfermedad Profesional", x : 59.8, y: 388.9 , w: 5, h : 5},
            "trabajo" : { key  : "trabajo", name : "Accidente de trabajo", x : 161.5, y: 378.2 , w: 5, h : 5},
            "transito" : { key  : "transito", name : "Accidente de transito", x : 161.5, y: 389.1 , w: 5, h : 5},
            /* "evento" */ general: { key  : "evento", name : "Evento Catastrofico", x : 264, y: 377.9 , w: 5, h : 5},

        }

    },
    { 
        key : "triageClassification",
        type : "select",
        text : "Clasificacion Triage",
        itemText : "name",
        itemValue : "key",
        option : {
            "1":{ key  : "1", name : "1. Rojo", x : 448.4, y: 378 , w: 5, h : 5},
            "2":{ key  : "2", name : "2. Amarillo", x : 448.4, y: 389 , w: 5, h : 5},
            "3":{ key  : "3", name : "3. Verde", x : 448.4, y: 400.2 , w: 5, h : 5},
           
        }

    },
    { 
        key : "attentionDate",
        type : "boxes",
        text : "Fecha de Atencion",
        x : 88, 
        y : 429,
        len : 10,
        space : 9,
        size : 8
        
    },
    { 
        key : "attentionTime",
        type : "boxes",
        text : "Hora de atencion",
        x : 208, 
        y : 429,
        len : 5,
        space : 9,
        size : 8
        
    },
    { 
        key : "refferingProviderTransferred",
        type : "select",
        text : "Paciente viene remitido",
        option : {
           "si" : { key  : "si", name : "si", x : 365.7, y: 427.7 , w: 5, h : 5},
           "no" : { key  : "no", name : "no", x : 393.3, y: 427.7 , w: 5, h : 5},            
           
        }
    },
    { 
        key : "refferingProviderName",
        type : "text",
        text : "Nombre prestador que remite",
        x : 60,
        y : 457,
    },
    { 
        key : "refferingProviderCode",
        type : "boxes",
        text : "Codigo prestador que remite",
        isInverted : true,
        x : 531,
        y : 447,
        len : 11,
        space : 9,
        size : 8

    },
    { 
        key : "refferingProviderState",
        type : "text",
        text : "Departamento prestador que remite",
        x : 108, 
        y : 469,
    },
    { 
        key : "refferingProviderCity",
        type : "text",
        text : "Ciudad prestador que remite",
        x : 335, 
        y : 469,
    },
    { 
        key : "attentionMotive",
        type : "text",
        text : "Motivo de consulta",
        x : 63, 
        y : 493,
    },
    { 
        key : "diagnosesCIE10Principal",
        type : "boxes",
        text : "CIE10 Principal",
        isInverted : true,
        x : 198,
        y : 538,
        len : 3,
        space : 9,
        size : 8
    },
    { 
        key : "diagnosesCIE10Related1",
        type : "boxes",
        text : "CIE10 1",
        isInverted : true,
        x : 198,
        y : 548,
        len : 3,
        space : 9,
        size : 8
    },
    { 
        key : "diagnosesCIE10Related2",
        type : "boxes",
        text : "CIE10 2",
        isInverted : true,
        x : 198,
        y : 559,
        len : 3,
        space : 9,
        size : 8
    },
    { 
        key : "diagnosesCIE10Related3",
        type : "boxes",
        text : "CIE103",
        isInverted : true,
        x : 198,
        y : 570,
        len : 3,
        space : 9,
        size : 8
    },
    { 
        key : "diagnosesDescriptionPrincipal",
        type : "text",
        text : "Diagnostico principal",
        x : 223,
        y : 538,
    },
    { 
        key : "diagnosesDescriptionRelated1",
        type : "text",
        text : "Diagnostico 1",
        x : 223,
        y : 549,
    },
    { 
        key : "diagnosesDescriptionRelated2",
        type : "text",
        text : "Diagnostico 2",
        x : 223,
        y : 560,
    },
    { 
        key : "diagnosesDescriptionRelated3",
        type : "text",
        text : "Diagnostico 3",
        x : 223,
        y : 571,
    },
    { 
        key : "patientDestination",
        type : "select",// string
        text : "Destino paciente",
        itemText : "name",
        itemValue : "key",
        option : {
            "domicilio"  : { key : "domicilio", name : "Domicilio", x : 87.5, y: 595.5 , w: 5, h : 5},
            "observacion" : { key : "observacion", name : "Observacion", x : 87.7, y: 605.4 , w: 5, h : 5},
            "internacion" : { key : "internacion", name : "Internacion", x : 216.9, y: 595.5 , w: 5, h : 5},
            "remision" : { key : "remision", name : "Remision", x : 216.9, y: 605.4 , w: 5, h : 5},
            "contrarremision" : { key : "contrarremision", name : "Contrarremision", x : 347.3, y: 595.3 , w: 5, h : 5},
            "otro" : { key : "otro", name : "Otro", x : 347.3, y: 605.5 , w: 5, h : 5},

        }
    },
    { 
        key : "informantName",
        type : "text",
        text : "Nombre de persona que informa",
        x : 61,
        y : 647,
    },
    { 
        key : "informantPosition",
        type : "text",
        text : "Cargo o actividad de quien informa",
        x : 120,
        y : 658,
    },
    { 
        key : "informantPhoneCode",
        type : "boxes",
        text : "Codigo de telefono de quien informa",
        isInverted : true,
        x : 411,
        y : 635,
        len : 3,
        space : 9,
        size : 8
    },
    { 
        key : "informantPhoneNumber",
        type : "boxes",
        text : "Telefono de quien infrma",
        isInverted : true,
        x : 476,
        y : 635,
        len : 7,
        space : 9,
        size : 8
    },
    { 
        key : "informantPhoneExtension",
        type : "boxes",
        text : "Extension de quien informa",
        isInverted : true,
        x : 532,
        y : 635,
        len : 5,
        space : 9,
        size : 8
    },
    { 
        key : "informantCellphone",
        type : "boxes",
        text : "Celular de quien informa",
        isInverted : true,
        x : 531,
        y : 658,
        len : 9,
        space : 9,
        size : 8
    },


]