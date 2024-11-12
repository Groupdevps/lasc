'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar nuevos campos y eliminar campos obsoletos
    await queryInterface.addColumn('Details', 'DetailTypeId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Details', 'ProductId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.removeColumn('Details', 'billNumber');
    await queryInterface.removeColumn('Details', 'autorizathionOrder');
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir los cambios si es necesario
    await queryInterface.removeColumn('Details', 'DetailTypeId');
    await queryInterface.removeColumn('Details', 'ProductId');

    await queryInterface.addColumn('Details', 'billNumber', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Details', 'autorizathionOrder', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
