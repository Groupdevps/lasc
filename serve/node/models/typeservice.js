'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeService.hasMany(models.Attention);
      models.Attention.belongsTo(TypeService);
    }
  }
  TypeService.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    state: DataTypes.BOOLEAN,
    description: DataTypes.STRING,

    //relation
    ServiceCategoryId: DataTypes.INTEGER
    
    
    

  }, {
    sequelize,
    modelName: 'TypeService',
    hooks: {
      beforeCreate: (typeService, options) => {
        if (!typeService.code) {
          const name = typeService.name || '';
          // Obtener las primeras 3 letras del nombre en mayúsculas
          typeService.code = name.slice(0, 3).toUpperCase();
        }
      },
      beforeUpdate: (typeService, options) => {
        if (!typeService.code) {
          const name = typeService.name || '';
          // Obtener las primeras 3 letras del nombre en mayúsculas
          typeService.code = name.slice(0, 3).toUpperCase();
        }
      }
    }
  });
  return TypeService;
};