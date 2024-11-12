const { ClinicHistory , Observation , SubDiagnoseList}  	= require('../../models');
const paginate      = require('../../lib/paginate.js');
const { addObservations } = require('./observation.controller')
const { addSubDiagnoseList } = require('./subDiagnoseList.controller')
const include = [
	{ model: Observation , as: 'Observations'},
	{ model: SubDiagnoseList , as: 'SubDiagnoseLists', include: ['SubDiagnose']}
]
const Clinic = {
	get : (req,res) => {

		const { size, page, order } = req.query;
		ClinicHistory.findAndCountAll({
        limit: size  || 30 ,
        offset: (page * size) - 1 || 0,
        order: [[order || 'DESC']],
        include
	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    })
		
    }, // get

    getItems : (req,res) => {
    	ClinicHistory.findAll({include}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	ClinicHistory.findOne({
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
    	ClinicHistory.findOne({
    		where: {
    			AttentionId: req.body.AttentionId
    		},
			include
    	}).then((result) => {  

	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    },// find item

    create : (req,res) => {

    	ClinicHistory.create(req.body).then(async (resultClinicHistory) => {
			await addObservations(req,resultClinicHistory.id, "ClinicHistoryId")
			await addSubDiagnoseList(req,resultClinicHistory.id, "ClinicHistoryId")
			//result with include
			Clinic.findItem(req,res)
			

			// res.json(resultClinicHistory);
	    }).catch((ClinicHistoryError) => {
	        console.log('ClinicHistoryError', ClinicHistoryError )
	        res.status(404).json({
	        	message : ClinicHistoryError.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	ClinicHistory.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then(async resultClinicHistory => {
			
			await addObservations(req,req.params.id, "ClinicHistoryId")
			await addSubDiagnoseList(req,req.params.id, "ClinicHistoryId")
			//result with include
			// globalThis.findItem(req);
			//console.log(" +======================= ", Clinic)
			Clinic.findItem(req,res)

    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	ClinicHistory.destroy({
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

	findItems : (req,res) => {

		let sized = 0 ;
		const { size, page, order } = req.query;
		if (!size){
			sized = 30
		}else{
			sized = size
		}

 
    	console.log("query ", req.query);
		ClinicHistory.findAndCountAll({
			where: {
				numberId : req.body.search.numberId
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
			
		}
}

module.exports 		= Clinic;
