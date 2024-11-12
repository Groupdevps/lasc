'use strict';
const helpers   =  require ("../lib/helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      // Buscar el RoleId para cada rol
      const [roles] = await queryInterface.sequelize.query(
        `SELECT id, name FROM "Roles";`
      );

      // Crear un mapa de roles para obtener el ID fácilmente
      const roleMap = roles.reduce((map, role) => {
        map[role.name] = role.id;
        return map;
      }, {});

      // Verificar que todos los roles necesarios están en el mapa
      const requiredRoles = ['ENFERMERO/A', 'MEDICO GENERAL', 'ADMISIONISTA'];
      for (const role of requiredRoles) {
        if (!roleMap[role]) {
          throw new Error(`No se encontró el rol ${role}.`);
        }
      }

      // Contraseñas cifradas para los usuarios
      const passEnfermero = await helpers.encryptPassword('enfermero123');
      const passMedico = await helpers.encryptPassword('medico123');
      const passAdmisionista = await helpers.encryptPassword('admisionista123');

      // Crear usuarios específicos
      await queryInterface.bulkInsert('Users', [{
        name: 'Enfermero',
        username: 'enfermero',
        email: 'enfermero@example.com',
        CenterId: 1, // Ajusta según sea necesario
        password: passEnfermero,
        RoleId: roleMap['ENFERMERO/A'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Medico',
        username: 'medico',
        email: 'medico@example.com',
        CenterId: 1, // Ajusta según sea necesario
        password: passMedico,
        RoleId: roleMap['MEDICO GENERAL'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Admisionista',
        username: 'admisionista',
        email: 'admisionista@example.com',
        CenterId: 1, // Ajusta según sea necesario
        password: passAdmisionista,
        RoleId: roleMap['ADMISIONISTA'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

    } catch (error) {
      console.error('Error al ejecutar el seeder:', error);
    }
  },

  async down (queryInterface, Sequelize) {
    // Revertir la inserción de usuarios específicos
    await queryInterface.bulkDelete('Users', {
      username: {
        [Sequelize.Op.in]: ['enfermero', 'medico', 'admisionista']
      }
    }, {});
  }
};
