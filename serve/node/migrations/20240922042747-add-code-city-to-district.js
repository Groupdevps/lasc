'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Districts', 'Code_city', {
      type: Sequelize.STRING,
      allowNull: true, // o false si quieres que sea obligatorio
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('Districts', 'Code_city');

  }
};
