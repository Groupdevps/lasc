const pdfMake = require('pdfmake');
const moment = require('moment')
const { generatePDF , sendPDFResponse} = require('../downloadControllers/pdfDownload.controller');
const { getDispatchToPdf } = require('./dispatch.controller')

const processData = (result) => {
    // Propiedades faltantes
    console.log('************result:', result);

    const user = result.User || {};
    result.Attention.HistoryPerson.GenderName = result.Attention?.HistoryPerson?.Gender?.name;
    result.TypeServiceName = result.Attention?.TypeService?.name;

     result.core = {
        title:  'DESPACHO\n' + 'No: ' + result.dispatchNumber,
        subject: [{
            subtitle: 'Información del Centro',
            header: ['name', 'nit', 'phone', 'address'],
            title: ['Nombre', 'Nit', 'Telefono', 'Direccion'],
            data: result.Center,
            isHorizontal: true
        } , 
        {
            subtitle: 'Datos del Paciente',
            header: ['fullName', 'numberId', 'GenderName', 'age', 'phone', 'currentAdministratorName'],
            title: ['Nombre', 'Documento', 'Sexo', 'Edad', 'Telefono', 'EPS'],
            data: result.Attention.HistoryPerson,
            isHorizontal: true
        },
        {
            subtitle: 'Datos del Atencion',
            header: ['AttentionId', 'TypeServiceName', 'orderNumber', 'DispatchType.name', 'DeliveredTo'],
            title: ['No. Atencion', 'Servicio', 'No. Orden', 'Tipo', 'Entregado a'],
            data: result,
            isHorizontal: true
        },
        // Agregar Medicamentos solo si existe Medicines
        ...(result.Medicines && result.Medicines.length > 0 ? [{
            subtitle: 'Medicamentos', 
            header: [ 'MedicationList.atcCode', 'MedicationList.description', 'amount'],
            title: ['Codigo', 'Medicamento',  'Cantidad'],
            data : result.Medicines ,
            isHorizontal: true
        }] : []),
        // Agregar Suministros solo si existe OrderProducts
        ...(result.OrderProducts && result.OrderProducts.length > 0 ? [{
            subtitle: 'Suministros', 
            header: ['Product.code', 'Product.name', 'Product.description', 'cant'],
            title: ['Codigo', 'Nombre','Descripcion', 'Cantidad'],
            data: result.OrderProducts,
            isHorizontal: true
        }] : []),
        // Agregar detalles de despacho solo si existe DispatchDetails
        ...(result.DispatchDetails && result.DispatchDetails.length > 0 ? [{
            subtitle: 'Despacho', 
            header: ['Product.code', 'Product.name', 'Product.description', 'cant', 'note'],
            title: ['Codigo', 'Nombre','Descripcion', 'Cantidad', 'Nota'],
            data: result.DispatchDetails,
            isHorizontal: true
        }] : []),
        {
            subtitle: 'Generado por',
            header: ['name', 'UserRoles.Role.name'],
            title: ['Usuario', 'Cargo'],
            data: [{
                name: user.name,
                role: user.UserRoles?.Role?.name
            }],
            isHorizontal: true
        }]
    };
 
    return result;
};

const generateAndSendPDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

const dispatchDownload = async (req, res) => {
    try {
        const info = await getDispatchToPdf(req);
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
    dispatchDownload
};
