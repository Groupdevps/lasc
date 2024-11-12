'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Bills', 'billNumber', {
      type: Sequelize.STRING,
      allowNull: true, // Cambia según tu necesidad
    });
    
    await queryInterface.addColumn('Bills', 'patientBirthDay', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Bills', 'patientAge', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Bills', 'numberAgreement', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Bills', 'CenterId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Si deseas eliminar columnas que ya no son necesarias, puedes usar dropColumn
    await queryInterface.removeColumn('Bills', 'payerCity'); // Si es necesario
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir cambios
    await queryInterface.changeColumn('Bills', 'billNumber', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.removeColumn('Bills', 'patientBirthDay');
    await queryInterface.removeColumn('Bills', 'patientAge');
    await queryInterface.removeColumn('Bills', 'numberAgreement');
    await queryInterface.removeColumn('Bills', 'CenterId');

    // Si eliminaste alguna columna en `up`, puedes volver a añadirla aquí si es necesario
    await queryInterface.addColumn('Bills', 'payerCity', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
