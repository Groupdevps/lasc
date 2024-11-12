const { Zone }  = require('../models');

const helpers   =  require ("../lib/helpers");

//Read item
const getItems = async(req, res) => {
    const item = await Zone.findAll({       
    });
    res.json(item)
}

//Create item
const create = async (req, res) => {
    // console.log(req)
    Zone.create(req.body).then((result) => {  
        res.status(200).json({ 
            result,
        });
        console.log('created item');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}
//Search by numberId
const getItem = async(req, res) => {
    const item = await Zone.findOne({where: {nit: req.body.nit}});
    res.json(item)
}
const get = async (req, res) => {
    const item = await Zone.findAndCountAll({
        limit : 30,
        order : "DESC",
    });

    if (item.error) {
        res.status(404).json(item.error);
    }else{
        res.json({
            page    : 1,
            count   : item.count,
            rows    : item.rows,
        })
    }
}

const update = async (req, res) => {
    const item = await Zone.update({where: {numberId: req.query.id}});
     if (item.error) {
        res.status(404).json(item.error);
    }else{
        res.json(item);
    }
}

const destroy = async (req, res) => {
    const item = await Zone.destroy({where: {numberId: req.query.id}});
     if (item.error) {
        res.status(404).json(item.error);
    }else{
        res.json(item);
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