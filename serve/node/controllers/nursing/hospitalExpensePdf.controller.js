const { HospitalExpense, SubDiagnoseList, Qx, Dispatch, LaboratoryResult, diagnosticAidResult, Procedure, Attention } = require('../../models');
const PdfPrinter = require('pdfmake');
const fs = require('fs');


const getHospitalExpenseDetails = async (req, res) => {
    try {
      const { attentionId } = req.params;
  
      // Obtener la hoja de gastos del hospital
      const hospitalExpense = await HospitalExpense.findOne({
        where: { numberAttention: attentionId },
        include: [
          {
            model: Attention,
            as: 'attention'
          }
        ]
      });
  
      if (!hospitalExpense) {
        return res.status(404).json({ message: 'Hospital expense not found' });
      }
  
      // Obtener diagnósticos
      const diagnoses = await SubDiagnoseList.findAll({
        where: { AttentionId: attentionId },
        include: [{ model: Attention, as: 'attention' }]
      });
  
      // Obtener cirugías
      const surgeries = await Qx.findAll({
        where: { AttentionId: attentionId },
        include: [{ model: Attention, as: 'attention' }]
      });
  
      // Obtener artículos de farmacia
      const pharmacyItems = await Dispatch.findAll({
        where: { AttentionId: attentionId },
        include: [{ model: Attention, as: 'attention' }]
      });
  
      // Obtener resultados de laboratorio
      const labResults = await LaboratoryResult.findAll({
        where: { AttentionId: attentionId },
        include: [{ model: Attention, as: 'attention' }]
      });
  
      // Obtener ayudas diagnósticas
      const diagnosticAids = await diagnosticAidResult.findAll({
        where: { AttentionId: attentionId },
        include: [{ model: Attention, as: 'attention' }]
      });
  
      // Obtener procedimientos no quirúrgicos
      const procedures = await Procedure.findAll({
        where: { AttentionId: attentionId },
        include: [{ model: Attention, as: 'attention' }]
      });
  
      // Organizar los datos en una estructura
      const response = {
        hospitalExpense,
        diagnoses,
        surgeries,
        pharmacyItems,
        labResults,
        diagnosticAids,
        procedures
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching hospital expense details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};



const getHospitalExpenseDetailsPdf = async (req, res) => {
  try {
    const { attentionId } = req.params;

    // Obtener la hoja de gastos del hospital y otros datos relacionados
    const hospitalExpense = await HospitalExpense.findOne({ where: { numberAttention: attentionId } });
    const diagnoses = await SubDiagnoseList.findAll({ where: { AttentionId: attentionId } });
    const surgeries = await Qx.findAll({ where: { AttentionId: attentionId } });
    const pharmacyItems = await Dispatch.findAll({ where: { AttentionId: attentionId } });
    const labResults = await LaboratoryResult.findAll({ where: { AttentionId: attentionId } });
    const diagnosticAids = await diagnosticAidResult.findAll({ where: { AttentionId: attentionId } });
    const procedures = await Procedure.findAll({ where: { AttentionId: attentionId } });

    if (!hospitalExpense) {
      return res.status(404).json({ message: 'Hospital expense not found' });
    }

    // Crear el contenido del PDF usando pdfmake
    const docDefinition = {
      content: [
        { text: 'Hoja de Gastos Médicos', style: 'header' },
        { text: `Número de Atención: ${hospitalExpense.numberAttention}`, style: 'subheader' },
        { text: `Fecha de Ingreso: ${hospitalExpense.dateAdmission}`, style: 'subheader' },
        { text: `Fecha de Egreso: ${hospitalExpense.egressDate}`, style: 'subheader' },
        { text: 'Diagnósticos', style: 'sectionHeader' },
        diagnoses.map(d => ({ text: `${d.SubDiagnoseId}: ${d.date}` })),
        { text: 'Cirugías', style: 'sectionHeader' },
        surgeries.map(s => ({ text: `${s.description}` })),
        { text: 'Artículos de Farmacia', style: 'sectionHeader' },
        pharmacyItems.map(p => ({ text: `${p.ProductId}: ${p.cant}` })),
        { text: 'Examenes de Laboratorio', style: 'sectionHeader' },
        labResults.map(l => ({ text: `${l.cup}: ${l.note}` })),
        { text: 'Ayudas Diagnósticas', style: 'sectionHeader' },
        diagnosticAids.map(a => ({ text: `${a.cup}: ${a.conclusion}` })),
        { text: 'Procedimientos No Quirúrgicos', style: 'sectionHeader' },
        procedures.map(p => ({ text: `${p.name}: ${p.description}` }))
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 15, bold: true },
        sectionHeader: { fontSize: 13, bold: true, margin: [0, 10, 0, 5] }
      }
    };

    const printer = new PdfPrinter({});
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    
    let chunks = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks);
      res.contentType('application/pdf');
      res.send(result);
    });
    pdfDoc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getHospitalExpenseDetailsPdf,
  getHospitalExpenseDetails
};
