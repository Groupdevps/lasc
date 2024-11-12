'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceProviders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assignedAdministratorId: {
        type: Sequelize.INTEGER
      },
      assignedAdministrator: {
        type: Sequelize.STRING,
       /* references: {
          model: 'Centers',
          foreignKey: 'nit'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'*/
      },
      regime: {
        type: Sequelize.INTEGER,
       /* references: {
          model: 'Regimes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'*/
      },
      PersonId: {
        type: Sequelize.INTEGER
      },
      socioeconomiclevel: {
        type: Sequelize.INTEGER
      },
      moderatorFee: {
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
    await queryInterface.dropTable('ServiceProviders');
  }
};