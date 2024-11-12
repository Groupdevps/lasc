'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('isses', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('isses', 'description', {
      type: Sequelize.STRING, // El tipo anterior si deseas revertir el cambio
      allowNull: true
    });
  }
};
