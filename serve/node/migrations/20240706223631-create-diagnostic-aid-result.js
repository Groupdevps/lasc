'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diagnosticAidResults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      PersonId :{
        type: Sequelize.INTEGER
      },
      OrderId: { // Cambiado de OrdenId a OrderId
        type: Sequelize.INTEGER
      },
      cup: {
        type: Sequelize.STRING
      },
      report: {
        type: Sequelize.TEXT
      },
      conclusion: {
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('diagnosticAidResults');
  }
};
