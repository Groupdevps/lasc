'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('TariffManuals', 'isActive', 'active'),
      queryInterface.renameColumn('TariffManuals', 'points', 'uvt')
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('TariffManuals', 'active', 'isActive'),
      queryInterface.renameColumn('TariffManuals', 'uvt', 'points')
    ]);
  }
};
