'use strict';
const districts = require("../lib/districtsSoledad") 
// Función para convertir a mayúsculas y eliminar tildes
function normalizeName(name) {
  return name
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener el CityId correspondiente a "SOLEDAD"
    const city = await queryInterface.rawSelect('Cities', {
      where: {
        name: 'SOLEDAD'
      }
    }, ['id']);

    if (!city) {
      throw new Error('City SOLEDAD not found');
    }

    

    // Recorrer el array y agregar CityId, createdAt y updatedAt
    const timestamp = new Date();
    const neighborhoodData = districts.map(name => ({
      name: normalizeName(name),
      CityId: city,
      active: true,
      createdAt: timestamp,
      updatedAt: timestamp
    }));

    // Insertar los datos en la tabla 'Districts'
    await queryInterface.bulkInsert('Districts', neighborhoodData);
  },

  down: async (queryInterface, Sequelize) => {
    // Obtener el CityId correspondiente a "SOLEDAD"
    const city = await queryInterface.rawSelect('Cities', {
      where: {
        name: 'SOLEDAD'
      }
    }, ['id']);

    if (city) {
      // Eliminar los datos insertados
      await queryInterface.bulkDelete('Districts', {
        CityId: city
      });
    }
  }
};
