'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Furips', 'driverVehicleLastName', {
      type: Sequelize.STRING,
      allowNull: true  // Cambiar a true para permitir valores nulos
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Furips', 'driverVehicleLastName', {
      type: Sequelize.STRING,
      allowNull: false  // Restaurar la restricción en caso de rollback
    });
  }
};
