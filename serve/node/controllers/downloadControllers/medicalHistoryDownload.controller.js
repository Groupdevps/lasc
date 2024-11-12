const pdfMake = require('pdfmake');
const { generatePDF, sendPDFResponse } = require('./pdfDownload.controller');
const { getMedicalHistoryDoc } = require('../doctor/emergencyMedicalHistory.controller');

// Función para convertir campos nulos o indefinidos a "NO"
const handleNullField = (field) => {
    return field !== null && field !== undefined ? field : "NO";
};

const processData = (result) => {

    // Verificación de existencia de objetos antes de acceder a sus propiedades
    const historyPerson = result.Attention?.HistoryPerson || {};
    const center = result.Attention?.Center || {};
    const historyInfoMedicPerson = result.HistoryInfoMedicPerson || {};
    const user = result.User || {};

    // Aseguramos que no haya campos nulos en HistoryPerson
    historyPerson.fullname = handleNullField(`${historyPerson.name} ${historyPerson.secondName} ${historyPerson.lastName} ${historyPerson.secondSurname}`);
    historyPerson.GenderName = handleNullField(historyPerson.Gender?.name);

    console.log('result.Attention.Center', center.name);
    console.log('result.Attention.HistoryPerson', historyPerson.fullname);

    result.core = {
        title: 'HISTORIA CLINICA No ' + result.AttentionId + '-' + historyPerson.numberId,
        subject: [{
            subtitle: '\nInformación del Centro',
            header: ['name', 'nit', 'phone', 'address'],
            title: ['Nombre', 'Nit', 'Telefono', 'Direccion'],
            data: {
                name: handleNullField(center.name),
                nit: handleNullField(center.nit),
                phone: handleNullField(center.phone),
                address: handleNullField(center.address),
            },
            isHorizontal: true
        },
        {
            subtitle: 'Datos del Paciente',
            header: ['fullname', 'numberId', 'GenderName', 'age', 'cellphone', 'currentAdministratorName'],
            title: ['Nombre', 'Documento', 'Sexo', 'Edad', 'Celular', 'EPS'],
            data: {
                fullname: handleNullField(historyPerson.fullname),
                numberId: handleNullField(historyPerson.numberId),
                GenderName: handleNullField(historyPerson.GenderName),
                age: handleNullField(historyPerson.age),
                cellphone: handleNullField(historyPerson.cellphone),
                currentAdministratorName: handleNullField(historyPerson.currentAdministratorName),
            },
            isHorizontal: true
        },
        {
            subtitle: 'Datos Generales',
            header: [
                'motive', 'personalHistory', 'familyBackground', 'allergic'
            ],
            title: [
                'Motivo de consulta', 'Enfermedad Actual', 'Antecedentes familiares', 
                'Alergias'
            ],
            data: {
                motive: handleNullField(historyInfoMedicPerson.motive),
                personalHistory: handleNullField(historyInfoMedicPerson.personalHistory),
                familyBackground: handleNullField(historyInfoMedicPerson.familyBackground),
                allergic: handleNullField(historyInfoMedicPerson.allergic),
            },
            isHorizontal: false
        },
        {
            subtitle: 'Antecedentes Obstétricos',
            header: [
                'pregnancy', 'pregnancyTime', 
                'f', 'u', 'r', 'tg', 'f1', 'p', 'p1', 'g', 'p2', 'a', 'c', 
                'cause', 'cytology', 'result',
            ],
            title: [
                'Embarazo', 'Tiempo de Embarazo', 'F', 'U', 'R', 'TG', 'F1', 
                'P', 'P1', 'G', 'P2', 'A', 'C', 'Causa', 'Citología', 
                'Resultado'
            ],
            data: {
                
                pregnancy: handleNullField(historyInfoMedicPerson.pregnancy),
                pregnancyTime: handleNullField(historyInfoMedicPerson.pregnancyTime),
                f: handleNullField(historyInfoMedicPerson.f),
                u: handleNullField(historyInfoMedicPerson.u),
                r: handleNullField(historyInfoMedicPerson.r),
                tg: handleNullField(historyInfoMedicPerson.tg),
                f1: handleNullField(historyInfoMedicPerson.f1),
                p: handleNullField(historyInfoMedicPerson.p),
                p1: handleNullField(historyInfoMedicPerson.p1),
                g: handleNullField(historyInfoMedicPerson.g),
                p2: handleNullField(historyInfoMedicPerson.p2),
                a: handleNullField(historyInfoMedicPerson.a),
                c: handleNullField(historyInfoMedicPerson.c),
                cause: handleNullField(historyInfoMedicPerson.cause),
                cytology: handleNullField(historyInfoMedicPerson.cytology),
                result: handleNullField(historyInfoMedicPerson.result),
                
            },
            isHorizontal: false
        },
        ...(result.PersonalBackgrounds && result.PersonalBackgrounds.length > 0 ? [{
            subtitle: 'Antecedentes Personales',
            header: ['antecedent', 'description'],
            title: ['Antecedente', 'Descripción'],
            data: result.PersonalBackgrounds.map(item => ({
                antecedent: handleNullField(item.antecedent),
                description: handleNullField(item.description)
            })),
            isHorizontal: true
        }] : []),
        {
            subtitle: 'Parametros Vitales',
            header: [
                'glasgow', 'glucometry', 'temperature', 'fr', 'fc', 'pa1', 
                'pa', 'isc', 'size', 'weight', 
            ],
            title: [
                'Glasgow', 'Glucometría', 'Temperatura', 'Frecuencia Respiratoria', 
                'Frecuencia Cardíaca', 'PA1', 'PA', 'ISC', 'Tamaño', 'Peso', 
            ],
            data: {
                glasgow: handleNullField(historyInfoMedicPerson.glasgow),
                glucometry: handleNullField(historyInfoMedicPerson.glucometry),
                temperature: handleNullField(historyInfoMedicPerson.temperature),
                fr: handleNullField(historyInfoMedicPerson.fr),
                fc: handleNullField(historyInfoMedicPerson.fc),
                pa1: handleNullField(historyInfoMedicPerson.pa1),
                pa: handleNullField(historyInfoMedicPerson.pa),
                isc: handleNullField(historyInfoMedicPerson.isc),
                size: handleNullField(historyInfoMedicPerson.size),
                weight: handleNullField(historyInfoMedicPerson.weight),
                
            },
            isHorizontal: false
        },
        ...(result.PhysicalExams && result.PhysicalExams.length > 0 ? [{
            subtitle: 'Examen Fisico',
            header: ['examined', 'status', 'description'],
            title: ['Examinado', 'Estado', 'Descripción'],
            data: result.PhysicalExams.map(item => ({
                examined: handleNullField(item.examined),
                status: handleNullField(item.status),
                description: handleNullField(item.description)
            })),
            isHorizontal: true
        }] : []),
        
        
        ...(result.SubDiagnoseLists && result.SubDiagnoseLists.length > 0 ? [{
            subtitle: 'Diagnosticos',
            header: ['code', 'name'],
            title: ['Codigo', 'Descripcion'],
            data: result.SubDiagnoseLists.map(item => ({
                code: handleNullField(item.SubDiagnose?.code),
                name: handleNullField(item.SubDiagnose?.name)
            })),
            isHorizontal: true
        }] : []),
        {
            subtitle: 'Plan',
            header: ['observations', 'paraclinical' , 'plan'],
            title: ['Observaciones', 'Paraclinicos', 'Plan'],
            data: [{
                observations: handleNullField(result.observations),
                plan: handleNullField(result.plan),
            }],
            isHorizontal: false
        },
        {
            subtitle: 'Generado por',
            header: ['name', 'role'],
            title: ['Usuario', 'Cargo'],
            data:[{
                name: handleNullField(user.name),
                role: handleNullField(user.Role?.name || null)
            }],
            isHorizontal: true
        }
        ]
    };

    return result;
};

const generateAndSendPDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

const medicalHistoryDownload = async (req, res) => {
    try {
        const info = await getMedicalHistoryDoc(req);

        if (info) {
            const result = processData(info);
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
    medicalHistoryDownload
};
