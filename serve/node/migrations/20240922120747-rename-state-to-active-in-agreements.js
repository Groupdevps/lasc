'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Agreements', 'state', 'active');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Agreements', 'active', 'state');
  }
};
