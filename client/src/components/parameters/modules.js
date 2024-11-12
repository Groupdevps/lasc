
module.exports =  {	
	"modules" : [
		{
			"key" 		: "admissions",
			"url"		: "admissions",
			"text" 		: "Admisiones",
			"enable" 	: true,			
			"icon" 		: "mdi-hospital-building"
		},
		{
			"key" 		: "nursing",
			"url"		: "nursing",
			"text" 		: "Enfermeria",
			"enable" 	: true,
			
			"icon" 		: "mdi-medical-cotton-swab"
		},
		{
			"key" 		: "medico",
			"url"		: "medico",
			"text" 		: "Medico",
			"enable" 	: true,			
			"icon" 		: "mdi-stethoscope"
		},
		{
			"key" 		: "pharmacy",
			"url"		: "pharmacy",
			"text" 		: "Farmacia",
			"enable" 	: true,			
			"icon" 		: "mdi-pill-multiple"
		},
		/*{
			"key" 		: "promotion_and_prevention",
			"url"		: "promotion_and_prevention",
			"text" 		: "Promocion y prevencion",
			"enable" 	: true,			
			"icon" 		: "mdi-archive-arrow-up"
		},
		{
			"key" 		: "specialized_services",
			"url"		: "specialized_services",
			"text" 		: "Serv. especializados",
			"enable" 	: true,			
			"icon" 		: "mdi-hospital-box"
		},
		{
			"key" 		: "eps",
			"url"		: "eps",
			"text" 		: "EPS",
			"enable" 	: true,			
			"icon" 		: "mdi-hospital-building"
		},*/
		/*{
			"key" 		: "providers",
			"url"		: "providers",
			"text" 		: "Proveedores",
			"enable" 	: true,			
			"icon" 		: "mdi-abacus"
		},
		{
			"key" 		: "laboratories",
			"url"		: "laboratories",
			"text" 		: "Laboratorios",
			"enable" 	: true,			
			"icon" 		: "mdi-needle"
		},*/
		/*{
			"key" 		: "diagnostic_aids",
			"url"		: "diagnostic_aids",
			"text" 		: "Ayudas Diagnosticas",
			"enable" 	: false,			
			"icon" 		: "mdi-scan-helper"
		},
		{
			"key" 		: "outpatient_consultations",
			"url"		: "outpatient_consultations",
			"text" 		: "Interconsultas ambulatorias",
			"enable" 	: true,			
			"icon" 		: "mdi-handshake"
		},
		{
			"key" 		: "non_pos_medications",
			"url"		: "non_pos_medications",
			"text" 		: "Medicamentos no pos",
			"enable" 	: false,			
			"icon" 		: "mdi-medical-bag"
		},*/
		{
			"key" 		: "management",
			"url"		: "management",
			"text" 		: "Gerencia",
			"enable" 	: true,			
			"icon" 		: "mdi-human-capacity-increase"
		},
		/*{
			"key" 		: "administration",
			"url"		: "administration",
			"text" 		: "Administration",
			"enable" 	: true,			
			"icon" 		: "mdi-account-tie"
		},*/
		{
			"key" 		: "billing",
			"url"		: "billing",
			"text" 		: "Facturacion",
			"enable" 	: true,			
			"icon" 		: "mdi-cash-register", // equalizer
		},
		/*{
			"key" 		: "manager",
			"url"		: "manager",
			"text" 		: "Gestor",
			"enable" 	: true,			
			"icon" 		: "mdi-human-male-board-poll"
		},*/
		{
			"key" 		: "audits",
			"url"		: "audits",
			"text" 		: "Auditorias y Calidad",
			"enable" 	: true,			
			"icon" 		: "mdi-archive-check"
		},
		/*{
			"key" 				: "centers",
			"url"				: "centers",
			"text" 				: "Centros",
			"enable" 			: true,			
			"icon" 				: "mdi-office-building-marker",
			"show_submodules"   : false,
			"sub_modules"		: [
				{
					"key" 		: "setting_centers",
					"text" 		: "setting_centers",
					"import" 	: '/views/dashboards_sub.vue', // "../components/centers/centers.vue",

				}
			]
		},*/
		{
			"key" 		: "system",
			"url"		: "system",
			"text" 		: "Sistema",
			"enable" 	: false,			
			"icon" 		: "mdi-window-shutter-cog"
		}
	],
	"options" : [
		{
			"type" 		: "space",
			"key" 		: "space",
		},
		{ 
			"key" 		: "start",
			"type" 		: "btn",
			"text" 		: "start",
			"action" 	: "displace",
		},	
		{ 
			"key" 		: "description",
			"type" 		: "btn",
			"text" 		: "description",
			"action" 	: "displace",
		},	
		{ 
			"key" 		: "screenshots",
			"type" 		: "btn",
			"text" 		: "screenshots",
			"action" 	: "displace",
		},	
		{ 
			"key" 		: "contacts",
			"type" 		: "btn",
			"text" 		: "contact",
			"action" 	: "displace",
		},	
		{
			"key" 		: "dark_mode",
			"url"		: "dark_mode",
			"type" 		: "btn",
			"text" 		: "",
			"enable" 	: true,			
			"icon" 		: "mdi-brightness-4",
			"icon1"		: "mdi-brightness-4",			
			"icon2" 	: "mdi-brightness-6",
			"action" 	: "dark_mode",
		},
		{
			"key" 		: "messages",
			"url"		: "messages",
			"type" 		: "component",
			"component" : "notifications",
			"text" 		: "",
			"enable" 	: true,			
			"icon" 		: "mdi-email"
		},
		/*{
			"key" 		: "notifications",
			"url"		: "notifications",
			"text" 		: "",
			"type" 		: "btn",		
			"enable" 	: true,			
			"icon" 		: "mdi-bell"
		},
		{
			"key" 		: "flags",
			"url"		: "flags",
			"type" 		: "btn",
			"text" 		: "",
			"enable" 	: true,			
			"icon" 		: "mdi-flag-variant"
		},*/
		{
			"key" 		: "profile", // user
			"type" 		: "btn",
			"url"		: "/profile",
			"text" 		: "Admin",
			"enable" 	: true,			
			"action" 	: "redirect",
			"icon" 		: "mdi-account-circle",
		},
		{ 
			"key" 		: "logout",
			"type" 		: "btn",
			"text" 		: "logout",
			"icon" 		: "mdi-logout",
			"action" 	: "logout",
			"color" 	: "error", 
		},	
		/*{
			"key" 		: "settings",
			"url"		: "",
			"type" 		: "btn",
			"text" 		: "",
			"enable" 	: true,			
			"icon" 		: "mdi-cogs",

		},*/
		{
			"type" 		: "space",
			"key" 		: "space1",
		},
		// { 
		// 	"key" 		: "register",
		// 	"type" 		: "btn",
		// 	"text" 		: "register",
		// 	"action" 	: "redirect",
		// },	
		{ 
			"key" 		: "login",
			"type" 		: "btn",
			"text" 		: "login",
			"action" 	: "redirect",
		},	

	]
}