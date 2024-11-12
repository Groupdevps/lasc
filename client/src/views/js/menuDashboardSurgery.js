export default[
     {
        key : 'medical_notes',
        title : "Evolucion de Cirugia",
        route : "MedicalNotesSurgery",
        icon : "mdi-note"       
    },

	 // {
    //     key      : 'service',
    //     component    : "services",
    //     text         : 'service',
    //     title       : "Servicio",
    //     route       : "Services", 
    //     icon :  "mdi-circle-multiple-outline",
    // },
/*  {
        key : 'clinic_history',
        component : "clinic_history",
        text : 'clinicHistory',
    },*/
    // {
    //     key : 'emergency_medical_history',
    //     component : "emergency_medical_history",
    //     text : 'clinicHistory',
    //     title : "Historia clinica",
    //     route : "EmergencyMedicalHistorySurgery",
    //     icon : "mdi-history"        
    // },
    // // menu main
    {
        key : 'medical_orders',
        // component : "medical_orders",
        title : 'Ordenes Medicas',
        isMenu : true,
        // icon : "mdi-playlist-edit",
        subMenus : [
            {
                key : 'outpatient_orders',
                component : "outpatient_orders",
                title : 'interconsulta',
                route : "OutpatientOrdersSurgery",
            },
            {
                key : 'laboratory_order',
                component : "laboratory_order",
                title : 'laboratorio',
                route : "LaboratoryOrderSurgery",
            },
            {
                key : 'diagnostic_help',
                component : "diagnostic_help",
                title : 'Ayuda diagnostica',
                route : "DiagnosticHelpSurgery",
            },
            {
                key : 'medical_formulas',
                component : "medical_formulas",
                title : 'Medicamentos',
                route : "MedicalFormulasSurgery",
            },
    //         {
    //             key : 'OrderSurgery',
    //             component : "OrderSurgery",
    //             title : 'Cirugia',
    //             route : "OrderSurgerySurgery",
    //         },
        ],
    },

    // {
    //     key : 'medical_notes',
    //     title : "Evolucion",
    //     route : "MedicalNotesSurgery",
    //     icon : "mdi-note"       
    // },
    // {
    //     key : 'recommendations',
    //     component : "Recommendations",
    //     text : 'recomendations',
    //     title       : "Recomendaciones",
    //     route       : "RecommendationsSurgery", 
    //     icon : "mdi-receipt"
    // },
   
    // {
    //     key : 'epicrisis',
    //     component : "epicrisis",
    //     text : 'epicrisis',
    //     title       : "Epicrisis",
    //     route       : "EpicrisisSurgery", 
    //     icon : "mdi-note-plus",
    // },
    // 
    // {
    //     key : 'remission',
    //     component : "discharge",
    //     text : 'Remision',
    //     title       : "Remision",
    //     route       : "Remission", 
    //     icon : "mdi-note"
    // },
    // incapacidad
    // {
    //     key : 'inability',
    //     component : "inability",
    //     text : 'incapacidad',
    //     title       : "Incapacidad",
    //     route       : "InabilitySurgery", 
    //     icon : "mdi-note"
    // },
    // {
    //     key : 'stay_form',
    //     title : "Formulario de Estancia",
    //     route : "StayFormHospitalization",
    //     icon : "mdi-note"       
    // },
    // {
    //     key : 'discharge',
    //     component : "discharge",
    //     text : 'discharge',
    //     title       : "Egreso",
    //     route       : "DischargeHospitalization", 
    //     icon : "mdi-note-text-outline"
    // },
    {
        key         : 'SurgeryProgramming',
        title       : "Programacion de Cirugia",
        route       : "SurgeryProgramming", 
        icon        : "mdi-note"
    },
    {
        key         : 'SurgeryDescription',
        title       : "Descripcion de Cirugia",
        route       : "SurgeryDescription", 
        icon        : "mdi-note"
    },
    {
        key         : 'Recovery',
        title       : "Recuperacion",
        route       : "RecoverySurgery", 
        icon        : "mdi-note"
    },
    {
        key         : 'OsteosynthesisMaterials',
        title       : "Materiales Osteosintesis",
        route       : "OsteosynthesisMaterialsSurgery", 
        icon        : "mdi-note"
    },
    
    {
        key         : 'AnestheticRecords',
        title       : "Registros Anestesicos",
        route       : "AnestheticRecordsSurgery", 
        icon        : "mdi-note"
    },

]