const {Attention,HistoryPerson,User, OrderLab, SubTreatment, SubDiagnoseList, Order , CupsList,SubDiagnose}  	= require('../../models/index.js');
const paginate      = require('../../lib/paginate.js');
const { addSubDiagnoseList } = require('../folder/subDiagnoseList.controller.js');
const { addTreatments } = require('../folder/subTreatment.controller.js');
const { addOrders} = require('./order.controller')
const include = [
	SubTreatment, {
	model: SubDiagnoseList,
	include: [SubDiagnose]
}, {
	model: Order,
	include: [CupsList]
},
{
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



const lab	= {
	get : (req,res) => {
    	paginate(
    		OrderLab,
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
    	OrderLab.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	OrderLab.findOne({
    		where: {
    			id: req.params.id
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

	findItemTotal: async (req, res) => {
		try {
			console.log('id', req.params.id);
			const result = await OrderLab.findOne({
				where: {
					id: req.params.id, //AttentionId
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
			console.error('Error al buscar orden de laboratorio en controller:', error);
			res.status(500).json({
				message: error ? error.message : "Error desconocido"
			});
		}
	},
	
	
	findItem : (req,res) => {
    	OrderLab.findOne({
    		where: {
    			AttentionId: req.body.AttentionId
    		},
			include
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(400).json({
	        	message : error.message
	        });
	    });
    },// find item

    create : (req,res) => {
    	OrderLab.create(req.body).then(async (OrderLabResult) => {  
			await addTreatments(req,OrderLabResult.id, "OrderLabId")
			await addSubDiagnoseList(req,OrderLabResult.id, "OrderLabId")
			await addOrders(req,OrderLabResult.id, "OrderLabId")
			//result with include
			req.params.id = OrderLabResult.id
			await lab.getItem(req,res)
	       //res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	OrderLab.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then(async (OrderLabResult) => { 
			console.log("OrderLabResult") 
			Promise.all([
				addTreatments(req,req.params.id, "OrderLabId"),
				addSubDiagnoseList(req,req.params.id, "OrderLabId"),
				addOrders(req,req.params.id, "OrderLabId")
				//result with include
			]).then(result => {
				console.log("get all list ", result)
				lab.getItem(req,res)
			}) 
    		//res.json(result);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	OrderLab.destroy({
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

	findItems :  (req,res) =>  {
		let sized = 0 ;
		const { size, page, order } = req.params;
		if (!size){
			sized = 30
		}else{
			sized = size
		}
	
	 
		console.log("query ", req.query);
		OrderLab.findAndCountAll({
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
}//lab

const agenda = async (req, res) => {
	try {
		const { StatusId, assignedDate, patient  } = req.params
		const where = {}
		if (StatusId){
			where.StatusId = StatusId
		}
		if(assignedDate){
			where.date = {
				[Op.gte]: assignedDate[0],
				[Op.lte]: assignedDate[1]
		    }
		}
		if(patient){
			where['$Attention.HistoryPerson.fullName$'] = patient
		}

		let sized = 0 ;
		const { size, page, order } = req.query;
		if (!size){
			sized = 30
		}else{
			sized = size
		}
		const result = await OrderLab.findAndCountAll({
			limit: size  || 30 ,
			offset: ((page - 1  ) * sized )|| 0,
			order: [['date', order || 'DESC']],
			where ,
			//fecha , estado, laboratorio, documento, nombre
			include : [{
				model: Order,
				include: [{model: CupsList, attributes: ['description']}]
			},{
				model: Attention,include: [{model : HistoryPerson, attributes: [ 'fullName', 'numberId']}]
			}]
		})
		res.status(200).json(result)
	} catch (error) {
		console.log('error in agenda orderlab controller', error)
		res.status(404).json('Error en agenda ')
	}
}
module.exports 	= {...lab, agenda}
