'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EpicrisisMedicines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberAttention: {
        type: Sequelize.BIGINT
      },
      medicine: {
        type: Sequelize.TEXT
      },
      dose: {
        type: Sequelize.STRING
      },
      since: {
        type: Sequelize.DATE
      },
      until: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('EpicrisisMedicines');
  }
};