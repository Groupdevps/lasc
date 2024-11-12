export default [
    // {
    //     key 		: 'service',
    //     component 	: "services",
    //     text 		: 'service',
    //     title       : "Servicio",
    //     route       : "Services", 
    //     icon :  "mdi-circle-multiple-outline",
    // },
/*	{
        key : 'clinic_history',
        component : "clinic_history",
        text : 'clinicHistory',
    },*/
    {
        key : 'EmergencyMedicalHistory',
        component : "emergency_medical_history",
        text : 'clinicHistory',
        title : "Historia clinica Em.",
        route : "EmergencyMedicalHistory",
        icon : "mdi-history"		
    },
    // menu main
    {
        key : 'medical_orders',
        // component : "medical_orders",
        title : 'Ordenes',
        isMenu : true,
        icon : "mdi-playlist-edit",
        subMenus : [
            {
                key : 'MedicalFormulas',
                component : "medical_formulas",
                title : 'Formulas',
                route : "MedicalFormulas",
            },
            {
                key : 'LaboratoryOrder',
                component : "laboratory_order",
                title : 'laboratorio',
                route : "LaboratoryOrder",
            },
            {
                key : 'OutpatientOrders',
                component : "outpatient_orders",
                title : 'interconsulta',
                route : "OutpatientOrders",
            },
            {
                key : 'DiagnosticHelp',
                component : "diagnostic_help",
                title : 'Ayuda diagnostica',
                route : "DiagnosticHelp",
            },
            {
                key : 'Remission',
                component : "RemissionComponent",
                title : 'Remision',
                route : "Remission",
            },
            {
                key : 'OrderSurgery',
                component : "OrderSurgery",
                title : 'Cirugia',
                route : "OrderSurgery",
            },
            {
                key : 'NonSurgicalProcedures',
                component : "NonSurgicalProcedures",
                title : 'Procedimiento No Quirurgico',
                route : "NonSurgicalProcedures",
            },
            
        ],
    },
    // sub menu
    // {
    //     key : 'laboratory_order',
    //     component : "laboratory_order",
    //     isSubMenu : true,
    //     // text : 'Orden laboratorio',
    // },
    // {
    //     key : 'outpatient_orders',
    //     component : "outpatient_orders",
    //     isSubMenu : true,
    //     // text : 'Ordenes ambulatorias',
    // },
    // {
    //     key : 'diagnostic_help',
    //     component : "diagnostic_help",
    //     isSubMenu : true,
    //     // text : 'Ayuda diagnostica',
    // },
    // {
    //     key : 'medical_formulas',
    //     component : "medical_formulas",
    //     isSubMenu : true,
    //     // text : 'Formulas medicas',
    // },
    // fin orders
    {
        key : 'medical_evolution', // after of re-valoration
        component : "notas",
        text : 'EvolutionNotes',
        title       : "Evolucion",
        route       : "MedicalEvolution",
        icon : "mdi-note", 
    },
    {
        key : 'medical_notes',
        component : "notas",
        text : 'EvolutionNotes',
        title       : "Notas Medicas",
        route       : "MedicalNotes",
        icon : "mdi-note", 
    },
    {
        key : 'recommendations',
        component : "Recommendations",
        text : 'recomendations',
        title       : "Recomendaciones",
        route       : "Recommendations", 
        icon : "mdi-receipt"
    },
    {
        key : 'epicrisis',
        component : "epicrisis",
        text : 'epicrisis',
        title       : "Epicrisis",
        route       : "Epicrisis", 
        icon : "mdi-note-plus",
    },
    // {
    //     key : 'discharge',
    //     component : "discharge",
    //     text : 'discharge',
    //     title       : "Egreso",
    //     route       : "Discharge", 
    //     icon : "mdi-note-text-outline"
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
    {
        key : 'inability',
        component : "inability",
        text : 'incapacidad',
        title       : "Incapacidad",
        route       : "Inability", 
        icon : "mdi-note"
    },
    
    
    
    /* {
        key : 'medical_history',
        component : "medical_history",
        text : 'Historial',
    }, */
    
]