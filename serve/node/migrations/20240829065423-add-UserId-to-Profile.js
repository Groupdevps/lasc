'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Profiles', 'UserId', {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Puedes cambiar esto según tu necesidad
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Profiles', 'UserId');

  }
};
