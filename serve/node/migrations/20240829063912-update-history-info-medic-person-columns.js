'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('HistoryInfoMedicPeople', 'transferred', 'isReEntry');
    await queryInterface.renameColumn('HistoryInfoMedicPeople', 'isc', 'imc');
    await queryInterface.changeColumn('HistoryInfoMedicPeople', 'isReEntry', {
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.changeColumn('HistoryInfoMedicPeople', 'imc', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('HistoryInfoMedicPeople', 'isReEntry', 'transferred');
    await queryInterface.renameColumn('HistoryInfoMedicPeople', 'imc', 'isc');
    await queryInterface.changeColumn('HistoryInfoMedicPeople', 'transferred', {
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.changeColumn('HistoryInfoMedicPeople', 'isc', {
      type: Sequelize.STRING,
    });
  }
};
