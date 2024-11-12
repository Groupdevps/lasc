let typeRelationshipList = [
    {  name : "Padre"},
    {  name : "Madre"},
    {  name : "Hermano/Hermana"},
    {  name : "Tio"},
    {  name : "Tia"},
    {  name : "Representante"},
  ]
  typeRelationshipList.forEach(it => {
    it.createdAt = new Date();
    it.updatedAt = new Date();
})
module.exports = typeRelationshipList