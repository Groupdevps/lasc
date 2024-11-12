const { SubSuply }  	= require('../../models');
const paginate      = require('../../lib/paginate.js');

module.exports 		= {
	get : (req,res) => {
    	paginate(
    		SubSuply,
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
    	SubSuply.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	SubSuply.findOne({
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
    	SubSuply.findOne({
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
    	SubSuply.create(req.body).then((result) => {  
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
       

    	SubSuply.update(req.body, {
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
    	SubSuply.destroy({
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


    addSubSuply : (req, reqId, attribute, res) => {
        return new Promise((resolve,reject)=>{
        //verificar si existe la observacion
        
        
        console.log('id',reqId, "attribute ", attribute)
            if(req.body.SubSuplies && req.body.SubSuplies.length > 0){
                req.body.SubSuplies.forEach((it, index, len) => {
                    if(!it.id){
                        
						it[attribute]= reqId
                        SubSuply.create(it).then(result=> {
                            console.log("len ", len, index)
                            if((len.length - 1) == index ){
                                resolve(true);
                            }  
                        }).catch(err => {
							if((len.length - 1) == index ){

                            reject(err);
							
                            console.log("error SubSuply", err.message)}
                        })
                    }else{
						if((len.length - 1) == index ){

						console.log('existe id : ' ,it.id)
                        resolve(true)}
                    }
                   
                })
            }else{
                resolve(true);
            }
        })

    }//addSubSuplys
}
