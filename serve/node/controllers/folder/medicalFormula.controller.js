const { Attention, HistoryPerson, User, MedicalFormula, SubDiagnoseList, Medicine }  	= require('../../models');
const paginate      = require('../../lib/paginate.js');
const { addSubDiagnoseList } = require('./subDiagnoseList.controller');
const { addTreatments } = require('./subTreatment.controller');
const { addMedicines } = require('../doctor/medicine.controller.js')
const include = [ {
	model: SubDiagnoseList,
	include: ['SubDiagnose']
}, {
	model: Medicine,
	include: ['MedicationList']
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


const formula 		= {
	get : (req,res) => {
    	paginate(
    		MedicalFormula,
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
    	MedicalFormula.findAll({include}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	MedicalFormula.findOne({
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

    findItem : (req,res) => {
    	MedicalFormula.findOne({
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
			const {id} = req.params
			const result = await MedicalFormula.findOne({
				where: {
					id: id
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
    	MedicalFormula.create(req.body).then(async (MedicalFormulaResult) => {  
			//await addTreatments(req,MedicalFormulaResult.id, "MedicalFormulaId")
			await addSubDiagnoseList(req,MedicalFormulaResult.id, "MedicalFormulaId")
			await addMedicines(req,MedicalFormulaResult.id, "MedicalFormulaId")
			//result with include
			formula.findItem(req,res)
	        //res.status(200).json(MedicalFormulaResult);        
	    }).catch((error) => {
	        console.log('error create formula medica', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	MedicalFormula.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then(async MedicalFormulaResult => {
			//await addTreatments(req,req.params.id, "MedicalFormulaId")
			await addSubDiagnoseList(req,req.params.id, "MedicalFormulaId")
			await addMedicines(req,req.params.id, "MedicalFormulaId")
			//result with include
			req.query.id = req.params.id
			formula.getItem(req,res)
    		//res.json(result);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	MedicalFormula.destroy({
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
}//formula

module.exports = formula
