export default [
	{
		key 			: "Admissions",
		text 			: "Admisiones",
		name 			: "admissions",			
		icon 			: "mdi-hospital-building",
		color 			: "white",	
		image 			: "/img/admision2.png",
		description 	: "module_admission_description",	
		showWithRoles 	: ["Admisionista","Admin", "Manager", "Demo",  "gerente",],		
		actions 		: [
			{
				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Admissions",
			},
		]
		
	},
	{
		key 			: "Nursing",
		name 			: "nursing",
		text 			: "Enfermeria",
		icon 			: "mdi-medical-cotton-swab",
		color 			: "white",				
		image 			: "/img/enfermeria2.png",
		description 	: "module_nursing_description",	
		showWithRoles 	: ["Enfermeria","Admin", "Manager", "Demo", "enfermero/a",  "gerente",],
		actions 		: [
			{

				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Nursing",
			}
		]
	},
	{
		key 			: "Medico",
		name 			: "medico",			
		text 			: "Medico",
		icon 			: "mdi-stethoscope",
		color 			: "white",				
		image 			: "/img/medico4.png",
		description 	: "module_medico_description",	
		showWithRoles 	: ["Medico","Admin", "Manager", "Demo", "medico general",  "gerente",],
		actions 		: [
			{
				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Medico",
			},
		]
		
	},
	{
		key 			: "Pharmacy",
		name 			: "pharmacy",
		text 			: "Farmacia",
		icon 			: "mdi-pill-multiple",
		color 			: "white",				
		image 			: "/img/farmacia1.png", // jpg
		description 	: "module_pharmacy_description",	
		showWithRoles 	: ["Farmaceutico","Admin", "Manager", "Demo", "farmaceutico/a",  "gerente",],
		actions 		: [
			{

				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Pharmacy",
			}
		]
	},
	{
		key 			: "Laboratory",
		name 			: "laboratory",
		text 			: "Laboratorio",
		icon 			: "mdi-test-tube",
		color 			: "white",				
		image 			: "/img/laboratory.png", // jpg
		description 	: "module_laboratory_description",	
		showWithRoles 	: ["Laboratorio","Admin", "Manager", "Demo", "gerente"],
		actions 		: [
			{

				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Laboratory",
			}
		]
	},
	{
		key 			: "DiagnosticAid",
		name 			: "diagnostic_aid",
		text 			: "Ayuda Diagnostica",
		icon 			: "mdi-gradient-horizontal",// mdi-skull-scan-outline
		color 			: "white",				
		image 			: "/img/diagnostic_aid.png", // jpg
		description 	: "module_laboratory_description",	
		showWithRoles 	: ["Laboratorio","Admin", "Manager", "Demo", "ecografista",  "gerente"],
		actions 		: [
			{

				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "DiagnosticAid",
			}
		]
	},
	{
		key 			: "Hospitalization",
		name 			: "hospitalization",
		text 			: "Hospitalizacion",
		icon 			: "mdi-bed-outline",
		color 			: "white",				
		image 			: "/img/hospitalizacion.png", // s.jpeg
		description 	: "module_hospitalization_description",	
		showWithRoles 	: ["Auditor","Admin", "Manager", "Demo", "Medico",  "gerente"],
		actions 		: [
			{

				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Hospitalization",
			}
		]
	},
	{
		key 			: "Surgery",
		name 			: "surgery",
		text 			: "Cirugia",
		icon 			: "mdi-needle",
		color 			: "white",				
		image 			: "/img/cirugia.png", // s.jpeg
		description 	: "module_surgery_description",	
		showWithRoles 	: ["Auditor","Admin", "Manager", "Demo", "Medico", "Enfermeria",  "gerente"],
		actions 		: [
			{

				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Surgery",
			}
		]
	},
	{
		key 			: "Management",
		name 			: "management",		
		text 			: "Gerencia",	
		icon 			: "mdi-human-capacity-increase",
		color 			: "white",				
		image 			: "/img/gerencia1.png", // jpg
		description 	: "module_management_description",	
		showWithRoles 	: ["Admin", "Manager", "Demo",  "gerente"],
		actions 		: [
			{
				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Management",
			},
		]
		
	},
	{
		key 			: "Billing",
		name 			: "billing",
		text 			: "Facturacion",
		icon 			: "mdi-cash-register",
		color 			: "white",				
		image 			: "/img/facturacion1.png", 
		description 	: "module_billing_description",	
		showWithRoles 	: ["Facturador","Admin", "Manager", "Demo",  "gerente", "facturador/a"],
		actions 		: [
			{

				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Billing",
			}
		]
	},
	/*{
		key 			: "manager",
		name 			: "manager",			
		icon 			: "mdi-human-male-board-poll",
		color 			: "white",				
		image 			: "",
		description 	: "Module of manager of manage requests and responses",	
		actions 		: [
			{
				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "manager",
			},
		]
		
	},*/
	{
		key 			: "Audits",
		name 			: "audits",
		text 			: "Auditorias y Calidad",
		icon 			: "mdi-archive-check",
		color 			: "white",				
		image 			: "/img/auditoria1.png", // s.jpeg
		description 	: "module_audits_description",	
		showWithRoles 	: ["Auditor","Admin", "Manager", "Demo",  "gerente",],
		actions 		: [
			{

				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "Audits",
			}
		]
	},
	/*{
		key 			: "centers",
		name 			: "centers",			
		icon 			: "mdi-office-building-marker",
		color 			: "white",				
		image 			: "",
		description 	: "module_centers_description",	
		actions 		: [
			{
				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "/centers",
			},
		]
		
	},
	{
		key 			: "systems",
		name 			: "systems",
		text 			: "Sistema",
		icon 			: "mdi-window-shutter-cog",
		color 			: "white",				
		image 			: "",
		description 	: "module_systems_description",	
		actions 		: [
			{

				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "/systems",
			}
		]
	},*/
	/*{
		key 			: "admissions",
		name 			: "admissions",			
		icon 			: "mdi-needle",
		color 			: "white",				
		image 			: "",
		description 	: "Module of admissions of patients",	
		actions 		: [
			{
				text 		: "redirect",
				color 		: "success",
				action 		: "redirect",
				redirect_to : "/admissions",
			},
		]
		
	},*/
	



]