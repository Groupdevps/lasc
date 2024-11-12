const { Resource, sequelize } = require('../../models'); // Asegúrate de ajustar la ruta según tu estructura
const { Transaction } = require('sequelize');
//RECOURSE == SECCION
//TYPERECOURSE == MODULO

//include
const includeResource = ['TypeResource']

//crear
const createResource = async (req, res) => {
	try {
	  const { TypeResourceId, name,keyForm } = req.body;
  
	  if (!TypeResourceId || !name) {
		return res.status(400).json('Los campos "modulo" y "nombre" son obligatorios');
	  }
  
	  const newResource = await Resource.create({
		TypeResourceId,
		name,
		keyForm
	  });
  
	  const resource = await Resource.findByPk(newResource.id, { include: includeResource });
  
	  res.status(201).json(resource);
	} catch (error) {
	  console.log("Error en createResource, en resource.controller", error.message);
	  res.status(500).json('Ocurrió un error al crear la seccion, consulte con administrador');
	}
  };
  

//actualizar
const updateResource = async (req, res) => {
	try {
	  const { id } = req.params;
	  const { name, TypeResourceId } = req.body;
  
	  // Validar que ambos campos no estén vacíos o sean solo espacios
	  if (!name || name.trim() === "" || !TypeResourceId) {
		res.status(400).json('Los campos "nombre" y "modulo" son obligatorios y no pueden estar vacíos.');
	  }

  
	  // Actualizar el recurso en la base de datos
	  const [updated] = await Resource.update(
		{ name: name, TypeResourceId },
		{ where: { id }, returning: true }
	  );
  
	  // Verificar si el recurso fue actualizado
	  if (updated === 0) {
		 res.status(404).json('No se encontró seccion.');
	  }
  
	  // Obtener el recurso actualizado
	  const resource = await Resource.findByPk(id, {include:includeResource});
  
	  // Responder con el recurso actualizado
	  res.status(200).json(resource);
	} catch (error) {
	  console.log("Error en updateResource, en resource.controller", error);
	  res.status(500).json('Ocurrió un error al actualizar la seccion, consulte con el administrador.');
	}
  };
  
  

//buscar recursos por modulo "typeresources"(module)
 const getResources = async (req, res) => {
	try {
	  const { module } = req.query;
	  let where= {}

	  if (module) {
		where.TypeResourceId = module
	  }
	  where.isActive = true

  
	  const resources = await Resource.findAll({
		where,
		include: includeResource
	  });
  
	  res.status(200).json(resources);
	} catch (error) {
		console.log("Error en getResources, en resource.controller", error.message);
		res.status(500).json('Ocurrió un error al obtener las secciones, consulte con el administrador.');
	  
	}
  };

//desactivar
// Desactivar un Resource (isActive a false)
const deactivateResource = async (req, res) => {
	try {
	  const { id } = req.params;
  
  
	  // Actualizar el recurso en la base de datos
	  const [updated] = await Resource.update(
		{ isActive: false },
		{ where: { id }, returning: true }
	  );
  
	  // Verificar si el recurso fue actualizado
	  if (updated === 0) {
		 res.status(404).json('No se encontró seccion.');
	  }
  
	  const resource = await Resource.findByPk(id,{include: includeResource});
  
	  res.status(200).json(resource);
	} catch (error) {
		console.log("Error en deactivateResource, en resource.controller", error.message);
		res.status(500).json('Ocurrió un error al desactivar la seccion, consulte con el administrador.');
	  
	}
  };
  
 
 module.exports = {
	createResource,
	getResources,
	updateResource,
	deactivateResource,
  };