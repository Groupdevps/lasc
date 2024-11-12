const { Product, entryInventory, Dispatch , User,ProductType, DispatchDetail} = require('../../models');
const includeEntry= [
  {
    model:Product,
    as: 'Product' ,
    include:["ProductType"]
  }, User
]
const getInventory = async (req, res) => {
  try {
    let where = {};
    const { ProductId } = req.query;
    if (ProductId) {
      where.ProductId = ProductId;
    }
    const inputsPromise = await entryInventory.findAll({
      where,
      attributes: ['id','createdAt', 'cant', 'ProductId'],
      include: [{
        model: Product,
        attributes: ['code', 'name', 'description', 'stock', 'productValue'],
        include: ['ProductType']
      }]
    });

    const outputsPromise = await DispatchDetail.findAll({
      where,
      attributes: ['DispatchId','createdAt', 'cant', 'ProductId'],
      include: [{
        model: Product,
        attributes: ['code', 'name', 'description', 'stock', 'productValue'],
        include: ['ProductType']

      }],
    });

    const [inputs, outputs] = await Promise.all([inputsPromise, outputsPromise]);

    // Marcar los items como 'input' y 'output'
    const inputsWithType = inputs.map(input => ({ ...input.toJSON(), type: 'input' }));
    const outputsWithType = outputs.map(output => ({ ...output.toJSON(), type: 'output' }));

    // Combinar y ordenar por fecha
    const combined = [...inputsWithType, ...outputsWithType].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    res.status(200).json(combined);
  } catch (error) {
    console.log('error in getInventory controller', error);
    res.status(500).json({ error: 'Error fetching inventory' });
  }
};

const getInventoryToPdf = async (req, res) => {
  try {
    let where = {};
    const { ProductId } = req.query;
    if (ProductId) {
      where.ProductId = ProductId;
    }
    const inputsPromise = await entryInventory.findAll({
      where,
      attributes: ['createdAt', 'cant', 'ProductId'],

      include: [{
        model: Product,
        attributes: ['code', 'name', 'description', 'stock', 'productValue'],
        include: ['ProductType']
      }]
    });

    const outputsPromise = await DispatchDetail.findAll({
      where,
      attributes: ['createdAt', 'cant', 'ProductId'],

      include: [{
        model: Product,
        attributes: ['code', 'name', 'description', 'stock', 'productValue'],
        include: ['ProductType']
      }],
    });

    const [inputs, outputs] = await Promise.all([inputsPromise, outputsPromise]);

    // Marcar los items como 'input' y 'output'
    const inputsWithType = inputs.map(input => ({ ...input.toJSON(), type: 'input' }));
    const outputsWithType = outputs.map(output => ({ ...output.toJSON(), type: 'output' }));

    // Combinar y ordenar por fecha
    const combined = [...inputsWithType, ...outputsWithType].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return(combined);
  } catch (error) {
    console.log('error in getInventory controller', error);
    res.status(500).json({ error: 'Error fetching inventory' });
  }
};

const getEntry = async (req, res) => {
  try {
    const { entry } = req.query;
    const EntryDetails = await entryInventory.findByPk(entry);
    res.status(200).json(EntryDetails);
  } catch (error) {
    console.log('error in getEntry controller', error);
    res.status(500).json({ error: 'error , consulte su administrador' });
  }
};

const createEntryInventory = async (req, res) => {
  try {
    const {ProductId,
      cant,
      date,
      UserId,
      lte,
      lteDate,
      expirationDate } = req.body;

    // Crear la entrada en el inventario
    const newEntry = await entryInventory.create({
      ProductId,
      cant,
      date,
      UserId,
      lte,
      lteDate,
      expirationDate
    });

    // Actualizar el stock del producto
    const product = await Product.findByPk(ProductId);
    console.log('--------------PRODUCT', product)
    if (product) {
      product.stock += cant;
      await product.save();
    }
    const entry = await entryInventory.findOne({where: {id:newEntry.id}, include:includeEntry});
    res.status(201).json(entry);
  } catch (error) {
    console.log('Error in createEntryInventory controller', error);
    res.status(500).json({ error: 'Error creating inventory entry' });
  }
};

const createDispatch = async (req, res) => {
  try {
    const { ProductId, cant, date } = req.body;

    // Crear el despacho
    const newDispatch = await Dispatch.create({
      ProductId,
      cant,
      date
    });

    // Actualizar el stock del producto
    const product = await Product.findByPk(ProductId);
    if (product) {
      product.stock -= cant;
      await product.save();
    }

    res.status(201).json(newDispatch);
  } catch (error) {
    console.log('Error in createDispatch controller', error);
    res.status(500).json({ error: 'Error creating dispatch' });
  }
};

const generateVoucher = async (req, res) => {
  try {
    const { DispatchId } = req.query;
    const dispatch = await Dispatch.findByPk(DispatchId, {
      include: [{
        model: Product,
        attributes: ['code', 'name', 'productValue']
      }]
    });

    if (!dispatch) {
      return res.status(404).json({ error: 'Dispatch not found' });
    }

    const voucher = {
      date: dispatch.date,
      product: dispatch.Product.name,
      quantity: dispatch.cant,
      pricePerUnit: dispatch.Product.productValue,
      total: dispatch.cant * dispatch.Product.productValue
    };

    res.status(200).json(voucher);
  } catch (error) {
    console.log('Error in generateVoucher controller', error);
    res.status(500).json({ error: 'Error generating voucher' });
  }
};

module.exports = {
  getInventory,
  getEntry,
  createEntryInventory,
  createDispatch,
  generateVoucher,
  getInventoryToPdf
};
