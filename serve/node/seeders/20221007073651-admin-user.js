'use strict';
const helpers   =  require ("../lib/helpers");

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
    const pass = await helpers.encryptPassword('admin123');
    await queryInterface.bulkInsert('Users', [{
      name      : 'Administrador',
      username  : 'admin',
      email     : 'admin@example.com',
      CenterId  : 1,
      password  : pass,
      RoleId : 1,
      createdAt : new Date(),
      updatedAt : new Date()
      
   }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
