'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Discharges', 'skinFannels', {
      type: Sequelize.TEXT,
      allowNull: true // Cambia a false si el campo es obligatorio
    });
    
    await queryInterface.addColumn('Discharges', 'lumbarOsteotendinous', {
      type: Sequelize.TEXT,
      allowNull: true // Cambia a false si el campo es obligatorio
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Discharges', 'skinFannels');
    await queryInterface.removeColumn('Discharges', 'lumbarOsteotendinous');
  }
};
