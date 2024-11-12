'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicationLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      atcCode: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      activePrinciple: {
        type: Sequelize.STRING
      },
      concentration: {
        type: Sequelize.STRING
      },
      pharmaceuticalForm: {
        type: Sequelize.TEXT
      },
      clarification: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('MedicationLists');
  }
};