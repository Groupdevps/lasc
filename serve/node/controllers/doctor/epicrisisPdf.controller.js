const { Attention, Center, Discharge, Qx, Apply, SubSupply, HistoryPerson, EvolutionNote, diagnosticAidResult, EmergencyMedicalHistory, PhysicalExam, PersonalBackground, ObservationEvolutionNote, HistoryInfoMedicPerson, User, TypeService } = require('../../models');
const { Op } = require('sequelize');
const { generatePDF, sendPDFResponse } = require('../downloadControllers/pdfDownload.controller');
const moment = require('moment');
const { includeAttentionById } = require('../includes');
const { getEpicrisisToPdf } = require('./epicrisis.controller');

const formatServiceNotes = (service) => {
    // Selecciona las propiedades relevantes que deseas mostrar
    if(service.type == "Evolución") {
        return `
            Fecha: ${service.date || "NO"} Hora: ${service.hour || "NO"}
            Usuario: ${service.User?.name || "NO"} Cargo: ${service.User?.Role?.name || "NO"}
            Evolución: ${service.observations || "NO"} 
        `.trim(); // .trim() para eliminar espacios en blanco innecesarios
    }
    // Selecciona las propiedades relevantes que deseas mostrar
    if(service.type == "Alta") {
        return `
            Peso: ${service.weight !== null ? service.weight : "NO"}
            Tamaño: ${service.size !== null ? service.size : "NO"}
            TA Arterial: ${service.arterialTsn !== null ? service.arterialTsn : "NO"}
            Frecuencia Cardíaca: ${service.cardiacFr !== null ? service.cardiacFr : "NO"}
            Frecuencia Respiratoria: ${service.respiratoryFr !== null ? service.respiratoryFr : "NO"}
            Pulso: ${service.pulse !== null ? service.pulse : "NO"}
            Temperatura: ${service.temperature !== null ? service.temperature : "NO"}
            Apertura Ocular: ${service.eyeOpening !== null ? service.eyeOpening : "NO"}
            Respuesta Verbal: ${service.verbalResponse !== null ? service.verbalResponse : "NO"}
            Respuesta Motora: ${service.motorResponse !== null ? service.motorResponse : "NO"}
            Condiciones Generales al Abandonar: ${service.generalConditionsUponDeparture || "NO"}
            Cabeza y Cuello: ${service.headAndNeck || "NO"}
            Tórax: ${service.chest || "NO"}
            Abdomen: ${service.abdomen || "NO"}
            Extremidades: ${service.extremities || "NO"}
            Neurológico: ${service.neurological || "NO"}
            Genitourinario: ${service.genitourinary || "NO"}
            Evoluciones: ${service.evolutions || "NO"}
            Justificación de Hospitalización: ${service.hospitalizationJustification || "NO"}
            Órdenes: ${service.orders || "NO"}
            Diagnóstico Principal de Alta: ${service.mainDischargeDiagnosis || "NO"}
            Diagnóstico 1 de Alta: ${service.diagnosis1Discharge || "NO"}
            Diagnóstico 2 de Alta: ${service.diagnosis2Discharge || "NO"}
            Diagnóstico 3 de Alta: ${service.diagnosis3Discharge || "NO"}
            Propósito de la Consulta: ${service.consultationSPurpose || "NO"}
            Causa Externa: ${service.externalCause || "NO"}
            Motivo de Salida: ${service.departureReason || "NO"}
            Estado de Salida: ${service.exitStatus || "NO"}
            Fannels de Piel: ${service.skinFannels || "NO"}
            Osteotendinoso Lumbar: ${service.lumbarOsteotendinous || "NO"}
        `.trim(); // .trim() para eliminar espacios en blanco innecesarios
    }
    
};
// Procesamiento de los datos
const processData = async (result) => {
    
    

    result.attention.HistoryPerson.GenderName = result.attention?.HistoryPerson?.Gender?.name;

    result.core = {
        title: 'EPICRISIS \n HISTORIA CLINICA No ' + result.attention.attentionCode,
        subtitle: result.attention.patient,
        subject: [
            {
                subtitle: 'Datos del Paciente',
                header: ['fullName', 'numberId', 'GenderName', 'birthDate', 'age', 'currentAdministratorName'],
                title: ['Nombre', 'Documento', 'Sexo', 'Fecha de Nacimiento', 'Edad', 'EPS'],
                data: result.attention.HistoryPerson,
                isHorizontal: true
            },
            {
                subtitle: 'Datos de la Atención',
                header: ['assignedDate', 'egressDate', 'TypeService.name'],
                title: ['Fecha Ingreso', 'Fecha Salida', 'Servicio'],
                data: result.attention,
                isHorizontal: true
            },
            ...(result.healthServices && result.healthServices.length > 0 ? [
                {
                    subtitle: `Servicios de Salud`,
                    header: ['tipo', 'notas'],
                    title: ['Tipo', ''],
                    data: result.healthServices.map(service => {
                        const formattedService = {
                            tipo: service.type || "NO",
                            notas: formatServiceNotes(service) // Llama a la función para formatear las notas
                        };

                        return formattedService;
                    }),
                    isHorizontal: false
                }
            ] : [])
        ]
    };

    return result;
};

// Controlador para generar la epicrisis y enviar el PDF
const epicrisisDownload = async (req, res) => {
    try {
        const epicrisisData = await getEpicrisisToPdf(req)
       
        const processedData = await processData(epicrisisData);
        const pdfDoc = await generatePDF(processedData);

        await sendPDFResponse(res, pdfDoc);
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    epicrisisDownload
};
