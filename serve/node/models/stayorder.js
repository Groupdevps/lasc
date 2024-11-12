'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StayOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Bed.hasMany(StayOrder, { foreignKey: 'BedId' });
      StayOrder.belongsTo(models.Bed, { foreignKey: 'BedId' });

      models.Attention.hasMany(StayOrder, { foreignKey: 'AttentionId' });
      StayOrder.belongsTo(models.Attention, { foreignKey: 'AttentionId' });

      models.Person.hasMany(StayOrder, { foreignKey: 'PersonId' });
      StayOrder.belongsTo(models.Person, { foreignKey: 'PersonId' });

    //  models.User.hasMany(StayOrder, { foreignKey: 'UserId' });
    //  StayOrder.belongsTo(models.User, { foreignKey: 'UserId' });

    }
  }
  StayOrder.init({
    AttentionId: DataTypes.INTEGER,
    PersonId: DataTypes.INTEGER,
    BedId: DataTypes.INTEGER,
    ambit: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
   // UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StayOrder',
  });
  return StayOrder;
};