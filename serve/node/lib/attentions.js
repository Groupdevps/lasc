const Axios = require("axios");



let cita = {
    "Person": {
        "id": 1,
        "name": "TEST",
        "secondName": "TES1",
        "lastName": "TEST2",
        "secondSurname": "TES3",
        "numberId": "123",
        "phone": "213231223123",
        "cellphone": "12312312213",
        "email": "TEST@TEST.COM",
        "birthDate": "2010-01-01",
        "occupation": "TESTER",
        "TypeIDId": 1,
        "GenderId": 1,
        "MaritalStatusId": 2,
        "createdAt": "2022-12-12T20:48:00.956Z",
        "updatedAt": "2022-12-12T20:48:00.956Z",
        "Address": {
            "id": 1,
            "address": "DASD 12",
            "zone": 1,
            "district": "TEST- 22",
            "PersonId": 1,
            "cityString": "Ayapel",
            "stateString": "Córdoba",
            "createdAt": "2022-12-12T20:48:00.977Z",
            "updatedAt": "2022-12-12T20:48:00.977Z"
        },
        "ServiceProvider": {
            "id": 1,
            "assignedAdministrator": "NUEVA EPS",
            "regime": 2,
            "PersonId": 1,
            "socioeconomiclevel": 1,
            "moderatorFee": null,
            "createdAt": "2022-12-12T20:48:00.980Z",
            "updatedAt": "2022-12-12T20:48:00.980Z"
        },
        "Gender": {
            "id": 1,
            "name": "Masculino",
            "createdAt": "2022-12-12T08:49:31.202Z",
            "updatedAt": "2022-12-12T08:49:31.202Z"
        },
        "TypeID": {
            "id": 1,
            "name": "Cedula de Ciudadania",
            "createdAt": "2022-12-12T08:49:31.191Z",
            "updatedAt": "2022-12-12T08:49:31.191Z"
        },
        "Relationships": [
            {
                "id": 1,
                "patient": "123",
                "companion": "1234",
                "PatientId": 1,
                "PersonId": 2,
                "TypeRelationshipId": 1,
                "createdAt": "2022-12-12T20:48:01.019Z",
                "updatedAt": "2022-12-12T20:48:01.019Z",
                "TypeRelationship": {
                    "id": 1,
                    "name": "Padre",
                    "createdAt": "2022-12-12T08:49:31.310Z",
                    "updatedAt": "2022-12-12T08:49:31.310Z"
                },
                "Person": {
                    "id": 2,
                    "name": "TESTTT",
                    "secondName": null,
                    "lastName": "TESDASDA",
                    "secondSurname": null,
                    "numberId": "1234",
                    "phone": null,
                    "cellphone": "12312321321",
                    "email": null,
                    "birthDate": null,
                    "occupation": null,
                    "TypeIDId": 1,
                    "GenderId": null,
                    "MaritalStatusId": null,
                    "createdAt": "2022-12-12T20:48:00.992Z",
                    "updatedAt": "2022-12-12T20:48:00.992Z",
                    "Address": null,
                    "ServiceProvider": null,
                    "Gender": null,
                    "TypeID": {
                        "id": 1,
                        "name": "Cedula de Ciudadania",
                        "createdAt": "2022-12-12T08:49:31.191Z",
                        "updatedAt": "2022-12-12T08:49:31.191Z"
                    }
                }
            }
        ],
        "age": "12 Años",
        "companionName": "TESTTTTESDASDA",
        "TypeRelationshipName": "N/A",
        "city": "Ayapel",
        "district": "TEST- 22",
        "state": "Córdoba",
        "zone": "Rural",
        "currentAdministratorName": "NUEVA EPS"
    },
    "TypeServiceId": 6,
    "assignedDate": "2022-11-",
    "StatusId": 11,
    "stateString": "Cita Medica",
    "patient": 123,
    "PersonId": 1,
    "companion": null,
    "hour": "7:20:00",
    "DoctorId": 2,
    "UserId": 1
}
let urgencia = {
    "Person": {
        "id": 1,
        "name": "TEST",
        "secondName": "TES1",
        "lastName": "TEST2",
        "secondSurname": "TES3",
        "numberId": "123",
        "phone": "213231223123",
        "cellphone": "12312312213",
        "email": "TEST@TEST.COM",
        "birthDate": "2010-01-01",
        "occupation": "TESTER",
        "TypeIDId": 1,
        "GenderId": 1,
        "MaritalStatusId": 2,
        "createdAt": "2022-12-12T20:48:00.956Z",
        "updatedAt": "2022-12-12T20:48:00.956Z",
        "Address": {
            "id": 1,
            "address": "DASD 12",
            "zone": 1,
            "district": "TEST- 22",
            "PersonId": 1,
            "cityString": "Ayapel",
            "stateString": "Córdoba",
            "createdAt": "2022-12-12T20:48:00.977Z",
            "updatedAt": "2022-12-12T20:48:00.977Z"
        },
        "ServiceProvider": {
            "id": 1,
            "assignedAdministrator": "NUEVA EPS",
            "regime": 2,
            "PersonId": 1,
            "socioeconomiclevel": 1,
            "moderatorFee": null,
            "createdAt": "2022-12-12T20:48:00.980Z",
            "updatedAt": "2022-12-12T20:48:00.980Z"
        },
        "Gender": {
            "id": 1,
            "name": "Masculino",
            "createdAt": "2022-12-12T08:49:31.202Z",
            "updatedAt": "2022-12-12T08:49:31.202Z"
        },
        "TypeID": {
            "id": 1,
            "name": "Cedula de Ciudadania",
            "createdAt": "2022-12-12T08:49:31.191Z",
            "updatedAt": "2022-12-12T08:49:31.191Z"
        },
        "Relationships": [
            {
                "id": 1,
                "patient": "123",
                "companion": "1234",
                "PatientId": 1,
                "PersonId": 2,
                "TypeRelationshipId": 1,
                "createdAt": "2022-12-12T20:48:01.019Z",
                "updatedAt": "2022-12-12T20:48:01.019Z",
                "TypeRelationship": {
                    "id": 1,
                    "name": "Padre",
                    "createdAt": "2022-12-12T08:49:31.310Z",
                    "updatedAt": "2022-12-12T08:49:31.310Z"
                },
                "Person": {
                    "id": 2,
                    "name": "TESTTT",
                    "secondName": null,
                    "lastName": "TESDASDA",
                    "secondSurname": null,
                    "numberId": "1234",
                    "phone": null,
                    "cellphone": "12312321321",
                    "email": null,
                    "birthDate": null,
                    "occupation": null,
                    "TypeIDId": 1,
                    "GenderId": null,
                    "MaritalStatusId": null,
                    "createdAt": "2022-12-12T20:48:00.992Z",
                    "updatedAt": "2022-12-12T20:48:00.992Z",
                    "Address": null,
                    "ServiceProvider": null,
                    "Gender": null,
                    "TypeID": {
                        "id": 1,
                        "name": "Cedula de Ciudadania",
                        "createdAt": "2022-12-12T08:49:31.191Z",
                        "updatedAt": "2022-12-12T08:49:31.191Z"
                    }
                }
            }
        ],
        "age": "12 Años",
        "companionName": "TESTTTTESDASDA",
        "TypeRelationshipName": "N/A",
        "city": "Ayapel",
        "district": "TEST- 22",
        "state": "Córdoba",
        "zone": "Rural",
        "currentAdministratorName": "NUEVA EPS"
    },
    "TypeServiceId": 1,
    "assignedDate": "2022-11-12",
    "StatusId": 1,
    "stateString": "En espera",
    "patient": 123,
    "PersonId": 10,
    "companion": null,
    "hour": "01:03:57",
    "DoctorId": 2,
    "UserId": 1
}

for (let index = 1; index < 10; index++) {
    
    cita.assignedDate = "2022-12-" + + index
    cita.PersonId++
    console.log("cita", cita.assignedDate)
    Axios.post("http://127.0.0.1:4000/api/v1/attention", cita).catch(error => {
        console.log(error.message)
    })
    
}

for (let index = 17; index < 30; index++) {
    urgencia.assignedDate = "2022-11-" + index
    urgencia.PersonId++
    console.log("urgencia", urgencia.assignedDate)
    Axios.post("http://127.0.0.1:4000/api/v1/attention", urgencia).catch(error => {
        console.log(error.message)
    })
    
}