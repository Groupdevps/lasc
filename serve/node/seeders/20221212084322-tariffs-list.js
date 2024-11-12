'use strict';

/** @type {import('sequelize-cli').Migration} */
const list = require('../libs/tariffs.js');
module.exports = {
  async up (queryInterface, Sequelize) {
    // Filtra los elementos y ajusta los campos
    const tariffs = list
      .filter(item => item && item.code) // Asegúrate de que el item y el código existan
      .map(({ pesos, points, ...rest }) => ({  // Elimina el campo 'pesos' y usa 'points' como 'uvt'
        ...rest,
        uvt: points !== null ? parseFloat(points) : null, // Convertir 'points' a número
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    await queryInterface.bulkInsert('TariffManuals', tariffs, {});
  

 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TariffManuals', null, {});
  }
};
