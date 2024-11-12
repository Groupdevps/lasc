const pdfMake = require('pdfmake');
const { generatePDF , sendPDFResponse} = require('./pdfDownload.controller');
const { print, printPdf } = require('../laboratory/laboratoryResult.controller')
const { LaboratoryResult, sequelize, AnalysisResult, AnalysisLaboratory, Analysis, AnalysisType, OrderCupsList, CupsList, User, Attention, HistoryPerson, Order, Status } = require('../../models');

const include = [
    'Center', 
    {
        model: Order,
        include: [{
            model: OrderCupsList,
            include: [CupsList]
        }],
        required: true
    }, 
    {
        model: User,
        as: "Doctor"
    }, 
    {
        model: Attention,
        include: [
            'Center', 'TypeService', 'Status', 'User', 'Triage',
            {
                model: HistoryPerson,
                include: ['Companion', 'TypeID', 'Gender']
            }
        ],
        required: true
    }, 
    {
        model: AnalysisResult,
        include: [{
            model: AnalysisLaboratory,
            include: [
                {
                    model: Analysis,
                    include: [AnalysisType],
                    required: true
                },
                CupsList
            ],
            required: true
        }],
        required: true
    }
];
const processData = (laboratoryResults) => {
    if (!laboratoryResults || laboratoryResults.length === 0) {
        return { error: "No se encontraron resultados." };
    }

    const result = laboratoryResults[0];

    if (!result.Attention || !result.Attention.HistoryPerson) {
        throw new Error("Datos insuficientes para procesar la información del paciente");
    }

    const historyPerson = result.Attention.HistoryPerson;
    historyPerson.fullname = `${historyPerson.name || ''} ${historyPerson.secondName || ''} ${historyPerson.lastName || ''} ${historyPerson.secondSurname || ''}`;
    historyPerson.GenderName = historyPerson.Gender?.name || '';

    result.core = {
        title: 'RESULTADO LABORATORIO\n Orden ' + (result.Order?.orderNumber || ''),
        subject: [
            {
                subtitle: 'Información del Centro',
                header: ['name', 'nit', 'phone', 'address'],
                title: ['Nombre', 'Nit', 'Telefono', 'Direccion'],
                data: result.Attention.Center || {},
                isHorizontal: true
            },
            {
                subtitle: 'Datos del Paciente',
                header: ['fullname', 'numberId', 'GenderName', 'age', 'phone', 'currentAdministratorName'],
                title: ['Nombre', 'Numero de documento', 'Sexo', 'Edad', 'Telefono', 'EPS'],
                data: result.Attention.HistoryPerson || {},
                isHorizontal: true
            },
            
            ...laboratoryResults.map(lr => ([
                {
                    
                    subtitle: lr.AnalysisResults[0].AnalysisLaboratory?.CupsList?.description || 'Laboratorio',
                    header: ['AnalysisName', 'Units', 'Results', 'ReferenceValue'],
                    title: ['Análisis', 'Unidad', 'Resultados', 'Valores de referencia'],
                    data: lr.AnalysisResults ? lr.AnalysisResults.map(ar => ({
                        AnalysisName: ar.AnalysisLaboratory?.Analysis?.name || 'N/A',
                        Units: ar.AnalysisLaboratory?.Analysis?.units || 'N/A',
                        Results: ar.result || 'N/A',
                        ReferenceValue: ar.AnalysisLaboratory?.Analysis?.referenceValue || 'N/A'
                    })) : [],
                    isHorizontal: true
                },
                {
                    subtitle: 'Metodología y Notas',
                    header: ['metodology', 'note'],
                    title: ['Metodología', 'Nota'],
                    data: [{ metodology: lr.metodology || '', note: lr.note || '' }],
                    isHorizontal: true
                },
                {
                    subtitle: 'Generado por',
                    header: ['name'],
                    title: ['Doctor'],
                    data: [{ name: lr.User ? lr.User.name : 'Desconocido' }],
                    isHorizontal: true
                }
            ])).flat()
        ]
    };

    return result;
};





// Supongamos que `laboratoryResults` es un array que contiene múltiples `LaboratoryResult`
// Cada `LaboratoryResult` tiene un array asociado de `AnalysisResults`



// Ahora `formattedResults` contiene los datos estructurados para cada `LaboratoryResult`

const generateAndSendPDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

const laboratoryResultDownload = async (req, res) => {
    try {
        const { order } = req.params;
        const results = await LaboratoryResult.findAll({
            where: { OrderId: order },
            include
        });
        if (results) {
            const result = processData(results);
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
    laboratoryResultDownload
};
