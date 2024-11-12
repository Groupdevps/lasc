'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('TariffManuals', 'code', {
      type: Sequelize.STRING,
      allowNull: false // Si es necesario que sea obligatorio
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('TariffManuals', 'code', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
