export default[
	{
		subtitle : "Relidiquidacion de Cuentas. Salida General",
		cols : 12,
	},
	{		
		key : "fullName",
		text : "fullName",
		type : "text",
		enable : true,
		cols : 4
	},
	{
		key : "numberId",
		text : "numberId",//Doc.
		type : "number",
		enable : true,
		cols : 2,
	},
	{
		key : "assignedDate",
		text : "date_entry",//Fecha Ingreso
		type : "date_range",
		enable : true,
		cols : 2,
		ref : "fecha_i",
	},
	{
		key : "hospitalization",
		text : "Hospitalization",//Hospitalizacion
		type : "text",
		enable : true,
		cols : 2,
	},
	{
		key : "accountCut",//corteC
		text : "accountCut",//Corte de cuenta
		type : "number",
		enable : true,
		cols : 2,
	},
	{
		key : "departureDate",
		text : "departureDate",
		type : "date_range",
		ref  : "fecha_e",		
		enable : true,
		cols : 2,
		
	},
	{
		key: "egressDate", 
		text: "egressDate",
		type: "date_range",
		ref  : "egressDate",		
		enable : true,
		cols : 2,
	},
	{
		subtitle : "diagnostics",
		cols : 12,
	},
	{
		key: "SubDiagnoseList",
		type:"component",
		cols : 12,
	},
	{
		subtitle : "supplies",
		cols : 12,
	},
	{
		key: "Supplies",
		type:"component",
		cols : 12,
	},
	{
		subtitle : "procedures",
		cols : 12,
	},
	{
		key: "Procedures",
		type:"component",
		cols : 12,
	},
	{
		subtitle : "laboratories",
		cols : 12,
	},
	{
		key: "Laboratories",
		type:"component",
		cols : 12,
	},
	{
		subtitle : "diagnostic_aid",
		cols : 12,
	},
	{
		key: "DiagnosticAids",
		type:"component",
		cols : 12,
	},
		
]