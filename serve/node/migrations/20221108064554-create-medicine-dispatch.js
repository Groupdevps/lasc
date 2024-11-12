'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicineDispatches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberAttention: {
        type: Sequelize.BIGINT
      },
      numberId: {
        type: Sequelize.INTEGER
      },
      nit: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      establishment: {
        type: Sequelize.STRING
      },
      paymentCondition: {
        type: Sequelize.STRING
      },
      seller: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      purchaseOrder: {
        type: Sequelize.STRING
      },
      invoiceDate: {
        type: Sequelize.DATE
      },
      expiration: {
        type: Sequelize.DATE
      },
      referralNumber: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.FLOAT
      },
      userId: {
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      OrdenId: {
        type: Sequelize.INTEGER
      },
      InvoiceId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      state: {
        type: Sequelize.STRING
      },
      cant: {
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
    await queryInterface.dropTable('MedicineDispatches');
  }
};