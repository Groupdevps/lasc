'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //date
      dateAdmission: {
          type: Sequelize.DATEONLY,
      },
      dateService: {
          type: Sequelize.DATEONLY,
      },
      departureDate: {
          type: Sequelize.DATEONLY,
      },
      hour: {
          type: Sequelize.TIME,
      },
      //info person
      HistoryPersonId: {
          type: Sequelize.INTEGER,
      },
      numberId: {
          type: Sequelize.BIGINT,
      },
      //info center
      
      assignedCenter: {
          type: Sequelize.STRING,
      },
      nit: {
          type: Sequelize.STRING,
      },
      //info service
      AttentionId: {
         type: Sequelize.INTEGER
      },
      triage: {
          type: Sequelize.STRING,
      },
      diagnosis: {
          type: Sequelize.TEXT,
      },
      authorizationNumber: {
          type: Sequelize.STRING,
      },

      //info invoice
      StatusId: {
          type: Sequelize.INTEGER,
      },
      discount: {
          type: Sequelize.INTEGER,
      },
      tax: {
          type: Sequelize.INTEGER,
      },
      invoiceNumber: {
          type: Sequelize.INTEGER,
      },
      subTotalInvoiceInformation: {
          type: Sequelize.FLOAT,
      },
      subTotalAddedMedication: {
          type: Sequelize.FLOAT,
      },
      SubTotalTariffManuals: {
          type: Sequelize.FLOAT,
      },
      subTotal: {
          type: Sequelize.FLOAT,
      },
      totalString: {
          type: Sequelize.STRING,
      },
      total: {
          type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('Invoices');
  }
};