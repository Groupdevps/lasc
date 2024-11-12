const { TariffManual, sequelize  }  	= require('../../models/index.js');
const paginate      = require('../../lib/paginate.js');
const { Op } = require('sequelize');
const { attributesTariffSoat } = require('../includes.js');

module.exports 		= {

	get : async (req, res) => {
		try {
			const pageSize = parseInt(req.query.page, 10) || 1; // Página actual
			const pageLimit = parseInt(req.query.limit, 10) || 30; // Tamaño de la página
			const search = req.query.search || ''; // Texto de búsqueda
			const order = req.query.order || []; // Orden de los resultados

			// Configurar búsqueda en múltiples columnas
			const searchOptions = ['code', 'description']
	
			const paginatedResult = await paginate(
				TariffManual,
				pageSize,
				pageLimit,
				search,
				order,
				attributesTariffSoat,
				searchOptions,

			);
	
			// Formatear los resultados como solicitas
			const formattedResults = paginatedResult.rows.map(soat => ({
				code: soat.code || "",
				description: soat.description || "",
				value: soat.pesos || 0
			}));
	
			res.status(200).json({
				...paginatedResult,
				rows: formattedResults
			});
		} catch (error) {
			res.status(500).json({
				message: error.message
			});
		}
	}, // get

    getItems : async (req,res) => {
    	await TariffManual.findAll({ }).then(async (result) => { 
			
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	TariffManual.findOne({
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
    	TariffManual.findOne({
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
    	TariffManual.create(req.body).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	TariffManual.update(req.body, {
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
    	TariffManual.destroy({
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
