const { Status}  = require('../models');
const paginate      = require('../lib/paginate.js');
const helpers   =  require ("../lib/helpers");
const { where } = require('sequelize');

//Read Status
const getItems = (req, res) => {
    Status.findAll().then(result => {
            res.json(result)
        }).catch(err => {
            res.status(404).json({"error": err.message})
        })
}

//Create Status
const create = (req, res) => {
    // console.log(req)
    Status.create(req.body).then((result) => {  
        res.status(200).json({ 
            Status : result,
        });
        console.log('created Status');
    }).catch((err) => {
        console.log('error', err )
        res.status(404).json(err.message)
    })
}
//Search by numberId
const getItem = (req, res) => {
    Status.findOne( {where: {
        id: req.body.id
    }}).then(result =>{
        res.json(result)
    }).catch(err => {
        res.status(400).json({
            "error" :  err.message
        })
    })
    
    
}
const get = (req,res) => {
    	paginate(
    		Status,
    		req.query.size || 30,
    		req.query.limit || 30,
	    	req.body.search,
	    	//req.query.order || ['DESC'],
	    	null,
    	).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
}

const update = (req, res) => {
    Status.update({
        where: {id: req.query.id
    }}).then(result => {
        res.json(result);
    }).catch (err => {
        res.status(400).json({
            "error" :  err.message
        })
    })
    
}

const destroy =  (req, res) => {
    Status.destroy({
        where: {id: req.query.id
    }}).then(result => {
        res.json(result);
    }).catch (err => {
        res.status(400).json({
            "error" :  err.message
        })
    })
}



module.exports = {
    get,
    getItems,
    getItem,
    create,
    update,
    destroy
}