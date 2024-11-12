const { SubDiagnoseList, SubDiagnose }  	= require('../../models');
const paginate      = require('../../lib/paginate.js');
const include = [ SubDiagnose ]
module.exports 		= {
	get : (req,res) => {
    	paginate(
    		SubDiagnoseList,
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
    	SubDiagnoseList.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	SubDiagnoseList.findOne({
    		where: {
    			id: req.query.id
    		},include
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItem

    findItem : (req,res) => {
    	SubDiagnoseList.findOne({
    		where: {
    			id: req.body.AttentionId
    		},include
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    },// find item

    create : (req,res) => {
    	SubDiagnoseList.create(req.body).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create
    


    update : (req,res) => {
        let nameForm = ""

        if (req.body.nameForm == 'clinic_history'){
            nameForm = 'ClinicHistoryId'
        }
        if (req.body.nameForm == 'medical_order'){
            nameForm = 'MedicalOrderId'
        }
        if (req.body.nameForm == 'emergency_medical_history'){
            nameForm = 'EmergencyMedicalHistoryId'
        }
        if (req.body.nameForm == 'medical_formulas'){
            nameForm = 'MedicalFormulaId'
        }
        if (req.body.nameForm == 'diagnostic_help'){
            nameForm = 'DiagnosticAid'
        }

    	SubDiagnoseList.update({
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
    	SubDiagnoseList.destroy({
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

    addSubDiagnoseList: (req, reqId, attribute,res) => {
        return new Promise((resolve,reject)=>{

        
        //llega array de diagnosticos
            if (req.body.SubDiagnoseLists && req.body.SubDiagnoseLists.length > 0) {
                req.body.SubDiagnoseLists.forEach((it, index, len)=>{
                    //encuentra o crea el disgnostico
                    SubDiagnose.findOrCreate({
                        where: {  code: it.code },
                        defaults: {
                            name : it.diagnosis,
                            code : it.code

                        }
                        
                    }).then(([resultSubDiagnose, created]) => {
                            console.log('resultSubDiagnose created', resultSubDiagnose.id)

                            SubDiagnoseListItem = {
                                AttentionId: req.body.AttentionId,
                                SubDiagnoseId: resultSubDiagnose.id,
                                [attribute]: reqId
                                
                            }

                            console.log ('SubDiagnoseListItem', SubDiagnoseListItem)
                            //encuentra o crea la relacion
                            
                            SubDiagnoseList.findOrCreate({
                                where : {
                                    AttentionId: req.body.AttentionId,
                                    SubDiagnoseId: resultSubDiagnose.id,
                                },
                                defaults: {
                                    AttentionId: req.body.AttentionId,
                                    SubDiagnoseId: resultSubDiagnose.id,
                                    [attribute]: reqId,
									repeated: it.repeated,
                                    date: it.date


                                }
                            }).then(([SubDiagnoseListResult]) => {
                                //en caso de encontrar la relacion la actualiza con el id
                                console.log('SubDiagnoseListResult', SubDiagnoseListResult)
                                SubDiagnoseList.update({
                                    [attribute]: reqId,
									repeated: it.repeated
                                }, {
                                    where: {
                                        id: SubDiagnoseListResult.id
                                    }
                                }).then(result=>{
                                    console.log("return promise ", len.length - 1, " ==" , index)
                                    if((len.length - 1) == index){
                                        resolve(true);
                                    }
                                }).catch(errr => reject(errr))
                            }).catch(err => {
                                console.log('error SubDiagnoseList', err)
                                reject(err)
                            })

                            
                    }).catch((err) => {
                        reject(err);
                        console.log("error", err.message)
                    })
                });
            }else{
                resolve(true)
            }
        })
    } //addSubDiagnoseList
    ,
    findItems :  (req,res) =>  {
		let sized = 0 ;
		const { size, page, order } = req.query;
		if (!size){
			sized = 30
		}else{
			sized = size
		}
	
	 
		console.log("query ", req.query);
		SubDiagnoseList.findAndCountAll({
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
