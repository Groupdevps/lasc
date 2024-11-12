'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar las columnas AttentionId y ConceptId
    await queryInterface.removeColumn('Details', 'AttentionId');
    await queryInterface.removeColumn('Details', 'ConceptId');

    // Agregar la nueva columna attentionCode con tipo STRING
    await queryInterface.addColumn('Details', 'attentionCode', {
      type: Sequelize.STRING
    });

    // Agregar la nueva columna description con tipo STRING
    await queryInterface.addColumn('Details', 'description', {
      type: Sequelize.STRING
    });

    // Eliminar la columna ProductId (si aún no lo hiciste)
    await queryInterface.removeColumn('Details', 'ProductId');
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir los cambios

    // Volver a agregar la columna AttentionId con tipo INTEGER
    await queryInterface.addColumn('Details', 'AttentionId', {
      type: Sequelize.INTEGER
    });

    // Volver a agregar la columna ConceptId con tipo INTEGER
    await queryInterface.addColumn('Details', 'ConceptId', {
      type: Sequelize.INTEGER
    });

    // Eliminar las nuevas columnas
    await queryInterface.removeColumn('Details', 'attentionCode');
    await queryInterface.removeColumn('Details', 'description');

    // Volver a agregar la columna ProductId
    await queryInterface.addColumn('Details', 'ProductId', {
      type: Sequelize.INTEGER
    });
  }
};
