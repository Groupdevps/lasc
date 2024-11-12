'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agreements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberAgreement: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      finalDate: {
        type: Sequelize.DATEONLY
      },
      administrator: {
        type: Sequelize.STRING
      },
      percent: {
        type: Sequelize.FLOAT
      },
      state: {
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
    await queryInterface.dropTable('Agreements');
  }
};