//importar modelo
const {entryInventory} = require('../../models')

const include = ["User", "Product"]
//ingreso de inventario

const createEntryInventory = async (req, res) => {
    try {
      const { date,cant,ProductId, UserId,lte,lteDate,expirationDate } = req.body;
      const newEntryInventory = await entryInventory.create({ date,cant,ProductId, UserId,lte,lteDate,expirationDate });
      res.status(201).json(newEntryInventory);
    } catch (error) {
      console.error('Error creating entryInventory:', error);
      res.status(500).json('Error al agregar ingreso a inventario');
    }
};

//consultar historial de ingresos
const getEntryInventories = async (req, res) => {
    try {
      const EntryInventories = await entryInventory.findAll({include});
      res.json(EntryInventories);
    } catch (error) {
      console.error('Error getting EntryInventories:', error);
      res.status(500).json('Error al consultar ingresos de inventario');
    }
};

//consultar informacion de un ingreso
const getEntryInventoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const EntryInventory = await entryInventory.findByPk(id);
      if (EntryInventory) {
        res.json(EntryInventory);
      } else {
        res.status(404).json({ error: 'EntryInventory not found' });
      }
    } catch (error) {
      console.error('Error getting EntryInventory by ID:', error);
      res.status(500).json('Error al consultar ingreso de inventario');
    }
};

//no se puede editar o eliminar

module.exports = {
	createEntryInventory,
	getEntryInventories,
	getEntryInventoryById
};