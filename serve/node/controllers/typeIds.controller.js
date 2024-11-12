const { TypeID }  = require('../models');
const helpers   =  require ("../lib/helpers");
//Read Typeids
const getTypeids = (req, res) => {
    TypeID.findAll().then(result =>{
        res.json(result)
    }).catch(error => {
        res.status(404).json({ message : error.message });
    });
}
//Create Typeids
const createTypeid = async (req, res) => {
    TypeID.create(req.body).then((result) => {
        
        res.status(200).json({ 
            typeid : result,
            token : token 
        });
        console.log('created TypeID');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}


module.exports = {
    getTypeids,
    createTypeid

}