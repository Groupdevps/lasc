//importar modelo
const {ProductType} = require ("../../models")

// agregar tipo de producto
const createProducType = async (req,res) => {
    try {
        const {name, description} = req.body
        const newProducType = await ProductType.create({name, description})
        res.status(201).json(newProducType)
    } catch (error) {
        console.error('Error creating product type:', error);
        res.status(500).json('Error al crear tipo de producto');
    }
}
//ver todos los tipos de producto
const getProductType = async (req,res) => {
    try {
        const ProducTypes = await ProductType.findAll({where : {isActive: true}})
        res.status(200).json(ProducTypes)
    } catch (error) {
        console.error('Error getting product type:', error);
        res.status(500).json('Error al buscar tipos de producto');
    }
}

//obtener un tipo de producto
const getProductTypeById = async (req, res) => {
	const { id } = req.params;
	try {
	  const productType = await ProductType.findByPk(id);
	  if (productType) {
		res.json(productType);
	  } else {
		res.status(404).json('Tipo de producto no encontrado');
	  }
	} catch (error) {
	  console.error('Error getting Product Type by ID:', error);
	  res.status(500).json('Error al consultar  tipo de producto');
	}
};

//desactivar los tipos de productos

const desactiveProductType = (req,res) => {
    try {
        const {id} = req.params
        const updatedRowsCount = ProductType.update({isActive: false},{where : id})
        if (updatedRowsCount > 0) {
            res.status(204).send();
          } else {
            res.status(404).json('Error al eliminar tipo de producto');
            
          }
    } catch (error) {
        console.error('Error getting product type:', error);
        res.status(500).json('Error al eliminar tipo de producto');
    }
}

module.exports = {
	  createProducType,
	  getProductType,
    getProductTypeById,
	  desactiveProductType
  };