const { User, Triage , HistoryPerson, HistoryInfoMedicPerson, Attention }  	= require('../../models/index.js');
const paginate      = require('../../lib/paginate.js');
const historyinfomedicperson = require('../../models/historyinfomedicperson.js');
const { updateMedic } = require('../folder/historicMedicInfoPerson.controller.js');
const { updateStatus } = require('../admission/attentions.controller.js')
const attention = require('../../controllers/admission/attentions.controller.js');
const include = [
	User, Attention,HistoryPerson,HistoryInfoMedicPerson
]
const triage 		= {
	get : (req,res) => {
    	paginate(
    		Triage,
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
    	Triage.findAll({
			include
		}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	Triage.findOne({
    		where: {
    			id : req.params.id
    		},
			include
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItem

    findItem : (req,res) => {
    	Triage.findOne({
    		where: {
    			AttentionId: req.body.AttentionId
    		},
			include
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error
	        });
	    });
    },// find item

    
	create: async (req, res) => {
		console.log("create ", req.body);
		
		if (!req.body.LevelTriageId) {
			return res.status(400).json({
				message: "Nivel de Triage es requerido"
			});
		}
	
		try {
			const historyInfoMedicPerson = await HistoryInfoMedicPerson.create(req.body);
			req.body.HistoryInfoMedicPersonId = historyInfoMedicPerson.id;
	
			try {
				const resultTriage = await Triage.create(req.body);
				console.log("resultTriage.AttentionId", resultTriage.AttentionId);
				
				const body = {
					TriageId: resultTriage.id
				};
	
				const statusTriage = await updateStatus("TRIAGE", resultTriage.AttentionId);
				console.log("statusTriage", statusTriage);
				
				if (statusTriage.message) {
					res.status(200).json({
						statusTriage,
						Triage: resultTriage
					});
				} else {
					res.status(404).json(statusTriage);
				}
			} catch (error) {
				res.status(404).json({
					'error Triage': error.message
				});
			}
		} catch (err) {
			res.status(404).json({
				'error HistoryInfoMedicPerson': err.message
			});
		}
	}, // create
	

    update : (req,res) => {
    	Triage.update(req.body,{
    		where: {
    			id: req.params.id
    		}
    	}).then(async result => {
			await updateMedic(req,res).catch(error => {
				console.log(error)
			})
			await triage.getItem(req,res)
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	Triage.destroy({
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

module.exports  = triage
