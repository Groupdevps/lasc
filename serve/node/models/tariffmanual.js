'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  let cachedUvt = null; // Variable global para cachear UVT

  class TariffManual extends Model {
    static async getCachedUvt() {
      if (!cachedUvt) {
        const latestUvt = await sequelize.models.uvt.findOne({
          where: { active: true, year: new Date().getFullYear().toString() }, // Ajusta el año o condición según sea necesario
          order: [['createdAt', 'DESC']],
        });

        if (latestUvt) {
          cachedUvt = latestUvt.value; // Guardamos el valor en el cache
        } else {
          throw new Error('No se encontró ningún UVT activo para el año actual');
        }
      }

      return cachedUvt; // Retornamos el valor cacheado
    }

    static async calculatePesos(uvtValue) {
      const uvt = await TariffManual.getCachedUvt();
      if (uvt && uvtValue != null) {
        return uvtValue * uvt;
      }
      return null;
    }

    static associate(models) {
      models.TariffCategory.hasOne(TariffManual);
      TariffManual.belongsTo(models.TariffCategory);
    }
  }

  TariffManual.init({
    code: DataTypes.INTEGER, // examId
    description: DataTypes.TEXT, // procedures
    surgicalGroup: DataTypes.STRING,
    uvt: DataTypes.FLOAT,
    TariffCategoryId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    pesos: {
      type: DataTypes.VIRTUAL,
      get() {
        return this._pesos; // Cambiamos el getter para usar la propiedad calculada
      },
    }
  }, {
    sequelize,
    modelName: 'TariffManual',
  });

  // Registramos el hook afterFind
  TariffManual.addHook('afterFind', async (result) => {
    if (!result) return;

    const uvt = await TariffManual.getCachedUvt(); // Obtener UVT una sola vez

    const calculatePesosForInstance = async (instance) => {
      instance._pesos = await TariffManual.calculatePesos(instance.uvt); // Calculamos y asignamos el valor a la propiedad interna
    };

    if (Array.isArray(result)) {
      await Promise.all(result.map(calculatePesosForInstance));
    } else {
      await calculatePesosForInstance(result);
    }
  });

  return TariffManual;
};
