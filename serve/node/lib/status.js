let status = [
    {
       
        name     : "En espera"          
    },
    {
       
        name     : "Triage"            
    },
    {
       
        name     : "Revision Medica"         
    },
    {
      
        name     : "Revision Enfermeria"            
    },
    {
        
        name     : "Alta Medica"           
    },
    {
       
        name     : "Sin Cama Asignada"           
    },{
       
        name     : "Hospitalizado"           
    },
    {
       
        name     : "Cirugia en espera"           
    },
    {
       
        name     : "Cirugia programada"           
    },
    {
       
        name     : "En cirugia"           
    },
    {
       
        name     : "Recuperacion"           
    },
    {
        
        name     : "Facturar",            
    },
    {
       
        name     : "Facturando"           
    },
    {
        
        name     : "Finalizado",            
    },
    {
        
        name     : "Auditado",            
    },
    {
      
        name     : "Cita Medica",            
    },
    {
      
        name     : "Espera de cita",            
    },
    {
      
        name     : "Observacion",            
    },
    {
      
        name     : "Pendiente",            
    },{
      
        name     : "Por Despachar",            
    },{
      
        name     : "Despachado",            
    },{
      
        name     : "Parcialmente Despachado",            
    },{
      
        name     : "En Proceso",            
    },{
      
        name     : "Realizado",            
    },
]
status.forEach(it => {
    it.name = it.name.toUpperCase();
    it.createdAt = new Date();
    it.updatedAt = new Date();
})
module.exports = status