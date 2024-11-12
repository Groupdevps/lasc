const pdfmake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');

pdfmake.vfs = vfsFonts.pdfMake.vfs;

module.exports = {
  // Otros métodos ...

  generatePDF: async (req, res) => {
    try {
      const discharge = await Discharge.findByPk(req.params.id, {
        include: [
          { model: Attention, as: 'attention' },
          { model: Person, as: 'person' },
          { model: User, as: 'doctor' },
          { model: DiagnosticList, as: 'mainDischargeDiagnosisDetail' },
          { model: DiagnosticList, as: 'diagnosis1DischargeDetail' },
          { model: DiagnosticList, as: 'diagnosis2DischargeDetail' },
          { model: DiagnosticList, as: 'diagnosis3DischargeDetail' },
        ],
      });

      if (!discharge) {
        return res.status(404).json({ error: 'Discharge not found' });
      }

      const docDefinition = {
        content: [
          { text: 'Egreso Médico', style: 'header' },
          { text: `Fecha: ${new Date().toLocaleDateString()}`, style: 'subheader' },
          { text: `Paciente: ${discharge.person.name}`, style: 'subheader' },
          { text: `Atención ID: ${discharge.AttentionId}`, style: 'subheader' },
          { text: 'Detalles del Egreso:', style: 'subheader' },
          {
            table: {
              body: [
                ['Peso', 'Talla', 'Tensión Arterial', 'Frecuencia Cardíaca', 'Frecuencia Respiratoria', 'Pulso', 'Temperatura'],
                [discharge.weight, discharge.size, discharge.arterialTsn, discharge.cardiacFr, discharge.respiratoryFr, discharge.pulse, discharge.temperature],
              ],
            },
          },
          { text: 'Diagnósticos:', style: 'subheader' },
          { text: `Principal: ${discharge.mainDischargeDiagnosisDetail.name}`, style: 'paragraph' },
          { text: `Secundario 1: ${discharge.diagnosis1DischargeDetail.name}`, style: 'paragraph' },
          { text: `Secundario 2: ${discharge.diagnosis2DischargeDetail.name}`, style: 'paragraph' },
          { text: `Secundario 3: ${discharge.diagnosis3DischargeDetail.name}`, style: 'paragraph' },
          { text: 'Condiciones Generales al Egreso:', style: 'subheader' },
          { text: discharge.generalConditionsUponDeparture, style: 'paragraph' },
          // Agregar más campos según sea necesario
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          paragraph: {
            fontSize: 12,
            margin: [0, 0, 0, 5],
          },
        },
      };

      const pdfDoc = pdfmake.createPdf(docDefinition);

      pdfDoc.getBase64((data) => {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=egreso_medico.pdf');
        res.send(Buffer.from(data, 'base64'));
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
