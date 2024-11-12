'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.Permission, { foreignKey: 'RoleId', as: 'permissions' });
      Role.hasMany(models.User, { as: 'Users', foreignKey: 'RoleId', });

    }
  }
  Role.init({
    name: DataTypes.STRING,
    
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};