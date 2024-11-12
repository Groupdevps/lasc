'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Desactivar UVTs activos anteriores
    await queryInterface.bulkUpdate('uvts', { active: false }, { active: true });

    // Insertar el nuevo UVT para 2024
    await queryInterface.bulkInsert('uvts', [{
      value: 47065,
      year: '2024',
      active: true,
      UserId: 1,  // Ajusta el UserId según tu lógica de negocio
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar el UVT de 2024 en caso de revertir la migración
    await queryInterface.bulkDelete('uvts', { year: '2024' }, {});
  }
};
