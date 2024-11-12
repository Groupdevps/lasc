export default [
    {
        key : "AttentionId",
        type : "number", // string
        text : "Numbero de Atencion",  
    },

    // Furip = {
// UserId: DataTypes.INTEGER,
    {
        type : "title",
        text : "PARTE A",
        cols : 12, 
    },
    {
        type : "title",
        text : "PRESTADORES DE SERVICIOS DE SALUD - FURIPS",
        cols : 12, 
    },
    //partA
    {
        key : "dateFiled",
        type: "DateAuto",
        action: "setDate",        
        text : "Fecha Radicacion",
        action: "setDate",

    }, //DataTypes.STRING,
    {
        key : "rg",
        type: "select",
        text : "RG",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "si", name :"Si"},
            { key : "no", name :"No"},
        ]
    }, //DataTypes.STRING,
    {
        key : "previousFiledNumber",
        type: "number",
        text : "Numero Radicacion Anterior",
    }, //DataTypes.STRING,
    {
        key : "filedNumber",
        type: "number",
        text : "Numero Radicado",
    }, //DataTypes.STRING,
    {
        key : "billNumber",
        type: "number",
        text : "Numero Factura",
    }, //DataTypes.STRING,
    //provider
    {
        type: "title",
        text : "I. DATOS DE LA INSTITUCIÓN PRESTADORA DE SERVICIOS DE SALUD",
        cols : 12,
    },
    {
        key : "providerBusinessName",
        type: "text",
        text : "Razon Social Proveedor",
    }, //DataTypes.STRING,
    {
        key : "providerEnablementCode",
        type: "number",
        text : "Codigo Habilitacion",
    }, //DataTypes.STRING,
    {
        key : "providerNit",
        type: "number",
        text : "NIT Prestador",
    }, //DataTypes.STRING,
    //victim
    {
        type : "title",
        text : "II. DATOS DE LA VICTIMA DEL EVENTO CATASTRÓFICO O ACCIDENTE DE TRANSITO",
        cols : 12,
    },
    {
        key : "victimLastName",
        type: "text",
        text : "1er Apellido Victima",
    }, //DataTypes.STRING,
    {
        key : "victimSecondSurname",
        type: "text",
        text : "2do Apellido Victima",
    }, //DataTypes.STRING,
    {
        key : "victimFirstName",
        type: "text",
        text : "1er Nombre Victima",
    }, //DataTypes.STRING,
    {
        key : "victimSecondName",
        type: "text",
        text : "2do. Nombre Victima",
    }, //DataTypes.STRING,
    {
        key : "victimTypeId",
        type: "select",
        text : "Tipo de Documento Victima",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "cc", name :"CC"},
            { key : "ce", name :"CE"},
            { key : "pa", name :"PA"},
            { key : "ti", name :"TI"},
            { key : "rc", name :"RC"},
            { key : "as", name :"AS"},
            { key : "ms", name :"MS"},
            { key : "cd", name :"CD"},
        ]
        
    }, //DataTypes.STRING,
    {
        key : "victimNumberId",
        type: "number",
        text : "Numero Documento Victima",
    }, //DataTypes.STRING,
    {
        key : "victimBirthDate",
        type: "DateAuto",
        action: "setDate",        
        text : "Fecha de Nacimiento",
    }, //DataTypes.STRING,
    {
        key : "victimGender",
        type: "select",
        text : "Sexo",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "f", name :"F"},
            { key : "m", name :"M"},
        ]
    }, //DataTypes.STRING,
    {
        key : "victimAddress",
        type: "text",
        text : "Direccion Residencia",
    }, //DataTypes.STRING,
    {
        key : "victimState",
        type: "text",
        text : "Departamento",
    }, //DataTypes.STRING,
    {
        key : "victimStateCode",
        type: "number",
        text : "Codigo Departamento",
    }, //DataTypes.STRING,
    {
        key : "victimCity",
        type: "text",
        text : "Municipio",
    }, //DataTypes.STRING,
    {
        key : "victimCityCode",
        type: "number",
        text : "Codigo Municipio",
    }, //DataTypes.STRING,
    {
        key : "victimPhone",
        type: "number",
        text : "Telefono",
    }, //DataTypes.STRING,
    {
        key : "victimConditionInjured",
        type: "select",
        text : "Codicion del Accidentado",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "conductor", name :"Conductor"},
            { key : "peaton", name :"Peaton"},
            { key : "ocupante", name :"Ocupante"},
            { key : "ciclista", name :"Ciclista"},            
        ]
    }, //DataTypes.STRING,
    //site of accident
    {
        type : "title",
        text : "III. DATOS DEL SITIO DONDE OCURRIÓ EL EVENTO CATASTRÓFICO O EL ACCIDENTE DE TRANSITO",
        cols : 12,
    },
    {
        type : "title",
        text : "Datos del sitio donde ocurrio el Evento Catastrofico",
    },
    {
        key:"siteAccidentNatureOfEvent",
        type : "select",
        text : "Naturaleza del evento",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "accidente-transito", name :"Accidente de Transito"},
            { key : "sismo", name :"Sismo"},
            { key : "inundaciones", name :"Inundaciones"},
            { key : "rayo", name :"Rayo"},
            { key : "explosion", name :"Explosion"},
            { key : "incendio", name :"Incendio"},
            { key : "maremoto", name :"Maremoto"},
            { key : "avalancha", name :"Avalancha"},
            { key : "vendaval", name :"Vendaval"},
            { key : "masacre", name :"Masacre"},
            { key : "ataque-municipios", name :"Ataque a Municipios"},
            { key : "erupciones-volcanicas", name :"Erupciones Volcanicas"},
            { key : "deslizamiento-tierra", name :"Deslizamiento de Tierra"},
            { key : "tornado", name :"Tornado"},
            { key : "mina-antipersonal", name :"Mina Antipersonal"},
            { key : "huracan", name :"Huracan"},
            { key : "incendio-natural", name :"Incendio Natural"},
            { key : "combate", name :"Combate"},
            { key : "otro", name :"Otro"},

        ]
    }, //DataTypes.STRING,
    {
        key:"siteAccidentWhichOther",
        type : "text",
        text : "Cual?",
    }, //DataTypes.STRING,
    {
        key:"siteAccidentOccurrenceAddress",
        type : "text",
        text : "Direccion de la ocurrencia",
    }, //DataTypes.STRING,
    {
        key:"siteAccidentAccidentDate",
        type : "DateAuto",
        action: "setDate",        
        text : "Fecha Event/Accidente",
    }, //DataTypes.STRING,
    {
        key:"siteAccidentAccidentTime",
        type : "time_picker",
        action: "setDate",
        text : "Hora",
    }, //DataTypes.STRING,
    {
        key:"siteAccidentState",
        type : "text",
        text : "Departamento",
    }, //DataTypes.STRING,
    {
        key:"siteAccidentStateCode",
        type : "text",
        text : "Codigo Departamento",
    }, //DataTypes.STRING,
    {
        key:"siteAccidentCity",
        type : "text",
        text : "Municipio",
    }, //DataTypes.STRING,
    {
        key:"siteAccidentCityCode",
        type : "text",
        text : "Codigo de Municipio",
    }, //DataTypes.STRING,
    {
        key:"siteAccidentZone",
        type : "select",
        text : "Zona",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "urbana", name :"U"},
            { key : "rural", name :"R"},
        ]
    }, //DataTypes.STRING,
    {
        key:"siteAccidentAccidentDescription",
        type : "text",
        text : "Descripcion breve  del Evento/Acciendente (pricipales caracteristicas)",
    }, //DataTypes.STRING,

    //vehicle of accident
    {
        type : "title",
        text : "IV. DATOS DEL VEHICULO DE ACCIDENTE DE TRANSITO",
        cols : 12,
    },
    {
        key:"vehicleAccidentVehicleType",
        type : "select",
        text : "Tipo de Vehiculo",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "asegurado", name :"Asegurado"},
            { key : "no-asegurado", name :"No Asegurado"},
            { key : "vehiculo-fantasma", name :"Vehiculo fantasma"},
            { key : "poliza-falsa", name :"Poliza Falsa"},
            { key : "vehiculo-fuga", name :"Vehiculo en fuga"},
        ]
        
    }, //DataTypes.STRING,
    {
        key:"vehicleAccidentBrand",
        type : "text",
        text : "Marca",
    }, //DataTypes.STRING,
    {
        key:"vehicleAccidentPlate",
        type : "text",
        text : "Placa",
    }, //DataTypes.STRING,
    {
        key:"vehicleAccidentServiceType",
        type : "select",
        text : "Tipo de servicio",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "particular", name :"Particular"},
            { key : "publico", name :"Publico"},
            { key : "oficial", name :"Oficial"},
            { key : "vehiculo-emergencia", name :"Vehiculo de emergencia"},
            { key : "vehiculo-diplomatico-o-consular", name :"Vehiculo de servicio"},
            { key : "vehiculo-transporte-masivo", name :"Vehiculo de transporte masivo"},
            { key : "vehiculo-escolar", name :"Vehiculo escolar"},
        ]
    }, //DataTypes.STRING,
    {
        key:"vehicleAccidentInsuranceCode",
        type : "number",
        text : "Codigo de la aseguradora",
    }, //DataTypes.STRING,
    {
        key:"vehicleAccidentPolicyNumber",
        type : "number",
        text : "Numero de la Poliza",
    }, //DataTypes.STRING,
    {
        key:"vehicleAccidentValidSince",
        type : "DateAuto",
        action: "setDate",        
        text : "Vigencia desde",
    }, //DataTypes.STRING,
    {
        key:"vehicleAccidentValidUntil",
        type : "DateAuto",
        action: "setDate",        
        text : "Hasta",
    }, //DataTypes.STRING,
    {
        key:"vehicleAccidentAuthorityIntervention",
        type : "select",
        text : "Intervencion de autoridad",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "si", name :"Si"},
            { key : "no", name :"No"},
        ]
    }, //DataTypes.STRING,
    {
        key:"vehicleAccidentPolicySurplusCharge",
        type : "select",
        text : "Cobro Excedente Poliza",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "si", name :"Si"},
            { key : "no", name :"No"},
        ]
    }, //DataTypes.STRING,

    {
        type : "title",
        text  : "V. DATOS DEL PROPIETARIO DEL VEHÍCULO",
        cols : 12
    },
    //vehicle owner
    { 
        key : "vehicleOwnerLastName",
        type : "text",
        text : "1er Apellido o Razon Social",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerSecondSurname",
        type : "text",
        text : "2do Apellido",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerFirstName",
        type : "text",
        text : "1er Nombre",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerSecondName",
        type : "text",
        text : "2do Nombre",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "cc", name :"CC"},
            { key : "ce", name :"CE"},
            { key : "pa", name :"PA"},
            { key : "ti", name :"TI"},
            { key : "rc", name :"RC"},
            { key : "cd", name :"CD"},
        ]
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerNumberId",
        type : "number",
        text : "Numero de Documento",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerAddress",
        type : "text",
        text : "Direccion de Residencia",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerState",
        type : "text",
        text : "Departamento",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerStateCode",
        type : "text",
        text : "Codigo departamento",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerCity",
        type : "text",
        text : "Municipio",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerCityCode",
        type : "text",
        text : "Codigo de Municipio",
    },
    // DataTypes.STRING,
    { 
        key : "vehicleOwnerPhone",
        type : "number",
        text : "Telefono",
    },
    // DataTypes.STRING,
    
    { 
        key : "partATotalFolio",
        type : "text",
        text : "Total Folios",
    }, 
    //DataTypes.STRING,

        //PartB
    {
        type : "title",
        text : "Parte B",
        cols : 12
    },
    // Driver Vehicle
    {
        type : "title",
        text : "VI. DATOS DEL CONDUCTOR DEL VEHÍCULO INVOLUCRADO EN EL ACCIDENTE DE TRANSITO",
        cols : 12,
    },
    { 
        key: "driverVehicleLastName",
        type : "text",
        text : "1er Apellido",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleSecondSurname",
        type : "text",
        text : "2do Apellido",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleFirstName",
        type : "text",
        text : "1er Nombre",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleSecondName",
        type : "text",
        text : "2do Nombre",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "cc", name :"CC"},
            { key : "ce", name :"CE"},
            { key : "pa", name :"PA"},
            { key : "ti", name :"TI"},
            { key : "rc", name :"RC"},
            { key : "as", name :"AS"},
            { key : "cd", name :"CD"},
        ]
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleNumberId",
        type : "number",
        text : "Numero de Documento",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleAddress",
        type : "text",
        text : "Direccion de Residencia",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleState",
        type : "text",
        text : "Departamento",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleStateCode",
        type : "text",
        text : "Codigo de Departamento",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleCity",
        type : "text",
        text : "Municipio Residencia",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehicleCityCode",
        type : "text",
        text : "Codigo Municipio",
    }, 
    //DataTypes.STRING,
    { 
        key: "driverVehiclePhone",
        type : "number",
        text : "Telefono",
    }, 
    //DataTypes.STRING,
    // Remision
    {
        type : "title",
        text : "VII. DATOS DE REMISION",
        cols : 12,
    },
    {
        key : "referralType",
        type : "select",
        text : "Tipo de Refencia",
        itemText : "name",
        itemValue : "key",
        list : [
            { key  :"remision", name : "Remision"},
            { key  :"orden-servicio", name : "Orden de Servicio"},
        ]
    },// DataTypes.STRING,
    {
        key : "referralDate",
        type : "DateAuto",
        action: "setDate",        
        text : "Fecha remision",
    },// DataTypes.STRING,
    {
        key : "referralTime",
        type : "time_picker",
        action: "setDate",
        text : "Hora remision",
    },// DataTypes.STRING,
    {
        key : "referralProviderName",
        type : "text",
        text : "Prestador que remite",
    },// DataTypes.STRING,
    {
        key : "referralProviderInscriptionCode",
        type : "number",
        text : "Codigo de inscripcion",
    },// DataTypes.STRING,
    {
        key : "referralProviderProfessional",
        type : "text",
        text : "Profesional que remite",
    },// DataTypes.STRING,
    {
        key : "referralProviderProfessionalPosition",
        type : "text",
        text : "Cargo profesional",
    },// DataTypes.STRING,
    {
        key : "acceptanceDate",
        type : "DateAuto",
        action: "setDate",        
        text : "Fecha aceptacion",
    },// DataTypes.STRING,
    {
        key : "acceptanceTime",
        type : "time_picker",
        action: "setDate",        
        text : "Hora aceptacion",
    },// DataTypes.STRING,
    {
        key : "acceptanceProviderName",
        type : "text",
        text : "Prestador que recibe",
    },// DataTypes.STRING,
    {
        key : "acceptanceProviderInscriptionCode",
        type : "number",
        text : "Codigo de inscripcion",
    },// DataTypes.STRING,
    {
        key : "acceptanceProviderProfessional",
        type : "text",
        text : "Professional que recibe",
    },// DataTypes.STRING,
    {
        key : "acceptanceProviderProfessionalPosition",
        type : "text",
        text : "Cargo profesional",
    },// DataTypes.STRING,

    // Protection Mobilization Victim
    {
        type : "title",
        text : "VIII. AMPARO DE TRANSPORTE Y MOVILIZACION DE LA VICTIMA",
        cols : 12
    },
    {
        key: "protectionMobilizationVictimPlate",
        type : "text",
        text : "Placa No.",
    },
     //DataTypes.STRING,
    {
        key: "protectionMobilizationVictimTransportVictimFrom",
        type : "text",
        text : "Transporto la victima desde",
    },
     //DataTypes.STRING,
    {
        key: "protectionMobilizationVictimTransportVictimSince",
        type : "text",
        text : "Hasta",
    },
     //DataTypes.STRING,
    {
        key: "protectionMobilizationVictimTransportationType",
        type : "select",
        text : "Tipo de Transporte",
        itemText : "name",
        itemValue : "key",
        list : [
            { key : "ambulancia-basica", name : "Ambulancia Basica"},
            { key : "ambulancia-medicada", name : "Ambulancia Medicada"},
        ]
    },
     //DataTypes.STRING,
    {
        key: "protectionMobilizationVictimPlace",
        type : "select",
        text : "Lugar donde recoge la Victima",
        itemText : "name",
        itemValue : "key",
        list : [
            { key: "urban", name: "U"},
            { key: "rural", name: "R"},
        ]
    },
     //DataTypes.STRING,

    // Certificate Medical Care Victim
    {
        type : "title",
        text : "IX. CERTIFICADO DE LA ATENCIÓN MEDICA DELA VICTIMA COMO PRUEBA DEL ACCIDENTE O EVENTO",
        cols : 12,
    },
    {
        key: "certificateMedicalCareVictimEntryDate",
        type : "DateAuto",
        action: "setDate",        
        text : "Fecha de Ingreso",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimEntryTime",
        type : "time_picker",
        action: "setDate",
        text : "a las",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimDiagnosesPrincipalCIE10",
        type : "text",
        text : "Codigo Diagnostico principal de Ingreso",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimDiagnosesRelated1CIE10",
        type : "text",
        text : "Otro código Diagnóstico principal de Ingreso",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimDiagnosesRelated2CIE10",
        type : "text",
        text : "Otro código Diagnóstico principal de Ingreso",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimEgressDate",
        type : "DateAuto",
        action: "setDate",        
        text : "Fecha de egreso",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimEgressTime",
        type : "time_picker",
        action: "setDate",
        text : "a las",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimEgressDiagnosesPrincipalCIE10",
        type : "text",
        text : "Código Diagnóstico principal de Egreso",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimEgressDiagnosesRelated1CIE10",
        type : "text",
        text : "Otro código Diagnóstico principal de Egreso",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimEgressDiagnosesRelated2CIE10",
        type : "text",
        text : "Otro código Diagnóstico principal de Egreso",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimTreatingProfessionalLastName",
        type : "text",
        text : "1er Apellido del Medico o Profesional",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimTreatingProfessionalSecondSurname",
        type : "text",
        text : "2do Apellido del Medico o Profesional",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimTreatingProfessionalFirstName",
        type : "text",
        text : "1er Nombre del Medico o Profesional",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimTreatingProfessionalSecondName",
        type : "text",
        text : "2do Nombre del Medico o Profesional",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimTreatingProfessionalTypeId",
        type : "select",
        text : "Tipo de Documento",
        itemText : "name",
        itemValue : "key",
        list: [
            { key : "cc", name: "CC"},
            { key : "ce", name: "CE"},
            { key : "pa", name: "PA"},            
        ]
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimTreatingProfessionalNumberId",
        type : "number",
        text : "Numero de Documento",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimTreatingProfessionalMedRecord",
        type : "text",
        text : "Numero de registro medico",
    }, // DataTypes.STRING,
    {
        type : "title",
        text : "X. AMPAROS QUE RECLAMA",
        cols : 12,
    },
    {
        key: "certificateMedicalCareVictimSurgicalMedicalExpensesBilled",
        type : "number",
        text : "Total Gastos medicos quirurgicos",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimSurgicalMedicalExpensesFosyga",
        type : "number",
        text : "Valor reclamado Gastos medicos quirurgicos",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimMobilizationExpensesBilled",
        type : "number",
        text : "Total Gastos de transporte y movilizacion de la victima",
    }, // DataTypes.STRING,
    {
        key: "certificateMedicalCareVictimMobilizationExpensesFosyga",
        type : "number",
        text : "Valor reclamado Gastos de transporte y movilizacion de la victima",
    }, // DataTypes.STRING,
    {
        type : "title",
        text : "XI. AMPAROS QUE RECLAMA",
        cols : 12,
    },
    // Provider Health
    { 
        key :"providerHealthName",
        type : "text",
        text : "Nombre",
    },// DataTypes.STRING,
    { 
        key :"providerHealthSignature",
        type : "select",
        text : "FIRMA DEL REPRESENTANTE LEGAL O GERENTE",
        list : "listDigitalSignatures"
    },// DataTypes.STRING,
  
]