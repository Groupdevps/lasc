const orden = {
    id: 1,
    AttentionId : 1,
    PersonId: 1,
    CenterId: 1,
    UserId: 1,
    OrderTypeId: 1,
    orderNumber: "0000001",
    OrderMedicines: [
        {
            id: 1,
            OrderId: 1,
            MedicineId: 1,
            StatusId:1,
            OrderDispatchId: 1,
            "Medicine": {
                id: 1,
                MedicationListId: 1,
                amount: 20,
                dosage: "1 diario",
                "MedicationList": {
                    id: 1,
                    codigo_atc:"V03AB16",
                    descripcion_atc: "ETANOL"
                }

            }
        }
    ]
}

const dispatch = {
    id: 2,
    AttentionId : 1,
    PersonId: 1,
    CenterId: 1,
    UserId: 2,
    OrderTypeId: 2,
    orderNumber: "0000002", //NUMERO DE DESPACHO
    "OrderType":{
        name: "DESPACHO"
    },
    OrderDispatch: [
        {
            id: 1,
            OrderId: 1,
            ProductId: 1,
            StatusId:2,
            OrderMedicineId: 1,
            OrderInsumoId: null,
            "Product": {
                id: 1,
                codigo_atc:"V03AB16",
                name: "ETANOL",
                descripcion: "15MG"

            },
            cant
        }
    ]
}

const despachoInterno = {
    "id": 2,
    "AttentionId": 1,
    "PersonId": 1,
    "CenterId": 1,
    "UserId": 2,
    "OrderTypeId": 2,
    "orderNumber": "0000002",
    "OrderType": {
      "name": "DESPACHO INTERNO"
    },
    "DispatchDetail": [
      {
        "id": 1,
        "ProductId": 1,
        "StatusId": 2,
        "MedicineId": 1,
        "OrderProductId": null,
        "Product": {
          "id": 1,
          "codigo_atc": "V03AB16",
          "name": "ETANOL",
          "descripcion": "15MG"
        },
        "cant": 10
      },
      {
        "id": 2,
        "ProductId": 2,
        "StatusId": 2,
        "MedicineId": null,
        "OrderProductId": 1,
        "Product": {
          "id": 2,
          "codigo_atc": "C01AB01",
          "name": "ASPIRINA",
          "descripcion": "500MG"
        },
        "cant": 5
      }
    ]
  }
  
//npx sequelize-cli model:generate --name OrderSupply --attributes OrderId:integer,ProductId:integer,StatusId:integer,cant:integer