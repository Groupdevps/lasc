'use strict';

const { City, District } = require('../models'); // Importar los modelos necesarios

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Buscar la ciudad con el nombre "SOLEDAD"
      const city = await City.findOne({
        where: { name: 'SOLEDAD' },
        attributes: ['id', 'code'], // Obtener el id y el code de la ciudad
      });

      if (city) {
        // Buscar los distritos que pertenecen a la ciudad "SOLEDAD"
        const districts = await District.findAll({
          where: { CityId: city.id },
        });

        // Actualizar el campo Code_city de cada distrito con el código de la ciudad "SOLEDAD"
        for (const district of districts) {
          await district.update({ Code_city: city.code });
        }
      } else {
        console.log('City "SOLEDAD" no encontrada.');
      }
    } catch (error) {
      console.error('Error durante la actualización de los distritos:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Buscar la ciudad con el nombre "SOLEDAD" nuevamente para revertir los cambios
      const city = await City.findOne({
        where: { name: 'SOLEDAD' },
        attributes: ['id', 'code'],
      });

      if (city) {
        // Buscar los distritos asociados y deshacer el cambio en Code_city
        const districts = await District.findAll({
          where: { CityId: city.id },
        });

        // Establecer Code_city a null para revertir el cambio
        for (const district of districts) {
          await district.update({ Code_city: null });
        }
      }
    } catch (error) {
      console.error('Error al revertir la actualización de los distritos:', error);
    }
  }
};
