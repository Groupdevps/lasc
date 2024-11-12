const { TypeFee }  = require('../models');

const helpers   =  require ("../lib/helpers");

//Read TypeFee
const getItems = async(req, res) => {
    const typeFee = await TypeFee.findAll({
       
    });
    res.json(typeFee)
}

//Create TypeFee
const create = async (req, res) => {
    // console.log(req)
    TypeFee.create(req.body).then((result) => {  
        res.status(200).json({ 
            TypeFee : result,
        });
        console.log('created TypeFee');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}
//Search by numberId
const getItem = async(req, res) => {
    const typeFee = await TypeFee.findOne({where: {id: req.body.id}});
    res.json(typeFee)
}
const get = async (req, res) => {
    const typeFee = await TypeFee.findAndCountAll({
        limit : 30,
        order : "DESC",
    });

    if (typeFee.error) {
        res.status(404).json(typeFee.error);
    }else{
        res.json({
            page    : 1,
            count   : typeFee.count,
            rows    : typeFee.rows,
        })
    }
}

const update = async (req, res) => {
    const typeFee = await TypeFee.update({where: {id: req.query.id}});
     if (typeFee.error) {
        res.status(404).json(typeFee.error);
    }else{
        res.json(typeFee);
    }
}

const destroy = async (req, res) => {
    const typeFee = await TypeFee.destroy({where: {id: req.query.id}});
     if (typeFee.error) {
        res.status(404).json(typeFee.error);
    }else{
        res.json(typeFee);
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