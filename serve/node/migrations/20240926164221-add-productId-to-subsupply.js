'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar la columna ProductId a la tabla SubSupplies
    return queryInterface.addColumn('SubSupplies', 'ProductId', {
      type: Sequelize.INTEGER
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la columna ProductId en caso de revertir la migración
    return queryInterface.removeColumn('SubSupplies', 'ProductId');
  }
};
