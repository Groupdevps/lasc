'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn('TariffManuals', 'pesos');

  },

  async down (queryInterface, Sequelize) {
    // Para revertir el cambio, volvemos a agregar la columna `pesos` si fuera necesario
    return queryInterface.addColumn('TariffManuals', 'pesos', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
