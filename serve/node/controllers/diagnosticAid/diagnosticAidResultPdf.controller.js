const pdfMake = require('pdfmake');
const { diagnosticAidResult, Attention, HistoryPerson, User } = require('../../models');
const { generatePDF, sendPDFResponse } = require('../downloadControllers/pdfDownload.controller');

const include = [
    'User', 'Order',
    {
        model: Attention,
        include: [
            'Center', 'TypeService', 'Status', 'User', 'CAU',
            {
                model: HistoryPerson,
                include: ['Companion', 'TypeID', 'Gender']
            }
        ]
    }
];

const processData = (diagnosticAidResults) => {
    if (!diagnosticAidResults || diagnosticAidResults.length === 0) {
        return { error: "No se encontraron resultados." };
    }

    const result = diagnosticAidResults[0];

    // Validar la información del paciente
    if (!result.Attention || !result.Attention.HistoryPerson) {
        throw new Error("Datos insuficientes para procesar la información del paciente");
    }

    // Procesar datos del paciente
    const historyPerson = result.Attention.HistoryPerson;
    historyPerson.fullname = `${historyPerson.name || ''} ${historyPerson.secondName || ''} ${historyPerson.lastName || ''} ${historyPerson.secondSurname || ''}`;
    historyPerson.GenderName = historyPerson.Gender ? historyPerson.Gender.name : 'Unknown';

    // Estructura principal del resultado
    result.core = {
        title: 'RESULTADO AYUDA DIAGNÓSTICA\n Orden ' + (result.Order?.orderNumber || ''),
        subtitle: '',
        subject: [
            {
                subtitle: 'Información del Centro',
                header: ['name', 'nit', 'phone', 'address'],
                title: ['Nombre', 'Nit', 'Teléfono', 'Dirección'],
                data: result.Attention.Center || {},
                isHorizontal: true
            },
            {
                subtitle: 'Datos del Paciente',
                header: ['fullname', 'numberId', 'GenderName', 'age', 'phone', 'currentAdministratorName'],
                title: ['Nombre', 'Número de documento', 'Sexo', 'Edad', 'Teléfono', 'EPS'],
                data: historyPerson, // Datos procesados del paciente
                isHorizontal: true
            },
            ...diagnosticAidResults.map(dar => ([
                {
                    subtitle: dar.Cup?.description || 'Estudio Diagnóstico',
                    header: ['name', 'report', 'conclusion', 'note'],
                    title: ['Nombre', 'Resultado', 'Conclusión', 'Nota'],
                    data: {
                        name: dar.Cup?.description || 'N/A',
                        result: dar.report || 'N/A',
                        conclusion: dar.conclusion || 'N/A', 
                        note: dar.note || 'N/A'
                    },
                    isHorizontal: false
                },
                {
                    subtitle: 'Generado por',
                    header: ['name'],
                    title: ['Doctor'],
                    data: [{ name: dar.User ? dar.User.name : 'Desconocido' }],
                    isHorizontal: true
                }
            ])).flat()
        ]
    };

    return result;
};


const generateAndSendPDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

const getDiagnosticAidResultByOrder = async (req, res) => {
    try {

        const {order} = req.params
        const where = {};
        if (order) {
            where['$Order.orderNumber$'] = order;
        }
        const info = await diagnosticAidResult.findAll({
            where,
            include
        });
        console.log("info", info)
        if (info) {
            const result = await processData(info);
            console.log('***************RESULT CORE AFTER PROCEDD DATA', result.core)
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
    getDiagnosticAidResultByOrder
};
