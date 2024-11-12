module.exports = [
    //datos autocompletar
     {
         key : "injuredPersonFullname",
         type : "text",   
         x : 43, 
         y : 148
     },
     {
         key : "injuredPersonAdmissionDate",
         type : "text",   
         x : 372, 
         y : 148
     },
     {
         key : "injuredPersonAdmissionTime",
         type : "text",   
         x : 463, 
         y : 148
     },
     {
         key : "injuredPersonNumberId",
         type : "text",   
         x : 43, 
         y : 181
     },
     {
         key : "injuredPersonTypeId",
         type : "select",
        option: {
            de: { key : "de", name: "DE", x: 127, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            cc: { key : "cc", name: "CC", x: 141, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            ti: { key : "ti", name: "TI", x: 162, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            rc: { key : "rc", name: "RC", x: 176, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            ce: { key : "ce", name: "CE", x: 190, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "pa", name: "PA", x: 211, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            as: { key : "as", name: "AS", x: 225, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            ms: { key : "ms", name: "MS", x: 239, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            cn: { key : "cn", name: "CN", x: 260, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pe: { key : "pe", name: "PE", x: 274, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},
            nn: { key : "nn", name: "NN", x: 295, y: 181, w: 5, h : 5, isText : true, size: 12, text : "X"},          
        }
     },
     {
        key : "injuredPersonIssued",
        type : "text",   
        x : 309, 
        y : 181
    },
    {
        key : "injuredPersonGender",
        type : "select",
        option: {
            f: { key : "femenino", name: "F", x: 57, y: 217, w: 5, h : 5, isText : true, size: 12, text : "X"},
            m: { key : "masculino", name: "M", x: 43, y: 217, w: 5, h : 5, isText : true, size: 12, text : "X"},         
        }
    },{
        key : "injuredPersonBirthDate",
        type : "text",   
        x : 113, 
        y : 217
    }
    ,{
        key : "injuredPersonAge",
        type : "text",   
        x : 295, 
        y : 217
    },
    {
        key: "injuredPersonSocialInsurance",
        type: "text",
        x: 372,
        y: 217
    },
    {
        key: "injuredPersonAddress",
        type: "text",
        x: 43,
        y: 250
    },
    {
        key: "injuredPersonState",
        type: "text",
        x: 309,
        y: 250
    },
    {
        key: "injuredPersonCity",
        type: "text",
        x: 421,
        y: 250
    },
    {
        key: "injuredPersonDistrict",
        type: "text",
        x: 43,
        y: 283
    },
    {
        key: "injuredPersonPhone",
        type: "text",
        x: 197,
        y: 283
    },
    {
        key: "injuredPersonCellphone",
        type: "text",
        x: 358,
        y: 283
    },
    {
        key: "injuredPersonProfession",
        type: "text",
        x: 43,
        y: 316
    },
    {
        key: "injuredPersonMaritalStatus",
        type: "text",
        x: 197,
        y: 316
    },
    {
        key: "injuredPersonCompanion",
        type: "text",
        x: 43,
        y: 349
    },
    {
        key: "injuredPersonRelationship",
        type: "text",
        x: 260,
        y: 349
    },
    {
        key: "responsibleInsuranceCarrier",
        type: "text",
        x: 43,
        y: 412
    },
    {
        key: "responsibleAdmissionist",
        type: "text",
        x: 260,
        y: 412
    },
    {
        key: "responsibleOriginSelected",
        type : "select",
        option: {
            mp: { key : "mp", name: "MP", x: 372, y: 391, w: 5, h : 5, isText : true, size: 12, text : "X"},
            ur: { key : "ur", name: "UR", x: 400, y: 391, w: 5, h : 5, isText : true, size: 12, text : "X"},
            amb: { key : "amb", name: "AMB", x: 442, y: 391, w: 5, h : 5, isText : true, size: 12, text : "X"},
            remitido: { key : "remitido", name: "REMITIDO", x: 477, y: 391, w: 5, h : 5, isText : true, size: 12, text : "X"},       
        }
    },
    {
        key: "responsibleOriginName",
        type: "text",
        x: 372,
        y: 412
    },
    {
        key: "accidentInjuredCondition",
        type : "select",
        option: {
            conductor: { key : "conductor", name: "CONDUCTOR", x: 50, y: 463, w: 5, h : 5},
            ocupante: { key : "ocupante", name: "OCUPANTE", x: 92, y: 463, w: 5, h : 5},
            peaton: { key : "peaton", name: "PEATON", x: 120, y: 463, w: 5, h : 5},
            ciclista: { key : "ciclista", name: "CICLISTA", x: 155, y: 463, w: 5, h : 5}         
        }
    },
    {
        key: "accidentAddress",
        type: "text",
        x: 197,
        y: 463
    },
    {
        key: "accidentDate",
        type: "text",
        x: 463,
        y: 463
    },
    {
        key: "accidentTime",
        type: "text",
        x: 372,
        y: 463
    },
    {
        key: "accidentState",
        type: "text",
        x: 43,
        y: 493
    },
    {
        key: "accidentCity",
        type: "text",
        x: 162,
        y: 493
    },
    {
        key: "accidentZone",
        type : "select",
        option: {
            urbana: { key : "urbana", name: "URBANA", x: 288, y: 493, w: 5, h : 5},
            rural: { key : "rural", name: "RURAL", x: 372, y: 493, w: 5, h : 5}         
        }
    },
    {
        key: "accidentReport",
        type: "textarea",
        x: 211,
        y: 526,
        interline : 9.2,
        limitLines : 4,
        limitText : 100
    },
    {
        key: "accidentVehicleBrand",
        type: "text",
        x: 43,
        y: 604
    },
    {
        key: "accidentVehiclePlate",
        type: "text",
        x: 120,
        y: 604
    },
    {
        key: "accidentVehicleType",
        type: "text",
        x: 211,
        y: 604
    },
    {
        key: "accidentVehicleInsured",
        type : "select",
        option: {
            si: { key : "si", name: "SI", x: 337, y: 604, w: 5, h : 5, isText : true, size: 12, text : "X"},
            no: { key : "no", name: "NO", x: 372, y: 604, w: 5, h : 5, isText : true, size: 12, text : "X"},
            fant: { key : "fant", name: "FANT", x: 407, y: 604, w: 5, h : 5, isText : true, size: 12, text : "X"},          
        }
    },
    {
        key: "accidentDriverPatient",
        type : "select",
        option: {
            si: { key : "si", name: "SI", x: 120, y: 628, w: 5, h : 5, isText : true, size: 12, text : "X"},
            no: { key : "no", name: "NO", x: 151, y: 628, w: 5, h : 5, isText : true, size: 12, text : "X"},        
        }
    },
    {
        key: "accidentDriverName",
        type: "text",
        x: 43,
        y: 646
    },
    {
        key: "accidentDriverNumberId",
        type: "text",
        x: 239,
        y: 646
    },
    {
        key: "accidentDriverTypeId",
        type: "select",
        option: {
            ce: { key : "cc", name: "CC", x: 358, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "ti", name: "TI", x: 372, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "rc", name: "RC", x: 386, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "ce", name: "CE", x: 400, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "pa", name: "PA", x: 421, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "as", name: "AS", x: 442, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "ms", name: "MS", x: 463, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "cn", name: "CN", x: 477, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "pe", name: "PE", x: 498, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
            pa: { key : "nn", name: "NN", x: 526, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},           
            cc: { key : "de", name: "DE", x: 540, y: 646, w: 5, h : 5, isText : true, size: 12, text : "X"},
        }
    },
    {
        key: "accidentDriverIssued",
        type: "text",
        x: 43,
        y: 682
    },
    {
        key: "accidentDriverAddress",
        type: "text",
        x: 120,
        y: 682
    },
    {
        key: "accidentDriverCity",
        type: "text",
        x: 358,
        y: 682
    },
    {
        key: "accidentDriverCellphone",
        type: "text",
        x: 463,
        y: 682
    }

 ]


//     "": "test",
//     "": "test",
//     "": "test",
//     "": "test",
//     "": "test",
//     "": "test",
//     "": "test",
//     "": "test",
//     "signature": "test",
//     "fingerprint": "test",
//     "updatedAt": "2024-02-04T10:38:10.017Z",
//     "createdAt": "2024-02-04T10:38:10.017Z"
//   }