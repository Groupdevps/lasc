'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TariffManuals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code : { // examId
        type: Sequelize.INTEGER
      },
      description: { // procedures
        type: Sequelize.TEXT
      },
      surgicalGroup : {
        type: Sequelize.STRING
      },
      points: {
        type: Sequelize.STRING
      },
      pesos: {
        type: Sequelize.STRING
      },
      TariffCategoryId: {
        type: Sequelize.INTEGER
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('TariffManuals');
  }
};