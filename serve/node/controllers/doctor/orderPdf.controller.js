const pdfMake = require('pdfmake');
const moment = require('moment')
const { generatePDF , sendPDFResponse} = require('../downloadControllers/pdfDownload.controller');
const { getOrderToPdf } = require('../doctor/order.controller')

const processData = (result) => {
    console.log('************result:', result);

    const user = result.Doctor || {   }; // Valores predeterminados para evitar errores

    result.Attention.HistoryPerson.GenderName = result.Attention.HistoryPerson?.Gender?.name;
    

     result.core = {
        title: result.TypeOrder?.name  ,
        subtitle: 'Número: ' + result.orderNumber,
        subject: [ {
            subtitle: 'Información del Centro',
            header: ['name', 'nit', 'phone', 'address'],
            title: ['Nombre', 'Nit', 'Telefono', 'Direccion'],
            data: result.Center || [], // Asignar array vacío si result.Center es null
            isHorizontal: true
        },
        {
            subtitle: 'Datos del Paciente',
            header: ['fullName', 'numberId', 'GenderName', 'age', 'phone', 'currentAdministratorName'],
            title: ['Nombre', 'Documento', 'Sexo', 'Edad', 'Telefono', 'EPS'],
            data: result.Attention.HistoryPerson || [], // Asignar array vacío si result.Attention.HistoryPerson es null
            isHorizontal: true
        },
        // Agregar Diagnosticos solo si existe OrderSubDiagnoses
        ...(result.OrderSubDiagnoses && result.OrderSubDiagnoses.length > 0 ? [{
            subtitle : 'Diagnosticos', 
            header: [ 'SubDiagnose.code', 'SubDiagnose.name'],
            title: ['Codigo','Descripcion'],
            data : result.OrderSubDiagnoses  ,
            isHorizontal: true
        }] : []),
        // Agregar Suministros solo si existe OrderProducts
        ...(result.OrderProducts && result.OrderProducts.length > 0 ? [{
            subtitle : 'Suministros', 
            header: [ 'Product.code', 'Product.name','Product.description', 'cant'],
            title: ['Codigo','Producto',' ', 'Cantidad'],
            data : result.OrderProducts,
            isHorizontal: true
        }] : []),
                // Agregar materiales solo si existe OrderMaterials

        ...(result.OrderMaterials && result.OrderMaterials.length > 0 ? [{
            subtitle : 'Suministros', 
            header: [ 'Product.code', 'Product.name','Product.description', 'cant', 'note'],
            title: ['Codigo','Producto',' ', 'Cantidad', 'Nota'],
            data : result.OrderMaterials,
            isHorizontal: true
        }] : []),
        // Agregar Medicamentos solo si existe Medicines
        ...(result.Medicines && result.Medicines.length > 0 ? [{
            subtitle: 'Medicamentos', 
            header: [ 'MedicationList.atcCode', 'MedicationList.description', 'amount', 'dosage'],
            title: ['Codigo', 'Medicamento',  'Cantidad', 'Dosis'],
            data : result.Medicines ,
            isHorizontal: true
        }] : []),
        // Agregar Procedimientos solo si existe OrderCupList
        ...(result.OrderCupsLists && result.OrderCupsLists.length > 0 ? [{
            subtitle: 'Procedimientos', 
            header: ['CupsList.code', 'CupsList.description'],
            title: ['Codigo', 'Descripcion'],
            data: result.OrderCupsLists,
            isHorizontal: true
        }] : []),
        // Agregar Recomendaciones solo si existe Recommendations
        ...(result.Recommendations && result.Recommendations.length > 0 ? [{
            subtitle: 'Recomendaciones', 
            header: ['Fecha', 'Recomendacion'],
            title: ['Fecha', 'Recomendacion'],
            data: result.Recommendations.map(rec => ({
                Fecha: moment(rec.createdAt).format('YYYY-MM-DD hh:mm A'),
                Recomendacion: rec.recommendation
            })),
            isHorizontal: false
        }] : []),
        // Agregar Incapacidad solo si existe Incapacidad
        ...(result.Inabilities && result.Inabilities.length > 0 ? [{
            subtitle: 'Incapacidad', 
            header: ['startDate', 'endDate', 'disabilityDays', 'observation'],
            title: ['Fecha Inicio', 'Fecha Fin', 'Dias de incapacidad', 'Observaciones'],
            data: result.Inabilities.map(rec => ({
                startDate: moment(rec.startDate).format('YYYY-MM-DD'),
                endDate: moment(rec.endDate).format('YYYY-MM-DD'),
                disabilityDays: rec.disabilityDays,
                observation: rec.observation
            })),
            isHorizontal: true
        }] : []),
        {
            subtitle: 'Generado por',
            header: ['name', 'role'],
            title: ['Usuario', 'Cargo'],
            data: [{
                name: user.name || ' ',
                role: user.Role?.name || ' '
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

const orderDownload = async (req, res) => {
    try {
        const info = await getOrderToPdf(req);

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
        res.status(500).json({ message : error.message});
    }
};



module.exports = {
    orderDownload
};
