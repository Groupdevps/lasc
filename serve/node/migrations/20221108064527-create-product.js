'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      units: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING
      },
      atc: {
        type: Sequelize.STRING
      },
      cum: {
        type: Sequelize.STRING
      },
      invima: {
        type: Sequelize.STRING
      },
      ProductTypeId: {
        type: Sequelize.INTEGER
      },
      unitValue: {
        type: Sequelize.FLOAT
      },
      productValue: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Products');
  }
};