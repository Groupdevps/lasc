let levelTriage = [
{
       
    name     : "Triage I" ,
    description:  "Reanimación"          
},
{
   
    name     : "Triage II",
    description:  "Emergencia"            
},
{
   
    name     : "Triage III",
    description:  "Urgencia"              
},
{
   
    name     : "Triage IV",
    description:  "Urgencia menor"              
},
{
   
    name     : "Triage V",
    description:  "Sin urgencia"              
}

]
levelTriage.forEach(it => {
    it.name = it.name.toUpperCase();
    it.description = it.description.toUpperCase();
    it.createdAt = new Date();
    it.updatedAt = new Date();
})
module.exports = levelTriage