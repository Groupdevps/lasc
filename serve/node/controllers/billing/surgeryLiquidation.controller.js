const { SurgeryLiquidation, LiquidationType,ManualType,Service, User, sequelize } = require('../../models'); // Asegúrate de que la ruta sea correcta

const include =  [
  {
    model: LiquidationType, // Incluir LiquidationType
    include: [
      {
        model: ManualType, // Incluir ManualType relacionado
        attributes: ['id', 'name'], // Seleccionar solo los atributos que necesitas
      },
      {
        model: Service, // Incluir Service relacionado
        attributes: ['id', 'name'], // Seleccionar solo los atributos que necesitas
      }
    ]
  },
  {
    model: User, // Incluir User
    attributes: ['id', 'username'], // Seleccionar solo los atributos que necesitas
  }
]

const get = async (req, res) => {
    try {
      const where = {}
      const {search} = req.query
      if (search){
        where.name = '%{search}%'
      }

      const SurgeryLiquidations = await SurgeryLiquidation.findAll({
        where,
        include
      });
      if (!SurgeryLiquidations) {
        throw new Error('liquidaciones de cirugias no registradas');
      }
  
      return res.status(200).json(SurgeryLiquidations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener el UVT activo' });
    }
  };

const getNames = async (req, res) => {
    try {
      const where = {}
      where.active = true

      const SurgeryLiquidations = await SurgeryLiquidation.findAll({
        where
      });
      if (!SurgeryLiquidations) {
        throw new Error('liquidaciones de cirugias no registradas');
      }
  
      return res.status(200).json(SurgeryLiquidations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener el UVT activo' });
    }
  };

module.exports = {
    get,
    getNames
};
