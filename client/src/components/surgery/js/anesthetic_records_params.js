export default[
{
		key  	: "fullName",
		text 	: "nombre",
		type 	: "text",
		isDisabled : true,
		cols : 3,

	},
	{
		key  	: "numberId",
		text 	: "numberId",
		type 	: "number",
		isDisabled : true,
		cols : 2,

	},
	{
		key 	: "age",
		text    : "age",
		type    : "text",
		icon    : "mdi-calendar",
		isDisabled : true,
		cols 	: 2, 
	},
	{
		key  	: "assignedAdministrator",
		text 	: "eps",
		type 	: "select", // _search
		list 			: 'list_eps',
		show_texts    	: ['name', 'nit'],
		global_list 	: 'current-administrator',
		item_text 		: "name",
		item_value 		: "name",//id
		key_search   	: "name",
		key_search_1 	: "nit",
		text_list 		: "administradora",	
		action 			: "set_eps",
		enable 			: true,
		is_object 		: true,
		isDisabled : true,
		cols : 2,

	},
	{
		key  	: "phone",
		text 	: "telefono",
		type 	: "number",
		isDisabled : true,
		cols : 2,

	},
	{
		key  	: "address",
		text 	: "direccion",
		type 	: "text",
		isDisabled : true,
		cols : 3,

	},
	
	{
		key  	: "AttentionId",
		text 	: "AttentionId",
		type 	: "number",
		isDisabled : true,
		cols : 2,

	},
	{
		subtitle : "diagnostics",
		cols : 12,
		key : "Subdiagnostic"
	},
	{
		key  		: "SubDiagnoseLists",
		text 		: "diagnostico",
		type 		: "table-read",
		top  		: true,
		btn  		: true,
		type_field 	: "text",
		color_icon 	: "white",
		color 		: "primary", 
		action 		: "add_table",
		icon 		: 'mdi-plus',
		placeholder : "Escribir diagnostico",
		isReadonly 	: true,
		cols   		: 12,
		header 		: [
			// { text : "date", value : "date" },
			{ text : "CODIGO", value : "code" },
			{ text : "DIAGNOSTICO", value : "name" },	//description		
			// { text : "", value : "action" },
		],
		request 	: {
			delete : "/api/v1/subdiagnose-list/"
			// update : ""
		},
		fields      : [
			{
				key 			: "diagnosis",
				subtitle 		: "diagnosis",	
			}
			/*{
				key 	 		: "code",
				key_main 		: "SubDiagnoseLists",
 				type 	 		: "text",
				text 	 		: "code",
				cols 			: 3,
				placeholder 	: "code",				

			},
			{
				key 	 		: "diagnosis",
				key_main 		: "SubDiagnoseLists",
 				type 	 		: "text",
				text 	 		: "diagnosis",
				btn_add 		: true,
				placeholder 	: "diagnosis",
				action 			: "add_table",
				// cols 			: ,

			}*/
		],		
		list 		: "list_diagnosticos",
		enable 		: true,

	},
	{
		subtitle : "InfoAnestheticRecords",
		cols : 12,
		key : "InfoAnestheticRecords"
	},
	// OrderId INTEGER,
	{
		key : "date",
		text : "date",
		type : "DateAuto",
		cols : 3,
	},  // DataTypes.DATE,
	// {
	// 	key : "day",
	// 	text : "day",
	// 	type : "number",
	// 	cols : 2,
	// }, // : DataTypes.INTEGER,
	// {
	// 	key : "month",
	// 	text : "month",
	// 	type : "number",
	// 	cols : 2,
	// }, // DataTypes.INTEGER,
    
	// {
	// 	key : "year",
	// 	text : "year",
	// 	type : "number",
	// 	cols : 2,
	// }, // : DataTypes.INTEGER,
	{
		key : "anesthesiologistId",
		text : "anesthesiologistId",
		type : "component",
		cols : 3,
	}, //: DataTypes.INTEGER,
    {
		key : "surgeonId",
		text : "surgeonId",
		type : "component",
		cols : 3,
	}, // : DataTypes.INTEGER,
	{
		key : "anestheticTechnique",
		text : "anestheticTechnique",
		type : "select",
		cols : 3,
		list: ['General Inhalatoria', 'Intravenosa', 'Raquidea', 'Regional'],
	}, // : DataTypes.INTEGER,   
    // userId: DataTypes.INTEGER,

    // anestheticTechnique     
      // values: ['General Inhalatoria', 'Intravenosa', 'Raquidea', 'Regional']
    
    // monitoring: {
    //   type: DataTypes.JSONB,
    //   allowNull: true,
    //   defaultValue: {
    //     spO2: null,
    //     capnography: null,
    //     stAnalysis: null,
    //     ekg: null,
    //     tee: null,
    //     warmingDevice: null,
    //     pani: {
    //       respirometer: null,
    //       centralTemp: null,
    //       peripheralNerveStimulator: null,
    //       bis: null,
    //       gcNI: null
    //     },
    //     arterialPad: {
    //       diuresis: null,
    //       expiredGases: {
    //         etCO2: null
    //       },
    //       pvc: null,
    //       pic: null,
    //       ocularProtection: null
    //     }
    //   }
    // },
    // events: {
    //   type: DataTypes.JSONB,
    //   allowNull: true,
    //   defaultValue: []
    // },
    // premedication: DataTypes.STRING,
    // painManagement: {
    //   type: DataTypes.JSONB,
    //   allowNull: true,
    //   defaultValue: {
    //     pop: null,
    //     ivOpioids: null,
    //     localInfiltration: null
    //   }
    // },
    // bloodGases: {
    //   type: DataTypes.JSONB,
    //   allowNull: true,
    //   defaultValue: {
    //     time: null,
    //     pH: null,
    //     pCO2: null,
    //     HCO3: null,
    //     pO2: null,
    //     saturation: null,
    //     baseExcess: null,
    //     lactate: null
    //   }
    // },
    // liquidBalance: {
    //   type: DataTypes.JSONB,
    //   allowNull: true,
    //   defaultValue: {
    //     output: null,
    //     input: null,
    //     deficit: null,
    //     lactate: null,
    //     insensibleLosses: null,
    //     salineSolution: null,
    //     colloids: null,
    //     blood: null
    //   }
    // },
    // postAnesthesiaCareUnit: {
    //   type: DataTypes.JSONB,
    //   allowNull: true,
    //   defaultValue: {
    //     phaseI: null,
    //     phaseII: null,
    //     transfer: null
    //   }
    // },
    {
    	key : "observations",
    	type : "textarea",
    	text :  "observation",
    	cols : 12
    }, // TEXT,

    // anesthesiologistSignature: DataTypes.INTEGER
]