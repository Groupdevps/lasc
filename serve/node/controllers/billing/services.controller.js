const { Service } = require('../../models'); // Asegúrate de que la ruta sea correcta

const ServiceController = {
  // Obtener todos los servicios
  async getAll(req, res) {
    try {
      const services = await Service.findAll();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un servicio por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo servicio
  async create(req, res) {
    const { name, serviceType } = req.body;
    try {
      const newService = await Service.create({ name, serviceType });
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un servicio por ID
  async update(req, res) {
    const { id } = req.params;
    const { name, serviceType } = req.body;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      await service.update({ name, serviceType });
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un servicio por ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      await service.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ServiceController;
