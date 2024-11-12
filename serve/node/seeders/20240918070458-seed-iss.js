const data = require('../libs/manual_iss'); // Cambia la ruta a tu archivo JavaScript con los datos

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Filtrar los datos para excluir aquellos con code igual a "CODIGO"
    const filteredData = data.filter(item => item.code !== 'CODIGO');

    // Insertar los datos filtrados en la base de datos
    await queryInterface.bulkInsert('isses', filteredData.map(item => ({
      ref: item.ref || null,
      code: item.code || null,
      description: item.description || null,
      uvr: item.uvr !== null ? parseInt(item.uvr, 10) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isses', null, {});
  }
};
