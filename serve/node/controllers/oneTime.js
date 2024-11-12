const { Product, ProductType } = require('../models'); // Importa los modelos
const { Op } = require('sequelize');

async function updateProductTypes() {
  try {
    // Consultar los IDs de los ProductTypes basados en el nombre
    const productTypes = await ProductType.findAll({
      where: {
        name: {
          [Op.in]: ['DISPOSITIVO MEDICO', 'MEDICAMENTO', 'INSUMO']
        }
      }
    });

    // Crear un mapa de los IDs por nombre
    const productTypeMap = {};
    productTypes.forEach(type => {
      productTypeMap[type.name] = type.id;
    });

    // Verificar que se hayan encontrado los tres tipos
    if (!productTypeMap['DISPOSITIVO MEDICO'] || !productTypeMap['MEDICAMENTO'] || !productTypeMap['INSUMO']) {
      throw new Error('No se encontraron todos los tipos de producto necesarios.');
    }

    // Actualiza productos con ProductTypeId 1 (DISPOSITIVO MEDICO)
    await Product.update(
      { ProductTypeId: productTypeMap['DISPOSITIVO MEDICO'] },   // Nuevo valor de ProductTypeId
      { where: { ProductTypeId: 1 } }                            // Condición: ProductTypeId = 1
    );
    console.log('Productos de tipo DISPOSITIVO MEDICO actualizados.');

    // Actualiza productos con ProductTypeId 2 (MEDICAMENTO)
    await Product.update(
      { ProductTypeId: productTypeMap['MEDICAMENTO'] },          // Nuevo valor de ProductTypeId
      { where: { ProductTypeId: 2 } }                            // Condición: ProductTypeId = 2
    );
    console.log('Productos de tipo MEDICAMENTO actualizados.');

    // Actualiza productos con ProductTypeId 3 (INSUMO)
    await Product.update(
      { ProductTypeId: productTypeMap['INSUMO'] },               // Nuevo valor de ProductTypeId
      { where: { ProductTypeId: 3 } }                            // Condición: ProductTypeId = 3
    );
    console.log('Productos de tipo INSUMO actualizados.');

  } catch (error) {
    console.error('Error al actualizar los tipos de producto:', error);
  }
}

// Ejecutar la función
updateProductTypes();
