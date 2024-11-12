const {Furtran} = require('../../models')
const editarPDF = require('./pdf.lib.controller')
const FurtransFields = require("../../lib/fields/furtranField.js")

const formatFurtran = {
    AttentionId : null,
    UserId : null,
    FurtranParteA : {
      "dateFiled": "",
      "rg": "",
      "previousFiledNumber": "",
      "filedNumber": "",
      "billNumber": "",
      "prestador": {
        "businessName": "",
        "enablementCode": "",
        "nit": ""
      },
      "victim": {
        "lastName": "",
        "secondSurname": "",
        "firstName": "",
        "secondName": "",
        "typeId": "",
        "numberId": "",
        "birthDate": "",
        "gender": "",
        "address": "",
        "state": "",
        "stateCode": "",
        "city": "",
        "cityCode": "",
        "phone": "",
        "conditionInjured": ""
      },
      "siteAccident": {
        "natureOfEvent": "",
        "whichOther": "",
        "occurrenceAddress": "",
        "accidentDate": "",
        "accidentTime": "",
        "state": "",
        "stateCode": "",
        "city": "",
        "cityCode": "",
        "zone": "",
        "accidentDescription": ""
      },
      "vehicleAccident": {
        "vehicleType": "",
        "brand": "",
        "plate": "",
        "serviceType": "",
        "insuranceCode": "",
        "policyNumber": "",
        "validSince": "",
        "validUntil": "",
        "authorityIntervention": "",
        "policySurplusCharge": ""
      },
      "vehicleOwner": {
        "lastName": "",
        "secondSurname": "",
        "firstName": "",
        "secondName": "",
        "typeId": "",
        "numberId": "",
        "address": "",
        "state": "",
        "stateCode": "",
        "city": "",
        "cityCode": "",
        "phone": ""
      },
      "piePaginaParteA": {
        "totalFolio": ""
      }
    },
    FurtranParteB : {
      "driverVehicle": {
        "lastName": "",
        "secondSurname": "",
        "firstName": "",
        "secondName": "",
        "typeId": "",
        "numberId": "",
        "address": "",
        "state": "",
        "stateCode": "",
        "city": "",
        "cityCode": "",
        "phone": ""
      },
      "remision": {
        "referral": {
          "type": "",
          "date": "",
          "time": "",
          "provider": {
            "name": "",
            "inscriptionCode": "",
            "professional": "",
            "professionalPosition": ""
          }
        },
        "acceptance": {
          "date": "",
          "time": "",
          "provider": {
            "name": "",
            "professional": "",
            "professionalPosition": ""
          }
        }
      },
      "protectionMobilizationVictim": {
        "plate": "",
        "transportVictimFrom": "",
        "transportVictimSince": "",
        "transportationType": "",
        "place": ""
      },
      "certificateMedicalCareVictim": {
        "entry": {
          "date": "",
          "time": "",
          "diagnoses": {
            "principalCIE10": "",
            "related1CIE10": "",
            "related2CIE10": ""
          }
        },
        "egress": {
          "date": "",
          "time": "",
          "diagnoses": {
            "principalCIE10": "",
            "related1CIE10": "",
            "related2CIE10": ""
          }
        },
        "profesionalTratante": {
          "lastName": "",
          "secondSurname": "",
          "firstName": "",
          "secondName": "",
          "typeId": "",
          "numberId": "",
          "medicalRecordNumber": ""
        },
        "amparosReclamados": {
          "surgicalMedicalExpenses": {
            "billed": "",
            "fosyga": ""
          },
          "mobilizationExpenses": {
            "billed": "",
            "fosyga": ""
          }
        }
      },      
      "providerHealth": {
        "name": "",
        "signature": ""
      }
    }
  }
  const generateFurtran = async (AttentionId, Result) => {
    try {
        Result = {}
        //informacion de la atencion
        const clinicHistory = await EmergencyMedicalHistory.findOne({
            where: {AttentionId : AttentionId}, 
            include : [ {
                model: Attention,
                include: ['Center', 'Triage']
            }, 'HistoryPerson' , 'HistoryInfoMedicPerson', { model: SubDiagnoseList , as: 'SubDiagnoseLists', include: ['SubDiagnose']}]
        })
        if (clinicHistory) {
            const { Attention: attention , HistoryPerson , HistoryInfoMedicPerson, SubDiagnoseLists } = clinicHistory
            if (attention) {
                const { id, Center, Triage} =  attention
                Result = {
                    ...Result,
                    "UserId": null,
                    "AttentionId": id,
                    "requestNumber": "",
                    "anexoDate": "",
                    "anexoTime": "", 
                    
                    "attentionOrigin": "",
                    "typeAttention": "",
                    "guide": "",
                    "justification": "",

                    
                    "informantName": "",
                    "informantPosition": "",
                    "informantPhoneCode": "",
                    "informantPhoneNumber": "",
                    "informantPhoneExtension": "",
                    "informantCellphone": "",
                }
                if(Center){
                    const {name, nit, phone} = await Center
                    Result = {
                        ...Result,
                        "providerName": name,
                        "providerCode": "", //codigo de proveedor
                        "providerTypeId": 'nit',
                        "providerNumberId": nit,
                        "providerAddress": "",
                        "providerState": "",
                        "providerCity": "",
                        "providerPhoneCode": "",
                        "providerPhoneNumber": phone,

                    }
                }
               
            } 
            if(HistoryPerson){
                const { currentAdministratorName, name, secondName, lastName, secondSurname, numberId, TypeIDId, birthDate, address, state, city, phone,cellphone, email, regime } = await HistoryPerson
                Result = {
                    ...Result,
                    "payerName": currentAdministratorName,
                    "payerCode": "",
                    "patientFirstName": name,
                    "patientSecondName": secondName,
                    "patientLastName": lastName,
                    "patientSecondSurname": secondSurname,
                    "patientTypeId": `${TypeIDId}`,
                    "patientNumberId": numberId,
                    "patientBirthDate": birthDate,
                    "patientAddress": address,
                    "patientState": state,
                    "patientCity": city,
                    "patientPhone": phone,
                    "patientCellphone": cellphone,
                    "patientEmail": email,
                    "patientRegime": regime,
                }
            }
            
            
            if(SubDiagnoseLists && SubDiagnoseLists.length>0){
                const diagnosesCIE10Principal = SubDiagnoseLists && SubDiagnoseLists[0] && SubDiagnoseLists[0].SubDiagnose ? SubDiagnoseLists && SubDiagnoseLists[0] && SubDiagnoseLists[0].SubDiagnose: null;
                
                const diagnosesCIE10Related1 = SubDiagnoseLists && SubDiagnoseLists[1] && SubDiagnoseLists[1].SubDiagnose ? SubDiagnoseLists && SubDiagnoseLists[1] && SubDiagnoseLists[1].SubDiagnose: null;

                const diagnosesCIE10Related2 = SubDiagnoseLists && SubDiagnoseLists[2] && SubDiagnoseLists[2].SubDiagnose ? SubDiagnoseLists && SubDiagnoseLists[2] && SubDiagnoseLists[2].SubDiagnose: null;


                Result = {
                    ...Result,
                    "diagnosesCIE10Principal": diagnosesCIE10Principal ? diagnosesCIE10Principal.code : "" ,
                    "diagnosesCIE10Related1": diagnosesCIE10Related1 ? diagnosesCIE10Related1.code : "",
                    "diagnosesCIE10Related2": diagnosesCIE10Related2 ? diagnosesCIE10Related2.code : "",
                    "diagnosesDescriptionPrincipal":  diagnosesCIE10Principal ? diagnosesCIE10Principal.name : "" ,
                    "diagnosesDescriptionRelated1": diagnosesCIE10Related1 ? diagnosesCIE10Related1.name : "",
                    "diagnosesDescriptionRelated2": diagnosesCIE10Related2 ? diagnosesCIE10Related2.name : "",
                }
                
                
    
            }
            return Result
        }else{
            return clinicHistory
        }
       

    } catch (error) {
        console.log("error generateAnex9 in TecnicalAnex9 Controller", error)
        return {}
    }
  }
  const generate = async (req, res) => {
    try {
        const { AttentionId } = await req.params
        const result =  await Furtran.findOne({
            where: {
                AttentionId : AttentionId
            }
        })
        if(result){
            res.status(200).json(result)
        }else{
            const temp = await generateFurtran(AttentionId)
            if (temp){
                res.status(200).json(temp)
            }else{
                res.status(404).json("Anexo no encontrado")
            }
        }

    } catch (error) {
        console.log("generate tecnhical Anexo 9 controller error", error)
        res.status(404).json("Error al buscar Anexo 9")
    }
  }

const create = async (req, res) => {
    
    try {
        
        const createdFurtran = await Furtran.create(req.body)
        res.status(200).json(createdFurtran)
        

    } catch (error) {
        console.log('Error in createFurtran in Furtran controller', error)
        res.status(404).json("no se pudo crear Furtran")
    }
}

const get = async (req, res) => {
    
    try {
        console.log("GET furtran ", req.params )
       
        const {AttentionId, id} = req.params;
        const FurtranJson = await Furtran.findByPk(id)
        res.status(200).json(FurtranJson)

    } catch (error) {
        console.log('Error in getFurtran in Furtran controller', error)
        res.status(404).json("Furtran no encontrado")
    }
}

const update = async (req, res) => {
    
    try {
        const{id} = req.params
        const updatedFurtran = await Furtran.update(req.body, {where:{id: id}})
        res.status(200).json(updatedFurtran)
        

    } catch (error) {
        console.log('Error in newFurtran in Furtran controller', error)
        res.status(404).json("no se pudo actualizar Furtran")
    }
}

// Función para actualizar el formatoFurtran con los datos del POST
function updateFormatFurtran(newFurtran,AttentionId, UserId, FurtranParteA, FurtranParteB) {
  // Actualizar FurtranParteA
  if (FurtranParteA) {
    Object.assign(newFurtran.FurtranParteA, FurtranParteA);
    newFurtran.FurtranParteA = JSON.stringify(newFurtran.FurtranParteA);
  }

  // Actualizar FurtranParteB
  if (FurtranParteB) {
    Object.assign(newFurtran.FurtranParteB, FurtranParteB);
    newFurtran.FurtranParteB = JSON.stringify(newFurtran.FurtranParteB);
  }
  // Actualizar AttentionId
  if (AttentionId) {
    Object.assign(newFurtran.AttentionId, AttentionId);
  }
  // Actualizar UserId
  if (UserId) {
    Object.assign(newFurtran.UserId, UserId);
  }
  return newFurtran;
}


const download = async (req,res) => {
  // Ruta del PDF existente
  const pdfPath = './public/anexos/furtran.pdf'
  // Datos del JSON
  

  const {id} = req.params
  const jsonData =  await Furtran.findByPk(id)
  const modifiedPdfBytes = await editarPDF(pdfPath, jsonData, FurtransFields);

  // Configurar el encabezado de la respuesta
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=Furtrans-${jsonData.AttentionId}.pdf`);

   // Enviar el contenido del PDF como respuesta
   res.end(modifiedPdfBytes, 'binary');
}

module.exports ={
    create,
    get,
    update,
    download,
    generate,
}
