const { Regime }  = require('../models');
const helpers   =  require ("../lib/helpers");
//Read Regimes
const getRegimes = async(req, res) => {
    const items = await Regime.findAll({
        where : {
            person : true
        }
    });
    res.json(items)
}

//Read Center Regimes
const getCenterRegimes = async(req, res) => {
    const items = await Regime.findAll({
        where : {
            center : true
        }
    });
    res.json(items)
}
//Create Regimes
const createRegime = async (req, res) => {
    Regime.create(req.body).then((result) => {
        
        res.status(200).json({ 
            regime : result,
            // token : token 
        });
        console.log('created Regime');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}

const get = async (req, res) => {
    const item = await Regime.findAndCountAll({
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
    const center = await Regime.update({where: {id: req.query.id}});
     if (center.error) {
        res.status(404).json(center.error);
    }else{
        res.json(center);
    }
}

const destroy = async (req, res) => {
    const item = await Regime.destroy({where: {id: req.query.id}});
     if (item.error) {
        res.status(404).json(item.error);
    }else{
        res.json(item);
    }
}

module.exports = {
    getRegimes,
    createRegime,
    get,    
    update,
    destroy,
    getCenterRegimes

}