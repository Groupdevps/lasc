const { Supply , QxCode, SuppliesOtherService, SubDiagnosticImaging}  	= require('../../models');
const paginate      = require('../../lib/paginate.js');
const { addOtherService } = require('./suppliesOtherServices.controller');
const { addSubSuply } = require('./subsupply.controller');
const { addImaging } = require('./subDiagnosticImaging.controller');
const { addQxCode } = require('./qxCode.controller');
const include = [
	QxCode, SuppliesOtherService, SubDiagnosticImaging
]
const sup = {
	get : (req,res) => {

		const { size, page, order } = req.query;
		Supply.findAndCountAll({
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
    	Supply.findAll({include}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	Supply.findOne({
    		where: {
    			id: req.params.id
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
    	Supply.findOne({
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

    	Supply.create(req.body).then(async (resultSupply) => {
			await addOtherService(req,resultSupply.id, "SupplyId")
			await addSubSuply(req,resultSupply.id, "SupplyId")
			await addQxCode(req,resultSupply.id, "SupplyId")
			await addImaging(req,resultSupply.id, "SupplyId")
			//result with include
			sup.findItem(req,res)
			

			// res.json(resultSupply);
	    }).catch((SupplyError) => {
	        console.log('SupplyError', SupplyError )
	        res.status(404).json({
	        	message : SupplyError.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	Supply.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then(async resultSupply => {
			
			await addOtherService(req,req.params.id, "SupplyId")
			await addSubSuply(req,req.params.id, "SupplyId")
			await addQxCode(req,req.params.id, "SupplyId")
			await addImaging(req,req.params.id, "SupplyId")
			//result with include
			// globalThis.findItem(req);
			//console.log(" +======================= ", sup)
			sup.getItem(req,res)

    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	Supply.destroy({
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

module.exports 		= sup;
