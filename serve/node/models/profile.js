'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Setup a One-to-Many relationship between User and Grant
      Profile.belongsTo(models.User, {
        foreignKey: 'UserId', 
        as: 'user', 
      });
      

      
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    professionalCardNumber: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};