'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attentions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorizationCode : {
        type: Sequelize.STRING
      },
      assignedDate : {
        type: Sequelize.DATEONLY
      },
      hour : {
        type: Sequelize.TIME
      },
      patient: {
        type: Sequelize.BIGINT
      },
      companion: {
        type: Sequelize.BIGINT
      },
      CurrentAdministratorId: {
        type: Sequelize.INTEGER
      },
      TypeServiceId: {
        type: Sequelize.INTEGER
      },
      
      Active: {
        type: Sequelize.BOOLEAN
      },
      nursingDischarge: {
        
        type: Sequelize.BOOLEAN
      },
      PersonId: {
        type: Sequelize.INTEGER
      },
      StatusId: {
        type: Sequelize.INTEGER
      },
      TriageId: {
        type: Sequelize.INTEGER
      },
      HistoryPersonId: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      DoctorId: {
        type: Sequelize.INTEGER
      },
      CenterId : {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Attentions');
  }
};