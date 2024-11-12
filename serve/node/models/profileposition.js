'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfilePosition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Profile.hasMany(ProfilePosition);
      ProfilePosition.belongsTo(models.Profile);

      models.Position.hasMany(ProfilePosition);
      ProfilePosition.belongsTo(models.Position);

    }
  }
  ProfilePosition.init({
    ProfileId: DataTypes.INTEGER,
    PositionId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProfilePosition',
  });
  return ProfilePosition;
};