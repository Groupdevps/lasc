'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnestheticRecord extends Model {
    static associate(models) {
      // Asociación con otros modelos
      AnestheticRecord.belongsTo(models.Order, { foreignKey: 'OrderId' });
      AnestheticRecord.belongsTo(models.User, { as: 'anesthesiologist', foreignKey: 'anesthesiologistId' });
      AnestheticRecord.belongsTo(models.AnestheticTechnique);

      AnestheticRecord.belongsTo(models.User, { as: 'surgeon', foreignKey: 'surgeonId' });
      AnestheticRecord.belongsTo(models.User, { as: 'creator', foreignKey: 'userId' });
    }
  }
  
  AnestheticRecord.init({
    OrderId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    day: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    anesthesiologistId: DataTypes.INTEGER,
    surgeonId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    AnestheticTechniqueId: DataTypes.INTEGER,
    monitoring: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        spO2: null,
        capnography: null,
        stAnalysis: null,
        ekg: null,
        tee: null,
        warmingDevice: null,
        pani: {
          respirometer: null,
          centralTemp: null,
          peripheralNerveStimulator: null,
          bis: null,
          gcNI: null
        },
        arterialPad: {
          diuresis: null,
          expiredGases: {
            etCO2: null
          },
          pvc: null,
          pic: null,
          ocularProtection: null
        }
      }
    },
    events: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: []
    },
    premedication: DataTypes.STRING,
    painManagement: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        pop: null,
        ivOpioids: null,
        localInfiltration: null
      }
    },
    bloodGases: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        time: null,
        pH: null,
        pCO2: null,
        HCO3: null,
        pO2: null,
        saturation: null,
        baseExcess: null,
        lactate: null
      }
    },
    liquidBalance: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        output: null,
        input: null,
        deficit: null,
        lactate: null,
        insensibleLosses: null,
        salineSolution: null,
        colloids: null,
        blood: null
      }
    },
    postAnesthesiaCareUnit: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        phaseI: null,
        phaseII: null,
        transfer: null
      }
    },
    observations: DataTypes.TEXT,
    anesthesiologistSignature: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AnestheticRecord',
    tableName: 'AnestheticRecords',
    timestamps: true,
  });

  return AnestheticRecord;
};
