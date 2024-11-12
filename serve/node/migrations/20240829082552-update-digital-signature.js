'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('DigitalSignatures', 'filePath', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('DigitalSignatures', 'imageUrl', {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn('DigitalSignatures', 'base64');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('DigitalSignatures', 'filePath');
    await queryInterface.removeColumn('DigitalSignatures', 'imageUrl');
    await queryInterface.addColumn('DigitalSignatures', 'base64', {
      type: Sequelize.STRING,
    });
  }
};
