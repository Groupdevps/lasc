const { MedicalOrder, SubDiagnoseList, Order, SubDiagnose }  	= require('../../models/index.js');
const paginate      = require('../../lib/paginate.js');
const { addOrders } = require('./order.controller');
const { addSubDiagnoseList } = require('../folder/subDiagnoseList.controller.js');

const OrderModel = {
	get : (req,res) => {
    	paginate(
    		MedicalOrder,
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
    	MedicalOrder.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	MedicalOrder.findOne({
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
    	MedicalOrder.findOne({
    		where: {
    			AttentionId: req.body.AttentionId
    		},
			include: [
				{ model: Order , as: 'Orders'},
				{ model: SubDiagnoseList , as: 'SubDiagnoseLists', include: ['SubDiagnose']}
			]
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    },// find item

    create : (req,res) => {
    	MedicalOrder.create(req.body).then( async (resultMedicalOrder) => {  
            await addOrders(req,resultMedicalOrder.id, "MedicalOrderId")
			await addSubDiagnoseList(req,resultMedicalOrder.id, "MedicalOrderId")
			//result with include
			OrderModel.findItem(req,res)
	        //res.status(200).json(resultMedicalOrder);        
	    }).catch((error) => {
	        console.log('error MedicalOrder', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	MedicalOrder.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then(async resultMedicalOrder => {
			
			await addOrders(req,req.params.id, "MedicalOrderId")
			await addSubDiagnoseList(req,req.params.id, "MedicalOrderId")
			//result with include
			
			OrderModel.findItem(req,res)
    		//res.json(resultMedicalOrder);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	MedicalOrder.destroy({
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
}//OrderModel


module.exports 		= OrderModel;
