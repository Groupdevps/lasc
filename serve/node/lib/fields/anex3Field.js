module.exports = [
        /* { 
            key : "AttentionId",
            type : "number", // string
            text : "Numbero de Atencion",      
        }, */
        /* {
            key : "UserId",
            typen : "number",
        }, */
            
        {
            key:  "requestNumber",
            type : "boxes",
            text : "Numero de solicitud",
            isInverted : true,
            x : 332, 
            y : 102,
            len : 3,
            space : 8.5,
            size : 7
        },
        // //fecha y hora
        {
            key:  "anexoDate",
            type : "boxes",
            text : "Fecha Anexo",
            x : 363, 
            y : 102,
            len : 10,
            space : 8.5,
            size : 8,
        },
        {
            key:  "anexoTime",
            type : "boxes",
            x : 472, 
            y : 102,
            len : 10,
            space : 8,
            size : 8,

        },
        // //proveedor 
        {
            key:  "providerName",
            type : "text",
            text  : "Nombre Proveedor",
            x : 85,
            y : 130,
        },//nombre
        {
            key:  "providerCode",
            type : "boxes",
            text : "Codigo Proveedor",
            isInverted : true,
            x : 216, 
            y : 139,
            len : 12,
            space : 8.3,
            size : 8
        }, //codigo
        {
            key:  "providerTypeId",
            type : "select",
            text : "Tipo Proveedor",
            itemText : "name",
            itemValue : "key",
            option : {
                nit : { key : "nit", name :"NIT", x : 398, y: 121.7 , w: 5, h : 5},
                cc : { key : "cc", name :"CC", x : 398, y: 129 , w: 5, h : 5},
            }
        },//typeId
        {
            key:  "providerNumberId",
            type : "condition",
            text : "Numero Proveedor",
            keyCondition : "providerTypeId",
            len : 11,
            option : {
                nit : { key : "nit", x : 414.2 , y : 121.7, len: 11,  space : 8.3, size : 6 },
                cc  : { key : "cc", x : 432, y : 130,  isText : true}
            }
        }, //numero
        {
            key:  "providerAddress",
            type : "text",
            text : "Direccion Proveedor",
            x : 225,
            y : 149,
        },//direccion
        {
            key:  "providerState",
            type : "text",
            text : "Departamento Proveedor",
            x : 227,
            y : 162.5,
        },//departamento
        {
            key:  "providerCity",
            type : "text",
            text : "Ciudad Proveedor",
            x : 365,
            y : 162.5,
        },//municipio
        {
            key:  "providerPhoneCode",
            type : "boxes",
            text : "Indicativo Proveedor",
            isInverted : true,
            x : 159, 
            y : 149,
            len : 4,
            space : 8.3,
            size : 8
        },// telefono indicativo
        {
            key:  "providerPhoneNumber",
            type : "boxes",
            text : "Telefono Proveedor",
            isInverted : true,
            x : 216, 
            y : 149,
            len : 6,
            space : 8.3,
            size : 8
        },// telefono numero
        // //pagador
        {
            key: "payerName",
            type : "text",
            text : "Nombre Pagador",
            x : 193,
            y : 173.5,
        },// nombre
        {
            key: "payerCode",
            type : "boxes",
            text : "Codigo Pagador",
            isInverted : true,
            x : 504.5,
            y : 173.5,
            len : 5,
            space : 8.3,
            size : 8
        },//codigo
        // //paciente 
        {
            key: "patientFirstName",
            type : "text",
            text : "Primer nombre Paciente",
            x : 297.5,
            y : 193.5,
        },//primer nombre
        {
            key : "patientSecondName",
            type : "text",
            text : "Segundo Nombre Paciente",
            x : 405.5,
            y : 193.5,
        },//segundo nombre
        {
            key: "patientLastName",
            type : "text",
            text : "Apellido Paciente",
            x : 80.5,
            y : 193.5,
        },//primer apellido
        {
            key: "patientSecondSurname",
            type : "text",
            text : "Segundo Apellido Paciente",
            x : 191.5,
            y : 193.5,
        },//segundo apellido
        {
            key: "patientTypeId",
            type : "select",
            text : "Tipo de Docuemento Paciente",
            itemText : "name",
            itemValue : "key",
            option : {
                "5": { key : "5"/* "registro-civil" */ , name : "Registro Civil",   x : 83, y: 221 , w: 5, h : 5},
                "21": { key : "2"/* "tarjeta-id" */ , name : "Tarjeta de identidad" , x : 83, y: 231 , w: 5, h : 5},
                "1": { key : "1"/* "cedula" */ , name : "Cedula de ciudadania" , x : 83, y: 241 , w: 5, h : 5},
                "3": { key : "3", name : "Cédula de extranjería" , x : 83, y: 250 , w: 5, h : 5},
                "4": { key : "4"/* "pasaporte" */ , name : "Pasaporte" , x : 183.5, y: 221 , w: 5, h : 5},
                "7": { key : "7"/* "adulto-sin-id" */ , name : "Adulto sin identificacion" , x : 183.5, y: 231 , w: 5, h : 5},
                "8": { key : "8"/* "menor-sin-id" */ , name : "Menor si identificacion" , x : 183.5, y: 240.5 , w: 5, h : 5},
            }
        },//typeId
        {
            key: "patientNumberId",
            type : "boxes",
            text : "Numero Documento Paciente",
            isInverted : true,
            x : 480.5,
            y : 221.5,
            len : 5,
            space : 8.3,
            size : 8
        },//numero de identificacion
        {
            key: "patientBirthDate",
            type : "boxes",
            text : "Fecha de Nacimiento Paciente",
            x : 406,
            y : 251.5,
            len : 9,
            space : 8.3,
            size : 8
        },//fecha de nacimiento
        {
            key: "patientAddress",
            type : "text",
            text : "Direccion Paciente",
            x : 157,
            y : 261.5,
        },//direccion
        {
            key: "patientState",
            type : "text",
            text : "Departamento Paciente",
            x : 123,
            y : 270.5,
        },//departamento
        {
            key: "patientCity",
            type : "text",
            text : "Ciudad Paciente",
            x : 327,
            y : 270.5,
        },//municipio
        {
            key: "patientPhone",
            type : "boxes",
            text : "Telefono Paciente",
            isInverted : true,
            x : 504.5,
            y : 261.5,
            len : 8,
            space : 8.3,
            size : 8
        },//telefono
        {
            key: "patientCellphone",
            type : "boxes",
            text : "Celular Paciente",
            isInverted : true,
            x : 216.8,
            y : 281,
            len : 10,
            space : 8.3,
            size : 8
        },//celular
        {
            key: "patientEmail",
            type : "text",
            text : "Correo Electronico Paciente",
            x : 268,
            y : 281,
        }, //correo
        {
            key: "patientRegime",
            type : "select",
            text : "Regimen de paciente",
            itemText : "name",
            itemValue : "key",
            option : {
               "contributivo": { key : "contributivo" , name : "Regimen Contributivo", x : 84, y: 299 , w: 5, h : 5},
               "subsidiado-total": { key : "subsidiado-total" , name : "Regimen Subsidiado-total", x : 84, y: 309 , w: 5, h : 5},
               "subsidiado-parcial": { key : "subsidiado-parcial" , name : "Regimen Subsidiado-parcial", x : 175.5, y: 299 , w: 5, h : 5},
               "con-sisben": { key : "con-sisben" , name : "Poblacion pobre No asegurada con SISBEN", x : 175.7, y: 310 , w: 5, h : 5},
               "sin-sisben": { key : "sin-sisben" , name : "Poblacion Pobre no asegurada sin SISBEN", x : 306, y: 299.5 , w: 5, h : 5},
               "desplazado": { key : "desplazado" , name : "Desplazado", x : 306, y: 310.2 , w: 5, h : 5},
               "plan-adicional": { key : "plan-adicional" , name : "Plan adicional de salud", x : 422.5, y: 299.5 , w: 5, h : 5},
               "otro": { key : "otro" , name : "Otro", x : 422.6    , y: 310.2 , w: 5, h : 5},
            }
        },//regimen
        // //atencion---
    
        {
            key: "attentionOrigin",
            type : "select",
            text : "Origen de la atencion",
            itemText : "name",
            itemValue : "key",
            option : {
               general:  { key  : "general", name : "Enfermedad General", x : 84    , y: 352.2 , w: 5, h : 5 },
               profesional:  { key  : "profesional", name : "Enfermedad Profesional", x : 84    , y: 362 , w: 5, h : 5 },
               trabajo:  { key  : "trabajo", name : "Accidente de trabajo", x : 167.3    , y: 352.2 , w: 5, h : 5 },
               transito:  { key  : "transito", name : "Accidente de transito", x : 167.3    , y: 362.2 , w: 5, h : 5 },
               evento:  { key  : "evento", name : "Evento Catastrofico", x : 240.8    , y: 352.2 , w: 5, h : 5 },
    
            }
        },//origen de la atencion
        {
            key: "typeAttention",
            type : "select",
            text : "Tipo de Servicio Solicitado",
            itemText : "name",
            itemValue : "key",
            option:{
                "post-atencion": {key:"post-atencion", name : "Posterior a la atención inicial de urgencias", x : 314.3    , y: 352.3 , w: 5, h : 5 },
                "servicio-electivos": {key:"servicio-electivos", name :"Servicios electivos" , x : 314.3    , y: 362.2 , w: 5, h : 5 }
            }
        },//tipo de servicio solicitado
        {
            key: "attentionPriority",
            type : "select",
            text : "Prioridad de la atención",
            itemText : "name",
            itemValue : "key",
            option : {
                "prioritaria" : { key : "prioritaria", name : "Prioritaria" , x : 447    , y: 352.3 , w: 5, h : 5},
                "no-prioritaria": { key : "no-prioritaria", name : "No Prioritaria" , x : 447    , y: 362.2 , w: 5, h : 5},
            }
        },   
    
        {
            key : "locationPatient",
            type : "select",
            text : "Ubicación del Paciente al momento de la solicitud de autorizacion",
            itemText : "name",
            itemValue : "key",
            option : {
                "external-consultation": { key : "external-consultation", name : "Consulta Externa" , x : 84    , y: 385.6 , w: 5, h : 5},
                "urgency": { key : "urgency", name : "Urgencias" , x : 84    , y: 394 , w: 5, h : 5},
                "hospitalization": { key : "hospitalization", name : "Hospitalización" , x : 167.5    , y: 385.6 , w: 5, h : 5},
            }
        },
        {
            key : "locationService",
            type : "text",
            text : "Servicio", 
            x : 256.1,
            y : 386.2,
        },
        {
            key : "locationBed",
            type : "boxes",
            text : "Cama",
            isInverted : true,
            x : 504.1,
            y : 386.5,
            len : 5,
            space : 8.3,
            size : 8
        },
        {
            key: "guide",
            type : "text",
            text : "Manejo integral según Guía de",
            x : 182.1,
            y : 410.2,
        },//manejo de guia
        {
            key : "AnexCups",
            type : "list",
            component : "AnexCups",       
            cols : "12",
            interline : 10,
            fields : {
                cups : { type : "boxes",  isInverted : true, x : 143.1, y : 433.5, len : 5, space : 8.3, size : 8 },
                cant : { type : "boxes",   isInverted : true, x : 176, y : 433.5, len : 5, space : 8.3, size : 8 },
                description : { type : "text", x : 190.1, y : 433.5,  },
            } 
        },
        {
            key: "justification",
            type : "textarea",
            text : "Justificación Clínica",
            x : 81,
            y : 644,
            interline : 9.2,
            limitLines : 4,
            limitText : 100
        },//justificacion clinica
        // //diagnosticos
        { 
            key : "diagnosesCIE10Principal",
            type : "boxes",
            text : "Diagnóstico principal",
            isInverted : true,
            x : 200.1,
            y : 701.5,
            len : 5,
            space : 8.3,
            size : 8
        }, //codigo
        { 
            key : "diagnosesCIE10Related1",
            type : "boxes",
            text : "Diagnóstico relacionado 1",
            isInverted : true,
            x : 200.1,
            y : 711.5,
            len : 5,
            space : 8.3,
            size : 8
        },
        { 
            key : "diagnosesCIE10Related2",
            type : "boxes",
            text : "Diagnóstico relacionado 2",
            isInverted : true,
            x : 200.1,
            y : 721.5,
            len : 5,
            space : 8.3,
            size : 8
        },
        { 
            key : "diagnosesDescriptionPrincipal",
            type : "text",
            text : "Descripcion Diagnóstico principal",
            x : 223.1,
            y : 701.5,
        },//descripcion
        { 
            key : "diagnosesDescriptionRelated1",
            type : "text",
            text : "Descripcion Diagnóstico relacionado 1",
            x : 223.1,
            y : 711.5,
        },
        { 
            key : "diagnosesDescriptionRelated2",
            type : "text",
            text : "Descripcion Diagnóstico relacionado 2",
            x : 223.1,
            y : 721.5,
        },
        // //informante
        { 
            key : "informantName",
            type : "text",
            text : "Nombre de que solicita",
            x : 81.1,
            y : 760,
        }, //nombre
        { 
            key : "informantPosition",
            type : "text",
            text : "Cargo o actividad",
            x : 132.1,
            y : 769.5,
        }, //cargo
        // //telefono
        { 
            key : "informantPhoneCode",
            type : "boxes",
            text : "Codigo de Telefono de quien solicita",
            isInverted : true,
            x : 397.5,
            y : 750.5,
            len : 5,
            space : 9,
            size : 8
        }, // indicativo 
        { 
            key : "informantPhoneNumber",
            type : "boxes",
            text : "Numero de Telefono de quien solicita",
            isInverted : true,
            x : 455.1,
            y : 750.5,
            len : 5,
            space : 8.3,
            size : 8
        }, //numero
        { 
            key : "informantPhoneExtension",
            type : "boxes",
            text : "Extension de Telefono de quien solicita",
            isInverted : true,
            x : 504.1,
            y : 750.5,
            len : 5,
            space : 8.3,
            size : 8
        }, //extension
        { 
            key : "informantCellphone",
            type : "boxes",
            text : "Celular de Telefono de quien solicita",
            isInverted : true,
            x : 504.1,
            y : 769.5,
            len : 5,
            space : 8.3,
            size : 8
        } //celular
    
]