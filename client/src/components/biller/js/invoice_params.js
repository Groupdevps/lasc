export default  [
    {
        type : "title",
        text : "info_patient",
        cols : 12,
        
    },
    
    
    {
        cols : 2,
        key : "patientTypeId", // numberId
        type : "component", //autocomplete
        text : "document_type",                    
        global_list : "typeIds",
        itemValue : "name",
        itemText  : "name"
    },
    {
        cols : 2,
        key : "patientNumberId", // numberId
        type : "text",
        text : "Documento",                    
    },
    {
        cols : 2,
        key : "patientFullName",// fullName
        type : "text",
        text : "Nombre paciente",                    
    },
    {
        cols : 2,
        key : "patientAddress",
        type : "text",
        text : "Direccion",                    
    },
    {
        cols : 2,
        key : "patientCity",
        type : "text",
        text : "Ciudad",                    
    },
    {
        cols : 2,
        key : "patientPhone",
        type : "text",
        text : "Telefono",                    
    },
    
   
    /* {
        cols : 2,
        key : "hour",
        type : "text",
        text : "Hora",                    
    }, */
    {
        type : "title",
        text : "insurance_information",
        cols : 12,
        
    },
    {
        cols : 2,
        key : "administrator", // 
        // keySet : "payerName",
        type : "autocomplete",
        text : "EPS",                    
        global_list : "current-administrator",
        itemValue : "name",
        itemText : "name",
        action : "setEps",
        returnObject : true,
    },
    {
        cols : 2,
        key : "payerNit",
        text : "NIT",
        type : "text",

    },
    {
        cols : 2,
        key : "payerAddress",
        type : "text",
        text : "Direccion",
    },
    {
        cols : 2,
        type : "text",
        key : "payerPhone",
        text : "Telefono",
    },
    {
        cols : 2,
        type : "text",
        key : "payerCity",
        text : "Ciudad",
    },
    {
        cols : 2,
        type : "component",
        key : "Agreement",
        text : "Convenio",
    },
    {
        type : "title",
        text : "service_and_billing_information",
        cols : 12,
        
    },
    {
        cols : 2,
        type : "number",
        key  : "AttentionId",
        text : "Numero Atencion",                       
        isDisabled : true,
    },
    {
        cols : 2,
        type : "number",
        key  : "CAU",
        text : "Numero Authorizacion",                       
        isDisabled : false,
    },
    {
        cols : 2,
        key : "serviceType", // service
        type : "text",
        text : "Servicio",                    
    },


    {
        cols : 2,
        key : "entryDate", // assignedDate
        type : "DateAuto",
        text : "dateAdmission",                    
    },
    {
        cols : 2,
        key : "billExpeditionDate", // service
        type : "DateAuto",
        text : "invoice_issue_date",                    
    },
    {
        cols : 2,
        key : "billDueDate", // service
        type : "DateAuto",
        text : "invoice_due_date"                    
    },
    {
        cols : 2,
        key : "billNumber", // service
        type : "number",
        text : "Numero de Factura",                    
        isDisabled : true,
    },
    // {
    //     cols : 3,
    //     key : "DigitalSignatureId", // service
    //     type : "img",
    //     text : "Firma",      
    // }
    {
        type : "title",
        text : "filing_information",
        cols : 12,
    },
    {
        cols : 2,
        key : "filing", 
        type : "text",
        text : "Radicado", //filing                    
    },
    {
        cols : 2,
        key : "filingDate",
        type : "DateAuto",
        text : "filingDate"                    
    },
    {
        cols : 2,
        key : "filingHour",
        type : "time_picker",
        text : "filingHour",
        placeholder  : "Hora Radicado",              
    },

]