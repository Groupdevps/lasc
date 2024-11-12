'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Agreements', 'tariffManualType', {
      type: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    // Es importante eliminar primero el ENUM antes de eliminar la columna
    await queryInterface.removeColumn('Agreements', 'tariffManualType');
  }
};
