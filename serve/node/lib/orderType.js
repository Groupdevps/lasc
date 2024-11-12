let orderType = [{
    name: "Orden Laboratorio"
  },{
    name: "Orden Formula Medica"
  },{
    name: "Orden Interconsulta"
  },{
    name: "Orden Ayuda diagnostica"
  },{
    name: "Orden Cirugia"
  },
  {
    name: "Orden Procedimientos"
  },{
    name: "Recomendaciones"
  },{
    name: "Solicitud Suministros"
  },{
    name: "Incapacidad"
  },
  {
    name: "Despacho Interno"
  },
  {
    name: "Despacho Externo"
  },
  {
    name: "Solicitud Material Osteosintexis"
  }
]

orderType.forEach(it => {
    it.name = it.name.toUpperCase();
    it.createdAt = new Date();
    it.updatedAt = new Date();
})
module.exports = orderType