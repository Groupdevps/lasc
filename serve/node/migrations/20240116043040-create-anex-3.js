'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Anex3s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      AttentionId: {
        type: Sequelize.INTEGER
      },
      requestNumber: {
        type: Sequelize.STRING
      },
      anexoDate: {
        type: Sequelize.STRING
      },
      anexoTime: {
        type: Sequelize.STRING
      },
      providerName: {
        type: Sequelize.STRING
      },
      providerCode: {
        type: Sequelize.STRING
      },
      providerTypeId: {
        type: Sequelize.STRING
      },
      providerNumberId: {
        type: Sequelize.STRING
      },
      providerAddress: {
        type: Sequelize.STRING
      },
      providerState: {
        type: Sequelize.STRING
      },
      providerCity: {
        type: Sequelize.STRING
      },
      providerPhoneCode: {
        type: Sequelize.STRING
      },
      providerPhoneNumber: {
        type: Sequelize.STRING
      },
      payerName: {
        type: Sequelize.STRING
      },
      payerCode: {
        type: Sequelize.STRING
      },
      patientFirstName: {
        type: Sequelize.STRING
      },
      patientSecondName: {
        type: Sequelize.STRING
      },
      patientLastName: {
        type: Sequelize.STRING
      },
      patientSecondSurname: {
        type: Sequelize.STRING
      },
      patientTypeId: {
        type: Sequelize.STRING
      },
      patientNumberId: {
        type: Sequelize.STRING
      },
      patientBirthDate: {
        type: Sequelize.STRING
      },
      patientAddress: {
        type: Sequelize.STRING
      },
      patientState: {
        type: Sequelize.STRING
      },
      patientCity: {
        type: Sequelize.STRING
      },
      patientPhone: {
        type: Sequelize.STRING
      },
      patientCellphone: {
        type: Sequelize.STRING
      },
      patientEmail: {
        type: Sequelize.STRING
      },
      patientRegime: {
        type: Sequelize.STRING
      },
      attentionOrigin: {
        type: Sequelize.STRING
      },
      typeAttention: {
        type: Sequelize.STRING
      },
      attentionPriority:{
        type: Sequelize.STRING
      }, //prioridad de la atencion
      locationPatient: {
        type: Sequelize.STRING
      },// ubicacion del paciente al momento de la autorizacion de servicio
      locationService: {
        type: Sequelize.STRING
      },// tipo de servicio 
      locationBed: {
        type: Sequelize.STRING
      },// cama
      guide: {
        type: Sequelize.STRING
      },
      justification: {
        type: Sequelize.TEXT
      },
      diagnosesCIE10Principal: {
        type: Sequelize.STRING
      },
      diagnosesCIE10Related1: {
        type: Sequelize.STRING
      },
      diagnosesCIE10Related2: {
        type: Sequelize.STRING
      },
      diagnosesDescriptionPrincipal: {
        type: Sequelize.STRING
      },
      diagnosesDescriptionRelated1: {
        type: Sequelize.STRING
      },
      diagnosesDescriptionRelated2: {
        type: Sequelize.STRING
      },
      informantName: {
        type: Sequelize.STRING
      },
      informantPosition: {
        type: Sequelize.STRING
      },
      informantPhoneCode: {
        type: Sequelize.STRING
      },
      informantPhoneNumber: {
        type: Sequelize.STRING
      },
      informantPhoneExtension: {
        type: Sequelize.STRING
      },
      informantCellphone: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Anex3s');
  }
};