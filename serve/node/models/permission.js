'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsTo(models.Role, { foreignKey: 'RoleId' });


      models.Resource.hasMany(Permission)
      Permission.belongsTo(models.Resource)
    }
  }
  Permission.init({
    RoleId: DataTypes.INTEGER,
    ResourceId: DataTypes.INTEGER,
    canAdd: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    canEdit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    canView: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    canDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};