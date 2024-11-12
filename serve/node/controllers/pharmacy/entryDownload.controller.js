const pdfMake = require('pdfmake');
const { generatePDF, sendPDFResponse } = require('./pdfDownload.controller');
const { getInventory } = require('./pharmacy.controller');

const processData = (combined) => {
    console.log('-------------------Combined', combined)
    const structuredData = combined.map(item => {
        if (item.type === 'input') {
            return {
                date: item.date,
                product: item.Product.name,
                value: item.Product.productValue,
                cantIngreso: item.cant,
                valorTotalIngreso: item.cant * item.Product.productValue,
                cantSalida: null,
                valorTotalSalida: null
            };
        } else {
            return {
                date: item.date,
                product: item.Product.name,
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
            title: '\n\nInventario',
            subject: [
                {
                    subtitle: 'Movimientos de Inventario',
                    header: ['fecha', 'producto', 'valor', 'cantIngreso', 'valorTotalIngreso', 'cantSalida', 'valorTotalSalida'],
                    title: ['Fecha', 'Producto', 'Valor', 'Cantidad Ingreso', 'Valor Total Ingreso', 'Cantidad Salida', 'Valor Total Salida'],
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
        const info = await getInventory(req);

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
