'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QxCodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      hour: {
        type: Sequelize.TIME
      },
      qx: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      SupplyId: {
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
    await queryInterface.dropTable('QxCodes');
  }
};