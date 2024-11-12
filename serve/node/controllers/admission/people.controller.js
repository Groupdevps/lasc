const { Person,District, Address,City, State,Relationship , Regime,ServiceProvider,CurrentAdministrator, TypeRelationship , TypeID}    = require('../../models');
const moment = require('moment');
const helpers       =  require ("../../lib/helpers");
const paginate      = require('../../lib/paginate.js');
const { Association } = require('sequelize');
const { addRelationships } = require('./relationShips.controller');
const { Adult, validateAdultDocumentType } = require('./validations.controller.js');
const { sequelize } = require('../../models'); // Asegúrate de importar sequelize si no lo has hecho

//Read Person

const include =  [
    {
        model: Address, 
        include: ['State', 'City' ,'District']
    }, 'Gender', 'TypeID', 'MaritalStatus',
   { 
        model: Relationship , 
        as: 'Relationships', 
        paranoid: true, 
        required: false,
        include: [
            TypeRelationship,
            { 
            model: Person , 
            as: 'Person', 
            paranoid: true, 
            required: false,
            include: ['Gender', 'TypeID']
        }]
    },
    { 
        model: ServiceProvider , 
        include: [
            {
              model: CurrentAdministrator,
              as: 'administrator', // Debe coincidir con el alias que estableciste en el modelo ServiceProvider
              attributes: ['nit', 'name', 'email'] // Puedes especificar qué columnas quieres traer
            },
            {
                model: Regime,
                
                attributes: ['name'] // Puedes especificar qué columnas quieres traer
            }
          ]
    }
    
]//include

const validate = (req) => {
    try {
        if (!req.body.birthDate) {
            throw new Error("Paciente requiere fecha de nacimiento.");
        }
        if (!req.body.cellphone) {
            throw new Error("Paciente requiere numero de celular.");
        }
        if (!req.body.name) {
            throw new Error("Paciente requiere nombre.");
        }
        if (!req.body.lastName) {
            throw new Error("Paciente requiere apellido.");
        }
        if (!req.body.TypeIDId) {
            throw new Error("Paciente requiere tipo de documento de identidad.");
        }
        if (!req.body.numberId) {
            throw new Error("Paciente requiere numero de documento de identidad.");
        }

        // Si todas las validaciones pasan, devuelve true
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};


const person = {
     getItems :  (req, res) => {
        Person.findAll({
            include
        },
        ).then(people => res.json(people));
        
    },
    //Create Person

    create: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            // Validar si ServiceProvider está vacío
            if (!req.body.ServiceProvider || Object.keys(req.body.ServiceProvider).length === 0) {
                throw new Error('Los datos de la EPS del paciente son obligatorios.');
            }
    
            // Validar otros campos
            const validated = validate(req);
            if (validated !== true) {
                throw new Error(validated);
            }
    
            const typeIDName = await TypeID.findOne({ where: { id: req.body.TypeIDId } });
            await validateAdultDocumentType(req.body.birthDate, typeIDName.description);
    
            // Buscar CityId basado en el nombre y código de la ciudad
            const city = await City.findOne({ 
                where: { 
                    name: req.body.Address.City.name, 
                    code: req.body.Address.City.code 
                } 
            });
            if (!city) {
                throw new Error('La ciudad proporcionada no es válida.');
            }
    
            // Buscar DistrictId basado en el nombre del distrito
            const district = await District.findOne({ 
                where: { 
                    name: req.body.Address.District.name 
                } 
            });
            if (!district) {
                throw new Error('El distrito proporcionado no es válido.');
            }
    
            // Crear la persona
            const person = await Person.create(req.body, { transaction });
    
            // Asignar el PersonId, CityId, y DistrictId a la dirección
            req.body.Address.PersonId = person.id;
            req.body.Address.CityId = city.id;
            req.body.Address.DistrictId = district.id;
    
            // Asignar el PersonId al proveedor de servicios
            req.body.ServiceProvider.PersonId = person.id;
    
            // Crear la dirección y el proveedor de servicios
            await Address.create(req.body.Address, { transaction });
            await ServiceProvider.create(req.body.ServiceProvider, { transaction });
    
            // Confirmar la transacción
            await transaction.commit();
    
            // Obtener la persona con las asociaciones necesarias
            const newPerson = await Person.findByPk(person.id, { include });
            return res.status(201).json(newPerson);
    
        } catch (error) {
            // Rollback de la transacción en caso de error
            if (!transaction.finished) {
                await transaction.rollback();
            }
            console.log('Error creating person:', error);
            // Enviar mensaje de error al cliente
            return res.status(400).json({ message: error.message });
        }
    },
    
    

    update: async (req, res) => {
        try {
            const validated = validate(req);
            if (validated !== true) {
                throw new Error(validated);
            } else {
                if (!req.body.Adult) {
                    req.body.Adult = await Adult(req.body.birthDate);
                }
                
                const typeIDName = await TypeID.findOne({ where: { id: req.body.TypeIDId } });
                await validateAdultDocumentType(req.body.birthDate, typeIDName.description);
                
                Person.update(req.body, { where: { id: req.params.id } }).then(async result => {
                    const updatedAddress = await updateAddress(req);
                    if (!updatedAddress.Address) {
                        res.status(404).json(updatedAddress);
                    }
                    const updatedServiceProvider = await updateServiceProvider(req);
                    if (!updatedServiceProvider.ServiceProvider) {
                        res.status(404).json(updatedServiceProvider);
                    }
                    res.json(result);
                }).catch(err => {
                    res.status(404).json({ message: err.message });
                });
            }
        } catch (error) {
            console.log('Error updating person:', error.message);
            return res.status(500).json({ message: error.message });
        }
    },
    //Search by numberId
    findItem :  (req, res) => {
        Person.findOne({
            where: {
                numberId: req.body.numberId
            },
            include
        }).then( result => {
            console.log(result)
            
            if (result){

            result.Relationships = []
            Relationship.findAll({
                where: { PatientId: result.id },
                include: [
                    TypeRelationship,
                    { 
                        model: Person , 
                        as: 'Person',
                        include: [
                            'Address', 'ServiceProvider', 'Gender', 'TypeID'
                            //{ model: Relationship , as: 'Relationships', paranoid: true, required: false}
                        ]
                    }
                ]
                
            }).then(relationship => {
                
                let temp = {...result.dataValues};
                temp.Relationships = relationship;
                res.json(temp) 

            }).catch(err => {
                res.status(404).json(err.message)
            })
            }else{
                res.json(result)
            }
        }).catch (err => {
            console.log("error", err)
            res.status(404).json({
                message: err.message
            })
        })
    },//findPerson

    getItem :  (req, res) => {
        Person.findOne({
            where: {
                id: req.params.id,
            },
            include
            
        }).then((result) => {
            Address.findOne({
                where : {
                    PersonId : result.id,
                }
            }).then(result2 => {

                res.status(200).json(
                    {...result.dataValues, ...result2.dataValues }
                )
            }).catch(error2 => {
                console.log('error address getItem people controller', error2.message )

            })
                // token : token 
        }).catch((err) => {
            console.log('error getItem', err.message )
            res.status(404).json(err.message)
        });    
    },
    get :  (req, res) => {
        paginate(
            Person,
            req.query.page || 1,
            req.query.limit || 30,
            req.body.search,
            req.query.order || [['createdAt' ,'DESC']],
            null,
        ).then((result) => {  
            res.status(200).json(result);        
        }).catch((error) => {           
            res.status(404).json({
                message : error.message
            });
        });
    },//get

        

    destroy : async (req, res) => {
        const person = await Person.destroy({where: {id: req.query.id}});
        if (person.error) {
            res.status(404).json(person.error);
        }else{
            res.json(person);
        }
    }//destroy

   
      
}
const updateAddress = async (req, res) => {
    try {
        delete req.body.Address.id;
        // Asignar PersonId
        req.body.Address.PersonId = req.params.id;

        // Buscar CityId basado en el nombre y código de la ciudad
        const city = await City.findOne({
            where: {
                name: req.body.Address.City.name,
                code: req.body.Address.City.code
            }
        });
        if (!city) {
            throw new Error('La ciudad proporcionada no es válida.');
        }

        // Buscar DistrictId basado en el nombre del distrito
        const district = await District.findOne({
            where: {
                name: req.body.Address.District.name
            }
        });
        if (!district) {
            throw new Error('El distrito proporcionado no es válido.');
        }

        // Asignar CityId y DistrictId al objeto Address
        req.body.Address.CityId = city.id;
        req.body.Address.DistrictId = district.id;

        // Intentar actualizar la dirección
        const updated = await Address.update(req.body.Address, {
            where: { PersonId: req.params.id }
        });

        console.log("updated Address", updated);

        // Si no se actualiza nada, se crea una nueva dirección
        if (updated[0] == 0) {
            const created = await Address.create(req.body.Address);

            console.log("created", created);
            return {
                "Address": "created"
            };
        }

        return {
            "Address": "updated"
        };

    } catch (error) {
        console.log("error updating Address", error);
        return {
            "error updating Address": error.message
        };
    }
};


const updateServiceProvider = async (req, res) => {
    try {
        if (req.body.ServiceProvider.assignedAdministrator) {
            delete req.body.ServiceProvider.assignedAdministrator
        }
        delete req.body.ServiceProvider.id
        //agregar PersonId
        req.body.ServiceProvider.PersonId = req.params.id
     
        const updated = await ServiceProvider.update(req.body.ServiceProvider, {where: {PersonId: req.params.id}})
        //si no se actualiza nada entonces se crea
        if(updated[0] == 0){
            const created = await ServiceProvider.create(req.body.ServiceProvider)

            console.log("created", created)
            return {
                "ServiceProvider" : "created"
            }

        }
        return {
            "ServiceProvider" : "updated"
        }
    } catch (error) {
        console.log("error updating ServiceProvider",error)
        return {
            "error updating ServiceProvider" : error.message
        }
        
    }
}
const searchForName = async (req, res) => {
    try {
        
        if(req.body.name == ''){
            delete req.body.name
        }
        if(req.body.secondName == ''){
            delete req.body.secondName
        }
        if(req.body.lastName == ''){
            delete req.body.lastName
        }
        if(req.body.secondSurname == ''){
            delete req.body.secondSurname
        }
        console.log("searching for names", req.body)
        const result = await Person.findAndCountAll({
            where : req.body,
            include
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({
            'error searching name': error.message
        })
    }

}//buscar por nombre

// searchPerson
const searchPerson = async (req) => {
    try {
        const result = await Person.findOne({
            where: { id: req.body.Person.id },
            include
        });
        
        if (result) {
            const resultAddress = await Address.findOne({
                where: { PersonId: result.id },
                include: [
                    { model: City, attributes: ['code', 'name'] },
                    { model: State, attributes: ['code', 'name'] },
                    { model: District, attributes: ['name'] },
                ]
            });

            return { ...result.dataValues, ...resultAddress.dataValues };
        }

        return null;
    } catch (error) {
        console.log('Error in searchPerson:', error);
        return null; // Retorna null en caso de error
    }
};

module.exports = {...person, searchForName, searchPerson}