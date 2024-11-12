'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProfilePositions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN,
        default: true
      },
      
      ProfileId: {
        type: Sequelize.INTEGER
      },
      PositionId: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN,
        default: true
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
    await queryInterface.dropTable('ProfilePositions');
  }
};