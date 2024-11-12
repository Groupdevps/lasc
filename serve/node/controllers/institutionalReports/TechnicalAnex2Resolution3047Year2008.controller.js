const { TechnicalAnex2Resolution3047Year2008, EmergencyMedicalHistory , Attention, SubDiagnoseList} = require('../../models')
const editarPDF = require('./pdf.lib.controller')
const anexoFields = require("../../lib/fields/anex2Field")
//metodo para traer todos los datos y rellenar el anexo 2 con los datos existentes
const generateAnex2 = async (AttentionId, Result) => {
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
                    "attentionNumber": AttentionId,
                    "anexoDate": "",
                    "anexoTime": "",                
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
                
                if(Triage){
                    const { date, time} = await Triage
                    Result = {
                        ...Result,
                        "attentionDate": date,
                        "attentionTime": time,
                        "attentionOrigin": "",
                        "triageClassification": "",
                        "refferingProviderTransferred": "",
                        "refferingProviderName": "",
                        "refferingProviderCode": "",
                        "refferingProviderState": "",
                        "refferingProviderCity": "",
                    }
                }
            } 
            if(HistoryPerson){
                const { currentAdministratorName, name, secondName, lastName, secondSurname, numberId, TypeIDId, birthDate, address, state, city, phone, regime } = await HistoryPerson
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
                    "patientRegime": regime,
                }
            }
            
            if(HistoryInfoMedicPerson){
                const { motive } = await HistoryInfoMedicPerson
                Result = {
                    ...Result,
                    "attentionMotive": motive
                }
                
            }
            if(SubDiagnoseLists && SubDiagnoseLists.length>0){
                const diagnosesCIE10Principal = SubDiagnoseLists && SubDiagnoseLists[0] && SubDiagnoseLists[0].SubDiagnose ? SubDiagnoseLists && SubDiagnoseLists[0] && SubDiagnoseLists[0].SubDiagnose: null;
                
                const diagnosesCIE10Related1 = SubDiagnoseLists && SubDiagnoseLists[1] && SubDiagnoseLists[1].SubDiagnose ? SubDiagnoseLists && SubDiagnoseLists[1] && SubDiagnoseLists[1].SubDiagnose: null;

                const diagnosesCIE10Related2 = SubDiagnoseLists && SubDiagnoseLists[2] && SubDiagnoseLists[2].SubDiagnose ? SubDiagnoseLists && SubDiagnoseLists[2] && SubDiagnoseLists[2].SubDiagnose: null;

                const diagnosesCIE10Related3 = SubDiagnoseLists && SubDiagnoseLists[3] && SubDiagnoseLists[3].SubDiagnose ? SubDiagnoseLists && SubDiagnoseLists[3] && SubDiagnoseLists[3].SubDiagnose: null;

                Result = {
                    ...Result,
                    "diagnosesCIE10Principal": diagnosesCIE10Principal ? diagnosesCIE10Principal.code : "" ,
                    "diagnosesCIE10Related1": diagnosesCIE10Related1 ? diagnosesCIE10Related1.code : "",
                    "diagnosesCIE10Related2": diagnosesCIE10Related2 ? diagnosesCIE10Related2.code : "",
                    "diagnosesCIE10Related3": diagnosesCIE10Related3 ? diagnosesCIE10Related3.code : "",
                    "diagnosesDescriptionPrincipal":  diagnosesCIE10Principal ? diagnosesCIE10Principal.name : "" ,
                    "diagnosesDescriptionRelated1": diagnosesCIE10Related1 ? diagnosesCIE10Related1.name : "",
                    "diagnosesDescriptionRelated2": diagnosesCIE10Related2 ? diagnosesCIE10Related2.name : "",
                    "diagnosesDescriptionRelated3": diagnosesCIE10Related3 ? diagnosesCIE10Related3.name : "",
                    "patientDestination": "",
                    "informantName": "",
                    "informantPosition": "",
                    "informantPhoneCode": "",
                    "informantPhoneNumber": "",
                    "informantPhoneExtension": "",
                    "informantCellphone": "",
                }
                
                
    
            }
            return Result
        }else{
            return clinicHistory
        }
       

    } catch (error) {
        console.log("error generateAnex2 in TecnicalAnex2 Controller", error)
        return {}
    }
}

const create = async (req, res) => {
    try {
        const created = await TechnicalAnex2Resolution3047Year2008.create(req.body)
        if(created){
            res.status(200).json(created)
        }else{
            res.status(404).json("Anexo no creado")
        }
    } catch (error) {
        console.log("create tecnhical anex 2 controller error")
        res.status(404).json("Error al crear Anexo 2")
    }
}

const get = async (req, res) => {
    try {
        const { AttentionId } = await req.params
        const result =  await TechnicalAnex2Resolution3047Year2008.findOne({
            where: {
                AttentionId : AttentionId
            }
        })
        if(result){
            res.status(200).json(result)
        }else{
            const temp = await generateAnex2(AttentionId)
            if (temp){
                res.status(200).json(temp)
            }else{
                res.status(404).json("Anexo no encontrado")
            }
        }

    } catch (error) {
        console.log("get tecnhical anex 2 controller error")
        res.status(404).json("Error al buscar Anexo 2")
    }
}

const update = async (req, res) => {
    try {
        const updated = TechnicalAnex2Resolution3047Year2008.update(req.body,{where: {id: req.params.id}})
        if(updated){
            res.status(200).json(updated)
        }else{
            res.status(404).json("Anexo no actualizado")
        }

    } catch (error) {
        console.log("update tecnhical anex 2 controller error", error)
        res.status(404).json("Error al actualizar Anexo 2")
    }
}

const download = async (req,res) => {
    // Ruta del PDF existente
    const pdfPath = './public/anexos/anexo_2.pdf'
    // Datos del JSON
    

    const {AttentionId , id} = req.params
    const jsonData = await TechnicalAnex2Resolution3047Year2008.findByPk(id)
    const modifiedPdfBytes = await editarPDF(pdfPath, jsonData, anexoFields );

    // Configurar el encabezado de la respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=anexo2-${AttentionId}.pdf`);

     // Enviar el contenido del PDF como respuesta
     res.end(modifiedPdfBytes, 'binary');
}

module.exports = {create, get, update, download}