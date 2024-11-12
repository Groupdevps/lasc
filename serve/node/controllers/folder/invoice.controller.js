const { Invoice , HistoryPerson, InvoiceInformation, AddedMedication, SubTariffManual}  	= require('../../models');
const paginate      = require('../../lib/paginate.js');
const { addInformation } = require('./invoiceInformation.controller');
const { addMedication } = require('./addedMedication.controller');
const { addTariff } = require('./subTariffManual.controller');
const include = [ HistoryPerson, InvoiceInformation, AddedMedication, SubTariffManual]

const inv		= {
	get : (req,res) => {
    	paginate(
    		Invoice,
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
    	Invoice.findAll({include}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	Invoice.findOne({
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
    	Invoice.findOne({
    		where: {
    			AttentionId: req.body.AttentionId
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
		HistoryPerson.create(req.body).then(async HistoryPersonResult => {
			 req.body.HistoryPersonId = HistoryPersonResult.id
			await Invoice.create(req.body).then(async InvoiceResult => {
				await addInformation(req,InvoiceResult.id, "InvoiceId")
				await addMedication(req,InvoiceResult.id, "InvoiceId")
				await a
				ddTariff(req,InvoiceResult.id, "InvoiceId")
				//result with include
				inv.findItem(req,res)
				//res.status(200).json(EmergencyMedicalHistoryResult);   
			}).catch((error) => {
				res.status(404).json({
					'error Invoice': error.message
				})
				
			})
    	
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	Invoice.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then(async InvoiceResult => {
			await addInformation(req,req.params.id, "InvoiceId")
			await addMedication(req,req.params.id, "InvoiceId")
			await addTariff(req,req.params.id, "InvoiceId")
			
			await HistoryPerson.update({
				where:{
					id: req.body.HistoryPersonId
				},
				
				
			}).catch(error => console.log("error update historyPerson in update Invoice", error))
			inv.getItem(req,res)
    		//res.json(result);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	Invoice.destroy({
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
}//inv

module.exports = inv
