const pdfMake = require('pdfmake');
const { generatePDF , sendPDFResponse} = require('./pdfDownload.controller');
const { findItemTotal } = require('../doctor/orderLab.controller')

const processData = (result) => {

    // Propiedades faltantes
    result.Attention.HistoryPerson.fullname = (`${result.Attention.HistoryPerson.name} ${result.Attention.HistoryPerson.secondName} ${result.Attention.HistoryPerson.lastName} ${result.Attention.HistoryPerson.secondSurname}`);
    result.Attention.HistoryPerson.GenderName = result.Attention.HistoryPerson.Gender.name;

    result.core = {
        title : 'Orden Laboratorio',
        subject: [{
            subtitle: 'Información del Centro',
            header: ['name', 'nit', 'phone', 'address'],
            title: ['Nombre', 'Nit', 'Telefono', 'Direccion'],
            data: result.Attention.Center,
        }, 
        {
            subtitle: 'Datos del Paciente',
            header: ['fullname', 'numberId', 'GenderName', 'age', 'phone', 'currentAdministratorName'],
            title: ['Nombre', 'Numero de documento', 'Sexo', 'Edad', 'Telefono', 'EPS'],
            data: result.Attention.HistoryPerson,
        },
        {
            subtitle : 'Diagnosticos :', 
            header: [ 'SubDiagnose.code', 'SubDiagnose.name'],
            title: ['Codigo','Descripcion'],
            data : result.SubDiagnoseLists ,
        },
        {
            subtitle : 'Laboratorios:', 
            header: [ 'CupsList.code', 'CupsList.description'],
            title: ['Codigo','Descripcion'],
            data : result.Orders ,
        },
        {
            subtitle : 'Generado por: ',
            header: ['Doctor'],
            title: ['Doctor'],
            data : result ,
        }]
    };

    return result;
};

const generateAndSendPDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

const orderLabDownload = async (req, res) => {
    try {
        const info = await findItemTotal(req);

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
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    orderLabDownload
};
