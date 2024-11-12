const { City, State }  	= require('../models');
const paginate      = require('../lib/paginate.js');
const { Op } = require("sequelize");
const { attributesCity } = require('./includes.js');

module.exports 		= {
	get : (req,res) => {
    	paginate(
    		City,
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
    	City.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	City.findOne({
    		where: {
    			id: req.params.id
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
    	City.findOne({
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


	findByState: async (req, res) => {
		try {
		  // Comprobar si el parámetro es un número
		  const stateCode = req.params.state;
	  
		  if (isNaN(stateCode)) {
			throw { status: 400, message: 'El parámetro state debe ser un número' };
		  }
	  
		  // Buscar ciudades donde el code comience con el número del state antes del punto
		  const cities = await City.findAll({
			where: {
			  code: {
				[Op.like]: `${stateCode}.%` // Busca códigos que comiencen con "stateCode."
			  }
			},
			attributes: attributesCity
		  });
	  
		  // Lanzar error si no hay ciudades
		  if (!cities.length) {
			throw { status: 404, message: 'No se encontraron ciudades para el estado proporcionado' };
		  }
	  
		  // Retornar ciudades encontradas
		  res.status(200).json(cities);
	  
		} catch (error) {
		  res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' });
		}
	  },


	  
	  

    create : (req,res) => {
    	City.create(req.body).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', err.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	City.update({
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
    	City.destroy({
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
