'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Actualiza todos los registros de DetailType a active: true
    await queryInterface.bulkUpdate('DetailTypes', 
      { active: true }, // Valores a actualizar
      { active: null } // Condición, opcional si solo quieres actualizar a true
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir el seed: Establece active en false para todos los registros
    await queryInterface.bulkUpdate('DetailTypes', 
      { active: false }, // Valores a actualizar en la reversión
      { active: true } // Condición para el rollback
    );
  }
};
