'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [{
   
      "name": "JUAN",
      "secondName": "CARLOS",
      "lastName": "PEREZ",
      "secondSurname": "GOMEZ",
      "numberId": "123456789",
      "phone": "3332222",
      "cellphone": "3113334444",
      "email": "juanperez@email.com",
      "birthDate": "1995-05-09",
      "occupation": "Empleado",
      "TypeIDId": 1,
      "GenderId": 1,
      "MaritalStatusId": 2,
      "Adult": true,
      createdAt : new Date(),
      updatedAt : new Date()
    },], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
