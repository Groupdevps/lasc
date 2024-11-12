const { HistoryPerson, Person, State, City, Zone,Address,District, Regime,ServiceProvider, CurrentAdministrator ,Relationship, TypeRelationship} = require('../../models/index.js');
const paginate = require('../../lib/paginate.js');
const { searchPerson } = require('./people.controller.js');
const { where } = require('sequelize');

const hperson = {
    get: (req, res) => {
        paginate(
            HistoryPerson,
            req.query.size || 30,
            req.query.limit || 30,
            req.body.search,
            req.query.order || ['DESC'],
            null,
        ).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            res.status(404).json({
                message: error.message
            });
        });
    }, // get

    getItems: (req, res) => {
        HistoryPerson.findAll({}).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            res.status(404).json({
                message: error.message
            });
        });
    }, // getItems

    getItem: (req, res) => {
        HistoryPerson.findOne({
            where: {
                id: req.query.id
            }
        }).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            res.status(404).json({
                message: error.message
            });
        });
    }, // getItem

    findItem: (req, res) => {
        HistoryPerson.findOne({
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            res.status(404).json({
                message: error.message
            });
        });
    },// find item

    create: (req, res) => {
        HistoryPerson.create(req.body).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            console.log('error', error.message)
            res.status(404).json({
                message: error.message
            });
        });
    }, // create

    update: (req, res) => {
        HistoryPerson.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        }).catch(error => {
            res.status(404).json({
                message: error.message
            });
        });
    }, // update

    destroy: (req, res) => {
        HistoryPerson.destroy({
            where: {
                id: req.query.id
            }
        }).then(result => {
            res.json(result);
        }).catch(error => {
            res.status(404).json({
                message: error.message
            });
        });
    }, // destroy
};

// saveHistoryPerson
const saveHistoryPerson = async (PersonId, companionNumberId) => {
    try {
        console.log("*****************PersonId, companionNumberId ", PersonId, companionNumberId);

        // Buscar persona
        const person = await Person.findOne({ where: { id: PersonId } });
        if (!person) {
            throw new Error(`No se encontró ninguna persona con el ID ${PersonId}`);
        }

        // Busca su dirección
        const address = await Address.findOne({
            where: { PersonId: PersonId },
            include: [District,{
                model: City,
                include: [State]
            }, Zone]
        });
        if (!address) {
            throw new Error(`No se encontró ninguna dirección para la persona con el ID ${PersonId}`);
        }

        // Busca su EPS
        const serviceProvide = await ServiceProvider.findOne({
            where: { PersonId: PersonId },
            include: [
                Regime, 
                { model: CurrentAdministrator, as: 'administrator' }
            ]
        });

        if (!serviceProvide) {
            throw new Error(`No se encontró ninguna EPS para la persona con el ID ${PersonId}`);
        }

        // Verifica si el administrador (EPS) existe
        if (!serviceProvide.administrator) {
            throw new Error('Es necesaria la información de la EPS. Por favor, asegúrese de que el administrador esté configurado.');
        }

        console.log("serviceProvide.administrator", serviceProvide.administrator);

        // Busca su acompañante
        const companion = await Relationship.findOne({
            where: { companion: companionNumberId },
            include: [Person, TypeRelationship]
        });

        const historyperson = {
            name: person.name,
            secondName: person.secondName|| null,
            lastName: person.lastName,
            secondSurname: person.secondSurname|| null,
            numberId: person.numberId,
            TypeIDId: person.TypeIDId,
            birthDate: person.birthDate,
            MaritalStatusId: person.MaritalStatusId|| null,
            GenderId: person.GenderId|| null,
            phone: person.phone|| null,
            cellphone: person.cellphone,
            email: person.email|| null,
            occupation: person.occupation|| null,
            address: address.address|| null,
            city: address.City?.name|| null,
            state: address.City?.State?.name|| null,
            zone: address.zone|| null,
            district: address.District?.name|| null,
            CompanionId: companion ? companion.id : null,
            companionName: companion?.Person?.fullName || null,
            TypeRelationshipName: companion?.TypeRelationship?.name || null,
            currentAdministratorNit: serviceProvide.administrator?.nit,
            currentAdministratorName: serviceProvide.administrator?.name,
            regime: serviceProvide.Regime?.name,
        };

        // Crear historyperson
        const newHistoryPerson = await HistoryPerson.create(historyperson);

        return newHistoryPerson.id;
    } catch (error) {
        console.log('Error in saveHistoryPerson:', error);
        return null;
    }
};

module.exports = {
    ...hperson,
    saveHistoryPerson
};
