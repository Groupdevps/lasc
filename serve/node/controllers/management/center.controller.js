const { Center, City, State, Address, DigitalSignature, CurrentAdministrator, TypeCenter } = require('../../models');

const includeCenter = [
  {
    model: Address, 
    include: ['District','State', 'City' ]
  },
  DigitalSignature,
  TypeCenter,
  CurrentAdministrator,
];

class CenterController {
  static async createCenter(req, res) {

    const {
      name,
      nit,
      email,
      phone,
      description,
      TypeCenterId,
      Address, // Suponiendo que la dirección viene dentro del objeto
      DigitalSignature,
      CurrentAdministratorId,
      logoBase64,
      Manager,
      UserId
    } = req.body;
  
    try {
      // Crear el centro (Center)
      const newCenter = await Center.create({
        logoBase64: logoBase64,
        name: name,
        nit: nit,
        email: email,
        phone: phone,
        description: description,
        TypeCenterId: TypeCenterId,
        CurrentAdministratorId: CurrentAdministratorId,
        Manager:Manager,
        UserId: UserId
        
      });
  
      // Crear la dirección (Address) con City y State
      if (Address) {
        const { address, CityId, StateId, DistrictId } = Address;
  
        // Crear la dirección y asociarla al centro recién creado
        const addressCreated = await Address.create({
          address,
          CityId,
          StateId,
          DistrictId,
          CenterId: newCenter.id, // Asociar la dirección al centro
        });
  
        // Aquí podrías manejar la creación de City y State si es necesario
      }
      const center = await Center.findByPk(newCenter.id,{include:includeCenter})

      // Responder con el centro creado
      res.status(201).json(center);
    } catch (error) {
      res.status(500).json({ 'error create center': error.message });
    }
  }

  static async getCenter(req, res) {
    const { id } = req.params;
  
    try {
      const center = await Center.findByPk(id, {
        include: includeCenter,
      });
  
      if (!center) {
        return res.status(404).json({ error: 'Center not found' });
      }
  
      res.status(200).json(center);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  static async updateCenter(req, res) {
    const { id } = req.params;
    const { Address: address } = req.body;

    try {
      const existingCenter = await Center.findByPk(id);
      if (!existingCenter) {
        return res.status(404).json({ error: 'Center not found' });
      }

      await existingCenter.update(req.body);

      if (address) {
        const existingAddress = await Address.findOne({ where: { CenterId: id } });
        if (existingAddress) {
          await existingAddress.update(address);
        }else{
          await Address.create(address);
        }
      }


      const centerUpdated = await Center.findByPk(id,{include:includeCenter})
      
      console.log('****************centerUpdated', centerUpdated)
      res.status(200).json(centerUpdated);
    } catch (error) {
      res.status(500).json({ "error updateCenter": error.message });
    }
  }

  static async deleteCenter(req, res) {
    const { id } = req.params;

    try {
      const center = await Center.findByPk(id);
      if (!center) {
        return res.status(404).json({ error: 'Center not found' });
      }

      await Address.destroy({ where: { CenterId: id } });
      await DigitalSignature.destroy({ where: { UserId: center.UserId } });
      await center.destroy();

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllCenters(req, res) {
    try {
      const centers = await Center.findAll({
        include: includeCenter
      });

      res.status(200).json(centers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CenterController;
