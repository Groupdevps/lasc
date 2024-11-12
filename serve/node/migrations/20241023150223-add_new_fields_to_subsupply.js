'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('SubSupplies', 'orderNumber', {
        type: Sequelize.STRING,
        allowNull: true, // O puedes cambiar a false si el campo es obligatorio
      }),
      queryInterface.addColumn('SubSupplies', 'measuringUnit', {
        type: Sequelize.STRING,
        allowNull: true, // O ajusta según si es obligatorio o no
      }),
      queryInterface.addColumn('SubSupplies', 'administration', {
        type: Sequelize.STRING,
        allowNull: true, // Ajusta según los requisitos
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('SubSupplies', 'orderNumber'),
      queryInterface.removeColumn('SubSupplies', 'measuringUnit'),
      queryInterface.removeColumn('SubSupplies', 'administration'),
    ]);
  }
};
