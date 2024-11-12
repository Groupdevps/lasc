const { Gender }  = require('../models');
const helpers   =  require ("../lib/helpers");
//Read Genders
const getGenders = (req, res) => {
   Gender.findAll().then(result =>{ 
        res.json(result)
    }).catch(error => {
        res.status(404).json({ message : error.message });
    });
}
//Create Genders
const createGender = async (req, res) => {
    Gender.create(req.body).then((result) => {
        
        res.status(200).json({ 
            gender : result,
            token : token 
        });
        console.log('created gender');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}


module.exports = {
    getGenders,
    createGender

}