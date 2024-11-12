const { Order, OrderCupsList, OrderSubDiagnose, TypeOrder, CupsList, SubDiagnose, Person, Center, User, Attention } = require('../../models');

  const PdfPrinter = require('pdfmake');
  const fs = require('fs');
  const {updateStatus} = require('../../controllers/admission/attentions.controller');

  
  // Definir las constantes para los includes
  const includesSurgeryOrder =  [
    { model: Attention },
    { model: Person },
    { model: Center },
    { model: User, as: 'Doctor' },
    { model: TypeOrder },
    { model: OrderSubDiagnose, include: [SubDiagnose] },
    { model: OrderCupsList, include: [CupsList] }
  ];
  
  const includesBasic = [
    { model: Attention },
    { model: Person },
    { model: Center },
    { model: User, as: 'Doctor' }
  ];
  

class SurgeryOrderController {

  // Crear una nueva orden de cirugía
  async create(req, res) {
    
    try {
      const {
        AttentionId, PersonId, CenterId, DoctorId, OrderTypeId, SubDiagnoses, Cups
      } = req.body;
  
      // Crear la orden
      const order = await Order.create({
        AttentionId,
        PersonId,
        CenterId,
        DoctorId,
        OrderTypeId,
        orderNumber: '' // Se generará automáticamente por el hook beforeCreate
      });
  
      // Agregar diagnósticos
      if (SubDiagnoses && SubDiagnoses.length > 0) {
        await Promise.all(SubDiagnoses.map(subDiagnoseId => 
          OrderSubDiagnose.create({ OrderId: order.id, SubDiagnoseId: subDiagnoseId })
        ));
      }
  
      // Agregar procedimientos (Cups)
      if (Cups && Cups.length > 0) {
        await Promise.all(Cups.map(cupsListId => 
          OrderCupsList.create({ OrderId: order.id, CupsListId: cupsListId })
        ));
      }
      // Actualizar estado de atención
      const statusUpdateResult = await updateStatus('CIRUGIA EN ESPERA', AttentionId);

      if (statusUpdateResult && statusUpdateResult.message) {
        console.log(statusUpdateResult.message);
      } else {
        console.log('Status update result is not valid:', statusUpdateResult);
      }

      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener todas las órdenes de cirugía
  async getAll(req, res) {
    try {
      const surgeryOrders = await SurgeryOrder.findAll({
        include: includesSurgeryOrder
      });
      res.status(200).json(surgeryOrders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una orden de cirugía por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
  
      const order = await Order.findByPk(id, {
        include: includesSurgeryOrder
      });
  
      if (!order) {
        return res.status(404).json({ message: 'Orden de cirugía no encontrada' });
      }
  
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la orden de cirugía' });
    }
  }

  // Generar PDF de una orden de cirugía
  async generatePdf(req, res) {
    try {
      const { id } = req.params;
  
      const order = await Order.findByPk(id, {
        include: includesSurgeryOrder
      });
  
      if (!order) {
        return res.status(404).json({ message: 'Orden de cirugía no encontrada' });
      }
  
      // Crear el documento PDF
      const docDefinition = {
        content: [
          { text: 'Orden de Cirugía', style: 'header' },
          { text: `Número de Orden: ${order.orderNumber}`, style: 'subheader' },
          { text: `Atención: ${order.Attention.name}`, style: 'text' },
          { text: `Paciente: ${order.Person.name}`, style: 'text' },
          { text: `Centro: ${order.Center.name}`, style: 'text' },
          { text: `Doctor: ${order.Doctor.name}`, style: 'text' },
          { text: `Tipo de Orden: ${order.TypeOrder.name}`, style: 'text' },
          { text: 'Diagnósticos:', style: 'subheader' },
          ...order.OrderSubDiagnoses.map(sd => ({ text: `- ${sd.SubDiagnose.name}`, style: 'text' })),
          { text: 'Procedimientos:', style: 'subheader' },
          ...order.OrderCupsLists.map(cl => ({ text: `- ${cl.CupsList.name}`, style: 'text' }))
        ],
        styles: {
          header: { fontSize: 18, bold: true },
          subheader: { fontSize: 14, bold: true },
          text: { fontSize: 12 }
        }
      };
  
      const printer = new PdfPrinter(fonts);
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.end();
  
      // Enviar el PDF al navegador
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="order.pdf"');
      pdfDoc.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al generar el PDF' });
    }
  }
}

module.exports = new SurgeryOrderController();
