'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Supplies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      hour: {
        type: Sequelize.TIME
      },
      hospitalization: {
         type: Sequelize.STRING
      },
      accountCut: {
        type: Sequelize.INTEGER
      },
      departureDate: {
        type: Sequelize.DATEONLY
      },
      IdxIncome: {
        type: Sequelize.STRING
      },
      IdxEgress: {
        type: Sequelize.STRING
      },
      RelatedIdx: {
         type: Sequelize.STRING
      },
      diagnoses: {
        type: Sequelize.TEXT
      },
      observation: {
        type: Sequelize.TEXT
      },
      whoSuppliedIt: {
        type: Sequelize.STRING
      },
      timeSupply: {
        type: Sequelize.STRING
      },
      supplyDate: {
        type: Sequelize.DATEONLY
      },
      medicineSupplied: {
        type: Sequelize.TEXT
      },
      whoAppliesIt: {
        type: Sequelize.STRING
      },
      UserId: {
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
    await queryInterface.dropTable('Supplies');
  }
};