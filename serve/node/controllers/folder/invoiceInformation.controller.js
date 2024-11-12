const { InvoiceInformation }  	= require('../../models');
const paginate      = require('../../lib/paginate.js');
const include = []
const info 		= {
	get : (req,res) => {
    	paginate(
    		InvoiceInformation,
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
    	InvoiceInformation.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	InvoiceInformation.findOne({
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
    	InvoiceInformation.findOne({
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
    	InvoiceInformation.create(req.body).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	InvoiceInformation.update(req.body, {
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
    	InvoiceInformation.destroy({
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

	addInformation : (req, reqId, attribute, res) => {
        return new Promise((resolve,reject)=>{
        //verificar si existe la informacion
        
        
            console.log('id',reqId, "attribute ", attribute)
            if(req.body.InvoiceInformations && req.body.InvoiceInformations.length > 0){
                req.body.InvoiceInformations.forEach((it, index, len) => {
                    if(!it.id){
						it[attribute] =  reqId

                        InvoiceInformation.create(it).then(InvoiceInformationResult=> {
                            console.log("len ", len, index)
                            if((len.length - 1) == index ){
                                resolve(true);
                            }  
                        }).catch(err => {
							if((len.length - 1) == index ){

                            reject(err);
                            console.log("error InvoiceInformation", err.message)}
                        })
                    }else{
						if((len.length - 1) == index ){

                        console.log('existe id InvoiceInformation: ' ,it.id)
                        resolve(true)}
                    }
                   
                })
            }else{
                resolve(true);
            }
        })

    }//addInformation
}//info

module.exports = info
