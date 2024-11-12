const Axios = require("axios");



let person =  {
    "age": "22 Años",
    "numberId": 9959,
    "name": "test",
    "secondName": "test3",
    "lastName": "test5",
    "secondSurname": "tee3",
    "TypeIDId": 1,
    "GenderId": 2,
    "birthDate": "2000-02-01",
    "phone": 1234,
    "cellphone": 12345,
    "email": "test@tesss.com",
    "occupation": "Esturiante Bachiller",
    "Address": {
        "state": 1,
        "stateString": "Antioquia",
        "city": 1,
        "cityString": "Medellín",
        "district": "testcr",
        "zone": 1,
        "address": "test testtt cr 2"
    },
    "Relationships":[ { 
            "relationshipId": 1,
            "name": "test father",
            "TypeIDId": 1,
            "numberId": 8568,
            "cellphone": 12344445
     
    }],
    "ServiceProvider": {
        "assignedCenterId": 1,
        "nit": "Demo",
        "assignedCenter": "Demo",
        "regime": 1,
        "socioeconomiclevel": 1,
        "moderatorFee": 1
    }
}
let PeopleList = [];



for (let index = 0; index < 20; index++) {
    
    person.numberId++
    person.name = person.name + index
    person.Relationships[0].numberId++
    person.Relationships[0].name = "companion" + index
    Axios.post("http://127.0.0.1:4000/api/v1/person", person).catch(error => {
        console.log(error)
    })
    
}


