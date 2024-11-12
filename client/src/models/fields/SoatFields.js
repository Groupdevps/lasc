export default [
    {
        type : "title",
        text : "FORMATO DE DECLARACION DE ACCIDENTE DE TRANSITO",
        cols : 12, 
    },
    {
        key : "AttentionId",
        type : "number", // string
        text : "Numbero de Atencion",  
    },
    // {
    //     key:"UserId",
    //     type : "text",
    //     text : "",
    // }, //DataTypes.INTEGER,
    {
        type : "title",
        text : "1. DATOS DEL ACCIDENTADO",
        cols : 12, 
    },
    
    {
        key:"injuredPersonFullname",
        type : "text",
        text : "Nombres y Apellidos",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonAdmissionDate",
        type : "DateAuto",
        text : "Fecha de Ingreso",
        action : "setDate",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonAdmissionTime",
        type : "time_picker",
        text : "Hora(Militar)",
        action : "setDate",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonNumberId",
        type : "number",
        text : "Documento de Identidad",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "de", name :"DE"},
            { key : "cc", name :"CC"},
            { key : "ti", name :"TI"},
            { key : "rc", name :"RC"},
            { key : "ce", name :"CE"},
            { key : "pa", name :"PA"},
            { key : "as", name :"AS"},
            { key : "ms", name :"MS"},
            { key : "cn", name :"CN"},
            { key : "pe", name :"PE"},
            { key : "nn", name :"NN"},
        ]
    }, //DataTypes.STRING,
    {
        key:"injuredPersonGender",
        type : "select",
        text : "Sexo",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "m", name :"M"},
            { key : "f", name :"F"},
        ]
    },
    {
        key:"injuredPersonBirthDate",
        type : "DateAuto",
        text : "Fecha de Nacimiento",
        action : "setDate",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonIssued",
        type : "DateAuto",
        text : "Expedido en",
        action : "setDate",
    }, //DataTypes.STRING, //expedido en
    {
        key:"injuredPersonAge",
        type : "text",
        text : "Edad",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonSocialInsurance",
        type : "text",
        text : "Seguridad Social",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonAddress",
        type : "text",
        text : "Direccion",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonState",
        type : "text",
        text : "Departamento",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonCity",
        type : "text",
        text : "Municipio",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonDistrict",
        type : "text",
        text : "Barrio",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonPhone",
        type : "number",
        text : "Telefono",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonCellphone",
        type : "number",
        text : "Celular",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonProfession",
        type : "text",
        text : "Profesion",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonMaritalStatus",
        type : "text",
        text : "Estado Civil",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonCompanion",
        type : "text",
        text : "Acompañante",
    }, //DataTypes.STRING,
    {
        key:"injuredPersonRelationship",
        type : "text",
        text : "Parentesco",
    }, //DataTypes.STRING,
    {
        type : "title",
        text : "2. DATOS RESPONSABLE",
        cols : 12, 
    },
    {
        key:"responsibleInsuranceCarrier",
        type : "text",
        text : "Aseguradora",
    }, //DataTypes.STRING,
    {
        key:"responsibleAdmissionist",
        type : "text",
        text : "Admisionista",
    }, //DataTypes.STRING,
    {
        key:"responsibleOriginSelected",
        type : "select",
        text : "Origen",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "mp", name: "MP"},
            { key : "ur", name: "UR"},
            { key : "amb", name: "AMB"},
            { key : "remitido", name: "REMITIDO"},

        ]
    }, //DataTypes.STRING,
    {
        key:"responsibleOriginName",
        type : "text",
        text : "Nombre Origen",
    }, //DataTypes.STRING,
    {
        type : "title",
        text : "3. DATOS DEL ACCIDENTE",
        cols : 12, 
    },
    {
        key:"accidentInjuredCondition",
        type : "select",
        text : "Condicion del accidentado",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "conductor", name: "Conductor"},
            { key : "ocupante", name: "Ocupante"},
            { key : "peaton", name: "Peaton"},
            { key : "ciclista", name: "Ciclista"},
        ]
    }, //DataTypes.STRING,
    {
        key:"accidentAddress",
        type : "text",
        text : "Direccion del accidente",
    }, //DataTypes.STRING,
    {
        key:"accidentDate",
        type : "DateAuto",
        text : "Fecha",
        action : "setDate",
    }, //DataTypes.STRING,
    {
        key:"accidentTime",
        type : "time_picker",
        text : "Hora",
        action : "setDate",
    }, //DataTypes.STRING,
    {
        key:"accidentState",
        type : "text",
        text : "Departamento",
    }, //DataTypes.STRING,
    {
        key:"accidentCity",
        type : "text",
        text : "Municipio",
    }, //DataTypes.STRING,
    {
        key:"accidentZone",
        type : "select",
        text : "Zona",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "urbana", name: "Zona Urbana"},
            { key : "rural", name: "Zona Rural"},
        ]
        
    }, //DataTypes.STRING,    
    {
        key : "accidentReport",
        type : "textarea",
        text : "Informe del accidente (Breve relato de los hechos)",
        cols : 12,
    }, //DataTypes.TEXT,
    {
        type: "title",
        text : "INFORME VEHICULO Y CONDUCTOR",
        cols :12,
    },
    {
        key:"accidentVehicleBrand",
        type : "text",
        text : "Marca Vehiculo",
    }, //DataTypes.STRING,
    {
        key:"accidentVehiclePlate",
        type : "text",
        text : "Placa",
    }, //DataTypes.STRING,
    {
        key:"accidentVehicleType",
        type : "text",
        text : "Tipo",
    }, //DataTypes.STRING,
    {
        key:"accidentVehicleInsured",
        type : "select",
        text : "Asegurado",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "si", name: "Si"},
            { key : "no", name: "No"},
            { key : "fant", name: "FANT"},
        ]
    }, //DataTypes.STRING,
    {
        key:"accidentDriverPatient",
        type : "select",
        text : "Conductor paciente",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "si", name: "Si"},
            { key : "no", name: "No"},         
        ]
    }, //DataTypes.STRING,
    {
        key:"accidentDriverName",
        type : "text",
        text : "Nombre conductor",
    }, //DataTypes.STRING,
    {
        key:"accidentDriverNumberId",
        type : "number",
        text : "Documento de Identidad",
    }, //DataTypes.STRING,
    {
        key:"accidentDriverTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "de", name :"DE"},
            { key : "cc", name :"CC"},
            { key : "ti", name :"TI"},
            { key : "rc", name :"RC"},
            { key : "ce", name :"CE"},
            { key : "pa", name :"PA"},
            { key : "as", name :"AS"},
            { key : "ms", name :"MS"},
            { key : "cn", name :"CN"},
            { key : "pe", name :"PE"},
            { key : "nn", name :"NN"},
        ]
    }, //DataTypes.STRING,
    {
        key:"accidentDriverIssued",
        type : "DateAuto",
        text : "Expedido en",
        action : "setDate",
    }, //DataTypes.STRING,
    {
        key:"accidentDriverAddress",
        type : "text",
        text : "Direccion Conductor",
    }, //DataTypes.STRING,
    {
        key:"accidentDriverCity",
        type : "text",
        text : "Ciudad",
    }, //DataTypes.STRING,
    {
        key:"accidentDriverCellphone",
        type : "number",
        text : "Telefono",
    }, //DataTypes.STRING,
    {
        key:"signature",
        type : "select",
        text : "Firma lesionado, conductor, tomado o familiar",        
        itemText : "name",
        itemValue : "id",
        list : "listDigitalSignature",

    }, //DataTypes.STRING,
    {
        key:"fingerprint",
        type : "select",
        text : "Huella",
        itemText : "name",
        itemValue : "id",
        list : "listDigitalSignature",

    }, //DataTypes.STRING
]