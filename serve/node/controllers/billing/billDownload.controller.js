const pdfMake = require('pdfmake');
const { generatePDF, sendPDFResponse } = require('../downloadControllers/pdfDownload.controller');
const numeral = require('numeral'); // Para formatear números
const NumeroALetras = require('numero-a-letras');
const moment = require('moment')

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const { Bill, Detail, DigitalSignature, Concept, sequelize } = require('../../models');
const { includeBill } = require('../includes');


function convertirNumeroALetras(num) {
    const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenasSuperiores = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    function convertirGrupo(num) {
        let letras = '';

        if (num === 100) {
            return 'cien';
        }

        if (num > 100) {
            letras += centenas[Math.floor(num / 100)] + ' ';
            num = num % 100;
        }

        if (num >= 10 && num <= 19) {
            letras += decenas[num - 10];
        } else if (num >= 20) {
            letras += decenasSuperiores[Math.floor(num / 10)];
            if (num % 10 > 0) {
                letras += ' y ' + unidades[num % 10];
            }
        } else if (num > 0) {
            letras += unidades[num];
        }

        return letras.trim();
    }

    function convertirMiles(num) {
        if (num === 0) {
            return '';
        } else if (num === 1) {
            return 'mil';
        } else {
            return convertirGrupo(num) + ' mil';
        }
    }

    function convertirMillones(num) {
        if (num === 0) {
            return '';
        } else if (num === 1) {
            return 'un millón';
        } else {
            return convertirGrupo(num) + ' millones';
        }
    }

    let resultado = '';
    let billones = Math.floor(num / 1000000000000);
    num -= billones * 1000000000000;

    let millones = Math.floor(num / 1000000);
    num -= millones * 1000000;

    let miles = Math.floor(num / 1000);
    num -= miles * 1000;

    let cientos = num;

    if (billones > 0) {
        resultado += convertirGrupo(billones) + ' billones ';
    }

    if (millones > 0) {
        resultado += convertirMillones(millones) + ' ';
    }

    if (miles > 0) {
        resultado += convertirMiles(miles) + ' ';
    }

    if (cientos > 0) {
        resultado += convertirGrupo(cientos);
    }

    return resultado.trim();
}

const processFooter = (bill) => {
    const center = bill.Center;
    const address = center?.Address || {};
    const billExpeditionDate = moment(bill.billExpeditionDate).format('YYYY-MM-DD hh:mm A') || "";
    const CUFE =  "CUFE pendiente";

    return {
        lines: [
            `${address.address || ""}, ${address.City?.name || ""}, ${address.State?.name || ""}`,
            `Teléfono: ${center?.phone || ""}`,
            `Email: ${center?.email || ""}`,
            `Fecha de expedición: ${billExpeditionDate}`,
            `CUFE: ${CUFE}`
        ]
    };
};

const processData = (bill) => {
    const  authorizationBill = bill.ElectronicBillingAuthorization || {}

    const result = {
        core: {
            title: `${bill.Center?.slogan}`,
            subtitle: `Documento Oficial de Autorizacion de Numeracion Facturacion Electronica
            ${authorizationBill.authorizationNumber || ""} de ${authorizationBill.authorizationDate || ""} desde ${authorizationBill.prefix + authorizationBill.from || ""} hasta ${authorizationBill.prefix + authorizationBill.to || ""}`,
            subject: [],
            footer: processFooter(bill)
        }
    };

    // Agrupación de detalles por DetailType
    const detailGroups = bill.Details.reduce((acc, detail) => {
        const detailTypeName = detail.DetailType?.name; // Obtener el nombre del tipo de detalle

        if (!acc[detailTypeName]) {
            acc[detailTypeName] = {
                items: [],
                subtotal: 0
            };
        }
        acc[detailTypeName].items.push(detail);
        acc[detailTypeName].subtotal += detail.totalValue; // Acumula el valor total
        return acc;
    }, {});

    // Agregar detalles de la factura
    result.core.subject.push({
        subtitle: 'Factura',
        header: ['billNumber', 'billExpeditionDate', 'billDueDate'],
        title: ['Número de factura', 'Fecha de expedición', 'Fecha de vencimiento'],
        data: [{
            billNumber: bill.billNumber,
            billExpeditionDate: bill.billExpeditionDate,
            billDueDate: bill.billDueDate
        }],
        isHorizontal: false

    });

    // Agregar datos del paciente
    result.core.subject.push({
        subtitle: 'Paciente',
        header: ['patientFullName', 'patientNumberId', 'patientAddress', 'patientPhone', 'patientAge', 'patientBirthDay'],
        title: ['Nombre', 'Documento', 'Dirección', 'Teléfono', 'Edad', 'Fecha de Nacimiento'],
        data: [{
            patientFullName: bill.patientFullName,
            patientNumberId: bill.patientNumberId,
            patientAddress: bill.patientAddress,
            patientPhone: bill.patientPhone,
            patientAge: bill.patientAge,
            patientBirthDay: bill.patientBirthDay
        }],
    });

    // Agregar datos de la aseguradora
    result.core.subject.push({
        subtitle: 'Aseguradora',
        header: ['payerName', 'payerNit', 'payerAddress', 'payerPhone', 'payerCity'],
        title: ['Nombre', 'NIT', 'Dirección', 'Teléfono', 'Ciudad'],
        data: [{
            payerName: bill.payerName,
            payerNit: bill.payerNit,
            payerAddress: bill.payerAddress,
            payerPhone: bill.payerPhone,
            payerCity: bill.payerCity
        }],
    });

    // Añadir detalles agrupados por tipo
    Object.entries(detailGroups).forEach(([typeName, group]) => {
        const detailItems = group.items.map((item, itemIndex) => ({
            description: item.description,
            cant: item.cant,
            unityValue: numeral(item.unityValue).format('$0,0.00'), // Formato del valor unitario
            totalValue: numeral(item.totalValue).format('$0,0.00'), // Formato del valor total
            itemNumber: itemIndex + 1
        }));

        result.core.subject.push({
            subtitle: `${typeName}`,
            header: ['itemNumber', 'description', 'cant', 'unityValue', 'totalValue'],
            title: ['Item', 'Descripción', 'Cantidad', 'Valor Unitario', 'Valor Total'],
            data: detailItems
        });

        result.core.subject.push({
            header: ['subtotal'],
            title: [`Subtotal: ${typeName}`],
            data: [{ subtotal: numeral(group.subtotal).format('$0,0.00') }],
            isHorizontal: false
        });
    });

    // Calcular el total final
    const total = bill.Details.reduce((acc, detail) => acc + detail.totalValue, 0);

    // Convertir el total a letras en español usando `numero-a-letras`
    result.core.subject.push({
        header: ['total', 'totalInWords'],
        title: ['Total', 'Total en letras'],
        data: [{
            total: numeral(total).format('$0,0.00'),
            totalInWords: convertirNumeroALetras(total).toUpperCase() + " COP" // Convertir total a letras (en español)
        }]
    });

    console.log('Total:', total); // Para verificar el valor
    return result;
};

const generateAndSendPDF = (res, bill) => {
    const pdfDoc = generatePDF(bill);
    sendPDFResponse(res, pdfDoc);
};




const billDownload = async (req, res) => {
    try {
        const { id } = req.params;
        const bill = await Bill.findByPk(id, { include: includeBill });

        if (bill) {
            const result = processData(bill);
            generateAndSendPDF(res, result);
        } else {
            throw new Error('No se encontró la factura.');
        }
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ message: error.message });
    }
};


const generateUBLInvoiceXML = (bill) => {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>`;
    const xmlInvoice = `
   
      <Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
               xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
               xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
        <cbc:CustomizationID>10</cbc:CustomizationID>
        <cbc:ProfileID>DIAN 2.1</cbc:ProfileID>
        <cbc:ID>${bill.billNumber}</cbc:ID>
        <cbc:IssueDate>${new Date(bill.billExpeditionDate).toISOString().split('T')[0]}</cbc:IssueDate>
        <cbc:DueDate>${bill.billDueDate ? new Date(bill.billDueDate).toISOString().split('T')[0] : ''}</cbc:DueDate>
        
        <!-- Proveedor -->
        <cac:AccountingSupplierParty>
          <cac:Party>
            <cac:PartyIdentification>
              <cbc:ID schemeID="31">${bill.Center.nit}</cbc:ID>
            </cac:PartyIdentification>
            <cac:PartyName>
              <cbc:Name>${bill.Center.name}</cbc:Name>
            </cac:PartyName>
            <cac:PartyLegalEntity>
              <cbc:RegistrationName>${bill.Center.name}</cbc:RegistrationName>
            </cac:PartyLegalEntity>
          </cac:Party>
        </cac:AccountingSupplierParty>
        
        <!-- Cliente/Paciente -->
        <cac:AccountingCustomerParty>
          <cac:Party>
            <cac:PartyIdentification>
              <cbc:ID schemeID="13">${bill.patientNumberId}</cbc:ID>
            </cac:PartyIdentification>
            <cac:PartyName>
              <cbc:Name>${bill.patientFullName}</cbc:Name>
            </cac:PartyName>
            <cac:PartyLegalEntity>
              <cbc:RegistrationName>${bill.patientFullName}</cbc:RegistrationName>
            </cac:PartyLegalEntity>
          </cac:Party>
        </cac:AccountingCustomerParty>
  
        <!-- Detalles de la Factura -->
        <cac:InvoiceLine>
          ${bill.Details.map((detail, index) => `
            <cac:InvoiceLine>
              <cbc:ID>${index + 1}</cbc:ID>
              <cbc:InvoicedQuantity unitCode="EA">${detail.cant}</cbc:InvoicedQuantity>
              <cbc:LineExtensionAmount currencyID="COP">${detail.unityValue}</cbc:LineExtensionAmount>
              <cac:Item>
                <cbc:Description>${detail.description}</cbc:Description>
              </cac:Item>
              <cac:Price>
                <cbc:PriceAmount currencyID="COP">${detail.unityValue}</cbc:PriceAmount>
              </cac:Price>
            </cac:InvoiceLine>
          `).join('')}
        </cac:InvoiceLine>
  
        <!-- Resumen Totales -->
        <cac:LegalMonetaryTotal>
          <cbc:LineExtensionAmount currencyID="COP">${bill.billSubtotal}</cbc:LineExtensionAmount>
          <cbc:TaxExclusiveAmount currencyID="COP">0</cbc:TaxExclusiveAmount>
          <cbc:PayableAmount currencyID="COP">${bill.billSubtotal}</cbc:PayableAmount>
        </cac:LegalMonetaryTotal>
        
        <!-- Autorización de Factura Electrónica -->
        <cac:BillingReference>
          <cac:InvoiceDocumentReference>
            <cbc:ID>${bill.ElectronicBillingAuthorization.authorizationNumber}</cbc:ID>
            <cbc:IssueDate>${bill.ElectronicBillingAuthorization.authorizationDate}</cbc:IssueDate>
            <cbc:DocumentTypeCode>01</cbc:DocumentTypeCode>
          </cac:InvoiceDocumentReference>
        </cac:BillingReference>
      </Invoice>
    `;
  
    return xmlHeader + xmlInvoice;
  };
  
const ElectronicBillDownload = async (req, res) => {
    try {
        const { id } = req.params;
        const bill = await Bill.findByPk(id, {
            include: includeBill
        });

        if (!bill) {
            throw new Error('No se encontró la factura.');
        }

        // Generar XML
        const xmlContent = generateUBLInvoiceXML(bill);
        const timestamp = Date.now();
        const baseFileName = `${bill.billNumber}-${timestamp}`;
        const xmlPath = path.join(__dirname, '../public/temp', `${baseFileName}.xml`);

        // Asegurarse de que el directorio existe
        const dir = path.dirname(xmlPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Escribir el contenido XML en el archivo
        fs.writeFileSync(xmlPath, xmlContent);

        // Enviar el archivo XML como respuesta
        res.download(xmlPath, `${baseFileName}.xml`, (err) => {
            if (err) {
                console.error('Error al enviar el archivo XML:', err);
            }

            // Limpieza de archivos temporales después de la descarga
            cleanUpTempFiles(xmlPath);
        });
    } catch (error) {
        console.error('Error al generar la factura:', error);
        res.status(500).json({ message: error.message });
    }
};

// Función para limpiar archivos temporales
const cleanUpTempFiles = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Eliminar el archivo
            console.log(`Archivo temporal eliminado: ${filePath}`);
        } else {
            console.log(`El archivo no existe: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error al eliminar el archivo temporal: ${err.message}`);
    }
};
module.exports = {
    billDownload,
    ElectronicBillDownload
};
