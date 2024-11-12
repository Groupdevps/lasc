const { ProfilePosition }  	= require('../models');
const paginate      = require('../lib/paginate.js');

module.exports 		= {
	get : (req,res) => {
    	paginate(
    		ProfilePosition,
    		req.query.size || 30,
    		req.query.limit || 30,
	    	req.body.search,
	    	req.query.order || ['DESC'],
	    	null,
    	).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // get

    getItems : (req,res) => {
    	ProfilePosition.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	ProfilePosition.findOne({
    		where: {
    			id: req.query.id
    		}
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItem

    findItem : (req,res) => {
    	ProfilePosition.findOne({
    		where: {
    			id: req.body.id
    		},
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    },// find item

    create : (req,res) => {
    	ProfilePosition.create(req.body).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	ProfilePosition.update({
    		where: {
    			id: req.query.id
    		}
    	}).then(result => {
    		res.json(result);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	ProfilePosition.destroy({
    		where: {
    			id: req.query.id
    		}
    	}).then(result => {
    		res.json(result);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // destroy
}
