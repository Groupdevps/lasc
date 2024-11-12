'use strict';
const marital = [
  {
    name: 'casado/a',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'soltero/a',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'viudo/a',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'union libre',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]

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

    await queryInterface.bulkInsert('MaritalStatuses',marital , {})
    //return queryInterface.bulkInsert('MaritalStatuses',marital , {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MaritalStatuses', null, {})
  }
};
