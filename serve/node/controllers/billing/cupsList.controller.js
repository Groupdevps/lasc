const { CupsList }  	= require('../../models/index.js');
const paginate      = require('../../lib/paginate.js');
const { attributesCupsList, attributesCupsListSearch  } = require('../includes.js');

module.exports 		= {
	get : async (req, res) => {
		try {
			const pageSize = parseInt(req.query.page, 10) || 1; // Página actual
			const pageLimit = parseInt(req.query.limit, 10) || 30; // Tamaño de la página
			const search = req.query.search || ''; // Texto de búsqueda
			const order = req.query.order || []; // Orden de los resultados
			searchOptions = ["code", "description"]
			const paginatedResult = await paginate(
				CupsList, 
				pageSize, 
				pageLimit, 
				search, 
				order,
				searchOptions
			);
	
			// Formatear los resultados como solicitas
			const formattedResults = paginatedResult.rows.map(cup => ({
				code: cup.code || "",
				description: cup.description || "",
				id: cup.id || "",
			}));
	
			res.status(200).json({
				...paginatedResult,
				rows: formattedResults
			});
		} catch (error) {
			console.log('Error en get en CupsListController', error);
			res.status(500).json({ message: error.message });
		}
	},
	

    getItems : (req,res) => {
    	CupsList.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
		const { id} = req.params
    	CupsList.findByPk(id).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItem

    findItem : (req,res) => {
    	CupsList.findOne({
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
	findCode : (req,res) => {
    	CupsList.findOne({
    		where: {
    			code: req.body.code
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
    	CupsList.create(req.body).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    //update es solo para eliminar
    update : (req,res) => {
        let nameForm = ""

        if (req.body.nameForm == 'clinic_history'){
            nameForm = 'ClinicHistoryId'
        }
       

    	CupsList.update({
            [nameForm]: null
        }, {
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
    	CupsList.destroy({
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
    }, // destroy


    addCupsLists : (req, reqId, attribute, res) => {
        return new Promise((resolve,reject)=>{
        //verificar si existe la observacion
        
        
        console.log('id',reqId, "attribute ", attribute)
            if(req.body.CupsLists && req.body.CupsLists.length > 0){
                req.body.CupsLists.forEach((it, index, len) => {
                    if(!it.id){
                        console.log('existe id : ' ,it.id)
                        CupsList.create({
                            observation: it.observation,
                            [attribute]: reqId
                        }).then(result=> {
                            console.log("len ", len, index)
                            if((len.length - 1) == index ){
                                resolve(true);
                            }  
                        }).catch(err => {
                            reject(err);
                            console.log("error CupsList", err.message)
                        })
                    }else{
                        resolve(true)
                    }
                   
                })
            }else{
                resolve(true);
            }
        })

    }//addCupsLists
}
