const { SubTreatment, CupsList }  	= require('../../models');
const paginate      = require('../../lib/paginate.js');
const include = [CupsList]
module.exports 		= {
	get : (req,res) => {
    	paginate(
    		SubTreatment,
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
    	SubTreatment.findAll({},  include).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	SubTreatment.findOne({
    		where: {
    			id: req.query.id
    		}, include
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItem

    findItem : (req,res) => {
    	SubTreatment.findOne({
    		where: {
    			id: req.body.AttentionId
    		}, include
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    },// find item

    create : (req,res) => {
    	SubTreatment.create(req.body).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	SubTreatment.update(req.body, {
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
    	SubTreatment.destroy({
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

	addTreatments : (req, reqId, attribute, res) => {
        return new Promise((resolve,reject)=>{
        //verificar si existe la observacion
        
        
        console.log('id',reqId, "attribute ", attribute)
            if(req.body.SubTreatments && req.body.SubTreatments.length > 0){
                req.body.SubTreatments.forEach((it, index, len) => {
                    if(!it.id){
                        it[attribute]= reqId
						it.AttentionId = req.body.AttentionId
                        SubTreatment.create(it).then(SubTreatmentResult=> {
                            console.log("len ", len, index)
                            if((len.length - 1) == index ){
                                resolve(true);
                            }  
                        }).catch(err => {
							if((len.length - 1) == index ){

                            reject(err);
                            console.log("error SubTreatment", err.message)}
                        })
                    }else{
						if((len.length - 1) == index ){

                        resolve(true)
						console.log('SubTreatment existe id : ' ,it.id)}
                    }
                   
                })
            }else{
                resolve(true);
            }
        })

    },//addSubtreatment

	findItems :  (req,res) =>  {
		let sized = 0 ;
		const { size, page, order } = req.query;
		if (!size){
			sized = 30
		}else{
			sized = size
		}
	
	 
		console.log("query ", req.query);
		SubTreatment.findAndCountAll({
			where: {
				AttentionId: req.body.AttentionId
			},
			limit: size  || 30 ,
			offset: ((page - 1  ) * sized )|| 0,
			order: [['createdAt', order || 'DESC']],
			include
			}).then(result => {
				res.json(result)
			}).catch(err => {
				res.status(404).json({"error": err.message})
			})
	}//findItems

	
}
