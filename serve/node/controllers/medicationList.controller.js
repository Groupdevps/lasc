const { MedicationList }  	= require('../models');
const paginate      = require('../lib/paginate.js');

module.exports 		= {
	

	get : async (req, res) => {
		try {
			const pageSize = parseInt(req.query.page, 10) || 1; // Página actual
			const pageLimit = parseInt(req.query.limit, 10) || 30; // Tamaño de la página
			const search = req.query.search || ''; // Texto de búsqueda
			const order = req.query.order || []; // Orden de los resultados
			searchOptions = ["atcCode",
				"description",
				"activePrinciple",
				"concentration",
				"pharmaceuticalForm",
				"clarification"]
			const paginatedResult = await paginate(
				MedicationList, 
				pageSize, 
				pageLimit, 
				search, 
				order,
				[],
				searchOptions
			);
	
			
	
			res.status(200).json(paginatedResult);
		} catch (error) {
			console.log('Error en get en CupsListController', error);
			res.status(500).json({ message: error.message });
		}
	},

    getItems : (req,res) => {
    	MedicationList.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	MedicationList.findOne({
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
    	MedicationList.findOne({
    		where: {
    			id: req.body.id
    		}
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    },// find item

    create : (req,res) => {
    	MedicationList.create(req.body).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	MedicationList.update(req.body, {
    		where: {
    			id: req.params.id
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
    	MedicationList.destroy({
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
