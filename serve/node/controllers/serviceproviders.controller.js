const { ServiceProvider, CurrentAdministrator }  = require('../models');
const helpers   =  require ("../lib/helpers");

const include =  [
     
   { 
        model: CurrentAdministrator , 
        as: 'assignedAdministratorId', 
        
        //include: [ {        }]
    }
]//include


//Read Serviceproviders
const getServiceProviders = async(req, res) => {
    const serviceproviders = await ServiceProvider.findAll(include);
    res.json(serviceproviders)
}
//Create Serviceproviders
const createServiceProvider = async (req, res) => {
    Serviceprovider.create(req.body).then((result) => {
        
        res.status(200).json({ 
            serviceprovider : result,
            // token : token 
        });
        console.log('created serviceprovider');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}


module.exports = {
    getServiceProviders,
    createServiceProvider

}