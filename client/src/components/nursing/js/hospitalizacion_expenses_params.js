module.exports = [
	{
		subtitle : "Relidiquidacion de Cuentas. Salida General",
		cols : 12,
	},
	{
		key : "nombre",
		text : "Nombre paciente",
		type : "text",
		enable : true,
		cols : 8
	},
	{
		key : "fecha_i",
		text : "Fecha Ingreso",
		type : "date_range",
		enable : true,
		cols : 4,
		ref : "fecha_i",
	},
	{
		key : "hospitalizacion",
		text : "Hospitalizacion",
		type : "text",
		enable : true,
	},
	{
		key : "corteC",
		text : "Corte de cuenta",
		type : "number",
		enable : true,
	},
	{
		key : "doc",
		text : "Doc.",
		type : "number",
		enable : true,
	},
	{
		key : "fecha_e",
		text : "Fecha egreso",
		type : "date_range",
		ref  : "fecha_e",		
		enable : true,
		
	},
	{
		key : "afiliacion",
		text : "Afiliacion",
		type : "select",
		enable : true,
		list 	: [
			"Vinculado", "Subsidiado", "Secretaria de Salud", "Empresa"
		],
		
	},
	{
		subtitle : "Observaciones",
		cols 	 : 12,
	},
	{
		key : "idx_i",
		text : "IDx Ingreso",
		type : "text",
		enable : true,
	},
	{
		key : "idx_e",
		text : "IDx Egreso",
		type : "text",
		enable : true,
	},
	{
		key : "idx_r",
		text : "IDx Rel",
		type : "text",
		enable : true,
	},
	{
		key : "fecha_idx",
		text : "Fecha",
		type : "date_range",
		ref  : "fecha_idx",
		enable : true,
		
	},
	{
		key : "diagnosticos",
		text : "Diagnosticos",
		type : "text",
		enable : true,
	},
	{
		key : "codigo_qx",
		type : "table",
		header : [
			{ text : "qx", value : "qx" },
			{ text : "codigo", value : "codigo" },
			{ text : "comentario", value : "comentario" },
			{ text : "", value : "action" },
		],
		list : "list_codigos",
		enable : true,
		cols   : 6,

	},
	{
		key : "insumos",
		text : "Farmacia e insumos Hospitalarios",				
		type : "table",
		top  : true,
		btn  : true,
		icon : 'mdi-plus',
		cols   : 6,		
		header : [
			{ text : "", value : "" },
			{ text : "insumo", value : "insumo" },
			{ text : "", value : "action" },
		],
		list : "list_insumos",
		enable : true,
		
	},
	{
		key : "laboratorios",
		text : "Laboratorios",		
		type : "table",
		top  : true,
		btn  : true,
		icon : 'mdi-plus',
		cols   : 6,		
		header : [
			{ text : "", value : "" },
			{ text : "laboratorio", value : "laboratorio" },			
			{ text : "", value : "action" },
		],
		list : "list_laboratorios",
		enable : true,

	},
	{
		key : "otros_servicios",
		text : "Otros Servicios",
		type : "table",
		top  : true,
		btn  : true,
		icon : 'mdi-plus',
		cols   : 6,
		header : [
			{ text : "", value : "" },
			{ text : "servicio", value : "servicio" },			
			{ text : "", value : "action" },
		],
		list : "list_otros_servs",
		enable : true,

	},
	{
		key : "images_diagnoticas",
		text : "Imágenes Diagnosticadas",
		type : "table",
		top  : true,
		btn  : true,
		icon : 'mdi-plus',
		cols   : 6,
		header : [
			{ text : "", value : "" },
			{ text : "laboratorio", value : "laboratorio" },			
			{ text : "", value : "action" },
		],
		list : "list_images_diagnosticas",
		enable : true,

	},
	{
		key : "observaciones",
		text : "Observaciones",
		type : "text",
		enable : true,
		cols : 8
	},
	{
		key : "na",
		text : "N. Atencion",
		type : "text",
		enable : true,
		cols : 4
	},


];