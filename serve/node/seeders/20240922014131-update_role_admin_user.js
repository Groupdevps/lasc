'use strict';
const { User, Role } = require('../models');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    // Buscar el rol ADMINISTRADOR
    const adminRole = await Role.findOne({ where: { name: 'ADMINISTRADOR' } });

    if (adminRole) {
      // Actualizar el usuario con RoleId del rol 'ADMINISTRADOR'
      await User.update(
        { RoleId: adminRole.id }, // Valores a actualizar
        {
          where: {
            username: 'admin',
            email: 'admin@example.com'
          }
        } // Opciones, incluyendo el where
      );
    }
  },

  async down(queryInterface, Sequelize) {
    // Revertir el rol del usuario admin
    await User.update(
      { RoleId: 1 }, // Valores a actualizar
      {
        where: {
          username: 'admin',
          email: 'admin@example.com'
        }
      } // Opciones, incluyendo el where
    );
  }
};
