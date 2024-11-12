/* como testear en el orden que requiera, con payload y endpoint
para poder automatizarlo mas tarde */

/* login demo
http://192.168.101.4:4000/api/v1/signin
{"username":"demo","password":"demo123"} 
*/

/* buscar paciente
http://192.168.101.4:4000/api/v1/find/person
{"numberId":1231231231} */

/* buscar familiares
http://192.168.101.4:4000/api/v1/items/relationship
{"numberId":1231231231} */

/* guardar paciente
http://192.168.101.4:4000/api/v1/person
{"age":"24 Años","numberId":1231231231,"name":"TEST","secondName":"TEST","lastName":"TEST","secondSurname":"TEST","TypeIDId":1,"GenderId":1,"birthDate":"1999-09-09","MaritalStatusId":2,"phone":123123123,"cellphone":1231231231,"email":"TEST","occupation":"TEST","Address":{"State":{"id":8,"name":"Atlántico","createdAt":"2023-12-20T18:58:27.201Z","updatedAt":"2023-12-20T18:58:27.201Z"},"StateId":8,"City":{"id":135,"name":"Soledad","StateId":8,"createdAt":"2023-12-20T18:58:27.202Z","updatedAt":"2023-12-20T18:58:27.202Z"},"CityId":135,"district":"TEST","zone":1,"address":"TEST"},"Relationships":[],"ServiceProvider":{"administrator":{"id":4,"nit":"830113831","name":"ALIANSALUD EPS","email":"demo@demo.com","description":"Description Demo","TypeCenterId":1,"code":"EPS001","mobilityCode":"EPSS01","regime":"CONTRIBUTIVO","regimeId":null,"createdAt":"2023-12-20T18:58:27.327Z","updatedAt":"2023-12-20T18:58:27.327Z"},"assignedAdministratorId":4,"assignedAdministrator":"ALIANSALUD EPS","nit":"830113831","regime":5,"socioeconomiclevel":2}} */

/* buscar nuevo acompañante
http://192.168.101.4:4000/api/v1/find/person
{"numberId":234234234} */

/* crear acompañante
http://192.168.101.4:4000/api/v1/relationship/
{"TypeRelationshipId":3,"name":"TEST","lastName":"TEST","TypeIDId":1,"numberId":234234234,"birthDate":"","cellphone":2342342342,"Adult":true,"patient":"1231231231","PatientId":2} */

/* generar atencion
http://192.168.101.4:4000/api/v1/attention
{"TypeServiceId":1,"assignedDate":"2023-12-21","StatusId":1,"stateString":"En espera","patient":1231231231,"PersonId":2,"Person":{"id":2,"name":"TEST","secondName":"TEST","lastName":"TEST","secondSurname":"TEST","numberId":"1231231231","TypeIDId":1,"birthDate":"1999-09-09","GenderId":1,"MaritalStatusId":2,"phone":"123123123","cellphone":"1231231231","email":"TEST","occupation":"TEST","Adult":true,"createdAt":"2023-12-21T12:01:25.108Z","updatedAt":"2023-12-21T12:01:25.108Z","Address":{"id":2,"address":"TEST","zone":1,"district":"TEST","PersonId":3,"CenterId":null,"CityId":135,"StateId":8,"createdAt":"2023-12-21T12:01:25.108Z","updatedAt":"2023-12-21T12:01:25.108Z"},"Gender":{"id":1,"name":"Masculino","createdAt":"2023-12-20T18:58:27.173Z","updatedAt":"2023-12-20T18:58:27.173Z"},"TypeID":{"id":1,"name":"CC","description":"Cedula de Ciudadania","createdAt":"2023-12-20T18:58:27.152Z","updatedAt":"2023-12-20T18:58:27.152Z"},"MaritalStatus":{"id":2,"name":"soltero/a","createdAt":"2023-12-20T18:58:27.415Z","updatedAt":"2023-12-20T18:58:27.415Z"},"Relationships":[],"ServiceProvider":{"id":2,"assignedAdministrator":"ALIANSALUD EPS","assignedAdministratorId":4,"regime":5,"PersonId":3,"socioeconomiclevel":2,"moderatorFee":null,"createdAt":"2023-12-21T12:01:25.113Z","updatedAt":"2023-12-21T12:01:25.113Z","administrator":{"nit":"830113831","name":"ALIANSALUD EPS","email":"demo@demo.com"},"Regime":{"name":"Subsidiado"}},"address":"TEST","zone":"Rural","district":"TEST","PersonId":3,"CenterId":null,"CityId":135,"StateId":8,"companionName":"TEST TEST","TypeRelationshipName":"Hermano/Hermana","CompanionId":2,"MaritalStatusString":"N/A","currentAdministratorNit":"830113831","currentAdministratorName":"ALIANSALUD EPS"},"companion":234234234,"hour":"07:12:29","doctorId":null,"CenterId":1,"UserId":1} */



////////////////////////////////

/* testing epicrisis
localhost:4000/api/v1/epicrisis
{
    "AttentionId": 1,
    "HistoryPersonId": 1,
    "EmergencyMedicalHistoryId": 1,
    "admissionDate": "2023-12-20T12:16:03.153Z",
    "egressDate": "2023-12-21T12:16:03.153Z",
    "duration": "2 dias 0 horas",
    "motive": "FIEBRE",
    "justification": "TEXT",
    "plan": "TEST",
    "MedicineId": null,
    "userId": 1
  } */

/* getepicrisis for print
  localhost:4000/api/v1/download/epicrisis
  {
    "AttentionId": 1
  } */