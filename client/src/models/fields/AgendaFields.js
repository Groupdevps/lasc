export default [
    {
        key 			: "TriageId",
        text 			: "Triage",
        type 			: "select",
        placeholder 	: "Triage",
        list 			: [
            { name  : "Reanimacion",id :1},
            { name :"Emergencia",id :2},
            { name :"Urgencia",id :3},
            { name :"Urgencia menor",id :4 },
            { name : "Sin urgencia", id :5 },
                
        ],
        show 			: true,
        global_list  	: "triage",
        item_value   	: "id",
        item_text 		: "name", 
        return_obj 		: false,
        // action 			: "set_status",
    },
    {
        key 			: "status",
        text 			: "Estado",
        type 			: "select",
        placeholder 	: "Estado",
        list 			: "list_states",
        show 			: true,
        global_list  	: "status",
        item_value   	: "id",
        item_text 		: "name", 
        return_obj 		: true,
        // action 			: "set_status",
    },
    /*{
        key 		: "TypeIDId",
        text 		: "type_document"),
        type 		: "select",
        placeholder : "CC",	
        global_list  	: "typeIds",
        item_value   	: "id",
        item_text 		: "name", 
        list 		: [
            {
                text 	:  "cedula"),
                key 	:  "cedula",
            },
            {
                text 	:  "tarjet_id"),
                key 	:  "tarjet_id",
            },
            {
                text 	:  "passport"),
                key 	:  "passport",
            },
        ],						
        show 		: true,
    },*/
    {
        key 		: "numberId",
        text 		: "Documento",
        type 		: "number",
        placeholder : "Documento",				
        show 		: true,
    },
    /*{
        key 		: "number_attention",
        text 		: "n_a"),
        type 		: "number",
        placeholder : "n_a"),				
        show 		: true,
    },*/
    {
        key 		: "date",
        text 		: "Fecha",
        type 		: "date_range",
        placeholder : "Fecha",				
        show 		: true,
        isRange 	: true,
        multiple 	: true,
    },
    {
        key 		: "btn",
        text 		: "Buscar",
        type 		: "btn",				
        action 		: "get_search",
        color 		: "primary",
        icon 		: "mdi-magnify",				 						
        show 		: true,
    }
]