const {Bill, Detail, DigitalSignature, DetailType, sequelize,ElectronicBillingAuthorization } = require('../../models')
const {addingBillNumber} = require('../../controllers/billing/detail.controller')


const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { includeBill } = require('../includes');

const generateNewInvoiceNumber = async (centerId, transaction) => {
    try {
        // Buscar la autorización de facturación electrónica por CenterId que esté activa
        const authorization = await ElectronicBillingAuthorization.findOne({
            where: {
                CenterId: centerId,
                active: true // Asegurarse de que esté activa
            },
            transaction: transaction, // Usar la transacción pasada
            lock: transaction.LOCK.UPDATE, // Asegurar que nadie más modifique esta fila mientras se procesa
        });

        if (!authorization) {
            throw new Error(`No active electronic billing authorization found for center: ${centerId}`);
        }

        // Si `LastInvoiceNumber` es null o no existe, usamos `initialInvoiceNumber`
        let newInvoiceNumber = authorization.LastInvoiceNumber
            ? authorization.LastInvoiceNumber + 1
            : authorization.initialInvoiceNumber;

        // Actualizar el LastInvoiceNumber en la autorización
        await authorization.update(
            { LastInvoiceNumber: newInvoiceNumber },
            { transaction: transaction } // Usar la misma transacción
        );

        // Devolver el nuevo número de factura y el ID de la autorización
        return {
            newInvoiceNumber: authorization.prefix + newInvoiceNumber,
            ElectronicBillingAuthorizationId: authorization.id // Retorna el ID de la autorización
        };
    } catch (error) {
        throw new Error(`Error al generar nuevo numero de factura: ${error.message}`);
    }
};


  
const create = async (req, res) => {
    const t = await sequelize.transaction(); // Inicia la transacción
    let transactionCommitted = false; // Nueva variable para controlar si la transacción ha sido confirmada

    try {
        // Extraer los datos de la factura y los detalles
        const { Details, ...billData } = req.body;

        // Obtener el centerId de los datos de la factura
        const centerId = billData.CenterId; // Asegúrate de que CenterId esté en el billData

        // Generar el nuevo número de factura y obtener el ElectronicBillingAuthorizationId
        const { newInvoiceNumber, ElectronicBillingAuthorizationId } = await generateNewInvoiceNumber(centerId, t);

        // Asignar el nuevo número de factura (billNumber) a la factura que se va a crear
        billData.billNumber = newInvoiceNumber;
        billData.ElectronicBillingAuthorizationId = ElectronicBillingAuthorizationId; // Asignar el ID de la autorización

        // Crear la factura
        const createdBill = await Bill.create(billData, { transaction: t });

        if (createdBill) {
            
        
            // Agregar el ID de la factura y el ID de DetailType a cada detalle
            const detailsWithBillId = Details.map(detail => {
                
        
                return {
                    ...detail,
                    BillId: createdBill.id, // Asocia cada detalle a la factura creada
                    attentionCode: billData.attentionCode
                };
            });
        
            // Crear los detalles asociados
            await Detail.bulkCreate(detailsWithBillId, { transaction: t });
        
            // Confirmar la transacción
            await t.commit();
            transactionCommitted = true; // Marcamos como que la transacción fue confirmada

            // Busca la factura fuera del bloque de la transacción
            const bill = await Bill.findOne({
                where: { id: createdBill.id },
                include: includeBill // No necesitas la transacción aquí
            });            

            res.status(201).json(bill); // Devuelve la factura creada
        }
    } catch (error) {
        if (!transactionCommitted) { // Solo hacemos rollback si no se hizo commit
            await t.rollback();
        }       
         console.error('Error in create, Bill controller:', error);
        res.status(400).json({ message: "Bill wasn't created", error: error.message });
    }
};





const find = async (req, res) => {
    const { AttentionId } = req.params; // Obtener AttentionId del parámetro

    try {
        // Buscar la factura por AttentionId e incluir los detalles
        const bill = await Bill.findOne({
            where: { AttentionId },
            include: includeBill // Asegúrate de que la relación esté configurada
        });

        if (!bill) {
            throw new Error ('Factura no encontrada');
        }

        res.status(200).json(bill);
    } catch (error) {
        console.error('Error in getBillByAttentionId:', error);
        res.status(500).json({ message: error.message });
    }
};

const get = async (req, res) => {
    const { id } = req.params; // Obtener AttentionId del parámetro

    try {
        // Buscar la factura por AttentionId e incluir los detalles
        const bill = await Bill.findOne({
            where: { id: id },
            include: includeBill // Asegúrate de que la relación esté configurada
        });

        if (!bill) {
            throw new Error ('Factura no encontrada');
        }

        res.status(200).json(bill);
    } catch (error) {
        console.error('Error in getBillByAttentionId:', error);
        res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;

        const existingBill = await Bill.findOne({ where: {id: id}});
        console.log('existingBill:', existingBill);

        if (!existingBill) {
            throw new Error ('Factura no encontrada')
        }

        const [updatedCount] = await Bill.update(req.body, {
            where: { id: id }
        });

        if (updatedCount > 0) {
            res.status(200).json({ message: 'Factura actualizada con éxito' });
        } else {
            throw new Error ('No se realizaron cambios')
        }
    } catch (error) {
        console.log('update find in Bill controller', error);
        res.status(500).json({ message: error.message });
    }
};


const getSubtotal = async (AttentionId) => {
    try {
        // buscar todos los detalles
        const details = await Detail.findAllAndCount({
            where: {
                AttentionId : AttentionId
            }
        })

        //si hay detalles hacer la operacion
        if(details.count > 0){
            const subtotal = 0
            //por cada detalle sumar al subtotal 
            details.rows.forEach(detail => {
                subtotal += detail.totalValue
                
            });

            return subtotal
        }
    } catch (error) {
        console.log('error getSubtotal in bill controller', error)
        return 0
    }
}

const createFiling = async (req, res) => {
  try {
    const { AttentionId, filing, filingDate, filingHour } = req.body;

    // Verificar si ya existe un Bill para AttentionId
    const existingBill = await Bill.findOne({ where: { AttentionId } });

    if (!existingBill) {
      // Si no existe un Bill para AttentionId, devolver un mensaje de error
      return res.status(400).json({ message: 'No existe un Bill para AttentionId. Primero crea un Bill.' });
    }

    // Verificar si ya se ha ingresado el filing
    if (existingBill.filing) {
      // Si ya existe un filing, no permitir la modificación
      return res.status(400).json({ message: 'No se puede modificar el valor de filing.' });
    }

    // Actualizar el Bill con filing, filingDate y filingHour
    const updatedBill = await existingBill.update({
      filing,
      filingDate,
      filingHour,
    });

    res.status(200).json(updatedBill);
  } catch (error) {
    console.error('Error en createFiling', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const generateInvoicePDF = async (req, res) => {
    try {
      const { AttentionId } = req.body; // Supongo que tienes un endpoint que incluye el ID de la factura
  
      // Obtener datos de la factura
      const bill = await Bill.findOne({where: AttentionId, include, exclude});
  
      if (!bill) {
        return res.status(404).json({ message: 'Factura no encontrada' });
      }
  
      // Crear un nuevo documento PDF
      const doc = new PDFDocument();
      const filePath = path.join(__dirname, 'invoice.pdf');
      const fileStream = fs.createWriteStream(filePath);
  
      // Configurar el encabezado del PDF
      doc.pipe(fileStream);
      doc.fontSize(16).text('Factura DIAN', { align: 'center' });
  
      // Agregar datos de la factura al PDF
      doc.fontSize(12).text(`Número de Factura: ${bill.billNumber}`);
      doc.fontSize(12).text(`Fecha de Expedición: ${bill.billExpeditionDate}`);
      doc.fontSize(12).text(`Fecha de Vencimiento: ${bill.billDueDate}`);
      // ... Agregar más datos según sea necesario
  
      // Finalizar el documento PDF
      doc.end();
  
      // Enviar el archivo PDF como respuesta
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');
  
      // Stream del archivo PDF
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } catch (error) {
      console.error('Error en generateInvoicePDF', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  };

module.exports =  {create, find,get, update, createFiling, generateInvoicePDF }