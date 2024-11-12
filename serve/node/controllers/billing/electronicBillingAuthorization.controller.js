const { ElectronicBillingAuthorization, Center, sequelize } = require('../../models'); // Asegúrate de que los modelos están correctamente importados

// Función de validación
function validatePrefix(prefix) {
    const regex = /^[A-Z]{1,4}$/; // Solo letras mayúsculas y de 1 a 4 caracteres
    return regex.test(prefix);
  }


  // Función auxiliar para desactivar todas las autorizaciones activas
async function deactivatePreviousAuthorizations() {
    await ElectronicBillingAuthorization.update(
      { active: false }, // Actualizamos el campo 'active' a 'false'
      { where: { active: true } } // Solo las autorizaciones que están activas
    );
  }

  
const ElectronicBillingAuthorizationController = {
  // Crear una nueva autorización de facturación electrónica
  async create(req, res) {
    const t = await sequelize.transaction(); // Iniciamos una nueva transacción
    try {
      const { authorizationNumber, authorizationDate, from, to, prefix, initialInvoiceNumber, CenterId } = req.body;

      // Validación del prefijo
      if (!validatePrefix(prefix)) {
        throw new Error('El prefijo debe contener solo letras mayúsculas y tener un máximo de 4 caracteres.');
      }

      // Desactivar autorizaciones anteriores dentro de la transacción
      await deactivatePreviousAuthorizations(t);

      // Crear la nueva autorización dentro de la transacción
      const newAuthorization = await ElectronicBillingAuthorization.create(
        {
          authorizationNumber,
          authorizationDate,
          from,
          to,
          prefix,
          initialInvoiceNumber,
          CenterId,
          active: true, // La nueva autorización se crea como activa
        },
        { transaction: t }
      );

      // Si todo va bien, confirmamos la transacción
      await t.commit();
      return res.status(201).json(newAuthorization);
    } catch (error) {
      // Si ocurre un error, revertimos la transacción
      await t.rollback();
      return res.status(500).json({
        error: 'Error al crear la autorización de facturación electrónica',
        details: error.message,
      });
    }
  },

  // Actualizar una autorización de facturación por ID
  async update(req, res) {
    const t = await sequelize.transaction(); // Iniciamos una nueva transacción
    try {
      const { id } = req.params;
      const { authorizationNumber, authorizationDate, from, to, prefix, initialInvoiceNumber, CenterId, active } = req.body;

      // Validación del prefijo
      if (!validatePrefix(prefix)) {
        throw new Error('El prefijo debe contener solo letras mayúsculas y tener un máximo de 4 caracteres.');
      }

      const authorization = await ElectronicBillingAuthorization.findOne({ where: { id } });

      if (!authorization) {
        throw new Error('Autorización de facturación electrónica no encontrada');
      }

      // Actualizar la autorización dentro de la transacción
      await authorization.update(
        {
          authorizationNumber,
          authorizationDate,
          from,
          to,
          prefix,
          initialInvoiceNumber,
          CenterId,
          active,
        },
        { transaction: t }
      );

      // Si se está activando esta autorización, desactivar otras
      if (active === true) {
        await deactivatePreviousAuthorizations(t);
        await authorization.update({ active: true }, { transaction: t });
      }

      // Si todo va bien, confirmamos la transacción
      await t.commit();
      return res.status(200).json(authorization);
    } catch (error) {
      // Si ocurre un error, revertimos la transacción
      await t.rollback();
      return res.status(500).json({
        error: 'Error al actualizar la autorización de facturación electrónica',
        details: error.message,
      });
    }
  },

  // Obtener todas las autorizaciones de facturación electrónica
  async getAll(req, res) {
    try {
      const authorizations = await ElectronicBillingAuthorization.findAll({
        include: [{model: Center}],
      });
      return res.status(200).json(authorizations);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching electronic billing authorizations', details: error.message });
    }
  },

  // Obtener una autorización de facturación por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const authorization = await ElectronicBillingAuthorization.findOne({
        where: { id },
        include: [{ model: Center, as: 'center' }],
      });
      if (!authorization) {
        return res.status(404).json({ error: 'Electronic billing authorization not found' });
      }
      return res.status(200).json(authorization);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching electronic billing authorization', details: error.message });
    }
  },

  // Eliminar una autorización de facturación por ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const authorization = await ElectronicBillingAuthorization.findOne({ where: { id } });

      if (!authorization) {
        return res.status(404).json({ error: 'Electronic billing authorization not found' });
      }

      await authorization.destroy();
      return res.status(200).json({ message: 'Electronic billing authorization deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting electronic billing authorization', details: error.message });
    }
  },

  // Desactivar una autorización de facturación electrónica por ID
  async deactivate(req, res) {
    const t = await sequelize.transaction(); // Iniciamos una nueva transacción
    try {
      const { id } = req.params;

      // Buscar la autorización por ID
      const authorization = await ElectronicBillingAuthorization.findOne({ where: { id } });

      if (!authorization) {
        return res.status(404).json({ error: 'Autorización de facturación electrónica no encontrada' });
      }

      // Desactivar la autorización dentro de la transacción
      await authorization.update({ active: false }, { transaction: t });

      // Confirmar la transacción
      await t.commit();
      return res.status(200).json({ message: 'Autorización desactivada exitosamente' });
    } catch (error) {
      // Revertir la transacción en caso de error
      await t.rollback();
      return res.status(500).json({
        error: 'Error al desactivar la autorización de facturación electrónica',
        details: error.message,
      });
    }
  },

  
};

module.exports = ElectronicBillingAuthorizationController;
