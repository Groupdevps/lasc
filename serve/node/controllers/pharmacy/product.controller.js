const { Product, User, ProductType }  	= require('../../models');
const { Op } = require('sequelize');

const includeOptions = [{
	model: User,  
	as: 'User', 
  }, {
	model: ProductType,  // El modelo asociado
	as: 'ProductType',   // El alias de la asociación
  }]
//agregar producto al inventario
const createProduct = async (req, res) => {
    try {
      const { code, name, units, description, atc, cum, invima, ProductTypeId, unitValue, productValue, UserId } = req.body;
      const newProduct = await Product.create({ code, name, units, description, atc, cum, invima, ProductTypeId, unitValue, productValue, UserId });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating Product :', error.message);
      res.status(500).json('Error al crear producto ',error.message);
    }
};
//consultar inventario
const getProducts = async (req, res) => {
    try {
        const { name = '', page = 1, itemsPerPage = 30 } = req.query;

        // Convertir page y itemsPerPage a enteros
        const limit = parseInt(itemsPerPage, 10);
        const offset = (parseInt(page, 10) - 1) * limit;

        // Consulta con paginación
        const Products = await Product.findAndCountAll({
            where: {
                isActive: true,
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            limit: limit,
            offset: offset,
            include: includeOptions, // Incluye cualquier modelo asociado si es necesario
        });

        // Responder con los productos y la información de paginación
        res.json({
            rows: Products.rows,
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(Products.count / limit),
            totalItems: Products.count,
        });
    } catch (error) {
        console.error('Error getting Products:', error);
        res.status(500).json('Error al consultar Productos');
    }
};

const getAllProducts = async (req, res) => {
  try {
      // Consulta con paginación
      const products = await Product.findAll({
          
          include: includeOptions, // Incluye cualquier modelo asociado si es necesario
      });

      // Responder con los productos y la información de paginación
      res.json(products);
  } catch (error) {
      console.error('Error getting Products:', error);
      res.status(500).json('Error al consultar Productos');
  }
};

//lISTA DE PRODUCTOS PARA SOLICITUD DE SUMINISTROS 
const getProductList = async (req, res) => {
  try {
      // Consulta con paginación
      const products = await Product.findAll({
          where: {
              isActive: true,
          },
          include: [
              {
                  model: ProductType,
                  as: 'ProductType',
                  required: true,
              },
          ],
      });

      // Filtrar productos que no sean de tipo MEDICAMENTO
      const filteredProducts = products.filter(product => product.ProductType.name !== '');

      // Modificar los productos para agregar el estado 'AGOTADO' si el stock es 0
      const modifiedProducts = filteredProducts.map(product => {
          return {
              id: product.id,
              code: product.atc !== null ? product.atc : undefined, // Solo se incluye si no es null
              name: product.name, // Nombre del producto
              description: product.description !== null ? product.description : undefined, // Solo se incluye si no es null
              productTypeName: product.ProductType.name, // Nombre del tipo de producto
              status: product.stock === 0 ? 'AGOTADO' : 'DISPONIBLE', // Estado basado en el stock
          };
      });

      // Responder con los productos modificados
      res.json(modifiedProducts);
  } catch (error) {
      console.error('Error getting Products:', error);
      res.status(500).json('Error al consultar Productos');
  }
};




//consultar informacion de un producto
const getProductById = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Product.findByPk(id, { include: includeOptions });
		if (product) {
		res.json(product);
	  } else {
		res.status(404).json({ error: 'Product not found' });
	  }
	} catch (error) {
	  console.error('Error getting Product by ID:', error);
	  res.status(500).json('Error al consultar producto');
	}
};
//actualizar un producto

const updateProduct = async (req, res) => {
	const { id } = req.params;
	try {
	  const updatedRowsCount = await Product.update(req.body,{ where: { id} });
	  if (updatedRowsCount > 0) {
		  res.status(200).send(updatedRowsCount);
	  } else {
		  throw new Error ('Error al eliminar producto')
	  }
	} catch (error) {
	  console.error('Error desactive Product  :', error);
	  res.status(500).json({message: error.message});
	}
  };

//desactivar un producto

const desactiveProduct = async (req, res) => {
	const { id } = req.params;
	try {
	  const updatedRowsCount = await Product.update({isActive : false},{ where: { id, stock : 0 } });
	  if (updatedRowsCount > 0) {
		  res.status(204).send(updatedRowsCount);
	  } else {
		res.status(404).json('Error, producto debe tener 0 cantidad y estar registrado');
		
	  }
	} catch (error) {
	  console.error('Error desactive Product  :', error);
	  res.status(500).json('Error al eliminar producto');
	}
  };

  module.exports = {
	createProduct,
	getProducts,
  updateProduct,
	getProductById,
	desactiveProduct,
  getProductList,
  getAllProducts
  };

  