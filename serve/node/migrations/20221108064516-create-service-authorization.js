'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceAuthorizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberAttention: {
        type: Sequelize.BIGINT
      },
      serviceNumber: {
        type: Sequelize.STRING
      },
      expeditionDate: {
        type: Sequelize.DATE
      },
      code: {
        type: Sequelize.STRING
      },
      modality: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      departureDate: {
        type: Sequelize.DATE
      },
      level: {
        type: Sequelize.INTEGER
      },
      service: {
        type: Sequelize.STRING
      },
      specialty: {
        type: Sequelize.STRING
      },
      ambit: {
        type: Sequelize.STRING
      },
      valid: {
        type: Sequelize.STRING
      },
      originRequest: {
        type: Sequelize.STRING
      },
      observation: {
        type: Sequelize.TEXT
      },
      number: {
        type: Sequelize.STRING
      },
      medicalDate: {
        type: Sequelize.STRING
      },
      ips: {
        type: Sequelize.STRING
      },
      person: {
        type: Sequelize.STRING
      },
      phone: {
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
    await queryInterface.dropTable('ServiceAuthorizations');
  }
};