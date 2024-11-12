'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HospitalExpenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberAttention: {
        type: Sequelize.BIGINT
      },
      dateAdmission: {
        type: Sequelize.DATE
      },
      hospitalization: {
        type: Sequelize.STRING
      },
      accountCut: {
        type: Sequelize.STRING
      },
      egressDate: {
        type: Sequelize.DATE
      },
      idxIncome: {
        type: Sequelize.STRING
      },
      idxEgress: {
        type: Sequelize.STRING
      },
      relatedIdx: {
        type: Sequelize.STRING
      },
      idxDate: {
        type: Sequelize.DATE
      },
      diagnosis: {
        type: Sequelize.TEXT
      },
      observations: {
        type: Sequelize.TEXT
      },
      userId: {
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
    await queryInterface.dropTable('HospitalExpenses');
  }
};