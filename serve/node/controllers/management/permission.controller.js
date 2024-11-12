const { Permission }  	= require('../../models/index.js');
const includePermission = []

//crear
const createPermission = async (req, res) => {
	try {
	  const { RoleId, ResourceId, canAdd, canEdit, canView, canDelete } = req.body;
  
	  if (!ResourceId || !RoleId) {
		return res.status(400).json('Los campos "seccion" y "nombre" son obligatorios');
	  }
  
	  const newPermission = await Permission.create({
		RoleId, ResourceId, canAdd, canEdit, canView, canDelete
	  });
  
	  const permission = await Permission.findByPk(newPermission.id, { include: includePermission });
  
	  res.status(201).json(permission);
	} catch (error) {
	  console.log("Error en createResource, en resource.controller", error.message);
	  res.status(500).json('Ocurrió un error al crear la seccion, consulte con administrador');
	}
  };
  
  const updatePermission = async (req, res) => {
	try {
	  const { id } = req.params; // ID del permiso que se va a actualizar
	  const { RoleId, ResourceId, canAdd, canEdit, canView, canDelete } = req.body;
  
	  // Validar que se proporcionen al menos RoleId o ResourceId
	  if (!RoleId && !ResourceId && canAdd === undefined && canEdit === undefined && canView === undefined && canDelete === undefined) {
		return res.status(400).json('Debe proporcionar al menos un campo para actualizar.');
	  }
  
	  // Actualizar el permiso
	  const [updatedCount] = await Permission.update(
		{ RoleId, ResourceId, canAdd, canEdit, canView, canDelete },
		{ where: { id } }
	  );
  
	  // Verificar si se actualizó algún permiso
	  if (updatedCount === 0) {
		return res.status(404).json('El permiso no existe.');
	  }
  
	  // Obtener el permiso actualizado
	  const updatedPermission = await Permission.findByPk(id, { include: includePermission });
  
	  res.status(200).json(updatedPermission);
	} catch (error) {
	  console.log("Error en updatePermission, en permission.controller", error.message);
	  res.status(500).json('Ocurrió un error al actualizar el permiso, consulte con el administrador.');
	}
  };
  const deletePermission = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  // Intentar eliminar el permiso
	  const deletedCount = await Permission.destroy({
		where: { id }
	  });
  
	  // Verificar si se eliminó algún permiso
	  if (deletedCount === 0) {
		return res.status(404).json('El permiso no existe.');
	  }
  
	  res.status(200).json('Permiso eliminado correctamente.');
	} catch (error) {
	  console.log("Error en deletePermission, en permission.controller", error.message);
	  res.status(500).json('Ocurrió un error al eliminar el permiso, consulte con el administrador.');
	}
  };
	

module.exports = {
	createPermission,
	updatePermission,
	deletePermission
}