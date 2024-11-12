const { TypeCenter }  = require('../models');
const helpers   =  require ("../lib/helpers");
//Read TypeCenters
const getTypeCenters = async(req, res) => {
    const typeCenters = await TypeCenter.findAll();
    res.json(typeCenters)
}
//Create TypeCenters
const createTypeCenter = async (req, res) => {
    TypeCenter.create(req.body).then((result) => {
        
        res.status(200).json({ 
            TypeCenter : result,
            token : token 
        });
        console.log('created TypeCenter');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}


module.exports = {
    getTypeCenters,
    createTypeCenter

}