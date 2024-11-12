'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ObservationEvolutionNotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      observation: {
        type: Sequelize.TEXT
      },
      EvolutionNoteId: {
        type: Sequelize.INTEGER
      },
      date:{
        type: Sequelize.DATEONLY
      },
      hour: {
        type: Sequelize.TIME
      },
      UserId : {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ObservationEvolutionNotes');
  }
};