'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Concepts');

    // Solo agregar la columna si no existe
    if (!tableDescription.cup) {
      await queryInterface.addColumn('Concepts', 'cup', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }
    if (!tableDescription.code_soat) {
      await queryInterface.addColumn('Concepts', 'soat', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!tableDescription.code_iss) {
      await queryInterface.addColumn('Concepts', 'iss', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!tableDescription.UserId) {
      await queryInterface.addColumn('Concepts', 'UserId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }

    // Eliminar las columnas antiguas
    await queryInterface.removeColumn('Concepts', 'ProductId');
    await queryInterface.removeColumn('Concepts', 'MedicationListId');
    await queryInterface.removeColumn('Concepts', 'CupsListId');
    await queryInterface.removeColumn('Concepts', 'TariffManualId');
    await queryInterface.removeColumn('Concepts', 'description');
  },

  async down (queryInterface, Sequelize) {
     // Revertir las adiciones
     await queryInterface.removeColumn('Concepts', 'cup');
     await queryInterface.removeColumn('Concepts', 'soat');
     await queryInterface.removeColumn('Concepts', 'iss');
     await queryInterface.removeColumn('Concepts', 'UserId');
 
     // Revertir las eliminaciones

     await queryInterface.addColumn('Concepts', 'ProductId', {
       type: Sequelize.INTEGER,
     });
     await queryInterface.addColumn('Concepts', 'MedicationListId', {
       type: Sequelize.INTEGER,
     });
     await queryInterface.addColumn('Concepts', 'CupsListId', {
       type: Sequelize.INTEGER,
     });
     await queryInterface.addColumn('Concepts', 'TariffManualId', {
       type: Sequelize.INTEGER,
     });
     await queryInterface.addColumn('Concepts', 'description', {
       type: Sequelize.STRING,
     });
  }
};
