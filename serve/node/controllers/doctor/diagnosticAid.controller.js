const { Attention, HistoryPerson, User, DiagnosticAid, SubTreatment,SubDiagnoseList,SubDiagnose,CupsList, Order}  	= require('../../models/index.js');
const paginate      = require('../../lib/paginate.js');
const { addSubDiagnoseList } = require('../folder/subDiagnoseList.controller.js');
const { addTreatments } = require('../folder/subTreatment.controller.js');
const { addOrders} = require('./order.controller')
const include = [{
	model: SubTreatment,
	include: [CupsList]
}, {
	model: SubDiagnoseList,
	include: [SubDiagnose]
}, Order, {
	model: Attention,
	include: [
		'Center',  'TypeService', 'Status', 'User', 'Triage',
		{
			model : HistoryPerson,
			include: [ 'Companion', 'TypeID', 'Gender']
		   
		},
		{ 
			model: User , 
			as: 'Doctor'
		}]
}]
const diagnostic	= {
	get : (req,res) => {
    	paginate(
    		DiagnosticAid,
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
    	DiagnosticAid.findAll({include}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	DiagnosticAid.findOne({
    		where: {
    			id: req.params.id
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
    	DiagnosticAid.findOne({
    		where: {
    			AttentionId: req.body.AttentionId
    		}, include
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    },// find item
	findItemTotal: async (req, res) => {
		try {
			console.log('AttentionId ', req.body.AttentionId);
			const result = await DiagnosticAid.findOne({
				where: {
					AttentionId: req.body.AttentionId
				},
				include
			});
	
			if (result) {
				return result;  // Devolver result en lugar de responder directamente
			} else {
				res.status(404).json({
					message: 'No se encontró ningún resultado.'
				});
			}
		} catch (error) {
			console.error('Error al buscar diagnostic aid en controller:', error);
			res.status(500).json({
				message: error ? error.message : "Error desconocido"
			});
		}
	},//findItemTotal
	

    create : (req,res) => {
    	DiagnosticAid.create(req.body).then(async (DiagnosticAidResult) => {  
			await addTreatments(req,DiagnosticAidResult.id, "DiagnosticAidId")
			await addSubDiagnoseList(req,DiagnosticAidResult.id, "DiagnosticAidId")
			await addOrders(req,DiagnosticAidResult.id, "DiagnosticAidId")
			//result with include
			diagnostic.findItem(req,res)
	       //res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	DiagnosticAid.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then(async (DiagnosticAidResult) => {  
			await addTreatments(req,req.params.id, "DiagnosticAidId")
			await addSubDiagnoseList(req,req.params.id, "DiagnosticAidId")
			await addOrders(req,req.params.id, "DiagnosticAidId")
			//result with include
			diagnostic.findItem(req,res)
	       //res.json(result);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	DiagnosticAid.destroy({
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
}//diagnostic

module.exports 	= diagnostic
