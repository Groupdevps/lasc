const { EvolutionNote , ObservationEvolutionNote,User, Role, sequelize, Status , Attention}  	= require('../../models');
const paginate      = require('../../lib/paginate.js');
const { addNotes } = require('./observationEvolutionNote.controller');
const { addSubDiagnoseList } = require('./subDiagnoseList.controller');
const include = [ {
	model: ObservationEvolutionNote,
	include : ["User"]
}, User]
const note		= {
	get : (req,res) => {
    	paginate(
    		EvolutionNote,
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
    	EvolutionNote.findAll({include}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	EvolutionNote.findOne({
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
    	EvolutionNote.findOne({
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
    	EvolutionNote.create(req.body).then(async (EvolutionNoteResult) => {  
			await addSubDiagnoseList(req,EvolutionNoteResult.id, "EvolutionNoteId")
			
			await addNotes(req, EvolutionNoteResult.id, "EvolutionNoteId")
			
			note.findItem(req,res)
	        //res.status(200).json(result);        
	    }).catch((error) => {
	        console.log('error', error.message )
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // create

    update : (req,res) => {
    	EvolutionNote.update(req.body, {
    		where: {
    			id: req.params.id
    		}
    	}).then( result => {

			Promise.all( [
				addSubDiagnoseList(req,req.params.id, "EvolutionNoteId"),
				addNotes(req, req.params.id, "EvolutionNoteId"),
				
			]).then (result => note.findItem(req,res)).catch(err => console.log(err))
			
    		//res.json(result);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	EvolutionNote.destroy({
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

	findItems :  (req,res) =>  {
		let sized = 0 ;
		const { size, page, order } = req.query;
		if (!size){
			sized = 30
		}else{
			sized = size
		}
	
	 
		console.log("query ", req.query);
		EvolutionNote.findAndCountAll({
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
const medicalDischarge = async (req, res) => {
    const transaction = await sequelize.transaction(); 
    try {
        const { AttentionId, UserId, date, hour } = req.body;

        //buscarr status altamedica
        const medicalDischargeStatus = await Status.findOne(
            { where: { name: "ALTA MEDICA" } },
            { transaction }
        );

		//actualiza el status de la atencion
        const updatedStatusAttention = await Attention.update(
            { StatusId: medicalDischargeStatus.id },
            { where: { id: AttentionId }, transaction }
        );

        // buscar nombre y cargo del usuario que genera la alta
        const user = await User.findOne(
            { where: { id: UserId }, include: {model: Role, as:'Role'}, transaction }
        );

        // mensaje automatico :)
        const observation = `**Alta médica generada por el ${user.Role.name} ${user.name}.**  
        *Esta nota ha sido creada automáticamente por nuestro sistema.*`;

        // se crea la nota automatica :)
        await EvolutionNote.create(
            { AttentionId, UserId, observation, date, hour },
            { transaction }
        );

        await transaction.commit();

        res.status(200).json({ message: "Alta médica generada", data: updatedStatusAttention });

    } catch (error) {
        // Si hay algún error, se revierte la transacción
        await transaction.rollback();
        console.log("Error en medicalDischarge en status controller:", error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {...note, medicalDischarge}
