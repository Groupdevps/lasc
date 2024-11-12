'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async createUniqueUsername(name, sequelize) {
      // Construye el nombre de usuario base a partir del nombre y apellido
      let baseUsername = `${name.replace(/\s+/g, '').toLowerCase()}`;
      let username = baseUsername;
      let counter = 1;
  
      // Consulta para verificar si el nombre de usuario ya existe
      while (true) {
        const existingUser = await sequelize.models.User.findOne({
          where: { username: username }
        });
  
        if (!existingUser) {
          // Si el nombre de usuario no existe, sal del bucle
          return username;
        }
  
        // Si el nombre de usuario ya existe, incrementa el contador y prueba de nuevo
        username = `${baseUsername}${counter}`;
        counter++;
      }
    }
    static associate(models) {
      // define association here
      User.hasMany(models.Apply);

      models.Center.hasMany(User);
      User.belongsTo(models.Center);

      User.belongsTo(models.Role, { as: 'Role', foreignKey: 'RoleId',});
      User.hasOne(models.Profile, {
        foreignKey: 'UserId',
        as: 'profile', 
      });
      
    }
  }
  User.init({
    UUID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    CenterId: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};