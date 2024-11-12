const { EmergencyMedicalHistory, HistoryPerson, HistoryInfoMedicPerson, SubDiagnoseList, PersonalBackground, PhysicalExam, User, Attention, Role, UserRole, Center } = require('../../models/index.js');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Función para crear el contenido del PDF
const createPDFContent = (result) => {
    const physicalExams = result.PhysicalExams.map(exam => [
        exam.examined,
        exam.status,
        exam.description
    ]);

    const personalBackgrounds = result.PersonalBackgrounds.map(bg => [
        bg.background
    ]);

    return {
        content: [
            { text: 'Historia Clínica', style: 'header' },
            {
                text: [
                    { text: 'Información del Centro', style: 'subheader' },
                    { text: '\n' },
                    {
                        table: {
                            headerRows: 1,
                            widths: [ '*', '*', '*', '*' ],
                            body: [
                                [ 'Nombre', 'Nit', 'Teléfono', 'Dirección' ],
                                [ result.Attention.Center.name, result.Attention.Center.nit, result.Attention.Center.phone, result.Attention.Center.address ]
                            ]
                        },
                        layout: 'lightHorizontalLines'
                    }
                ]
            },
            {
                text: [
                    { text: 'Datos del Paciente', style: 'subheader' },
                    { text: '\n' },
                    {
                        table: {
                            headerRows: 1,
                            widths: [ '*', '*', '*', '*', '*', '*' ],
                            body: [
                                [ 'Nombre', 'Número de documento', 'Sexo', 'Edad', 'Teléfono', 'EPS' ],
                                [ result.Attention.HistoryPerson.fullname, result.Attention.HistoryPerson.numberId, result.Attention.HistoryPerson.GenderName, result.Attention.HistoryPerson.age, result.Attention.HistoryPerson.phone, result.Attention.HistoryPerson.currentAdministratorName ]
                            ]
                        },
                        layout: 'lightHorizontalLines'
                    }
                ]
            },
            {
                text: [
                    { text: 'Motivo:', style: 'subheader' },
                    { text: '\n' },
                    {
                        table: {
                            headerRows: 1,
                            widths: [ '*' ],
                            body: [
                                [ result.HistoryInfoMedicPerson.motive ]
                            ]
                        },
                        layout: 'lightHorizontalLines'
                    }
                ]
            },
            {
                text: [
                    { text: 'Observaciones:', style: 'subheader' },
                    { text: '\n' },
                    {
                        table: {
                            headerRows: 1,
                            widths: [ '*' ],
                            body: [
                                [ result.HistoryInfoMedicPerson.personalHistory ]
                            ]
                        },
                        layout: 'lightHorizontalLines'
                    }
                ]
            },
            {
                text: [
                    { text: 'Plan:', style: 'subheader' },
                    { text: '\n' },
                    {
                        table: {
                            headerRows: 1,
                            widths: [ '*' ],
                            body: [
                                [ result.HistoryInfoMedicPerson.plan ]
                            ]
                        },
                        layout: 'lightHorizontalLines'
                    }
                ]
            },
            {
                text: [
                    { text: 'Examen Físico:', style: 'subheader' },
                    { text: '\n' },
                    {
                        table: {
                            headerRows: 1,
                            widths: [ '*', '*', '*' ],
                            body: [
                                [ 'Examinado', 'Estado', 'Descripción' ],
                                ...physicalExams
                            ]
                        },
                        layout: 'lightHorizontalLines'
                    }
                ]
            },
            {
                text: [
                    { text: 'Antecedentes Personales:', style: 'subheader' },
                    { text: '\n' },
                    {
                        table: {
                            headerRows: 1,
                            widths: [ '*' ],
                            body: [
                                [ 'Antecedente' ],
                                ...personalBackgrounds
                            ]
                        },
                        layout: 'lightHorizontalLines'
                    }
                ]
            },
            {
                text: [
                    { text: 'Generado por:', style: 'subheader' },
                    { text: '\n' },
                    {
                        table: {
                            headerRows: 1,
                            widths: [ '*', '*' ],
                            body: [
                                [ 'Usuario', 'Cargo' ],
                                [ 'Doctor', 'Especialidad' ]
                            ]
                        },
                        layout: 'lightHorizontalLines'
                    }
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 5]
            }
        }
    };
};

// Controlador para manejar la generación del PDF
const EMHPdfController = {
    download: async (req, res) => {
        try {
            const { AttentionId } = req.params;

            // Obtener datos del historial médico de emergencia
            const result = await EmergencyMedicalHistory.findOne({
                where: { AttentionId },
                include: [
                    { model: HistoryPerson },
                    { model: HistoryInfoMedicPerson },
                    { model: PersonalBackground },
                    { model: PhysicalExam },
                    { model: SubDiagnoseList, as: 'SubDiagnoseLists', include: ['SubDiagnose'] },
                    { model: User, include: { model: UserRole, include: [Role] } },
                    { model: Attention, include: ['Center', 'TypeService', 'Status', 'User', 'Triage', { model: HistoryPerson, include: ['Companion', 'TypeID', 'Gender'] }, { model: User, as: 'Doctor' }] }
                ]
            });

            if (!result) {
                return res.status(404).json({ message: 'No se encontró ningún resultado.' });
            }

            // Crear el contenido del PDF
            const pdfContent = createPDFContent(result);

            // Crear el documento PDF
            const pdfDoc = pdfMake.createPdf(pdfContent);

            // Obtener el buffer del PDF
            pdfDoc.getBuffer((buffer) => {
                // Configurar encabezados de respuesta para el PDF
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `inline; filename=EmergencyMedicalHistory-${AttentionId}.pdf`);

                // Enviar el PDF como respuesta
                res.end(buffer, 'binary');
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = EMHPdfController;
