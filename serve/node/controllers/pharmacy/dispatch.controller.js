// controllers/DispatchController.js
const { Dispatch,Order , DispatchDetail, Product,Status,TypeService, Medicine,MedicationList, OrderProduct ,Attention,HistoryPerson, User,UserRole,Role, Center} = require('../../models');
const { sequelize } = require('../../models'); // Ajusta la ruta según tu estructura de proyecto

const includeOptions = [
  {
    model: DispatchDetail,
    include: [Product, Status, 
      {
        model: Medicine,
        include: [MedicationList, Status]},
      {
        model: OrderProduct,
        include: [Product, Status]
      }]
  }, 
  Status, 
  {
    model: Attention,
    include: [
      {
      model: HistoryPerson,
      include: "Gender"
      },
      {
        model: TypeService
      },
    ]
  },
  Center,
  "DispatchType",
  {
    model: User,
    include: [
      {
        model: UserRole,
        include: [Role]
      }
    ]
  }
]
const { Op } = require('sequelize');

class DispatchController {
  // Crear un nuevo despacho con detalles
  static async createDispatch(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      const {
        AttentionId,
        PersonId,
        CenterId,
        UserId,
        OrderId,
        OrderTypeId,
        orderNumber,
        StatusId,
        DeliveredTo,
        DispatchDetails
      } = req.body;
      
      // Verificar el estado de la orden
      await DispatchController.verifyOrderStatus(OrderId, transaction);

      // Crear el nuevo despacho
      const newDispatch = await DispatchController.createNewDispatch({
        AttentionId,
        PersonId,
        CenterId,
        UserId,
        OrderId,
        OrderTypeId,
        orderNumber,
        StatusId,
        DeliveredTo
      }, transaction);

      if (DispatchDetails && DispatchDetails.length > 0) {
        await DispatchController.processDispatchDetails(DispatchDetails, newDispatch.id, transaction);
        await DispatchController.updateOrderStatusIfAllDispatched(newDispatch.OrderId, newDispatch.id, transaction);
      }

      await transaction.commit();

      const dispatch = await Dispatch.findOne({ where: { id: newDispatch.id }, include: includeOptions });
      return res.status(201).json(dispatch);
    } catch (error) {
      await transaction.rollback();
      console.log("Error DispatchController.createDispatch:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async verifyOrderStatus(OrderId, transaction) {
    const order = await Order.findByPk(OrderId, { transaction });
    if (!order) {
      throw new Error(`No se encontró la orden con ID: ${OrderId}`);
    }
    const finalizadoStatus = await Status.findOne({ where: { name: 'FINALIZADO' }, transaction });
    if (order.StatusId === finalizadoStatus.id) {
      throw new Error('No se puede generar un nuevo despacho para una orden finalizada.');
    }
  }

  static async createNewDispatch(dispatchData, transaction) {
    return await Dispatch.create(dispatchData, { transaction });
  }

  static async processDispatchDetails(DispatchDetails, DispatchId, transaction) {
    for (const item of DispatchDetails) {
      await DispatchController.processDispatchDetail(item, DispatchId, transaction);
    }
  }

  static async processDispatchDetail(item, DispatchId, transaction) {
    let status;
    let pendingCant = 0;

    if (item.MedicineId) {
      pendingCant = await DispatchController.processMedicineDispatch(item, transaction);
    } else if (item.OrderProductId) {
      pendingCant = await DispatchController.processOrderProductDispatch(item, transaction);
    }

    if (pendingCant !== null) {
      status = pendingCant === 0
        ? await Status.findOne({ where: { name: 'DESPACHADO' }, transaction })
        : await Status.findOne({ where: { name: 'PARCIALMENTE DESPACHADO' }, transaction });

      await DispatchDetail.create({
        DispatchId,
        ProductId: item.ProductId,
        StatusId: status.id,
        MedicineId: item.MedicineId,
        OrderProductId: item.OrderProductId,
        cant: item.cant,
        available: item.cant,
        note: item.note
      }, { transaction });

      await DispatchController.updateProductStock(item.ProductId, item.cant, transaction);
    }
  }

  static async processMedicineDispatch(item, transaction) {
    const medicine = await Medicine.findByPk(item.MedicineId, { transaction });
    if (!medicine) {
      console.log(`No se encontró la medicina con ID: ${item.MedicineId}`);
      return null;
    }
    const pendingCant = medicine.pendingCant - item.cant;
    if (pendingCant < 0) {
      throw new Error("No se puede despachar más producto del solicitado");
    }
    await medicine.update({ pendingCant }, { transaction });
    return pendingCant;
  }

  static async processOrderProductDispatch(item, transaction) {
    const orderProduct = await OrderProduct.findByPk(item.OrderProductId, { transaction });
    if (!orderProduct) {
      console.log(`No se encontró el producto de la orden con ID: ${item.OrderProductId}`);
      return null;
    }
    const pendingCant = orderProduct.pendingCant - item.cant;
    if (pendingCant < 0) {
      throw new Error("No se puede despachar más producto del solicitado");
    }
    await orderProduct.update({ pendingCant }, { transaction });
    return pendingCant;
  }

  static async updateProductStock(ProductId, cant, transaction) {
    const product = await Product.findByPk(ProductId, { transaction });
    if (product) {
      const newStock = product.stock - cant;
      if (newStock < 0) {
        throw new Error(`Producto agotado, solo tenemos disponibilidad de ${product.stock} unidades.`);
      }
      product.stock = newStock;
      await product.save({ transaction });
    }
  }

  static async updateOrderStatusIfAllDispatched(OrderId, DispatchId, transaction) {
    const allDetails = await DispatchDetail.findAll({ where: { DispatchId }, transaction });
    let allDispatched = true;

    const dispatchedStatus = await Status.findOne({ where: { name: 'DESPACHADO' }, transaction });

    for (const detail of allDetails) {
      if (detail.StatusId !== dispatchedStatus.id) {
        allDispatched = false;
        break;
      }
    }

    if (allDispatched) {
      const finalizadoStatus = await Status.findOne({ where: { name: 'FINALIZADO' }, transaction });
      const order = await Order.findByPk(OrderId, { transaction });
      await order.update({ StatusId: finalizadoStatus.id }, { transaction });
    }
  }



  // Obtener todos los despachos con detalles
  static async getAllDispatches(req, res) {
    try {
      const dispatches = await Dispatch.findAll({
        include: includeOptions
      });

      return res.status(200).json(dispatches);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Obtener todos los despachos con pendiente por aplicar
static async getAvailableProductsByAttentionId(req, res) {
  try {
    const attentionId = req.query.attention;

    // Consulta para obtener los productos disponibles
    const availableProducts = await DispatchDetail.findAll({
      where: {
        available: { [Op.gt]: 0 }, // Filtra donde 'available' es mayor a 0
        '$Dispatch.AttentionId$': attentionId // Asegúrate de que el modelo Dispatch tenga el campo AttentionId
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'code', 'name', 'description'], // Selecciona los atributos deseados
        },
        {
          model: Dispatch,
          attributes: ['orderNumber'], // Asegúrate de que 'orderNumber' esté en el modelo Dispatch
        }
      ],
      attributes: ['available'], // Solo necesitas 'available' de DispatchDetail
    });

    // Mapea los resultados directamente a la estructura deseada
    const result = availableProducts.map(detail => ({
      orderNumber: detail.Dispatch.orderNumber,
      ProductId: detail.Product.id,
      code: detail.Product.code,
      name: detail.Product.name,
      description: detail.Product.description,
      available: detail.available
    }));

    // Devuelve los productos disponibles sin agrupar
    res.json(result);
  } catch (error) {
    console.error('Error fetching available products:', error.message);
    res.status(500).json({ message: error.message });
  }
}


  // Obtener un despacho por ID con detalles
  static async getDispatchById(req, res) {
    try {
      const { id } = req.params;
      const dispatch = await Dispatch.findByPk(id, {
        include: [
          {
            model: DispatchDetail,
            include: [Product, Medicine, OrderProduct]
          }
        ]
      });

      if (!dispatch) {
        return res.status(404).json({ error: 'Despacho no encontrado' });
      }

      return res.status(200).json(dispatch);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Obtener un despacho por ID con detalles
  static async getDispatchToPdf(req, res) {
		try {
			const {id} = req.params
			const result = await Dispatch.findOne({
				where: {
					id: id
				},
				include: includeOptions
			});
	
			if (result) {
				return result;  // Devolver result en lugar de responder directamente
			} else {
				res.status(404).json({
					message: 'No se encontró ningún resultado.'
				});
			}
		} catch (error) {
			console.error('Error al buscar Dispatch en controller:', error.message);
			res.status(500).json({
				message: error ? error.message : "Error desconocido"
			});
		}
	}

  // Actualizar un despacho y sus detalles
  static async updateDispatch(req, res) {
    try {
      const { id } = req.params;
      const { AttentionId, PersonId, CenterId, UserId, OrderTypeId, StatusId, orderNumber, DispatchDetails } = req.body;
  
      let dispatch = await Dispatch.findByPk(id);
  
      if (!dispatch) {
        return res.status(404).json({ message: 'Despacho no encontrado' });
      }
  
      dispatch = await dispatch.update({
        AttentionId,
        PersonId,
        CenterId,
        UserId,
        OrderTypeId,
        StatusId,
        orderNumber,
      });
  
      // Actualizar los detalles del despacho
      if (DispatchDetails) {
        await DispatchDetail.destroy({ where: { DispatchId: id } });
  
        for (const item of DispatchDetails) {
          let status;
          let pendingCant;
  
          if (item.MedicineId) {
            const medicine = await Medicine.findByPk(item.MedicineId);
            pendingCant = medicine.pendingCant - item.cant;
            await medicine.update({ pendingCant });
  
            if (pendingCant === 0) {
              status = await Status.findOne({ where: { name: 'DESPACHADO' } });
            } else {
              status = await Status.findOne({ where: { name: 'PARCIALMENTE DESPACHADO' } });
            }
          } else if (item.OrderProductId) {
            const orderProduct = await OrderProduct.findByPk(item.OrderProductId);
            pendingCant = orderProduct.pendingCant - item.cant;
            await orderProduct.update({ pendingCant });
  
            if (pendingCant === 0) {
              status = await Status.findOne({ where: { name: 'DESPACHADO' } });
            } else {
              status = await Status.findOne({ where: { name: 'PARCIALMENTE DESPACHADO' } });
            }
          }
  
          await DispatchDetail.create({
            DispatchId: id,
            ProductId: item.ProductId,
            StatusId: status.id,
            MedicineId: item.MedicineId,
            OrderProductId: item.OrderProductId,
            cant: item.cant,
            available: item.cant,
            note: item.note
          });
        }
  
        // Verificar si todos los detalles están "DESPACHADO"
        const allDetails = await DispatchDetail.findAll({ where: { DispatchId: id } });
        let allDispatched = true;

        const dispatchedStatus = await Status.findOne({ where: { name: 'DESPACHADO' } });

        for (const detail of allDetails) {
          if (detail.StatusId !== dispatchedStatus.id) {
            allDispatched = false;
            break;
          }
        }

        if (allDispatched) {
          const order = await Order.findByPk(dispatch.OrderId);
          const finalizadoStatus = await Status.findOne({ where: { name: 'FINALIZADO' } });
          await order.update({ StatusId: finalizadoStatus.id });
        }

      }
      const updatedDispatch = await Dispatch.findByPk(dispatch.id, { includeOptions });

      return res.status(200).json(updatedDispatch);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  // Eliminar un despacho y sus detalles
  static async deleteDispatch(req, res) {
    try {
      const { id } = req.params;

      const dispatch = await Dispatch.findByPk(id);

      if (!dispatch) {
        return res.status(404).json({ message: 'Despacho no encontrado' });
      }

      await DispatchDetail.destroy({ where: { DispatchId: id } });
      await dispatch.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = DispatchController;
