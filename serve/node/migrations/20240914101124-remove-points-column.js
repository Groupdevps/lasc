'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('TariffManuals', 'points');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('TariffManuals', 'points', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
