const { Discharge, Attention, HistoryPerson, User } = require('../../models');
const { generatePDF, sendPDFResponse } = require('../downloadControllers/pdfDownload.controller');

const include = [
    { model: User},
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

const processDischargeData = (discharge) => {
    if (!discharge) {
        return { message: "No se encontró el alta." };
    }

    const historyPerson = discharge.Attention?.HistoryPerson;
    if (!historyPerson) {
        throw new Error("Datos insuficientes para procesar la información del paciente");
    }

    // Procesar datos del paciente
    historyPerson.fullname = `${historyPerson.name || ''} ${historyPerson.secondName || ''} ${historyPerson.lastName || ''} ${historyPerson.secondSurname || ''}`;
    historyPerson.GenderName = historyPerson.Gender ? historyPerson.Gender.name : 'Desconocido';

    // Estructura principal del resultado
    const result = {
        core:{
            title: 'EGRESO\n',
            subtitle: '',
            subject: [
                {
                    subtitle: 'Información del Centro',
                    header: ['name', 'nit', 'phone', 'address'],
                    title: ['Nombre', 'Nit', 'Teléfono', 'Dirección'],
                    data: discharge.Attention.Center || {},
                    isHorizontal: true
                },
                {
                    subtitle: 'Datos del Paciente',
                    header: ['fullname', 'numberId', 'GenderName', 'age', 'phone', 'currentAdministratorName'],
                    title: ['Nombre', 'Número de documento', 'Sexo', 'Edad', 'Teléfono', 'EPS'],
                    data: historyPerson,
                    isHorizontal: true
                },
                {
                    subtitle: 'Detalles del Alta',
                    header: ['weight', 'size', 'arterialTsn', 'cardiacFr', 'respiratoryFr', 'pulse', 'temperature', 'eyeOpening', 'verbalResponse', 'motorResponse'],
                    title: ['Peso', 'Tamaño', 'Tensión Arterial', 'Frecuencia Cardíaca', 'Frecuencia Respiratoria', 'Pulso', 'Temperatura', 'Apertura Ocular', 'Respuesta Verbal', 'Respuesta Motora'],
                    data: {
                        weight: discharge.weight || 'N/A',
                        size: discharge.size || 'N/A',
                        arterialTsn: discharge.arterialTsn || 'N/A',
                        cardiacFr: discharge.cardiacFr || 'N/A',
                        respiratoryFr: discharge.respiratoryFr || 'N/A',
                        pulse: discharge.pulse || 'N/A',
                        temperature: discharge.temperature || 'N/A',
                        eyeOpening: discharge.eyeOpening || 'N/A',
                        verbalResponse: discharge.verbalResponse || 'N/A',
                        motorResponse: discharge.motorResponse || 'N/A'
                    },
                    isHorizontal: true
                },
                {
                    subtitle: 'Condiciones Generales al Salir',
                    header: ['generalConditionsUponDeparture'],
                    title: ['Condiciones Generales'],
                    data: discharge.generalConditionsUponDeparture || 'N/A',
                    isHorizontal: false
                },
                {
                    subtitle: 'Exámenes Físicos',
                    header: ['headAndNeck', 'chest', 'abdomen', 'extremities', 'neurological', 'genitourinary'],
                    title: ['Cabeza y Cuello', 'Pecho', 'Abdomen', 'Extremidades', 'Neurológico', 'Genitourinario'],
                    data: {
                        headAndNeck: discharge.headAndNeck || 'N/A',
                        chest: discharge.chest || 'N/A',
                        abdomen: discharge.abdomen || 'N/A',
                        extremities: discharge.extremities || 'N/A',
                        neurological: discharge.neurological || 'N/A',
                        genitourinary: discharge.genitourinary || 'N/A',
                        skinFannels: discharge.skinFannels || 'N/A',
                        lumbarOsteotendinous:discharge.lumbarOsteotendinous || 'N/A'
                    },
                    isHorizontal: true
                },
                {
                    subtitle: 'Evoluciones',
                    header: ['evolutions'],
                    title: ['Evoluciones'],
                    data: discharge.evolutions || 'N/A',
                    isHorizontal: false
                },
                {
                    subtitle: 'Justificación de Hospitalización',
                    header: ['hospitalizationJustification'],
                    title: ['Justificación de Hospitalización'],
                    data: discharge.hospitalizationJustification || 'N/A',
                    isHorizontal: false
                },
                {
                    subtitle: 'Órdenes al Alta',
                    header: ['orders'],
                    title: ['Órdenes'],
                    data: discharge.orders || 'N/A',
                    isHorizontal: false
                },
                {
                    subtitle: 'Diagnósticos de Alta',
                    header: ['mainDischargeDiagnosis', 'diagnosis1Discharge', 'diagnosis2Discharge', 'diagnosis3Discharge'],
                    title: ['Diagnóstico Principal', 'Diagnóstico 1', 'Diagnóstico 2', 'Diagnóstico 3'],
                    data: {
                        mainDischargeDiagnosis: discharge.mainDischargeDiagnosis || 'N/A',
                        diagnosis1Discharge: discharge.diagnosis1Discharge || 'N/A',
                        diagnosis2Discharge: discharge.diagnosis2Discharge || 'N/A',
                        diagnosis3Discharge: discharge.diagnosis3Discharge || 'N/A'
                    },
                    isHorizontal: true
                },
                {
                    subtitle: 'Propósito de Consulta',
                    header: ['consultationSPurpose'],
                    title: ['Propósito de Consulta'],
                    data: discharge.consultationSPurpose || 'N/A',
                    isHorizontal: false
                },
                {
                    subtitle: 'Causa Externa',
                    header: ['externalCause'],
                    title: ['Causa Externa'],
                    data: discharge.externalCause || 'N/A',
                    isHorizontal: false
                },
                {
                    subtitle: 'Razón de Salida',
                    header: ['departureReason'],
                    title: ['Razón de Salida'],
                    data: discharge.departureReason || 'N/A',
                    isHorizontal: false
                },
                {
                    subtitle: 'Estado al Salir',
                    header: ['exitStatus'],
                    title: ['Estado al Salir'],
                    data: discharge.exitStatus || 'N/A',
                    isHorizontal: false
                },
                {
                    subtitle: 'Generado por',
                    header: ['name'],
                    title: ['Doctor'],
                    data: [{ name: discharge.User ? discharge.User.name : 'Desconocido' }],
                    isHorizontal: true
                }
            ]
        }
    };

    return result;
};

const generateAndSendDischargePDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

const getDischargeByAttention = async (req, res) => {
    try {
        const { id } = req.params;
        const discharge = await Discharge.findOne({
            where: { id: id },
            include
        });

        if (discharge) {
            const result = processDischargeData(discharge);
            generateAndSendDischargePDF(res, result);
        } else {
            res.status(404).json({
                message: 'No se encontró el alta médica.'
            });
        }
    } catch (error) {
        console.error('Error al generar el PDF de alta:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDischargeByAttention
};
