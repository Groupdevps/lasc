export default {
	"genders" : [
		{ id : 1, name : "Masculino"},
		{ id : 2, name : "Femenino"},
		{ id : 3, name : "Otro"},

	], 
	"typeIds" : [
		{ id : 1, name : "Cedula de Ciudadania", description : "C.C", minNum : 11  },
		{ id : 2, name : "Tarjeta de Identificacion", description : "T.I", minNum : 10  },
		{ id : 3, name : "Registro Civil", description : "R.C", minNum : 10  },
		{ id : 4, name : "N.V", description : "", minNum : 10 },
		{ id : 5, name : "N.N", description : "", minNum : 10 },
		{ id : 6, name : "Pasaporte Extranjero", description : "P.E", minNum : 15}
	], 
	"zones" : [
		{ id : 1, name : "Rural"},
		{ id : 2, name : "Urbana"},
	], 
	"typeRelationship" : [
		{ id : 1, name : "Padre"},
		{ id : 2, name : "Madre"},
		{ id : 3, name : "Hermano/Hermana"},
		{ id : 4, name : "Tio"},
		{ id : 5, name : "Tia"},
		{ id : 6, name : "Representante"},
	], 
	"triage-classification" : [
		{
			id  : 1,
			key : "resucitation",
			name : "Reanimacion", //Resuscitation
			color : "error",
			timeWaiting  : "inmediately",
		},
		{
			id  : 2,
			key : "emergency",
			name : "Emergencia", // Emergency
			color : "warning",
			timeWaiting  : "10-15 Mins",
		},
		{
			id  : 3,
			key : "urgency",
			name : "Urgencia", // Urgency  
			color : "warning",
			timeWaiting  : "60 Mins",
		},
		{
			id  : 4,
			key : "minor_emergency",
			name : "Urgencia menor", // Minor emergency
			color : "success",
			timeWaiting  : "2 Hours",
		},
		{
			id  : 5,
			key : "without_urgency",
			name : "Sin urgencia", // Without urgency
			color 			: "blue",
			timeWaiting  	: "4 Hours",
		},	
	],
	"occupations" : [
		"Estudiante de primaria",
       	"Bachiller",
       	"Comerciante",
       	"Ama de Casa",
       	"Profesional",
       	"Policia",
       	"Taxista",
       	"Conductor",
       	"Otro",
       	"Ninguno",  	
	],
	"marital-status" : [
		{id : 1 , name: "Casado/a",},
		{id : 2 , name: "Soltero/a",},
		{id : 3 , name: "Viudo/a",},
		{id : 4 , name: "Union libre",},
		{id : 5 , name: "Otro",},
	],
	"current-administrator" : [], 
	"type-service" : [
		
		{
			id 	 			: 1,
			name 			: "Urgencia",			 
			state 			: true,
		},
		{
			id 	 			: 2,
			name 			: "Hospitalizacion",			 
			state 			: true,
			description  	: "",
		},
		{
			id 	 			: 3,
			name 			: "Uci",			 
			state 			: true,
			description  	: "",
		},
		{
			id 	 			: 4,
			name 			: "Cirugia",			 
			state 			: true,
			description  	: "",
		},
		{
			id 			: 5,
			name 		: "consulta externa 1er Nivel",
			isDisable 	: true, 
		},
		{
			id 	 		: 6,
			name 		: "Medicina general",			 
			state 		: false,
			serviceAso  : 5,
			class 		: "ml-1",

		},
		{
			id 	 		: 7,
			name 		: "Laboratorios",			 
			state 		: false,
			serviceAso  : 5,
			class 		: "ml-1",

		},
		{
			id 	 		: 8,
			name 		: "Odontologia",			 
			state 		: false,
			serviceAso  : 5,
			class 		: "ml-1",
		
		},
		{
			id 			: 9,
			name 		: "Programas",
			isDisable 	: true, 
			serviceAso  : 5,
			class 		: "ml-1",
			
		},
		{
			id 	 		: 10,
			name 		: "Adulto Joven",			 
			state 		: false,
			serviceAso  : 9,
			class 		: "ml-2",
		},
		{
			id 	 		: 11,
			name 		: "Crecimiento y desarrollo",			 
			state 		: false,
			serviceAso  : 9,
			class 		: "ml-2",

		},
		{
			id 	 		: 12,
			name 		: "Planificacion familiar",			 
			state 		: false,
			serviceAso  : 9,
			class 		: "ml-2",
		},
		{
			id 	 		: 13,
			name 		: "Control prenatal",			 
			state 		: false,
			serviceAso  : 9,
			class 		: "ml-2",
		},
		{
			id 	 		: 14,
			name 		: "Adulto Mayor",			 
			state 		: false,
			serviceAso  : 9,
			class 		: "ml-2",
		},
		{
			id 	 		: 15,
			name 		: "Agudeza vizual",			 
			state 		: false,
			serviceAso  : 9,
			class 		: "ml-2",
		},
		{
			id 	 		: 16,
			name 		: "Higiene oral",			 
			state 		: false,
			serviceAso  : 9,
			class 		: "ml-2",
		},
    ], 			
	"regimes" : [
		{ id : 1, name : "Contributivo",},
		{ id : 2, name : "Subsidiado",},
		{ id : 3, name : "Vinculado",},
		{ id : 4, name : "Particular",},
		{ id : 5, name : "Secretaria de Salud",},
		{ id : 6, name : "Empresa",},
		{ id : 7, name : "Desplazado afiliado al regimen contributivo",},
		{ id : 8, name : "Desplazado afiliado al regimen subsidiado",},
		{ id : 9, name : "Desplazado no afiliado (Vinculado)",},
		{ id : 10, name : "Extranjero",},
		{ id : 11, name : "Otro"},      
	], 
	"socioeconomic_levels" 	: [
		{
			id 		: 1,
			name 	: 1,			
		},
		{
			id 		: 2,
			name 	: 2,			
		},
		{
			id 		: 3,
			name 	: 3,			
		},
		{
			id 		: 4,
			name 	: 4,			
		},
	], 
	"moderator_fees" 		: [
		{
			id 		: 1,
			name 	: 1,			
		},
		{
			id 		: 2,
			name 	: 2,			
		},
		{
			id 		: 3,
			name 	: 3,			
		},
		{
			id 		: 4,
			name 	: 4,			
		},
		{
			id 		: 5,
			name 	: 5,			
		},
		{
			id 		: 6,
			name 	: 6,			
		},
	],
	"status" 				: [
		{
			id 		: 1,
			name 	: "En espera",			
		},
		{
			id 		: 2,
			name 	: "Triage",			
		},
		{
			id 		: 3,
			name 	: "Revision Medica",			
		},
		{
			id 		: 4,
			name 	: "Revision Enfermeria",			
		},
		{
			id 		: 5,
			name 	: "Alta Medica",			
		},
		{
			id 		: 6,
			name 	: "Alta Enfermeria",			
		},
		{
			id 		: 7,
			name 	: "Facturar",			
		},
		{
			id 		: 8,
			name 	: "Facturando",			
		},
		{
			id 		: 9,
			name 	: "Finalizado",			
		},
		{
			id 		: 10,
			name 	: "Auditado",			
		},
		{
			id 		: 11,
			name 	: "Cita Medica",			
		},
	]

}