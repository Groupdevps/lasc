'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('TariffManuals', 'uvt', 'points');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('TariffManuals', 'points', 'uvt');
  }
};
