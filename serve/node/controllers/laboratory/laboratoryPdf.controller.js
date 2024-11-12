// Descargar todos los laboratorios de una orden
const { Order, LaboratoryResult, AnalysisResult, AnalysisLaboratory, Analysis, Attention, Center, HistoryPerson, User } = require('../../models');
const pdfmake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
pdfmake.vfs = vfsFonts.pdfMake.vfs;

// Obtener los resultados de análisis por orden
const getAnalysisResultsByOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: LaboratoryResult,
          include: [
            {
              model: AnalysisResult,
              include: [
                {
                  model: AnalysisLaboratory,
                  include: [Analysis]
                }
              ]
            },
            {
              model: User, // Doctor asociado a LaboratoryResult
              as: 'Doctor'
            }
          ]
        },
        {
          model: Attention,
          include: [Center, HistoryPerson]
        },
        {
          model: User,
          as: 'Doctor'
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const results = order.LaboratoryResults.map(lr => ({
      analysisNames: lr.AnalysisResults.map(ar => ar.AnalysisLaboratory.Analysis.name),
      results: lr.AnalysisResults.map(ar => ar.result),
      methodology: lr.methodology,
      note: lr.note,
      doctorName: lr.Doctor ? lr.Doctor.name : 'Desconocido'
    }));

    // Datos del centro, paciente y doctor
    const centerInfo = order.Attention.Center || {};
    const patientInfo = order.Attention.HistoryPerson || {};
    const orderDoctorInfo = order.Doctor || { name: 'Desconocido' };

    // Generar PDF usando pdfmake
    const documentDefinition = {
      content: [
        { text: 'Resultados de Laboratorio', style: 'header' },
        { text: `Orden ID: ${order.id}`, style: 'subheader' },
        { text: `Número de Orden: ${order.orderNumber}`, style: 'subheader' },
        { text: 'Información del Centro', style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['Nombre', 'Nit', 'Teléfono', 'Dirección'],
              [centerInfo.name, centerInfo.nit, centerInfo.phone, centerInfo.address]
            ]
          }
        },
        { text: 'Datos del Paciente', style: 'subheader', margin: [0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              ['Nombre', 'Número de Documento', 'Sexo', 'Edad', 'Teléfono', 'EPS'],
              [patientInfo.fullname, patientInfo.numberId, patientInfo.GenderName, patientInfo.age, patientInfo.phone, patientInfo.currentAdministratorName]
            ]
          }
        },
        { text: 'Generado por: ', style: 'subheader', margin: [0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['*'],
            body: [
              ['Doctor'],
              [orderDoctorInfo.name]
            ]
          }
        },
        ...results.map(result => ({
          stack: [
            { text: `Análisis: ${result.analysisNames.join(', ')}`, style: 'subheader', margin: [0, 10] },
            { text: `Resultado: ${result.results.join(', ')}`, style: 'body' },
            { text: `Metodología: ${result.methodology}`, style: 'body' },
            { text: `Notas: ${result.note}`, style: 'body' },
            { text: `Doctor: ${result.doctorName}`, style: 'body', margin: [0, 0, 0, 10] }
          ],
          margin: [0, 10]
        }))
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
        },
        body: {
          fontSize: 12,
          margin: [0, 5, 0, 5]
        }
      }
    };

    const pdfDoc = pdfmake.createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
      res.setHeader('Content-Disposition', 'attachment; filename=LaboratoryResults.pdf');
      res.setHeader('Content-Type', 'application/pdf');
      res.send(Buffer.from(data, 'base64'));
    });

  } catch (error) {
    console.error('Error fetching order analysis results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAnalysisResultsByOrder
};
