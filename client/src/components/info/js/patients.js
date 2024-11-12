// module.exports
export default [
	{
		tab 	: 1,
		key 	: "information_patient",		
		text 	: "information_patient",
		class 	 : "body-1 pa-1 font-weight-bold text-uppercase white--text small-pannel",
		fields : [

			// {
			// 	subtitle : 'information_patient',
			// 	cols 	 : 12,
			// 	class 	 : "body-1 pa-1 font-weight-bold",
			// },
			{
				key 	: "name",
				key_main 	: "person",
				text 	: "name",
				type 	: "text",
				enable 	: true,
				icon 	: "mdi-account", 
				cols 	: 3,
				isRequired : true,
				rules 	  : [(value) =>  !!value || 'Required.'],
				hideDetails : false,
				autofocus : "autofocus",
			},
		    
			{
				key : "secondName",
				key_main 	: "person",
				text : "second_name",
				type : "text",
				enable : true,
				icon 	: "mdi-account", 
				cols 	: 3,

			},

			{
				key : "lastName",
				key_main 	: "person",
				text : "firstLastname",
				type : "text",
				enable : true,
				icon 	: "mdi-account", 
				cols 	: 3,
				isRequired : true,
				rules 	  : [(value) =>  !!value || 'Required.'],
			},

			{
				key : "secondSurname",
				key_main 	: "person",
				text : "second_surname",
				type : "text",
				enable : true,
				icon 	: "mdi-account", 
				cols 	: 3,
			},

			{
				key 		: "TypeIDId",
				key_main 	: "person",
				text 		: "document_type",
				type 		: "component", // select
				list 		: "list_docs",
				item_text  	: "description",
				item_value 	: "id",	
				global_list : "typeIds",
				isSync  	: true,				
				enable 		: true,
				icon 		: "mdi-format-list-bulleted-type", 
				cols 		: 3,
				minNumber 	: 8,
				isRequired : true,
				rules 	  : [(value) =>  !!value || 'Required.'],
			},
			{
				key : "numberId",
				key_main 	: "person",
				text : "document",
				type : "number2",
				enable : true,
				icon 	: "mdi-clipboard", 
				cols 	: 3,
				isRequired : true,
				isCounter  : true,
				rules 	  : [
					(value) =>  !!value || 'Requerido.',
					(value) => value.toString().length >= 8  || 'Requerido minimo 8 caracteres'
				],

			},


			{
				key : "GenderId",
				key_main 	: "person",
				text : "gender",
				type : "component2",
				component : "MenuGenderComponent",
				enable : true,
				list : [ "M", "F", "Otro"],
				global_list : "genders",				
				isSync  	: true,				
				icon 	: "mdi-gender-male-female", 
				item_text  	: "name",
				item_value 	: "id",	
				cols 	: 3,
			},
			{
				key 	: "birthDate",
				key_main 	: "person",
				text 	: "date_birth",
				type 	: "DateAuto",
				enable 	: true,
				action 	: "calculate_age",
				icon 	: "mdi-calendar", 
				cols 	: 3,
				isRequired : true,

			},

			{
				key 	: "age",
				key_main 	: "person",
				text 	: "age",
				type 	: "text",
				enable 	: true,
				icon 	: "mdi-calendar-clock", 
				cols 	: 3,
				isDisabled : true,
			},
			{
				key 	: "MaritalStatusId",
				key_main 	: "person",
				text 	: "MaritalStatus",
				type 	: "component2",
				component : "MenuMaritalStatusComponent",
				isSync  	: true,				
				global_list : "marital-status",				
				enable 	: true,		
				item_text  	: "name",
				item_value 	: "id",	
				// icon 	: "mdi-", 
				cols 	: 3,

			},
			{
				key : "phone",
				key_main 	: "person",
				text : "phone",
				type : "number",
				enable : true,
				icon 	: "mdi-phone", 
				cols 	: 3,
				rules 	  : [
					value => (value && value.toString().length >= 7) || 'Requerido minimo 7 caracteres'
				]
			},

			{
				key : "cellphone",
				key_main 	: "person",
				text : "cell_phone",
				type : "number",
				enable : true,
				icon 	: "mdi-cellphone", 
				cols 	: 3,
				isRequired : true,
				rules 	  : [
					(value) =>  !!value || 'Required.',
					(value) => (value && value.toString().length >= 10)  || 'Requerido minimo 10 caracteres'
				],

			},

			{
				key : "email",
				key_main 	: "person",
				text : "email",
				type : "email",
				enable : true,
				icon 	: "mdi-email", 
				cols 	: 3,
			},


			/*{
				key 	: "eps_type",
				text 	: "eps_type",
				type 	: "select",
				enable 	: true,
				icon 	: "mdi-hospital-building", 
				cols 	: 3,
			},*/


			{
				key 		: "StateId",
				key_main 	: "Address",
				// key_2 		: "State",
				text 	: "department",
				type 	: "component",//"select_search", / field-menu
				isSync  	: true,				
				global_list : "states",
				enable	: true,
				icon 	: "mdi-selection-marker", 
				cols 	: 3,
				item_text  	: "name",
				item_value 	: "id",	
				show_texts  : ["name"],
				show_texts    	: ['name'],
				key_search   	: "name",
				return_obj : true,
				action 	   : "set_state",
			},
			{
				key 	: "CityId",
				key_main 	: "Address",
				text 	: "MUNICIPIO",
				type 	: "component",
				isSync  	: true,				
				// global_list : "cities",
				enable 	: true,
				list 	: "cities",
				item_text  	: "name",
				item_value 	: "id",
				icon 	: "mdi-city", 
				cols 	: 3,
				show_texts    	: ['name'],
				key_search   	: "name",
				return_obj : true,
				action 	   : "set_city",
			},
			{
				key 		: "DistrictId",
				key_main 	: "Address",
				text 		: "neighborhood",
				type 		: "component", // text
				enable 		: true,
				icon 		: "mdi-home-group", 
				cols 		: 3,
				component 	: "MenuDistrics"
			},
			{
				key 	: "zone",				
				key_main 	: "Address",
				text 	: "zone",
				type 	: "component2",
				component : "MenuZoneComponent",  
				enable 	: true,
				icon 	: "mdi-map", 
				isSync  	: true,				
				global_list : "zones",
				list 	: [ "rural", "urbana"],
				item_text  	: "name",
				item_value 	: "id",	
				cols 	: 3,
			},
			{
				key 	: "address",
				key_main : "Address",
				text 	: "address",
				type 	: "text",
				enable 	: true,
				icon 	: "mdi-map-marker", 
				cols 	: 3,
			},

			/*{
				key 	: "occupation",
				key_main 	: "person",
				text 	: "occupation",
				type 	: "select",
				icon 	: "mdi-account-box", 
				enable 	: true,
				global_list : "occupations",
				list  	: [
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
				action 	: "ocupation",
				cols 	: 3,
			},*/

			{
				key 	: "occupation",
				key_main 	: "person",
				text 	: "occupation",
				type 	: "text",
				enable	: true,
				hidden 	: true,
				icon 	: "mdi-account-box", 
				cols 	: 3,
			},


			{
				subtitle : 'insurance_information',
				cols : 12,
				class 	 : "body-1 pa-1 font-weight-bold text-uppercase ",
			},
			{
				key 			: "administrator", // assignedAdministratorId
				key_main 		: "ServiceProvider",
				text 			: "eps",
				type 			: "component2",//field-menu
				component : "MenuCurrentAdministratorComponent",			
				list 			: 'list_eps',
				global_list 	: 'current-administrator',
				isSync  		: true,				
				show_texts    	: ['name', 'nit'],
				text_list 		: "administradora",
				item_text 		: "name",
				item_value 		: "id",
				key_search   	: "name",
				key_search_1 	: "nit",
				action 			: "set_eps",
				enable 			: true,
				icon 			: "mdi-hospital-building", 
				is_object 		: true,
				cols 			: 4,
				return_obj 		: true,
				isReturnObject  : true,

				// action 			: "set_eps",
			},
		/*
			{
				key : "ep",
				text : "ep",
				type : "",
				enable : true,
			},
		   
		   	{
		   		key : "ep1",
		   		text : "ep1",
		   		type : "",
		   		enable : true,
		   	},

			{
				key : "seps",
				text : "seps",
				type : "",
				enable : true,
			},*/

			{
				key 	: "regime", // contrato
				key_main: "ServiceProvider",
				isReturnObject : true,
				keyObj : "Regime",
				text 	: "regime",
				type 	: "component2",
				component : "MenuRegimeComponent",
				enable 	: true,
				global_list : "regimes",
				isSync  	: true,				
				item_text  	: "name",
				item_value 	: "id",
				icon 	: "mdi-format-list-text", 
				list 	: [
					"Contributivo",
		            "Subsidiado",
		            "Vinculado",
		            "Particular",
		            "Secretaria de Salud",
		            "Empresa",
		            "Desplazado afiliado al regimen contributivo",
		            "Desplazado afiliado al regimen subsidiado",
		            "Desplazado no afiliado (Vinculado)",
		            "Extranjero",
		            "Otro"
				],
				cols 			: 4,
				action 			: "set_regimen",
			},

			
			/*{
				subtitle : 'socioeconomic_level', // Nivel socio-economico
				cols 	 : 12, 
				class 	 : "body-1 pa-1 font-weight-bold",
			},*/
			{
				key 			: "socioeconomiclevel",
				key_main 		: "ServiceProvider",
				text 			: "socioeconomic_level",
				type 			: "component2",
				component 		: "MenuSocioeconomicLevelComponent",
				global_list 	: "socioeconomic_levels",
				isSync  	: true,				
				item_text  		: "name",
				item_value 		: "id",
				list 			: [
					1, 2, 3, 4
				],
				icon 			: "mdi-relative-scale", 
				enable 			: true,
				cols 			: 4,
			},

			{
				key 		: "moderatorFee",
				key_main 	: "ServiceProvider",
				text 		: "moderator_fee",
				type 		: "component2",
				component 	: "MenuModeratorFeeComponent", 
				// isSync  	: true,				
				global_list : "moderator_fees",
				disabled 	: true,
				enable 		: true,
				// action 		: "cuota",		
				item_text  	: "name",
				item_value 	: "id",
				icon 		: "mdi-wallet", 
				list 		: [
					1, 2, 3, 4, 5, 6
				],
				cols 		: 4,
			},		
			{
				key : "btnSave",
				action : "save",
				color : "primary",
				text  : "save",
				type : "btn",
				isLoading : false, 
				cols 		: 12,
				offset 		: 10,
			}

		]
	},

	{
		tab 	: 2,
		key 	: "family_data",	
		text 	: "family_data",
		class 	 : "body-1 pa-1 font-weight-bold text-uppercase white--text small-pannel",
		fields 	: [
			// {
			// 	subtitle : 'family_data',
			// 	cols 	 : 12,
			// 	class 	 : "body-1 pa-1 font-weight-bold",
			// },
			{
				key 	: "Relationships",
				text 	: "",
				type 	: "table",
				enable 	: true,
				icon 	: "mdi-account-box-multiple", 
				cols 	: 12,
				height  : 120, 
				key_related_main : "person",
				isSetOtherKey    : true, 
				isSelection  	 : true,
				isSingleSelect	 : true,
				isAutoUpdate  	 : true,
				key_selection    : "Companion", // return to object
				item_key_selection : "numberId", // for key selection
				text_key_selection : "companion",				
				requests 		: {
					delete : "/api/v1/relationship/",
				},
				
			},
						
		],
	},
	
	{
		tab 	: 3,
		key 	: "service",
		text 	: "service",
		class 	 : "body-1 pa-1 font-weight-bold text-uppercase white--text small-pannel",
		fields 	: [
			// {
			// 	subtitle : 'service', // Nivel socio-economico
			// 	cols 	 : 12, 
			// 	class 	 : "body-1 pa-1 font-weight-bold",
			// },

			/*{
				key 	: "service",
				text 	: "service",
				type 	: "select",
				enable 	: true,
				icon 	: "mdi-face-agent", 
				key_list  : "",
				text_list : "",
				list 	: [
					"Medico General",
					"Odontologia",
					"Urgencia"
				],
				cols 	: 4,
			},*/
			{
				key 	: "services",
				text 	: "",
				type 	: "component",
				component : "services",
				enable 	: false,
				icon 	: "mdi-", 
				key_list  : "",
				text_list : "",
				cols 	: 12,
				serviceId : 1,//"Urgencia",
				statusId  : 1, //"En espera",
				

			},
		]
	},
	
			
]