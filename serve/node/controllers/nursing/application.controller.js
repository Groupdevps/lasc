const { Apply, SubSupply, Concept, User, EvolutionNoteNursing, sequelize, DispatchDetail,Dispatch } = require("../../models");
const { includeApply } = require("../includes");

// Constante para los includes


const createApply = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { AttentionId, UserId, date, hour, observation, whoAppliesIt, whoSuppliedIt, SubSupplies } = req.body;

        // Crear el Apply
        const apply = await Apply.create({
            AttentionId,
            UserId,
            date,
            hour,
            observation,
            whoAppliesIt,
            whoSuppliedIt,
            
        }, { transaction });

        // Procesar los SubSupplies
        let subSuppliesInfo = '';
        if (SubSupplies && SubSupplies.length > 0) {
            for (const subSupply of SubSupplies) {
                const { date, hour, description, UserId, typeSupply,ProductId, orderNumber, measuringUnit, administration,ConceptId, cant, Product } = subSupply;

                // Buscar el detalle de despacho con el producto correspondiente
                const dispatchDetail = await DispatchDetail.findOne({
                    where: {
                        ProductId: Product.ProductId
                    },
                    include: [{
                        model: Dispatch, // Incluir el modelo Dispatch
                        where: {
                            orderNumber: Product.orderNumber
                        }
                    }],
                    transaction
                });

                if (!dispatchDetail || dispatchDetail.available < cant) {
                    throw new Error('No hay suficiente disponibilidad para el producto solicitado.');
                }

                // Descontar la cantidad del disponible en DispatchDetail
                dispatchDetail.available -= cant;

                await dispatchDetail.save({ transaction });

                // Crear el SubSupply
                await SubSupply.create({
                    typeSupply,
                    ProductId,
                    cant, 
                    orderNumber, 
                    measuringUnit, 
                    administration,
                    ApplyId: apply.id,
                    date, hour, input: description, UserId
                }, { transaction });

                // Agregar la información del SubSupply al resumen
                subSuppliesInfo += `
                    - ${typeSupply} - ${description} - CANTIDAD: ${cant} ${measuringUnit} - VIA: ${administration} - ORDEN : ${orderNumber}
                `;
            }
        }

        // Crear EvolutionNoteNursing con un resumen del Apply y los SubSupplies
        const summaryObservation = `
            - FECHA: ${date} - HORA: ${hour}
            - OBSERVACIÓN: ${observation}
            DETALLES DE LOS SUMINISTROS:
            ${subSuppliesInfo}
            - APLICÓ: ${whoAppliesIt} - SUMINISTRÓ: ${whoSuppliedIt}
        `;

        await EvolutionNoteNursing.create({
            observation: summaryObservation.trim(), // Eliminar espacios en blanco al inicio y final
            UserId,
            date,
            hour,
            AttentionId,
        }, { transaction });

        await transaction.commit();

        const applyWithDetails = await Apply.findByPk(apply.id, {
            include: includeApply
        });

        res.status(201).json(applyWithDetails);
    } catch (error) {
        await transaction.rollback();
        console.error('Error en createApply:', error);
        res.status(500).json({ message: error.message });
    }
};


const getApplyById = async (req, res) => {
    try {
        const { id } = req.params;

        const apply = await Apply.findByPk(id, {
            include: applyIncludes
        });

        if (!apply) {
            return res.status(404).json({ error: "Apply no encontrado" });
        }

        res.status(200).json(apply);
    } catch (error) {
        console.error('Error en getApplyById:', error);
        res.status(500).json({ error: error.message });
    }
};


const getApplies = async (req, res) => {
  try {
      let where= {}
      const { attention } = req.query;
      if(attention){
        where.AttentionId = attention
      }
      const applies = await Apply.findAll({
        where,
        include: includeApply
      });

      

      res.status(200).json(applies);
  } catch (error) {
      console.error('Error en getApplyById:', error);
      res.status(500).json({ error: error.message });
  }
};


module.exports = {
    createApply,
    getApplyById,
    getApplies
};
