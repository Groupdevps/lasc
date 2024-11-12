'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Concept extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación con CupsList
      Concept.belongsTo(models.CupsList, { foreignKey: 'cup', targetKey: 'code' });

      // Relación con TariffManual (Soat)
      Concept.belongsTo(models.TariffManual, { foreignKey: 'soat', targetKey: 'code' });

      // Relación con Iss
      Concept.belongsTo(models.iss, { foreignKey: 'iss', targetKey: 'code', as: 'Iss' });
    }
  }
  Concept.init({
    cup: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    soat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    iss: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false 
    }
  },  {
    sequelize,
    modelName: 'Concept'
  });
  return Concept;
};
/* 
{
  "iss": {
    "code": "001",
    "description": "General medical consultation",
    "value": 50000
  },
  "soat": {
    "code": "002",
    "description": "Emergency care",
    "value": 150000
  },
  "cup": {
    "code": "003",
    "description": "Minor surgical procedure"
  }
}
 */