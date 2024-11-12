const pdfMake = require('pdfmake');
const moment = require('moment')
const { generatePDF , sendPDFResponse} = require('./downloadControllers/pdfDownload.controller');
const { getNoteToPdf } = require('./note.controller');

const processData = (result) => {
    console.log('************result:', result);

    const user =  {   }; // Valores predeterminados para evitar errores

    result[0].Attention.HistoryPerson.GenderName = result[0].Attention.HistoryPerson?.Gender?.name;
    

     result.core = {
        title: result[0].NoteType?.name  ,
        subtitle: 'Atencion: ' + result[0].Attention?.attentionCode,
        subject: [ 
        {
            subtitle: 'Datos del Paciente',
            header: ['fullName', 'numberId', 'GenderName', 'age', 'phone', 'currentAdministratorName'],
            title: ['Nombre', 'Documento', 'Sexo', 'Edad', 'Telefono', 'EPS'],
            data: result[0].Attention?.HistoryPerson || [], // Asignar array vacío si result.Attention.HistoryPerson es null
            isHorizontal: true
        },
        // Agregar Diagnosticos solo si existe OrderSubDiagnoses
        ...(result[0].Order?.OrderSubDiagnoses && result[0].Order?.OrderSubDiagnoses.length > 0 ? [{
            subtitle : 'Diagnosticos', 
            header: [ 'SubDiagnose.code', 'SubDiagnose.name'],
            title: ['Codigo','Descripcion'],
            data : result[0].Order?.OrderSubDiagnoses  ,
            isHorizontal: true
        }] : []),
        
        // Agregar Procedimientos solo si existe OrderCupList
        ...(result[0].Order?.OrderCupsLists && result[0].Order?.OrderCupsLists.length > 0 ? [{
            subtitle: 'Procedimientos', 
            header: ['CupsList.code', 'CupsList.description'],
            title: ['Codigo', 'Descripcion'],
            data: result[0].Order?.OrderCupsLists,
            isHorizontal: true
        }] : []),
        // Agregar NOTAS solo si existe
        ...(result && result.length > 0 ? [{
            subtitle: 'Notas', 
            header: ['Fecha', 'Note', 'User'],
            title: ['Fecha', 'Nota', 'Creada por'],
            data: result.map(rec => ({
                Fecha: rec.date  + " " + rec.time ,
                Note: rec.note,
                User: rec.User?.name + " : " + rec.User?.Role?.name
            })),
            isHorizontal: true
        }] : []),
     
        {
            subtitle: 'Generado por',
            header: ['name', 'role'],
            title: ['Usuario', 'Cargo'],
            data: [{
                name: user.name || ' ',
                role: user.Role?.name || ' '
            }],
            isHorizontal: true
        }]
    };
 
    return result;
};

const generateAndSendPDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

const noteDownload = async (req, res) => {
    try {
        const info = await getNoteToPdf(req);
        if (info) {
            const result = processData(info);
            generateAndSendPDF(res, result);
        } else {
            res.status(404).json({
                message: 'No se encontró ningún resultado.'
            });
        } 
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ message : error.message});
    }
};



module.exports = {
    noteDownload
};