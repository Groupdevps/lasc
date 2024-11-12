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
    await queryInterface.bulkInsert('TypeCenters', [
    {
      id: 1,
      name        : 'eps',     
      createdAt   : new Date(),
      updatedAt   : new Date()  
    },
    {
      id: 2,
      name        : 'ips',     
      createdAt   : new Date(),
      updatedAt   : new Date()  
    },
    {
      id: 3,
      name        : 'laboratorio',     
      createdAt   : new Date(),
      updatedAt   : new Date()  
    },
    {
      id: 4,
      name        : 'proveedor',     
      createdAt   : new Date(),
      updatedAt   : new Date()  
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TypeCenters', null, {});
  }
};
