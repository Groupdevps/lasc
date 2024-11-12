'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Buscar el RoleId para "SUPERUSUARIO"
    const [superUsuarioRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'ADMINISTRADOR' LIMIT 1;`
    );
    const superUsuarioRoleId = superUsuarioRole[0]?.id;

    if (!superUsuarioRoleId) {
      console.log('No se encontró el rol ADMINISTRADOR.');
      return;
    }

    // Obtener todos los recursos
    const resources = await queryInterface.sequelize.query(
      `SELECT id FROM "Resources" WHERE "isActive" = true;`
    );
    
    const resourceIds = resources[0].map(resource => resource.id);

    // Crear permisos para cada recurso
    const permissions = resourceIds.map(resourceId => ({
      RoleId: superUsuarioRoleId,
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

  down: async (queryInterface, Sequelize) => {
    // Revertir la inserción de permisos para el rol SUPERUSUARIO
    const [superUsuarioRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'ADMINISTRADOR' LIMIT 1;`
    );
    const superUsuarioRoleId = superUsuarioRole[0]?.id;

    if (superUsuarioRoleId) {
      await queryInterface.bulkDelete('Permissions', { RoleId: superUsuarioRoleId });
    }
  }
};
