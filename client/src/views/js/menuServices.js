export default [
	{
        key : "urgency",
        text : "Urgencia",
        isAble : true,
        image : "/img/urgency2.png",
        icon : "mdi-car-emergency",
        color           : "white",  
        cols : "4",
        modules : [
            "admissions", "triage", "nursing", "medico", "laboratory", "diagnostic_aid", "pharmacy", "billing", "management", 
            "audits", "system", "hospitalization", "surgery"       
        ],
        actions 		: [
			{
				text 		: "select",
				color 		: "success",
				action 		: "selectMenu",
				key         : "urgency",
			},
		]
    },
    {
        key : "externalConsultation",
        text : "Consulta externa",
        isAble : true,
        image : "/img/consulta_externa.png",
        icon : "mdi-hospital-box-outline",
        color           : "white",  
        cols : "4",
        modules : [
            "admissions", "PYPprograms",  "generalMedicine", "medico" ,"odontology", "nursing", "specialists", 
            "laboratory", "diagnostic_aid", "pharmacy", "billing", "cash-treasury",  "management", 
             
        ],
        actions 		: [
			{
				text 		: "select",
				color 		: "success",
				action 		: "selectMenu",
				key         : "externalConsultation",
			},
		]
    },
    // {
    //     key : "hospitalization",
    //     text : "Hospitalizacion",
    //     isAble : true,
    //     image : "/img/urgency2.png",
    //     icon : "mdi-bed-outline",
    //     color           : "white",  
    //     cols : "4",
    //     modules : [
    //         "admissions", "nursing", "medico", "laboratory", "diagnosticAids", "pharmacy", "billing", "management", 
    //         "audits", "system", "hospitalization", "surgery"       
    //     ],
    //     actions         : [
    //         {
    //             text        : "select",
    //             color       : "success",
    //             action      : "selectMenu",
    //             key         : "hospitalization",
    //         },
    //     ]
    // },
    

]