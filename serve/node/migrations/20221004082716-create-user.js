'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(async () => {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        UUID: {
          type: Sequelize.UUID,
          defaultValue:Sequelize.literal('uuid_generate_v4()'),
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        CenterId: {
          type: Sequelize.INTEGER
        },
        RoleId: {
          type: Sequelize.INTEGER
        },
        isActive : {
          type: Sequelize.BOOLEAN
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
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};