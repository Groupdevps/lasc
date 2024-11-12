'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.TypeResource.hasMany(Resource)
      Resource.belongsTo(models.TypeResource)
    }
  }
  Resource.init({
    TypeResourceId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    keyForm: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Resource',
  });
  return Resource;
};