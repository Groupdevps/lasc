'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('ProductTypes', [{
      name: "DISPOSITIVO MEDICO",
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name: "MEDICAMENTO",
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name: "INSUMO",
      createdAt : new Date(),
      updatedAt : new Date()
    }] , {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ProductTypes', null, {});
  }
};
