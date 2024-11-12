const { PrehospitalCare , EmergencyMedicalHistory} = require ('../../models')
const Fields = require ('../../lib/fields/prehospitalCareField.js')
const editarPDF = require('./pdf.lib.controller')

const generate = async (req, res) => {
    try {
        const { AttentionId } = req.params
        const history = await EmergencyMedicalHistory.findOne({
            where:{
                AttentionId: AttentionId
            }
        })
        res.status(200).json(history)
        
    } catch (error) {
        console.log(error, 'error in generate prehospitalCare controller')
        res.status(404).json('no se genero datos de servicio de urgencia historia clinica de atencion prehospitalaria')
    }
}

const create = async (req,res) => {
    try {
        const newHistory = await PrehospitalCare.create(req.body)
        res.status(201).json(newHistory)
    } catch (error) {
        console.log(error, 'error in create prehospitalCare controller')
        res.status(404).json('no se pudo crear')
    }
}

const get = async (req, res) => {
    try {
        const { id } = req.params
        const result = await PrehospitalCare.findByPk(id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error, 'error in create prehospitalCare controller')
        res.status(404).json('no se pudo crear')
    }
}

const update = async (req, res ) => {
    try {
        const { id } = req.params
        const edited = await PrehospitalCare.update(req.body, {
            where : {
                id: id
            }
        })
        res.status(200).json(edited)
    } catch (error) {
        console.log(error, 'error in create prehospitalCare controller')
        res.status(404).json('no se pudo crear')
    }
}

const download = async (req,res) => {
    // Ruta del PDF existente
    const pdfPath = './public/anexos/prehospitalCare.pdf'
    // Datos del JSON
    

    const {id} = req.params
    const jsonData =  await PrehospitalCare.findByPk(id)

    const modifiedPdfBytes = await editarPDF(pdfPath, jsonData, Fields);

    // Configurar el encabezado de la respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${id}.pdf`);

     // Enviar el contenido del PDF como respuesta
     res.end(modifiedPdfBytes, 'binary');
} 

module.exports = {
    create,
    get,
    update,
    download,
    generate
}