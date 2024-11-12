export default[
	// (nombre, 
	// nit,
	//  codigo,
	//  direccion, 
	//  ciudad, 
	//  departamento, 
	//  firma de representante, 
	//  correoelectronico, 
	//  // resolucion de facturacion, 
	//  // numero de facturacioninicial, 
	//  // facturacion final, 
	//  logo)
	// {
	// 	subtitle : "infoCenter",
	// 	key : "subtitleInfoCenter",
	// 	cols : 12,

	// },
	{
		key : "name",
		type : "text",
		text : "name",
		cols : 12,
	},
	{
		key : "nit",
		type : "text",
		text : "nit",
		cols : 12,
	},
	{
		key : "TypeCenterId",
		type : "select",
		text : "TypeCenter",
		item_value : "id",
		item_text : "name",
		list : [
			{ id : 1, name : "EPS"},
			{ id : 2, name : "IPS"},
		],
		cols : 12,
	},
	// {
	// 	key : "code",
	// 	type : "text",
	// 	text : "code",
	// 	cols : 12,
	// },
	{
		key : "phone",
		type : "number",
		text : "phone",
		cols : 12,
	},
	{
		key : "email",
		type : "email",
		text : "email",
		cols : 12,
	},
	// {
	// 	key : "TypeCenter",
	// 	type : "text",
	// 	text : "Tipo de Centro",
	// 	cols : 12,
	// },
	{
		key : "address",
		type : "text",
		text : "address",
		cols : 12,
	},
	{
		key : "state",
		type : "text",
		text : "deparment",
		cols : 12,
	},
	{
		key : "city",
		type : "text",
		text : "city",
		cols : 12,
	},
	// {
	// 	key : "logo",
	// 	type : "file",
	// 	text : "logo",
	// 	cols : 12,
	// },
	// {
	// 	key : "representativeSignature",
	// 	type : "file",
	// 	text : "representativeSignature",
	// 	cols : 12,

	// },
	
]