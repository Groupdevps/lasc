'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logoBase64: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      Manager: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      TypeCenterId: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      CurrentAdministratorId: {
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
    await queryInterface.dropTable('Centers');
  }
};