'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Buscar el RoleId para "ENFERMERO/A"
    const [enfermeroRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'ENFERMERO/A' LIMIT 1;`
    );
    const enfermeroRoleId = enfermeroRole[0]?.id;

    if (!enfermeroRoleId) {
      console.log('No se encontró el rol ENFERMERO/A.');
      return;
    }

    // Buscar el TypeResourceId para "ENFERMERIA"
    const [enfermeriaTypeResource] = await queryInterface.sequelize.query(
      `SELECT id FROM "TypeResources" WHERE name = 'ENFERMERIA' LIMIT 1;`
    );
    const enfermeriaTypeResourceId = enfermeriaTypeResource[0]?.id;

    if (!enfermeriaTypeResourceId) {
      console.log('No se encontró el tipo de recurso ENFERMERIA.');
      return;
    }

    // Obtener todos los recursos del tipo "ENFERMERIA"
    const resources = await queryInterface.sequelize.query(
      `SELECT id FROM "Resources" WHERE "TypeResourceId" = ${enfermeriaTypeResourceId} AND "isActive" = true;`
    );
    
    const resourceIds = resources[0].map(resource => resource.id);

    // Crear permisos para cada recurso
    const permissions = resourceIds.map(resourceId => ({
      RoleId: enfermeroRoleId,
      ResourceId: resourceId,
      canAdd: true,
      canEdit: true,
      canView: true,
      canDelete: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insertar los permisos en la base de datos
    await queryInterface.bulkInsert('Permissions', permissions);
  },

  async down (queryInterface, Sequelize) {
    // Revertir la inserción de permisos para el rol ENFERMERO/A
    const [enfermeroRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'ENFERMERO/A' LIMIT 1;`
    );
    const enfermeroRoleId = enfermeroRole[0]?.id;

    if (enfermeroRoleId) {
      await queryInterface.bulkDelete('Permissions', { RoleId: enfermeroRoleId });
    }
  }
};
