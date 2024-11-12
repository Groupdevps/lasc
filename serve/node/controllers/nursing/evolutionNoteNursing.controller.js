const { EvolutionNoteNursing , ObservationNursing, Attention, User}  	= require('../../models/index.js');
const paginate      = require('../../lib/paginate.js');
const { addNotes } = require('../folder/observationNursing.controller.js');
const { where } = require('sequelize');
const include = [ {
	model: ObservationNursing,
	include : ["User"]
} , User]
const note		= {
	get : (req,res) => {
    	paginate(
    		EvolutionNoteNursing,
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

    getItems : async (req,res) => {
    	try {
			const NotesNursing = await EvolutionNoteNursing.findAndCountAll({where: {AttentionId: req.query.attention}, include})
    		res.status(200).json(NotesNursing);
		} catch (error) {
			res.status(404).json({
	        	message : error.message
	        });
		}
    }, // getItems

    getItem  : (req,res) => {
    	EvolutionNoteNursing.findOne({
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
    	EvolutionNoteNursing.findOne({
    		where: {
    			AttentionId: req.query.AttentionId
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
    	EvolutionNoteNursing.create(req.body).then(async (EvolutionNoteNursingResult) => {  
			
    		res.status(200).json(EvolutionNoteNursingResult);
	        //res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	EvolutionNoteNursing.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then(async result => {
			await addNotes(req, req.params.id, "EvolutionNoteNursingId")
			const NotesNursing =  EvolutionNoteNursing.findAndCountAll({where: {AttentionId: req.body.AttentionId}})
    		res.status(200).json(NotesNursing);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	EvolutionNoteNursing.destroy({
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
		const { size, page, order } = req.query;
		if (!size){
			sized = 30
		}else{
			sized = size
		}
	
	 
		console.log("query ", req.query);
		EvolutionNoteNursing.findAndCountAll({
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
}//note

const nursingDischarge = async (req, res) => {
	try {
		//cambiar AltaEnfermeria True
		const {AttentionId, UserId } = req.body

		const attention = await Attention.update(
			{ nursingDischarge: true },
			{ where: { id: AttentionId } }
		)
		//Crear un Nota de Evolucion automatica de alta enfermeria
		const note = {
			AttentionId: AttentionId,
			observation: "SE GENERA ALTA ENFERMERIA",
			UserId: UserId
		}

		const lastNote = await EvolutionNoteNursing.create(note)
		const NoteNursing = await EvolutionNoteNursing.findOne({where: {id: lastNote.id}, include})
		res.status(200).json(NoteNursing);
	} catch (error) {
		console.log('Error Evolution Note Nursing Controller, nursingDischarge', error.message)
		res.status(500).json("Error Al Crear Alta Enfermeria ");
	}
}//Alta de enfermeria

module.exports = {
	...note, 
	nursingDischarge
}
