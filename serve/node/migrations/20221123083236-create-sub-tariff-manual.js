'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubTariffManuals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medicine: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      amount: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.FLOAT
      },
      InvoiceId: {
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
    await queryInterface.dropTable('SubTariffManuals');
  }
};