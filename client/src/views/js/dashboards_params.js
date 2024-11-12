module.exports = {
	// admissions : [
	// 	{
	// 		key 		: 'ingreso_pacientes',
	// 		component 	: "ingresos",
	// 		text 		: 'Ingreso Pacientes',
	// 	},
	// 	{
	// 		key 		: 'agenda',
	// 		component 	: "agendas",
	// 		text 		: 'Agenda',
	// 	},
	// 	/*{
	// 		key : 'notas',
	// 		component : "medical_history",
	// 		text : 'Notas',
	// 	},
	// 	{
	// 		key 		: 'autorizacion_servicios',
	// 		component 	: "autorizacion",
	// 		text 		: 'Autorizacion de servicios',
	// 	},*/
	// ],
	// nursing : [
	// 	{
	// 		key 		: 'agenda',
	// 		component 	: "agendas",
	// 		text 		: 'Agenda',
	// 	},		
	// 	/*{
	// 		key : 'notas',
	// 		component : "medical_history",
	// 		text : 'Notas',
	// 	},
	// 	{
	// 		key : 'agenda',
	// 		// component : "agendas",
	// 		text : 'Agenda pendientes',
	// 	},*/
		
	// ],
	// DashboardNursing 	: [
	// 	{
	// 		key 		: 'nursing_notes',
	// 		component 	: "notas",
	// 		text 		: 'EvolutionNotes',
	// 	},
	// 	{
	// 		key 		: 'supplies',
	// 		component 	: "supplies",
	// 		text 		: 'Suministros',
	// 	},		
	// 	{
	// 		key 		: "triage",
	// 		component   : "triage",
	// 		text 		: "triage",
	// 	},
	// 	{
	// 		key 		: 'service',
	// 		component 	: "services",
	// 		text 		: 'Servicio',
	// 	},
	// 	/*{

	// 	}*/
	// ],
	medico : [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		/*{
			key : 'notas',
			component : "medical_history",
			text : 'Notas',
		},*/
	
	],
	// DashboardMedico : 
	// pharmacy : [
		
	// 	{
	// 		key : 'agenda',
	// 		component : "agendas",
	// 		text : 'Agenda',
	// 	},
	// 	{
	// 		key : 'inventory',
	// 		component : "inventory",
	// 		text : 'inventory',
	// 	},
	
	// ],
	promotion_and_prevention: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},
	
	],
	specialized_services: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},
	
	],
	eps: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},
	
	],
	providers: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		/*{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},*/
	
	],
	laboratory: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		
	],
	diagnostic_aids: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},
	
	],
	outpatient_consultations: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},
	
	],
	non_pos_medications: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},
	
	],
	// management
	/*{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},*/
	administration: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},
	
	],
	billing: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},
	
	],
	manager: [
		{
			key 		: 'procedure',
			component 	: "manager",
			text 		: 'procedure',
			props 		: {
				type 		: "procedure",
				title 		: "procedure",
				btn_add 	: true,
				btn_action_add : "add_new_procedure",
				texts_card 	: [				
					{
						key 	: "specialization_code",
						text 	: "Cod especialidad",
					},
					{
						key 	: "type_document",
						text 	: "Tipo Documento",
					},
					{
						key 	: "document",
						text 	: "Documento",
					},
					{
						key 	: "remittance_date",
						text 	: "Fecha remision",
					},
					{
						key 	: "code_enabled_ESE",
						text 	: "Cod. Habilitado ESE",
					},
					{
						key 	: "reason_refers",
						text 	: "Motivo remite",
					},
					{
						key 	: "observation",
						text 	: "Observacion",
					},
				], 
			},
		},
		{
			key 		: 'answers',
			component 	: "manager",
			text 		: 'answers',
			props 		: {
				type 		: "answers",
				title 		: "answers",
				btn_add 	: false,
				texts_card 	: [				
					{
						key 	: "source",
						text 	: "source",
					},
					{
						key 	: "condition",
						text 	: "condition",
					},
					{
						key 	: "response",
						text 	: "response",
					},
				],
			},
		},
		{
			key 		: 'administration',
			component 	: "settings_manager",
			text 		: 'administration',
		},
		/*{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},*/
	
	],
	audits: [
		
		{
			key : 'agenda',
			component : "agendas",
			text : 'Agenda',
		},
		/*{
			key  		: "statistics",
			component 	: "statistics",
			text 		: "Auditoria Y Calidad",						
		},*/
		{
			key  		: "audits",
			component 	: "audits",
			text 		: "Auditorias",			
		}
		/*{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},*/
	
	],
	system: [
		{
			key 		: 'support',
			component 	: "support",
			text 		: 'Soporte',
		},
		/*{
			key 		: 'settings',
			component 	: "settings",
			text 		: 'Configuraciones',
		},*/
		/*{
			key 		: 'agenda',
			component 	: "agendas",
			text 		: 'Agendas',
		},
		{
			key : 'notas',
			component : "notas",
			text : 'Notas',
		},*/
	
	],
	centers : [
		{
			key 		: 'agenda',
			component 	: "agendas",
			text 		: 'Centers',
		},
		

	],
	setting_centers : [
		{
			key 		: 'centers',
			component 	: "centers",			
			text 		: 'Centers',
			
		},	
	]

}