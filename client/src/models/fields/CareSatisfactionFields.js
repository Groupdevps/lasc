export default  [
    {
        type : "title",
        text : "COMPROBANTE DE SATISFACCIÓN DE ATENCIÓN",
        cols : 12, 
    },
    {
        key:"AttentionId",
        type : "number",
        text : "Numero de Atencion",
    }, //DataTypes.INTEGER,
    // {
    //     key:"UserId",
    //     type : "text",
    //     text : "",
    // }, //DataTypes.INTEGER,
    //datos autocompletar
    {
        key:"patientFullName",
        type : "text",
        text : "Nombre de paciente",
    }, //DataTypes.STRING,
    {
        key:"admissionNumber",
        type : "number",
        text : "Numero de Ingreso",
    }, //DataTypes.STRING,
    {
        key:"epr",
        type : "text",
        text : "Entidad Responsable del pago - EPR",
    }, //DataTypes.STRING,
    {
        key:"admissionDate",
        type : "DateAuto",
        text : "Fecha del Ingreso",
        action : "setDate",
    }, //DataTypes.STRING,
    {
        key:"departureDate",
        type : "text",
        text : "Fecha de Salida",
        action : "setDate",

    }, //DataTypes.STRING,
    //firma de paciente manual (no requerido)
    // {
    //     key:"signature",
    //     type : "text",
    //     text : "",
    // }, //DataTypes.STRING,
    // {
    //     key:"fingerprint",
    //     type : "text",
    //     text : "",
    // }, //DataTypes.STRING,
    // {
    //     key:"numberId",
    //     type : "text",
    //     text : "",
    // }, //DataTypes.STRING
]