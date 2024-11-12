const pdfMake = require('pdfmake');
const { generatePDF , sendPDFResponse} = require('./pdfDownload.controller');
const { getEpicrisis } = require('../supports/epicrisi.controller')

const processData = (data) => {
    let result = data.Epicrisi;

    // Propiedades faltantes
    result.Attention.HistoryPerson.fullname = (`${result.Attention.HistoryPerson.name} ${result.Attention.HistoryPerson.secondName} ${result.Attention.HistoryPerson.lastName} ${result.Attention.HistoryPerson.secondSurname}`);
    result.Attention.HistoryPerson.GenderName = result.Attention.HistoryPerson.Gender.name;

    result.core = {
        title: 'Epicrisis',
        subject: [{
            subtitle: 'Información del Centro',
            header: ['name', 'nit', 'phone', 'address'],
            title: ['Nombre', 'Nit', 'Telefono', 'Direccion'],
            data: result.Attention.Center,
        }, {
            subtitle: 'Datos del Paciente',
            header: ['fullname', 'numberId', 'GenderName', 'age', 'phone', 'currentAdministratorName'],
            title: ['Nombre', 'Numero de documento', 'Sexo', 'Edad', 'Telefono', 'EPS'],
            data: result.Attention.HistoryPerson,
        },
        {
            header: ['motive', 'admissionDate', 'egressDate', 'duration'],
            title: ['Motivo', 'Fecha de ingreso', 'Fecha de salida', 'Duracion'],
            data: result,
        },
        {
            subtitle : 'Diagnosticos :', 
            header: [ 'SubDiagnose.code', 'SubDiagnose.name'],
            title: ['Codigo','Descripcion'],
            data : data.SubDiagnoseLists ,
        },
        {
            subtitle: 'Tratamiento Farmacologico :',
            header: ['createdAt', 'CupsList.code', 'CupsList.description', 'amount', 'dosage'],
            title: ['fecha', 'Codigo', 'Medicamento', 'Cantidad', 'Dosis'],
            data: data.Medicines,
        },
        {
            header: ['plan'],
            title: ['Plan'],
            data: result.plan,
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

const epicrisisDownload = async (req, res) => {
    try {
        const epicrisis = await getEpicrisis(req);

        if (epicrisis) {
            const result = processData(epicrisis);
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
    epicrisisDownload
};

