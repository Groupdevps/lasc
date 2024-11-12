'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooteds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      specialtyCode: {
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.STRING
      },
      numberId: {
        type: Sequelize.INTEGER
      },
      remissionDate: {
        type: Sequelize.DATE
      },
      referralTime: {
        type: Sequelize.STRING
      },
      codeEnabledESE: {
        type: Sequelize.INTEGER
      },
      reasonRefers: {
        type: Sequelize.STRING
      },
      observation: {
        type: Sequelize.TEXT
      },
      serviceCode: {
        type: Sequelize.STRING
      },
      eps: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Rooteds');
  }
};