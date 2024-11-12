const pdfMake = require('pdfmake');
const { generatePDF, sendPDFResponse } = require('./pdfDownload.controller');
const { Supply, Attention, AnalysisResult,HistoryPerson, SubDiagnoseList, SubDiagnose, Apply, SubSupply, AnalysisLaboratory,Concept, Product, CupsList, LaboratoryResult, Order, OrderCupsList, diagnosticAidResult } = require('../../models');
const { Sequelize } = require('sequelize');
const { includeAttentionById } = require('../includes');

// Función para agrupar y sumar por código
const groupAndSumByCode = (array, codeKey, quantityKey = 'cant') => {
    return array.reduce((acc, item) => {
        const code = item[codeKey];
        const quantity = item[quantityKey] || 1; // Asume cantidad de 1 si no está definida

        if (!acc[code]) {
            acc[code] = { ...item, [quantityKey]: quantity };
        } else {
            acc[code][quantityKey] += quantity;
        }

        return acc;
    }, {});
};

// Procesamiento de datos para el PDF
const processData = (data) => {
    let result = data

   
    result.core = {
        title: 'HOJA DE GASTOS ' ,
        subtitle: 'Atención: ' + result.Attention.attentionCode,
        subject: [
            
            ...(result.Attention ? [{
                subtitle: 'Reliquidacion de Cuentas',
                header: ['', 'TypeService.name', '', 'HistoryPerson.fullName', 'HistoryPerson.numberId', 'assignedDateHour', 'egressDate'],
                title: ['Salida General', 'Hospitalizacion', 'Corte de cuenta', 'Paciente', 'Documento', 'Fecha ingreso', 'Fecha egreso'],
                data: [{
                    ...data.Attention,
                    'assignedDateHour': `${data.Attention.assignedDate} ${data.Attention.hour}` // Combina fecha y hora en un solo campo
                }],
                isHorizontal: true
            }] : []), 

            ...(data.SubDiagnoseList && data.SubDiagnoseList.length > 0 ? [{
                subtitle: 'Diagnosticos',
                header: ['SubDiagnose.code', 'SubDiagnose.name'],
                title: ['Codigo', 'Nombre'],
                data:data.SubDiagnoseList,
                isHorizontal: true
            }] : []),
 
            ...(data.Supplies && data.Supplies.length > 0 ? [{
                subtitle: 'Farmacia e Insumos',
                header: ['code', 'name', 'description', 'cant'],
                title: ['Codigo', 'Nombre', 'Descripcion', 'Cantidad'],
                data: data.Supplies,
                isHorizontal: true
            }] : []),

            ...(data.Procedures && data.Procedures.length  > 0 ? [{
                subtitle: 'Otros procedimientos',
                header: ['code',  'description', 'cant'],
                title: ['Codigo', 'Descripcion', 'Cantidad'],
                data: data.Procedures ,
                isHorizontal: true
            }] : []),

            ...(data.Laboratories && data.Laboratories.length > 0 ? [{
                subtitle: 'Laboratorios',
                header: ['code', 'description', 'cant'],
                title: ['Codigo', 'Descripcion', 'Cantidad'],
                data: data.Laboratories,
                isHorizontal: true
            }] : []),

            ...(data.DiagnosticAids && data.DiagnosticAids.length > 0 ? [{
                subtitle: 'Ayuda diagnosticas',
                header: ['code', 'description', 'cant'],
                title: ['Codigo', 'Descripcion', 'Cantidad'],
                data: data.DiagnosticAids,
                isHorizontal: true
            }] : []), 
        ]
    };

    return result;
};

// Generación y envío del PDF
const generateAndSendPDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

// Descarga de la hoja de gastos
const expenseSheetDownload = async (req, res) => {
    try {
        const expenseSheet = await getExpenseSheetToPdf(req);

        if (expenseSheet) {
            const result = processData(expenseSheet);
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

// Obtención de la hoja de gastos
const getExpenseSheetToPdf = async (req, res) => {
    try {
        const { attention } = req.params;

        // Datos generales de la hoja de gastos
        const attentiondata = await Attention.findByPk(attention, { include: includeAttentionById})
        
         // Diagnósticos
        const dx = await SubDiagnoseList.findAll({
            where: { AttentionId: attention },
            include: [{ model: SubDiagnose }]
        });

        // Aplicación de suministros (farmacia e insumos)
        const supplies = await Apply.findAll({
            where: { AttentionId: attention },
            include: [{ model: SubSupply, required: true, include: [{ model: Product }] }]
        });

        // Aplicación de suministros (procedimientos)
        const procedures = await Apply.findAll({
            where: { AttentionId: attention },
            include: [{ model: SubSupply, required: true, include: [{ model: Concept, include: [{ model: CupsList }] }] }]
        });

        

        // Resultados de laboratorios
        const laboratories = await LaboratoryResult.findAll({
            where: { AttentionId: attention },
            include: [{ model: AnalysisResult,required: true, include: [{ model: AnalysisLaboratory, required: true,include: [{ model: CupsList }] }]  }]
        });

        // Ayudas diagnósticas 
        const diagnosticAids = await diagnosticAidResult.findAll({
            where: { AttentionId: attention },
            include: [{ model: Order, required: true, include: [ {model: OrderCupsList,required: true,include: [{ model: CupsList }]}]}]
        });  
        const groupedSupplies = groupSuppliesByProduct(supplies);
        const groupedProcedures = groupProceduresByCupsList(procedures);
        const groupedLaboratories = groupLaboratoryResultsByCupsList(laboratories);
        const groupedDiagnosticAids = await groupDiagnosticAidByCupsList(diagnosticAids);

        // Compilación de datos
        const data = {
            Attention: attentiondata,
            SubDiagnoseList: dx,
            Supplies: groupedSupplies,
            Procedures: groupedProcedures,
            Laboratories: groupedLaboratories,
            DiagnosticAids: groupedDiagnosticAids,
        };
        return data
    } catch (error) {
        console.error('Error getExpenseSheet', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
const getExpenseSheet = async (req, res) => {
    try {
        const { attention } = req.params;

        // Datos generales de la hoja de gastos
        const expenseSheet = await Supply.findAll({
            where: { AttentionId: attention },
            include: [{ model: Attention,required: true, include: [{ model: HistoryPerson }] }]
        }); 
        
         // Diagnósticos
        const dx = await SubDiagnoseList.findAll({
            where: { AttentionId: attention },
            include: [{ model: SubDiagnose }]
        });

        // Aplicación de suministros (farmacia e insumos)
        const supplies = await Apply.findAll({
            where: { AttentionId: attention },
            include: [{ model: SubSupply, required: true, include: [{ model: Product }] }]
        });

        // Aplicación de suministros (procedimientos)
        const procedures = await Apply.findAll({
            where: { AttentionId: attention },
            include: [{ model: SubSupply, required: true, include: [{ model: Concept, include: [{ model: CupsList }] }] }]
        });

        

        // Resultados de laboratorios
        const laboratories = await LaboratoryResult.findAll({
            where: { AttentionId: attention },
            include: [{ model: AnalysisResult,required: true, include: [{ model: AnalysisLaboratory, required: true,include: [{ model: CupsList }] }]  }]
        });

        // Ayudas diagnósticas 
        const diagnosticAids = await diagnosticAidResult.findAll({
            where: { AttentionId: attention },
            include: [{ model: Order, required: true, include: [ {model: OrderCupsList,required: true,include: [{ model: CupsList }]}]}]
        });  

        const groupedSupplies = await groupSuppliesByProduct(supplies);
        const groupedProcedures = await groupProceduresByCupsList(procedures);
        const groupedLaboratories = await groupLaboratoryResultsByCupsList(laboratories)
        const groupedDiagnosticAids = await groupDiagnosticAidByCupsList(diagnosticAids);

        // Compilación de datos
        const data = {
            ExpenseSheet: expenseSheet,
            SubDiagnoseList: dx,
            Supplies: groupedSupplies,
            Procedures: groupedProcedures,
            Laboratories: groupedLaboratories,
            DiagnosticAids: groupedDiagnosticAids,
        };
        res.status(200).json(data)
    } catch (error) {
        console.error('Error getExpenseSheet', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

function groupSuppliesByProduct(inputJSON) {
    const productMap = {};

    // Procesar cada Supply
    inputJSON.forEach(supply => {
        supply.SubSupplies.forEach(subSupply => {
            const product = subSupply.Product;

            if (product) {
                const productId = product.id;
                const productCode = product.code || productId; // Usa el código del producto o el ID si no hay código

                // Si el producto ya está en el mapa, suma la cantidad
                if (productMap[productCode]) {
                    productMap[productCode].cant += subSupply.cant;
                } else {
                    // Si no está, agrégalo al mapa
                    productMap[productCode] = {
                        id: productId,
                        name: product.name,
                        description: product.description,
                        cant: subSupply.cant,
                        code: productCode
                    };
                }
            }
        });
    });

    // Convertir el mapa en un array
    return Object.values(productMap); // Retorna directamente el array de suministros
}

function groupProceduresByCupsList(inputJSON) {
    const cupsListMap = {};

    // Procesar cada Supply
    inputJSON.forEach(supply => {
        supply.SubSupplies.forEach(subSupply => {
            const cupsList = subSupply.Concept?.cup; // Obtener CupsList

            // Solo procesar si hay un CupsList
            if (cupsList) {
                const cupsListId = cupsList.id; // ID de CupsList
                const cupsListCode = cupsList.code; // Código de CupsList
                const cupsListDescription = cupsList.description; // Descripción de CupsList
                const quantity = subSupply.cant || 1; // Asume cantidad de 1 si no está definida

                // Si el CupsList ya está en el mapa, suma la cantidad
                if (cupsListMap[cupsListId]) {
                    cupsListMap[cupsListId].cant += quantity;
                } else {
                    // Si no está, agrégalo al mapa
                    cupsListMap[cupsListId] = {
                        id: cupsListId,
                        code: cupsListCode,
                        description: cupsListDescription,
                        cant: quantity
                    };
                }
            }
        });
    });

    // Convertir el mapa en un array
    return Object.values(cupsListMap); // Retorna directamente el array de CupsList agrupados
}

function groupLaboratoryResultsByCupsList(laboratories) {
    const cupsListMap = {};

    // Procesar cada LaboratoryResult
    laboratories.forEach(laboratory => {
        laboratory.AnalysisResults.forEach(analysisResult => {
            const cupsList = analysisResult.AnalysisLaboratory.CupsList; // Obtener CupsList

            // Solo procesar si hay un CupsList
            if (cupsList) {
                const cupsListId = cupsList.id; // ID de CupsList
                const cupsListCode = cupsList.code; // Código de CupsList
                const cupsListDescription = cupsList.description; // Descripción de CupsList
                const quantity = 1; // En este caso, la cantidad se asume como 1 por cada resultado

                // Si el CupsList ya está en el mapa, suma la cantidad
                if (cupsListMap[cupsListId]) {
                    cupsListMap[cupsListId].cant += quantity;
                } else {
                    // Si no está, agrégalo al mapa
                    cupsListMap[cupsListId] = {
                        id: cupsListId,
                        code: cupsListCode,
                        description: cupsListDescription,
                        cant: quantity
                    };
                }
            }
        });
    });

    // Convertir el mapa en un array
    return Object.values(cupsListMap); // Retorna directamente el array de CupsList agrupados
}

function groupDiagnosticAidByCupsList(diagnosticAids) {
    const cupsListMap = {};

    diagnosticAids.forEach(diagnosticAid => {
        diagnosticAid.Order.OrderCupsLists.forEach(orderCupsList => {
            const cupsList = orderCupsList.CupsList;

            if (cupsList) {
                const cupsListId = cupsList.id;
                const cupsListCode = cupsList.code;
                const cupsListDescription = cupsList.description;
                const quantity = orderCupsList.quantity || 1;

                if (cupsListMap[cupsListId]) {
                    cupsListMap[cupsListId].cant += quantity;
                } else {
                    cupsListMap[cupsListId] = {
                        id: cupsListId,
                        code: cupsListCode,
                        description: cupsListDescription,
                        cant: quantity
                    };
                }
            }
        });
    });

    return Object.values(cupsListMap);
}





module.exports = {
    expenseSheetDownload,
    getExpenseSheet
};
