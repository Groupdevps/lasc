const { ServiceFee, TypeFee }  = require('../models');

const helpers   =  require ("../lib/helpers");

//Read ServiceFee
const getItems = async(req, res) => {
    const serviceFee = await ServiceFee.findAll({
       include : TypeFee
    });
    res.json(serviceFee)
}

//Create ServiceFee
const create = async (req, res) => {
    // console.log(req)
    ServiceFee.create(req.body).then((result) => {  
        res.status(200).json({ 
            ServiceFee : result,
        });
        console.log('created ServiceFee');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}
//Search by numberId
const getItem = async(req, res) => {
    const serviceFee = await ServiceFee.findOne({where: {id: req.body.id}});
    res.json(serviceFee)
}
const get = async (req, res) => {
    const serviceFee = await ServiceFee.findAndCountAll({
        limit : 30,
        order : "DESC",
    });

    if (serviceFee.error) {
        res.status(404).json(serviceFee.error);
    }else{
        res.json({
            page    : 1,
            count   : serviceFee.count,
            rows    : serviceFee.rows,
        })
    }
}

const update = async (req, res) => {
    const serviceFee = await ServiceFee.update({where: {id: req.query.id}});
     if (serviceFee.error) {
        res.status(404).json(serviceFee.error);
    }else{
        res.json(serviceFee);
    }
}

const destroy = async (req, res) => {
    const serviceFee = await ServiceFee.destroy({where: {id: req.query.id}});
     if (serviceFee.error) {
        res.status(404).json(serviceFee.error);
    }else{
        res.json(serviceFee);
    }
}

module.exports = {
    get,
    getItem,
    getItems,
    create,
    update,
    destroy,

}