const {Satisfaction, Attention} = require ('../../models')
const Fields = require ("../../lib/fields/satisfaction.field")
const editarPDF = require('./pdf.lib.controller')

const create = async (req, res) => {
    try {
        const newProof = await Satisfaction.create(req.body)
        res.status(201).json(newProof)
    } catch (error) {
        console.log(error, 'error in create satisfaction customer controller')
        res.status(404).json('no se pudo guardar informacion')
    }
}

const generate = async (req, res) => {
    try {
        const { AttentionId } = req.params;
        
        const attention = await Attention.findOne({
            where: {
                id: AttentionId
            },
            include: ['HistoryPerson']
        });

        if (!attention) {
            throw new Error('Atención no encontrada');
        }

        const { HistoryPerson, assignedDate, egressDate } = attention;
        
        if (!HistoryPerson) {
            throw new Error('Información del paciente no encontrada');
        }

        const { fullName = "" , currentAdministratorName = "" } = HistoryPerson;
        
        const data = {
            patientFullName: fullName ?? "", 
            admissionNumber: AttentionId ?? "", 
            epr: currentAdministratorName ?? "", 
            admissionDate: assignedDate ?? "", 
            departureDate: egressDate ?? "", 
        };
        
        res.status(200).json(data);
    } catch (error) {
        console.log(error, 'error in generate satisfaction customer controller');
        res.status(404).json({ message: error.message });
    }
};



const get = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Satisfaction.findByPk(id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error, 'error in get satisfaction customer controller')
        res.status(404).json('no se pudo obtener informacion ')
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const edited = await Satisfaction.update(req.body, {
            Where: {
                id: id
            }
        })
    } catch (error) {
        console.log(error, 'error in update satisfaction customer controller')
        res.status(404).json('no se actualizo informacion ')
    }
}

const download = async (req,res) => {
    // Ruta del PDF existente
    const pdfPath = './public/anexos/satisfaccion.pdf'
    // Datos del JSON
    

    const {id} = req.params
    const jsonData =  await Satisfaction.findByPk(id)

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