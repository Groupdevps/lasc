const { uvt, sequelize } = require('../../models'); // Asegúrate de que la ruta sea correcta

const createUvt = async (req, res) => {
    const transaction = await sequelize.transaction(); // Inicia la transacción

  try {
    const { value, year } = req.body;
    const { user } = req.params

    // Cambiar todos los UVT existentes a `active: false`
    await uvt.update({ active: false }, { where: {} }, { transaction });

    // Crear el nuevo UVT
    const newUvt = await uvt.create({
      value,
      year: year || new Date().getFullYear().toString(), // Si no se proporciona el año, se toma el actual
      UserId: user
    }, { transaction });
    await transaction.commit();

    return res.status(201).json(newUvt);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const fetchLatestActiveUvt = async (req, res) => {
    try {
      // Obtener el último UVT activo del año actual
      const latestUvt = await uvt.getLatestActiveUvt();
      if (!latestUvt) {
        throw new Error('No se encontró un UVT activo para el año actual');
      }
  
      return res.status(200).json({
        year: latestUvt.year,
        value: latestUvt.value
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener el UVT activo' });
    }
  };

module.exports = {
  createUvt,
  fetchLatestActiveUvt
};
