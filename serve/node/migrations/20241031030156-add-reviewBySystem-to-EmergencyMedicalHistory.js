// migrations/XXXXXX-add-reviewBySystem-to-EmergencyMedicalHistory.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('EmergencyMedicalHistories', 'reviewBySystem', {
      type: Sequelize.TEXT
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('EmergencyMedicalHistories', 'reviewBySystem');
  },
};
