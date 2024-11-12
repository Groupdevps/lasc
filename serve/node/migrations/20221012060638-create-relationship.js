'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Relationships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient: {
        type: Sequelize.BIGINT
      },
      PersonId: {
        type: Sequelize.INTEGER
      },
      PatientId: {
        type: Sequelize.INTEGER
      },
      companion: {
        type: Sequelize.BIGINT
      },
      TypeRelationshipId: {
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
    await queryInterface.dropTable('Relationships');
  }
};