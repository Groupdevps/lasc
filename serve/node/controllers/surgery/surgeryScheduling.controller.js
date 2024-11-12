const { SurgeryScheduling,Status,Order,OrderCupsList,CupsList, SurgicalAccessRoutes } = require('../../models');
const { Op } = require('sequelize');

// Función para buscar el ID del estado "CIRUGIA PROGRAMADA"
async function getScheduledSurgeryStatusId() {
    const status = await Status.findOne({ where: { name: 'CIRUGIA PROGRAMADA' } });
    return status ? status.id : null;
  }
  
  // Función para actualizar el estado de la orden a "CIRUGIA PROGRAMADA"
  async function updateOrderStatusToScheduled(OrderId) {
    const scheduledStatusId = await getScheduledSurgeryStatusId();
    
    if (!scheduledStatusId) {
      throw new Error('El estado "CIRUGIA PROGRAMADA" no existe en la base de datos');
    }
  
    // Actualizar el estado de la orden
    await Order.update(
      { StatusId: scheduledStatusId },
      { where: { id: OrderId } }
    );
  }
  

// Función para validar si un cirujano tiene otra cirugía en la misma fecha y hora
async function validateSurgeonAvailability(SurgeonA, SurgeonB, Date, Hour) {
  // Buscar cirugías donde SurgeonA o SurgeonB coincidan con la misma fecha y hora
  const existingSurgery = await SurgeryScheduling.findOne({
    where: {
      [Op.or]: [{ SurgeonA }, { SurgeonB }],
      Date,
      Hour
    }
  });

  return existingSurgery ? false : true;
}

// Función para validar los datos obligatorios
function validateRequiredFields(SurgeryLiquidationId, Date, Hour, SurgeonA) {
  if (!SurgeryLiquidationId) {
    return 'Tipo de cirugía es obligatorio';
  }

  if (!Date) {
    return 'La fecha de la cirugía es obligatoria';
  }

  if (!Hour) {
    return 'La hora de la cirugía es obligatoria';
  }

  if (!SurgeonA) {
    return 'Debe proporcionar al menos un cirujano principal (SurgeonA)';
  }

  return null;
}

// Función para validar que haya al menos una ruta quirúrgica
function validateAccessRoutes(accessRoutes) {
  if (!accessRoutes || accessRoutes.length === 0) {
    return 'Debe proporcionar al menos una ruta de acceso quirúrgica';
  }

  return null;
}

// Controlador modularizado
const SurgerySchedulingController = {
  // Crear una nueva programación de cirugía con rutas quirúrgicas
  async create(req, res) {
    const { OrderId, Date, Hour, SurgeonA, SurgeonB = null, SurgeryLiquidationId, accessRoutes } = req.body;

    try {
      // 1. Validar la disponibilidad de los cirujanos (SurgeonA y SurgeonB)
      const isAvailable = await validateSurgeonAvailability(SurgeonA, SurgeonB, Date, Hour);
      if (!isAvailable) {
        return res.status(400).json({ message: 'Uno de los cirujanos ya tiene una cirugía programada en esa fecha y hora' });
      }

      // 2. Validar los campos obligatorios
      const validationError = validateRequiredFields(SurgeryLiquidationId, Date, Hour, SurgeonA);
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }

      // 3. Validar las rutas quirúrgicas
      const accessRoutesError = validateAccessRoutes(accessRoutes);
      if (accessRoutesError) {
        return res.status(400).json({ message: accessRoutesError });
      }

      // Crear la nueva programación de cirugía
      const surgeryScheduling = await SurgeryScheduling.create({
        OrderId,
        Date,
        Hour,
        SurgeonA,
        SurgeonB: SurgeonB ,
        SurgeryLiquidationId,
        accessRoutes: accessRoutes.map(route => ({
          OrderCupsListId: route.OrderCupsListId,
          accessRoute: route.accessRoute
        }))
      }, {
        include: [{ model: SurgicalAccessRoutes, as: 'accessRoutes' }]
      });
      // 4. Actualizar el estado de la orden a "CIRUGÍA PROGRAMADA"
      await updateOrderStatusToScheduled(OrderId);
      res.status(201).json(surgeryScheduling);
    } catch (error) {
      
      console.log("ERROR create, SURGERY SCHEDULING",error)
      res.status(500).json({ message: error.message });
    }
  },

  // Obtener todas las programaciones de cirugía
  async getAll(req, res) {
    try {
      const surgeries = await SurgeryScheduling.findAll({
        include: [{ model: SurgicalAccessRoutes, as: 'accessRoutes' }]
      });
      res.status(200).json(surgeries);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las programaciones de cirugía' });
    }
  },
  // Obtener una programación de cirugía por order
  async getByOrder(req, res) {
    const { OrderId } = req.params;

    try {
      const surgery = await SurgeryScheduling.findOne( {
        where: {OrderId: OrderId},
        include: [{ model: SurgicalAccessRoutes, as: 'accessRoutes' , include: [{model: OrderCupsList, include: [CupsList]}]}]
      });

      if (!surgery) {
        return res.status(404).json({ message: 'Programación de cirugía no encontrada' });
      }

      res.status(200).json(surgery);
    } catch (error) {
      console.log("ERROR getByOrder, SURGERY SCHEDULING",error)

      res.status(500).json({ message: 'Error al obtener la programación de cirugía' });
    }
  },
  // Obtener una programación de cirugía por ID
  async getById(req, res) {
    const { id } = req.params;

    try {
      const surgery = await SurgeryScheduling.findByPk(id, {
        include: [{ model: SurgicalAccessRoutes, as: 'accessRoutes' }]
      });

      if (!surgery) {
        return res.status(404).json({ message: 'Programación de cirugía no encontrada' });
      }

      res.status(200).json(surgery);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la programación de cirugía' });
    }
  },

  // Actualizar una programación de cirugía
  async update(req, res) {
    const { id } = req.params;
    const { OrderId, Date, Hour, SurgeonA, SurgeonB, SurgeryLiquidationId, accessRoutes } = req.body;

    try {
      const surgery = await SurgeryScheduling.findByPk(id);

      if (!surgery) {
        return res.status(404).json({ message: 'Programación de cirugía no encontrada' });
      }

      // Actualizar programación de cirugía
      await surgery.update({ OrderId, Date, Hour, SurgeonA, SurgeonB, SurgeryLiquidationId });

      // Eliminar rutas existentes
      await SurgicalAccessRoutes.destroy({ where: { SurgerySchedulingId: id } });

      // Crear nuevas rutas
      await Promise.all(accessRoutes.map(route => SurgicalAccessRoutes.create({
        SurgerySchedulingId: id,
        OrderCupsListId: route.OrderCupsListId,
        accessRoute: route.accessRoute
      })));

      res.status(200).json(surgery);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la programación de cirugía', details: error });
    }
  },

  // Eliminar una programación de cirugía
  async delete(req, res) {
    const { id } = req.params;

    try {
      const surgery = await SurgeryScheduling.findByPk(id);

      if (!surgery) {
        return res.status(404).json({ message: 'Programación de cirugía no encontrada' });
      }

      // Eliminar las rutas quirúrgicas asociadas
      await SurgicalAccessRoutes.destroy({ where: { SurgerySchedulingId: id } });

      // Eliminar la programación de cirugía
      await surgery.destroy();

      res.status(200).json({ message: 'Programación de cirugía eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la programación de cirugía', details: error });
    }
  },
};

module.exports = SurgerySchedulingController;
