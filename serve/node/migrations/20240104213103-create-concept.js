'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Concepts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      ProductId: {
        type: Sequelize.INTEGER
      },
      MedicationListId: {
        type: Sequelize.INTEGER
      },
      CupsListId: {
        type: Sequelize.INTEGER
      },
      TariffManualId: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      active: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Concepts');
  }
};