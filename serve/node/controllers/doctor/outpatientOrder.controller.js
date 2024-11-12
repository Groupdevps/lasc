const {  Attention, HistoryPerson, User, OutpatientOrder, Order , CupsList, SubDiagnoseList, SubDiagnose}  	= require('../../models/index.js');
const paginate      = require('../../lib/paginate.js');
const { addSubDiagnoseList } = require('../folder/subDiagnoseList.controller.js');
const { addOrders } = require('./order.controller.js');
const include = [ {
	model: Order,
	include: [CupsList]
}, {
	model: SubDiagnoseList,
	include: [SubDiagnose]
},{
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
const outpatient		= {
	get : (req,res) => {
    	paginate(
    		OutpatientOrder,
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
    	OutpatientOrder.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	OutpatientOrder.findOne({
    		where: {
    			id: req.query.id
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
    	OutpatientOrder.findOne({
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

	findItemTotal: async (req, res) => {
		try {
			console.log('AttentionId ', req.body.AttentionId);
			const result = await OutpatientOrder.findOne({
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
			console.error('Error al buscar formula medica en controller:', error);
			res.status(500).json({
				message: error ? error.message : "Error desconocido"
			});
		}
	},//findItemTotal


    create : (req,res) => {
    	OutpatientOrder.create(req.body).then(async (OutpatientOrderResult) => {  
	        await addOrders(req,OutpatientOrderResult.id, "OutpatientOrderId")
			await addSubDiagnoseList(req,OutpatientOrderResult.id, "OutpatientOrderId")
			//result with include
			outpatient.findItem(req,res)
			//res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	OutpatientOrder.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then(async result => {
			await addOrders(req,req.params.id, "OutpatientOrderId")
			await addSubDiagnoseList(req,req.params.id, "OutpatientOrderId")
			//result with include
			outpatient.findItem(req,res)
    		//res.json(result);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	OutpatientOrder.destroy({
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
}// outpatient

module.exports = outpatient
