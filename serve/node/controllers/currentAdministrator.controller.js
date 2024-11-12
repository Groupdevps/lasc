const { CurrentAdministrator, Regime, TypeCurrentAdministrator }  = require('../models');

const helpers   =  require ("../lib/helpers");
const include = [{
    model : Regime,
    attributes: ['name']
}]
//Read CurrentAdministrator
const getCurrentAdministrators = async(req, res) => {
    const currentAdministrator = await CurrentAdministrator.findAll({
        include
    });
    res.json(currentAdministrator)
}

//Create CurrentAdministrator
const create = async (req, res) => {
    // console.log(req)
    CurrentAdministrator.create(req.body).then((result) => {  
        res.status(200).json({ 
            currentAdministrator : result,
        });
        console.log('created currentAdministrator');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}
//Search by numberId
const getCurrentAdministrator = async(req, res) => {
    const CurrentAdministrator = await CurrentAdministrator.findOne({where: {nit: req.body.nit}});
    res.json(CurrentAdministrator)
}
const get = async (req, res) => {
    const currentAdministrator = await CurrentAdministrator.findAndCountAll({
        limit : 30,
        order : "DESC",
    });

    if (currentAdministrator.error) {
        res.status(404).json(currentAdministrator.error);
    }else{
        res.json({
            page    : 1,
            count   : currentAdministrator.count,
            rows    : currentAdministrator.rows,
        })
    }
}

const update = (req, res) => {
    
    CurrentAdministrator.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(result =>{
        res.json(result);

    }).catch(error => {
        console.log("Error ", error)
        res.status(404).json({ message : error.message});

    });
     
}

const destroy = (req, res) => {
    CurrentAdministrator.destroy({where: {id: req.params.id}}).then(result =>{
        res.json(result);

    }).catch(error => {
        res.status(404).json({ message : error.message});

    });
}

module.exports = {
    get,
    getCurrentAdministrator,
    getCurrentAdministrators,
    create,
    update,
    destroy,

}