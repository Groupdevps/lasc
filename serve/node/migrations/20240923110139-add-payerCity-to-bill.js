'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bills', 'payerCity', {
      type: Sequelize.STRING,
      allowNull: true, // Cambia a false si quieres que sea obligatorio
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bills', 'payerCity');
  }
};
