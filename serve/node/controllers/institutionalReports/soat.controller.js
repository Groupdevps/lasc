const {SOAT} = require ( "../../models")
const  Fields = require('../../lib/fields/soat.field')
const editarPDF = require('./pdf.lib.controller')
const create = async (req, res) => {
    try {
        const newSOAT = await SOAT.create(req.body)
        res.status(201).json(newSOAT)
    } catch (error) {
        console.log ('Error create SOAT controller', error)
        res.status(404).json("no se creó SOAT")
    }
}

const get = async (req, res) => {
    try {
        const {id} = req.params
        const result = await SOAT.findByPk(id)
        res.status(200).json(result)
    } catch (error) {
        console.log ('Error get SOAT controller', error)
        res.status(404).json("no se encontro SOAT")
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const edited = await SOAT.update(req.body, {
            where:{
                id: id
            }
        })
        res.status(200).json(edited)
    } catch (error) {
        console.log ('Error update SOAT controller', error)
        res.status(404).json("no se actualizo SOAT")
    }
}

const download = async (req,res) => {
    try {
        // Ruta del PDF existente
        const pdfPath = './public/anexos/soat.pdf'
        // Datos del JSON
        

        const {id} = req.params
        const jsonData =  await SOAT.findByPk(id)

        const modifiedPdfBytes = await editarPDF(pdfPath, jsonData, Fields);

        // Configurar el encabezado de la respuesta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=${id}.pdf`);

        // Enviar el contenido del PDF como respuesta
        res.end(modifiedPdfBytes, 'binary');
    } catch (error) {
        console.log(error, 'error in download soat controller')
        res.status(404).json("error al descargar")
    }
}

module.exports = {
    create,
    get,
    update,
    download
}