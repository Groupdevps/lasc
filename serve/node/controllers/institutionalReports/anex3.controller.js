const { Anex3,AnexCups, EmergencyMedicalHistory , Attention, SubDiagnoseList} = require('../../models')
const editarPDF = require('./pdf.lib.controller')
const anexoFields = require("../../lib/fields/anex3Field.js")
const center = require('../../models/center.js')
const currentadministrator = require('../../models/currentadministrator.js')

const include= [ AnexCups ]
//metodo para traer todos los datos y rellenar el Anex 3 con los datos existentes
const generateAnex = async (AttentionId, Result) => {
    try {
        Result = {}
        //informacion de la atencion
        const clinicHistory = await EmergencyMedicalHistory.findOne({
            where: {AttentionId : AttentionId}, 
            include : [ {
                model: Attention,
                include: [{
                    model: center,
                    include: [ currentadministrator ]
                }, 'Triage']
            }, 'HistoryPerson' , 'HistoryInfoMedicPerson', { model: SubDiagnoseList , as: 'SubDiagnoseLists', include: ['SubDiagnose']}]
        })
        if (clinicHistory) {
            const { Attention: attention , HistoryPerson , HistoryInfoMedicPerson, SubDiagnoseLists } = clinicHistory
            if (attention) {
                const { id, Center, Triage} =  attention
                Result = {
                    ...Result,
                    "UserId": "",
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
                    const {name, nit, phone, currentadministrator} = await Center
                    const { email, description, TypeCenterId, code, mobilityCode, regime, RegimeId} = currentadministrator
                    Result = {
                        ...Result,
                        "providerName": name,
                        "providerCode": "", //codigo de proveedor
                        "providerTypeId": 'nit',
                        "providerNumberId": nit,
                        "providerAddress": "",
                        "providerState": "ATLÁNTICO",
                        "providerCity": "SOLEDAD",
                        "providerPhoneCode": code,
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
        console.log("error generateAnex3 in TecnicalAnex3 Controller", error)
        return {}
    }
}

const create = async (req, res) => {
    try {
        const {AnexCups} = req.body
        const created = await Anex3.create(req.body, include)
        console.log('TEST CREATE ANEX3 WITH CUPS', created)
        const result = await Anex3.findByPk(created.dataValues.id)
        res.status(200).json(result)
    } catch (error) {
        console.log("create tecnhical Anex 3 controller error")
        res.status(404).json("Error al crear Anex 3")
    }
}

const generate = async (req, res) => {
    try {
        const { AttentionId } = await req.params
        const result =  await Anex3.findOne({
            where: {
                AttentionId : AttentionId
            },include
        })
        if(result){
            res.status(200).json(result)
        }else{
            const temp = await generateAnex(AttentionId)
            if (temp){
                res.status(200).json(temp)
            }else{
                res.status(404).json("Anexo no encontrado")
            }
        }

    } catch (error) {
        console.log("generate tecnhical Anex 3 controller error", error)
        res.status(404).json("Error al buscar Anex 3")
    }
}

const get = async (req, res) => {
    try {
        const { id } = await req.params
        const result =  await Anex3.findByPk(id,include)
        res.status(200).json(result)

    } catch (error) {
        console.log("get tecnhical Anex 3 controller error", error)
        res.status(404).json("Error al buscar Anex 3")
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const updated = Anex3.update(req.body,{where:{id:id}})
        res.status(200).json(updated)

    } catch (error) {
        console.log("update tecnhical Anex 3 controller error", error)
        res.status(404).json("Error al actualizar Anex 3")
    }
}

const download = async (req,res) => {
    // Ruta del PDF existente
    const pdfPath = './public/anexos/anexo_3.pdf'
    // Datos del JSON
    

    const {id,AttentionId} = req.params
    const jsonData = await Anex3.findByPk(id)

    const modifiedPdfBytes = await editarPDF(pdfPath, jsonData, anexoFields);

    // Configurar el encabezado de la respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=anexo3-${AttentionId}-${id}.pdf`);

     // Enviar el contenido del PDF como respuesta
     res.end(modifiedPdfBytes, 'binary');
}

module.exports = {create, get, update,generate, download}