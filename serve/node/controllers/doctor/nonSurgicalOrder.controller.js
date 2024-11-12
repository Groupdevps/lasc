const pdfMake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
const { Order, OrderCupsList, OrderSubDiagnose, TypeOrder, CupsList, SubDiagnose, Person, Center, User, Attention } = require('../../models');

// Configuración de fuentes para pdfmake
pdfMake.vfs = vfsFonts.pdfMake.vfs;


const includeOptions = [
    { model: Attention },
    { model: Person },
    { model: Center },
    { model: User, as: 'Doctor' },
    { model: TypeOrder },
    { model: OrderSubDiagnose, include: [SubDiagnose] },
    { model: OrderCupsList, include: [CupsList] }
  ]

// Crear una nueva orden de procedimientos no quirúrgicos
exports.createNonSurgicalOrder = async (req, res) => {
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

    res.status(201).json({ message: 'Orden de procedimiento no quirúrgico creada con éxito', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la orden de procedimiento no quirúrgico' });
  }
};

// Obtener detalles de una orden de procedimientos no quirúrgicos
exports.getNonSurgicalOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: includeOptions
    });

    if (!order) {
      return res.status(404).json({ message: 'Orden de procedimiento no quirúrgico no encontrada' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la orden de procedimiento no quirúrgico' });
  }
};

// Actualizar una orden de procedimientos no quirúrgicos
exports.updateNonSurgicalOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Encontrar y actualizar la orden
    const [updated] = await Order.update(updates, {
      where: { id },
      returning: true
    });

    if (!updated) {
      return res.status(404).json({ message: 'Orden de procedimiento no quirúrgico no encontrada' });
    }

    res.json({ message: 'Orden de procedimiento no quirúrgico actualizada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la orden de procedimiento no quirúrgico' });
  }
};

// Eliminar una orden de procedimientos no quirúrgicos
exports.deleteNonSurgicalOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar la orden
    const deleted = await Order.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Orden de procedimiento no quirúrgico no encontrada' });
    }

    res.json({ message: 'Orden de procedimiento no quirúrgico eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la orden de procedimiento no quirúrgico' });
  }
};

// Generar PDF con los detalles de la orden de procedimientos no quirúrgicos
exports.generateNonSurgicalOrderPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: includeOptions
    });

    if (!order) {
      return res.status(404).json({ message: 'Orden de procedimiento no quirúrgico no encontrada' });
    }

    // Crear el documento PDF
    const docDefinition = {
      content: [
        { text: 'Orden de Procedimiento No Quirúrgico', style: 'header' },
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
    res.setHeader('Content-Disposition', 'inline; filename="nonSurgicalOrder.pdf"');
    pdfDoc.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el PDF' });
  }
};
