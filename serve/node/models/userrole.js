'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(UserRole);
      UserRole.belongsTo(models.User);

      models.Role.hasMany(UserRole);
      UserRole.belongsTo(models.Role);
    }
  }
  UserRole.init({
    active: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};