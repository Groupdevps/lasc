const {Attention,SubDiagnoseList,SubDiagnose,EvolutionNote, Supply,Medicine,CupsList, HistoryPerson, User, Epicrisi }  	= require('../../models/index.js');
const {updateStatus} = require('../admission/attentions.controller.js')
const paginate      = require('../../lib/paginate.js');
const { Op }            = require("sequelize");
const medicationlist = require('../../models/medicationlist.js');
const include = [{
	model: Attention  , 
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

const getEpicrisis = async (req,res) => {
	try {
		const epicrisis = await Epicrisi.findOne({
			where: {
				AttentionId: req.body.AttentionId
			},
			include
		})

		if (epicrisis) {
			
			const doctorNotes =  await EvolutionNote.findAll({
				order: [['createdAt', 'DESC']],
				where : {
					AttentionId : epicrisis.AttentionId
				}
			});
					
			const supplies =  await Supply.findAll({
				order: [['createdAt', 'DESC']],
				where : {
					AttentionId : epicrisis.AttentionId
				}
			})
			const subDiagnoseLists =  await SubDiagnoseList.findAll({
				where : {
					AttentionId : epicrisis.AttentionId
				},
				include : [SubDiagnose]
			})

			const result =  await {
					"Epicrisi" : epicrisis,
					"EvolutionNote" : doctorNotes,
					"Supplies" : supplies,
					"Diagnoses" : subDiagnoseLists
			}
			res.status(200).json(result)
		}else {
			res.status(404).json("No se encontro epicrisis para esta atencion")
		}

			
			
		
	} catch (error) {
		res.status(404).json({"error getEpicrisis epicricis": error.message})
	}
	
}// find item

module.exports 		= {
	get : (req,res) => {
    	paginate(
    		Epicrisi,
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
    	Epicrisi.findAll({}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	Epicrisi.findOne({
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
    	Epicrisi.findOne({
    		where: {
    			AttentionId: req.body.AttentionId
    		}
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {

	        res.status(404).json({
	        	message : error.message
	        });
	    });
    },// find item

	
    create : async(req,res) => {
		try {
			const result = await Epicrisi.create(req.body).catch((error) => {
				console.log('error', error.message )
				res.status(404).json({
					message : error.message
				});
			});
			//actualiza el estado de atencion
			if (result){
				const updated = await updateStatus("ALTA MEDICA", req.body.AttentionId)
				//envia el json de respuesta que se creo correctamente

				if (updated){
					res.status(201).json('Epicrisis generada')
				}else{
					res.status(404).json('No se actualizo el estado de la atencion a alta medica')
				}
			}else{
				res.status(404).json('No se pudo generar epicrisis')
			}
		} catch (error) {
			console.log('error at create in epicrisis controller', error)
			res.status(404).json('No se pudo generar epicrisis')
		}
		
    	
    }, // create

    update : (req,res) => {
    	Epicrisi.update(req.body, {
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
    	Epicrisi.destroy({
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
	getEpicrisis
}
