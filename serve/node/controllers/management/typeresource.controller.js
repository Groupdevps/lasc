const { TypeResource, sequelize } = require('../../models'); // Asegúrate de ajustar la ruta según tu estructura
const { Transaction } = require('sequelize');

//crear modulo
const createTypeResource = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const { name , keyForm } = req.body;

      // name obligatorio
      if (!name) {
        throw new Error('El campo "nombre" es obligatorio');
      }

      // crear nuevo modulo
      const typeResource = await TypeResource.create({ name, keyForm },{ transaction });

      // transaccion confirmada
      await transaction.commit();

      // respuesta
      res.status(201).json(typeResource);

    } catch (error) {
      // revierte la transacion
      await transaction.rollback();
      // console error
      console.log('Ocurrió un error al crear el TypeResource', error.message)
      // mensaje de error
      res.status(500).json('Error al crear modulo, consulte administrador');
    }
}

//traer modulos
const getActiveTypeResources= async (req, res) => {
    try {
      //get solo los activos
      const activeTypeResources = await TypeResource.findAll({
        where: {
          isActive: true,
        },
        attributes: ['id','name', 'keyForm']
      });

      //respuesta
      res.status(200).json(activeTypeResources);
    } catch (error) {
      // console error
      console.log('Ocurrió un error al obtener los TypeResources activos', error.message)
      // mensaje error
      res.status(500).json('Error al obtener los modulos, consulte administrador');
    }
  }

//actualizar
const updateTypeResourceName = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { name, keyForm } = req.body;

    // nombre obligatorio
    if (!name) {
      throw new Error('El campo "nombre" es obligatorio');
    }

    // buscar el modulo
    const typeResource = await TypeResource.findByPk(id, { transaction });
    //confirmo si el modulo existe
    if (!typeResource) {throw new Error('Modulo no encontrado');}

    // actualizo le nombre
    typeResource.name = name;
    typeResource.keyForm = keyForm;
    await typeResource.save({ transaction });

    
    await transaction.commit();

    
    res.status(200).json('Nombre actualizado exitosamente');
  } catch (error) {
    // cancelar transaccion
    await transaction.rollback();
    // console error
    console.log('Error al actualizar el name TypeResource ', error.message)
    // Responder con error
    res.status(500).json('Ocurrió un error al actualizar el nombre del modulo, consulte administrador');
  }
}

//desactivar modulos
const deactivateTypeResource = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    // buscar el modulo
    const typeResource = await TypeResource.findByPk(id, { transaction });

    if (!typeResource) {
      //si no existe mandar mensaje
      throw new Error('Modulo no existe');
    }

    // si existe de desactiva
    typeResource.isActive = false;
    await typeResource.save({ transaction });

    // confirmo el movimiento
    await transaction.commit();

    // respondo
    res.status(200).json('Modulo desactivado exitosamente');
  } catch (error) {
    // cancelar proceso
    await transaction.rollback();

    // console error
    console.log('Error al desactivar TypeResource ', error.message)
    res.status(500).json('Ocurrió un error al desactivar el modulo, consulte administrador');
  }
}


module.exports = {
    createTypeResource,
    getActiveTypeResources,
    updateTypeResourceName,
    deactivateTypeResource
};
