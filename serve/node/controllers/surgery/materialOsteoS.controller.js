const { Material } = require('../../models');
const paginate      = require('../../lib/paginate.js');

class MaterialController {
  static async create(req, res) {
    try {
      const material = await Material.create(req.body);
      res.status(201).json(material);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
			const pageSize = parseInt(req.query.page, 10) || 1; // Página actual
			const pageLimit = parseInt(req.query.limit, 10) || 30; // Tamaño de la página
			const search = req.query.search || ''; // Texto de búsqueda
			const order = req.query.order || []; // Orden de los resultados
			const searchOptions = ["code","name" ,"description"]
			const paginatedResult = await paginate(
				Material, 
				pageSize, 
				pageLimit, 
				search, 
				order,
				searchOptions,
				[],
			);
	
			
	
			res.status(200).json(paginatedResult);
		} catch (error) {
			console.log('Error en get en CupsListController', error);
			res.status(500).json({ message: error.message });
		}
    
  }

  static async getOne(req, res) {
    try {
      const material = await Material.findByPk(req.params.id);
      if (!material) return res.status(404).json({ message: "Material not found" });
      res.status(200).json(material);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const [updated] = await Material.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) return res.status(404).json({ message: "Material not found" });
      const updatedMaterial = await Material.findByPk(req.params.id);
      res.status(200).json(updatedMaterial);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await Material.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ message: "Material not found" });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MaterialController;
