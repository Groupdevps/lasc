const pdfMake = require('pdfmake');
const { generatePDF, sendPDFResponse } = require('./pdfDownload.controller');
const { getInventoryToPdf } = require('../pharmacy/pharmacy.controller');
const moment = require('moment')

const processData = (combined) => {
    //console.log('-------------------Combined', combined)
    const structuredData = combined.map(item => {
        if (item.type === 'input') {
            return {
                date: moment(item.createdAt).format('YYYY-MM-DD hh:mm A'),
                product: item.Product.name,
                description: item.Product.description,
                value: item.Product.productValue,
                type: item.Product?.ProductType?.name,
                cantIngreso: item.cant,
                valorTotalIngreso: item.cant * item.Product.productValue,
                cantSalida: null,
                valorTotalSalida: null
            };
        } else {
            return {
                date: moment(item.createdAt).format('YYYY-MM-DD hh:mm A'),
                product: item.Product.name,
                description: item.Product.description,
                type: item.Product?.ProductType?.name,
                value: item.Product.productValue,
                cantIngreso: null,
                valorTotalIngreso: null,
                cantSalida: item.cant,
                valorTotalSalida: item.cant * item.Product.productValue
            };
        }
    });

    // Crear la estructura resultante
    const structuredResult = {
        core: {
            title: '\n\INVENTARIO',
            subject: [
                {
                    subtitle: 'Movimientos de Inventario',
                    header: ['date', 'type','product', 'description','value', 'cantIngreso', 'valorTotalIngreso', 'cantSalida', 'valorTotalSalida'],
                    title: ['Fecha','Tipo', 'Producto','Descripcion', 'Valor', 'Cant. Ingreso', 'Valor Total Ingreso', 'Cant. Salida', 'Valor Total Salida'],
                    data: structuredData
                }
            ]
        }
    };

    return structuredResult;
};

const generateAndSendPDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

const inventoryDownload = async (req, res) => {
    try {
        const info = await getInventoryToPdf(req);

        if (info) {
            const result = processData(info);
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
    inventoryDownload
};
