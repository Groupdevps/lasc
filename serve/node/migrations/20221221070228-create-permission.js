'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RoleId: {
        type: Sequelize.INTEGER
      },
      ResourceId: {
        type: Sequelize.INTEGER
      },
      canAdd: {
        type: Sequelize.BOOLEAN
      },
      canEdit: {
        type: Sequelize.BOOLEAN
      },
      canView: {
        type: Sequelize.BOOLEAN
      },
      canDelete: {
        type: Sequelize.BOOLEAN
      },
      isActive:{
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
    await queryInterface.dropTable('Permissions');
  }
};