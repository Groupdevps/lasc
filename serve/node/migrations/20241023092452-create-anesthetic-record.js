'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AnestheticRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      anesthesiologistId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      surgeonId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      AnestheticTechniqueId: {
        type: Sequelize.INTEGER
      },
      monitoring: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {}
      },
      events: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: []
      },
      premedication: {
        type: Sequelize.STRING,
        allowNull: true
      },
      painManagement: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {}
      },
      bloodGases: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {}
      },
      liquidBalance: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {}
      },
      postAnesthesiaCareUnit: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {}
      },
      observations: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      anesthesiologistSignature: {
        type: Sequelize.INTEGER,
        allowNull: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AnestheticRecords');
  }
};
