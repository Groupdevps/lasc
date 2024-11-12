'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AddedMedications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      purchaseValue: {
        type: Sequelize.FLOAT
      },
      units: {
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      epsValue: {
        type: Sequelize.FLOAT
      },
      hourValue: {
        type: Sequelize.FLOAT
      },
      value30Min: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('AddedMedications');
  }
};