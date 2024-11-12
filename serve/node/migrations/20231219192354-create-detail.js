'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      ConceptId: {
        type: Sequelize.INTEGER
      },
      BillId: {
        type: Sequelize.INTEGER
      },
      billNumber: {
        type: Sequelize.INTEGER
      },
      autorizathionOrder: {
        type: Sequelize.STRING
      },
     
      cant: {
        type: Sequelize.INTEGER
      },
      unityValue: {
        type: Sequelize.INTEGER
      },
      totalValue: {
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
    await queryInterface.dropTable('Details');
  }
};