const { Role , Permission, Resource , TypeResource ,sequelize}  	= require('../../models')
const { Transaction } = require('sequelize');
const { attributesRole, includeRole } = require('../includes');
//include

const createRole = async (req, res) => {
	const transaction = await sequelize.transaction();
  
	try {
	  const { name, permissions  } = req.body;
  
	  if (!name || name.trim() === "") {
		return res.status(400).json('El campo "name" es obligatorio y no puede estar vacío.');
	  }
  
	  for (const permission of permissions) {
		if (!permission.ResourceId) {
		  return res.status(400).json('Todos los permisos deben tener un "ResourceId" válido.');
		}
	  }
  
	  const role = await Role.create({ name, }, { transaction });
  
	  const permissionPromises = permissions.map(permission => {
		return Permission.create({
		  ...permission,
		  RoleId: role.id
		}, { transaction });
	  });
  
	  await Promise.all(permissionPromises);
  
	  await transaction.commit();
  
	  const createdRole = await Role.findByPk(role.id, { include: includeRole });
  
	  res.status(201).json(createdRole);
	} catch (error) {
	  await transaction.rollback();
	  console.log("Error en createRole, en role.controller", error);
	  res.status(500).json('Ocurrió un error al crear el rol, consulte con el administrador.');
	}
  };
  
const getAllRoles = async (req, res) => {
	let where = {}
	where.isActive = true
	try {
	  const { active, role } = req.query
	  if (active) {
		where.isActive = active
	  }
	  if (role) {
		where.name = role
	  }
	  const roles = await Role.findAll({
		where,
		include: includeRole,
		attributes: attributesRole
	  });
  
	  res.status(200).json(roles);
	} catch (error) {
	  console.log("Error en getAllRoles, en role.controller", error.message);
	  res.status(500).json('Ocurrió un error al obtener los roles, consulte con el administrador.');
	}
  };

const updateRole = async (req, res) => {
	const transaction = await sequelize.transaction();

	try {
		const { id } = req.params;
		const { name } = req.body;

		if (!name || name.trim() === "") {
		await transaction.rollback();
		return res.status(400).json('El campo "name" es obligatorio y no puede estar vacío.');
		}

		const [updatedCount] = await Role.update(
		{ name },
		{
			where: { id },
			transaction
		}
		);

		if (updatedCount === 0) {
		await transaction.rollback();
		return res.status(404).json('El rol no existe.');
		}

		await transaction.commit();

		const updatedRole = await Role.findByPk(id, { include: includeRole });

		res.status(200).json(updatedRole);
	} catch (error) {
		await transaction.rollback();
		console.log("Error en updateRole, en role.controller", error);
		res.status(500).json('Ocurrió un error al actualizar el rol, consulte con el administrador.');
	}
};

const deactivateRole = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  // Intentar actualizar el campo isActive a false para desactivar el rol
	  const [updatedCount] = await Role.update(
		{ isActive: false },
		{ where: { id } }
	  );
  
	  // Verificar si se actualizó algún rol
	  if (updatedCount === 0) {
		return res.status(404).json('El rol no existe o ya está desactivado.');
	  }
  
	  res.status(200).json('Rol desactivado correctamente.');
	} catch (error) {
	  console.log("Error en deactivateRole, en role.controller", error.message);
	  res.status(500).json('Ocurrió un error al desactivar el rol, consulte con el administrador.');
	}
  };
  
const getRoles = async (req, res) => {
	let where = {}
	try {
		where.isActive = true
	  const roles = await Role.findAll({
		where,
		attributes: ["id", "name"]
	  });
  
	  res.status(200).json(roles);
	} catch (error) {
	  console.log("Error en getAllRoles, en role.controller", error.message);
	  res.status(500).json('Ocurrió un error al obtener los roles, consulte con el administrador.');
	}
  };
module.exports 	= {
	createRole,
	getAllRoles,
	getRoles,
	updateRole,
	deactivateRole
}
//9:22pm 554