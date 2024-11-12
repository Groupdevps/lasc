export default [
    //UserId: DataTypes.INTEGER,
    {
        type : "title",
        text : "FORMULARIO UNICO DE RECLAMACION DE GASTOS DE TRANSPORTE Y MOVILIZACION DE VICTIMAS - FURTRAN",
        cols : 12,
    },
    { 
        key : "AttentionId",
        type : "number",
        text : "Numero de Atencion",
    }, //DataTypes.INTEGER,
    { 
        key : "deadline",
        type : "DateAuto",
        text : "Fecha de Entrega",
        action : "setDate",
    }, //DataTypes.STRING,
    { 
        key : "rg",
        type : "select",
        text : "RG",
        itemText : "name",
        itemValue : "key",
        list: [
            { key : "si", name: "Si"},
            { key : "no", name: "No"},
        ]
    }, //DataTypes.STRING,
    { 
        key : "previousFilingNumber",
        type : "text",
        text : "No. Radicado anterior(Marcar RG)",
    }, //DataTypes.STRING,
    { 
        key : "filingNumber",
        type : "text",
        text : "No Radicado",
    }, //DataTypes.STRING,
    {
        type: "title",
        text : "I. DATOS DEL TRANSPORTADOR(Si es persona natural diligenciar los campos referentes a nombre y apellidos)",
        cols : 12,
    },
    { 
        key : "transporterName",
        type : "text",
        text : "Nombre Empresa de Transporte Especial o Reclamante",
    }, //DataTypes.STRING,
    { 
        key : "transporterEnableCode",
        type : "number",
        text : "Codigo de habilitacion Empresa de Transporte Especial",
    }, //DataTypes.STRING,
    { 
        key : "transporterLastName",
        type : "text",
        text : "1er Apellido",
    }, //DataTypes.STRING,
    { 
        key : "transporterSecondSurname",
        type : "text",
        text : "2do Apellido",
    }, //DataTypes.STRING,
    { 
        key : "transporterFirstName",
        type : "text",
        text : "1er Nombre",
    }, //DataTypes.STRING,
    { 
        key : "transporterSecondName",
        type : "text",
        text : "2do Nombre",
    }, //DataTypes.STRING,
    { 
        key : "transporterTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "name",
        itemValue : "key",
        list: [
            { key : "cc", name: "CC"},
            { key : "ce", name: "CE"},
            { key : "pa", name: "PA"},
            { key : "nit", name: "NIT"},
        ]
    }, //DataTypes.STRING,
    { 
        key : "transporterNumberId",
        type : "number",
        text : "Numero de Documento",
    }, //DataTypes.STRING,
    { 
        key : "transporterServiceType",
        type : "select",
        text : "Tipo de Servicio",
        itemText : "name",
        itemValue : "key",
        list: [
            { key : "ambulancia-basica", name: "Ambulancia Basica"},
            { key : "ambulancia-medicada", name: "Ambulancia Medicada"},         
        ]
    }, //DataTypes.STRING,
    { 
        key : "transporterPersonServiceType",
        type : "select",
        text : "Si es persona Natural-tipo Servicio",
        itemText : "name",
        itemValue : "key",
        list: [
            { key : "particular", name: "Particular"},
            { key : "vehiculo-masivo", name: "Vehiculo de transporte masico"},         
            { key : "publico", name: "Publico"},         
            { key : "vehiculo-escolar", name: "Vehiculo escolar"},         
            { key : "oficial", name: "Oficial"},   
            { key : "otro", name: "Otro"},         
            { key : "vehiculo-diplomatico-consular", name: "Publico"},         
        ]
    }, //DataTypes.STRING,
    {
        key : "transporterPersonWhich",
        type : "text",
        text : "Cual (En caso otro)"
    },
    { 
        key : "transporterPlate",
        type : "text",
        text : "En vehiculo con placa No",
    }, //DataTypes.STRING,
    { 
        key : "transporterAddress",
        type : "text",
        text : "Direccion de la empresa o persona que realiza el transporte",
    }, //DataTypes.STRING,
    { 
        key : "transporterPhone",
        type : "number",
        text : "Telefono o celular",
    }, //DataTypes.STRING,
    { 
        key : "transporterStateName",
        type : "text",
        text : "Departamento",
    }, //DataTypes.STRING,
    { 
        key : "transporterStateCode",
        type : "number",
        text : "Codigo Departamento",
    }, //DataTypes.STRING,
    { 
        key : "transporterCityName",
        type : "text",
        text : "Municipio",
    }, //DataTypes.STRING,
    { 
        key : "transporterCityCode",
        type : "number",
        text : "Codigo Municipio",
    }, //DataTypes.STRING,
    {
        type : "title",
        text : "II. RELACION DE VICTIMAS TRANSLADADAS",
        cols : 12,
    },
    /* { 
        key : "transferredVictimsTypeId",
        type : "text",
        text : "",
    }, //DataTypes.STRING,
    { 
        key : "transferredVictimsNumberId",
        type : "text",
        text : "",
    }, //DataTypes.STRING,
    { 
        key : "transferredVictimsFirstName",
        type : "text",
        text : "",
    }, //DataTypes.STRING,
    { 
        key : "transferredVictimsSecondName",
        type : "text",
        text : "",
    }, //DataTypes.STRING,
    { 
        key : "transferredVictimsLastName",
        type : "text",
        text : "",
    }, //DataTypes.STRING,
    { 
        key : "transferredVictimsSecondSurname",
        type : "text",
        text : "",
    }, //DataTypes.STRING, */
    { 
        key : "transferredVictimsEventType",
        type : "select",
        text : "Tipo de evento que sucita la movilizacion",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "accidente-transito", name : "Accidente de transito"},
            { key : "evento-catastrofico", name : "Evento catastrofico"},
            { key : "evento-terrorista", name : "Evento terrorista"},
            { key : "otro", name : "Otro"},
        ]
    }, //DataTypes.STRING,
    { 
        key : "transferredVictimsEventOthers",
        type : "text",
        text : "Descripcion del otro evento",
    }, //DataTypes.STRING,
    {
        type : "title",
        text : "III. LUGAR EN EL QUE SE RECOGE LA VICTIMA O VICTIMAS",
        cols : 12,
    },
    { 
        key : "pickUpPlaceAddress",
        type : "text",
        text : "Direccion",
    }, //DataTypes.STRING,
    { 
        key : "pickUpPlaceStateName",
        type : "text",
        text : "Departamento",
    }, //DataTypes.STRING,
    { 
        key : "pickUpPlaceStateCode",
        type : "number",
        text : "Codigo Departamento",
    }, //DataTypes.STRING,
    { 
        key : "pickUpPlaceCityName",
        type : "text",
        text : "Municipio",
    }, //DataTypes.STRING,
    { 
        key : "pickUpPlaceCityCode",
        type : "number",
        text : "Codigo Municipio",
    }, //DataTypes.STRING,
    { 
        key : "pickUpPlaceZone",
        type : "select",
        text : "Zona",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "urban", name : "U"},
            { key : "rural", name : "R"},
        ]
    }, //DataTypes.STRING,
    {
        type : "title",
        text : "IV. CERTIFICACION DE TRANSLADO DE VICTIMAS",
        cols : 12,
    },
    { 
        key : "certificationDate",
        type : "DateAuto",
        text : "El dia",
        action : "setDate",
    }, //DataTypes.STRING,
    { 
        key : "certificationTime",
        type : "time_picker",
        text : "A las",
        action : "setDate",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterName",
        type : "text",
        text : "Nombre IPS que atendio la victima",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterNit",
        type : "text",
        text : "NIT",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterCode",
        type : "number",
        text : "Codigo IPS",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterAddress",
        type : "text",
        text : "Direccion",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterStateName",
        type : "text",
        text : "Departamento",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterStateCode",
        type : "number",
        text : "Codigo Departamento",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterCityName",
        type : "text",
        text : "Municipio",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterCityCode",
        type : "number",
        text : "Codigo de Municipio",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterPhone",
        type : "number",
        text : "Telefono",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterManagerName",
        type : "text",
        text : "Nombre del representante legar o persona responsable para tramite de admisiones de la IPS",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterManagerSignature",
        type : "select",
        text : "Firma del representante legar o persona responsable  para tramite de admisiones de la IPS",
        itemText : "name",
        itemValue : "id",
        list : "listDigitalSignature",
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterManagerTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "description",
        itemValue : "name",
        global_list : "typeIds"
    }, //DataTypes.STRING,
    { 
        key : "certificationCenterManagerNumberId",
        type : "number",
        text : "Numero de Documento",
    }, //DataTypes.STRING,
    { 
        key : "certificationTransporterSignature",
        type : "text",
        text : "Firma del representante legal de la empres transportadora o de la persona natural que realizo el transporte",
    }, //DataTypes.STRING
]