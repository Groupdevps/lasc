export default [
    {
        type : "title",
        text : "SERVICIO DE AMBULANCIA HISTORIA CLINICA DE ATENCION PREHOSPITALARIA",
        cols : 12,
    },
    {
        key : "AttentionId",
        type : "number",
        text : "Numero de Atencion",
    },//DataTypes.INTEGER,
    // {
    //     key : "UserId",
    //     type : "text",
    //     text : "",
    // },//DataTypes.INTEGER,
    {
        key : "code",
        type : "text",
        text : "Codigo",
    },//DataTypes.STRING,
    {
        key : "version",
        type : "text",
        text : "Version",
    },//DataTypes.STRING,
    {
        key : "approvalDate",
        type : "DateAuto",
        text : "Fecha de Aprobacion",
        action : "setDate",
    },//DataTypes.STRING,
    {
        key : "page",
        type : "number",
        text : "Pagina",
    },//DataTypes.STRING,
    {
        key : "number",
        type : "text",
        text : "Numero",
    },//DataTypes.STRING,
    {
        key : "plates",
        type : "text",
        text : "Placas",
    },//DataTypes.STRING,
    {
        key : "centerName",
        type : "text",
        text : "Entidad",
    },//DataTypes.STRING,
    {
        key : "mobile",
        type : "text",
        text : "Movil",
    },//DataTypes.STRING,
    {
        key : "attentionDate",
        type : "DateAuto",
        text : "Fecha de Atencion",
        action : "setDate",
    },//DataTypes.STRING,
    {
        key : "patientFullName",
        type : "text",
        text : "Nombre y Apellidos del paciente",
    },//DataTypes.STRING,
    {
        key : "patientTypeId",
        type : "select",
        text : "Tipo de Identificacion",
        itemValue : "key",
        itemText : "name", 
        list : [
            { key : "5"/* "registro-civil" */, name : "Registro Civil"},
            { key : "2"/* "tarjeta-id" */ , name : "Tarjeta de identidad"},
            { key : "1"/* "cedula" */ , name : "Cedula de ciudadania"},
            { key : "3", name : "Cédula de extranjería"},
            { key : "4"/* "pasaporte" */ , name : "Pasaporte"},
            { key : "7"/* "adulto-sin-id" */ , name : "Adulto sin identificacion"},
            { key : "8"/* "menor-sin-id" */ , name : "Menor sin identificacion"},
        ]
    },//DataTypes.STRING,
    {
        key : "patientNumberId",
        type : "number",
        text : "Numero de Documento",
    },//DataTypes.STRING,
    {
        key : "patientBirthDate",
        type : "DateAuto",
        text : "Fecha de Nacimiento",
        action: "setDate",
    },//DataTypes.STRING,
    {
        key : "patientAge",
        type : "text",
        text : "Edad",
    },//DataTypes.STRING,
    {
        key : "patientGender",
        type : "select",
        text : "Sexo",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "m", name : "M"},
            { key : "f", name : "F"},
        ]
    },//DataTypes.STRING,
    {
        key : "patientMaritalStatus",
        type : "text",
        text : "Estado Civil",
    },//DataTypes.STRING,
    {
        key : "patientServiceProvider",
        type : "select",
        text : "Eps",
        itemText : "name",
        itemValue : "id",
        global_list : "current-administrator",
    },//DataTypes.STRING,
    {
        key : "patientAddress",
        type : "text",
        text : "Direccion",
    },//DataTypes.STRING,
    {
        key : "patientDistrict",
        type : "text",
        text : "Barrio",
    },//DataTypes.STRING,
    {
        key : "patientCellphone",
        type : "text",
        text : "Telefono Paciente",
    },//DataTypes.STRING,
    {
        key : "patientCompanion",
        type : "text",
        text : "Acompañante",
    },//DataTypes.STRING,
    {
        key : "patientCompanionRelationship",
        type : "text",
        text : "Parentesco",
    },//DataTypes.STRING,
    {
        key : "patientCompanionCellphone",
        type : "text",
        text : "Telefono Acompañante",
    },//DataTypes.STRING,

    {
        key : "transferTypeBasic",
        type : "text",
        text : "Translado Basico",
    },//DataTypes.STRING,
    {
        key : "transferTypeMedicalized",
        type : "text",
        text : "Translado Medicalizado",
    },//DataTypes.STRING,
    {
        key : "accidentDateTime",
        type : "DateAuto",
        text : "Fecha ",
        action : "setDate",  
    },//DataTypes.STRING,
    {
        key : "accidentDateTimeTime",
        type : "time_picker",
        text : "Hora de Accidente",
        action : "setDate",  
    },//DataTypes.STRING,
    {
        key : "originDisplacement",
        type : "text",
        text : "Origen desplazamiento",
    },//DataTypes.STRING,
    {
        key : "originArrivalTime",
        type : "text",
        text : "Tiempo origen de llegada",
    },//DataTypes.STRING,
    {
        key : "destinationDisplacement",
        type : "text",
        text : "Destino Desplazamiento",
    },//DataTypes.STRING,
    {
        key : "destinationArrivalTime",
        type : "time_picker",
        text : "Hora llegada Destino",
    },//DataTypes.STRING,
    {
        key : "serviceTypeDouble",
        type : "text",
        text : "Tipo de servicio Doble",
    },//DataTypes.STRING,
    {
        key : "serviceTypeSimple",
        type : "text",
        text : "Tipo de servicio Simple",
    },//DataTypes.STRING,
    {
        key : "transferReason",
        type : "textarea",
        text : "Motivo de translado",
        cols : 12,
    },//DataTypes.STRING,
    {
        key : "patientStatus",
        type : "textarea",
        text : "Estado del Paciente",
        cols : 12
    },//DataTypes.STRING,
    {
        key : "vitalSignsFc",
        type : "number",
        text : "FC",
    },//DataTypes.STRING,
    {
        key : "vitalSignsFr",
        type : "number",
        text : "FR",
    },//DataTypes.STRING,
    {
        key : "vitalSignsTa",
        type : "text",
        text : "T/A",
    },//DataTypes.STRING,
    {
        key : "vitalSignsSoz",
        type : "text",
        text : "SO2",
    },//DataTypes.STRING,
    {
        key : "vitalSignsGlasglow",
        type : "text",
        text : "Glasglow",
    },//DataTypes.STRING,
    {
        key : "supportsOxygen",
        type : "text",
        text : "Oxigeno",
    },//DataTypes.STRING,
    {
        key : "supportsLev",
        type : "text",
        text : "L.E.V",
    },//DataTypes.STRING,
    {
        key : "supportsPeep",
        type : "text",
        text : "PEEP",
    },//DataTypes.STRING,
    {
        key : "supportsFr",
        type : "text",
        text : "FR",
    },//DataTypes.STRING,
    {
        key : "supportsFioz",
        type : "text",
        text : "FIO2",
    },//DataTypes.STRING,
    {
        key : "background",
        type : "text",
        text : "Antecedentes",
    },//DataTypes.STRING,
    {
        key : "traumaLocation",
        type : "text",
        text : "Marcar Area de localizacion del trauma",
    },//DataTypes.STRING,
    {
        key : "transferEndPatientStatus",
        type : "select",
        text : "Estado del paciente al finalizar tralado",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "estable", name : "Estable" },
            { key : "mejor", name : "Mejor" },
            { key : "descompenso", name : "Descompenso" },
            { key : "fallecio", name : "Fallecio" },
        ]
    },//DataTypes.STRING


]