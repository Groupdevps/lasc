const {Furip} = require('../../models')
const editarPDF = require('./pdf.lib.controller')
const furipsFields = require("../../lib/fields/furipsField.js")

const formatFurip = {
    AttentionId : null,
    UserId : null,
    furipParteA : {
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
    furipParteB : {
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
  const generateFurip = async (AttentionId, Result) => {
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
        const result =  await Furip.findOne({
            where: {
                AttentionId : AttentionId
            }
        })
        if(result){
            res.status(200).json(result)
        }else{
            const temp = await generateFurip(AttentionId)
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
        
        const createdFurip = await Furip.create(req.body)
        res.status(200).json(createdFurip)
        

    } catch (error) {
        console.log('Error in createFurip in furip controller', error)
        res.status(404).json({ message : error.message})
    }
}

const get = async (req, res) => {
    
    try {
       
        const {AttentionId, id} = req.params;
        const furip = await Furip.findByPk(id);
        res.status(200).json(furip)

    } catch (error) {
        console.log('Error in getFurip in furip controller', error)
        res.status(404).json("furip no encontrado")
    }
}

const update = async (req, res) => {
    
    try {
        const{id} = req.params
        const updatedFurip = await Furip.update(req.body, {where:{id: id}})
        res.status(200).json(updatedFurip)
        

    } catch (error) {
        console.log('Error in newFurip in furip controller', error)
        res.status(404).json("no se pudo actualizar furip")
    }
}

// Función para actualizar el formatoFurip con los datos del POST
function updateFormatFurip(newFurip,AttentionId, UserId, furipParteA, furipParteB) {
  // Actualizar furipParteA
  if (furipParteA) {
    Object.assign(newFurip.furipParteA, furipParteA);
    newFurip.furipParteA = JSON.stringify(newFurip.furipParteA);
  }

  // Actualizar furipParteB
  if (furipParteB) {
    Object.assign(newFurip.furipParteB, furipParteB);
    newFurip.furipParteB = JSON.stringify(newFurip.furipParteB);
  }
  // Actualizar AttentionId
  if (AttentionId) {
    Object.assign(newFurip.AttentionId, AttentionId);
  }
  // Actualizar UserId
  if (UserId) {
    Object.assign(newFurip.UserId, UserId);
  }
  return newFurip;
}


const download = async (req,res) => {
  // Ruta del PDF existente
  const pdfPath = './public/anexos/furips.pdf'
  // Datos del JSON
  

  const {id} = req.params
  const jsonData =  await Furip.findByPk(id)
  const modifiedPdfBytes = await editarPDF(pdfPath, jsonData, furipsFields);

  // Configurar el encabezado de la respuesta
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=furips-${id}.pdf`);

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
