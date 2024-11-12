const { Relationship , TypeRelationship, Person}  = require('../../models');

const helpers   =  require ("../../lib/helpers");
const relationship = require('../../models/relationship');
const include = [Person, TypeRelationship]
//Read item
const relation = {
    getItems: async(req, res) => {
        Relationship.findAll({  
            where : {
                patient : req.body.numberId
            },
            include
        }).then(result => {
            res.json(result)
        }).catch(err => {
            res.status(404).json(err.message)
        })
    },//getItems
    
    //Create item
    create : async (req, res) => {
        try {

            const isExist = await existRelationship(req, res)
            if(isExist !== true ){
                return res.status(404).json(isExist);
            }else{
                const person = await updateOrCreatePerson(req,res)
                if (person['error updating or creating companion ']){
                    res.status(404).json(person)
                }

                else{
                    const newRelation = await Relationship.create({                                        
                        companion     : req.body.numberId,
                        PersonId    : person.id,
                        PatientId   : req.body.PatientId,
                        patient   : req.body.patient, 
                        TypeRelationshipId : req.body.TypeRelationshipId, 
                    })

                    if (newRelation){
                        req.query.id = newRelation.id
                        relation.getItem(req,res)
                    }
                }
            }//valida que no se repitan las relaciones

            
            
        } catch (error) {

            console.log("error create relationship ", error)
            res.status(404).json(error.message)
            
        }
        
        
    
    },

    
    //Search by numberId
    getItem : async(req, res) => {
        Relationship.findOne({
    		where: {
    			id: req.query.id,
    		}, 
            include
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, //getItem
    get : async (req, res) => {
        const item = await Relationship.findAndCountAll({
            limit : 30,
            order : "DESC",
        }, include);

        if (item.error) {
            res.status(404).json(item.error);
        }else{
            res.json({
                page    : 1,
                count   : item.count,
                rows    : item.rows,
            })
        }
    }, //get

    update : (req, res) => {
        Relationship.update(req.body, {where: {id: req.params.id}}).then(result => {
            Person.update(req.body,{where: {numberId: req.body.numberId}}).then(result => {
                console.log("se actualizo la persona", result)
            }).catch(err => {
                console.log("error updating person in relationtion", err.message)
            })
            res.json(result)
        }).catch(error => {
            res.status(404).json({
                "error updating relationship": error.message
            })
        })
    }, //update

    destroy : async (req, res) => {
        const item = await Relationship.destroy({where: {id: req.params.id}});
        if (item.error) {
            res.status(404).json(item.error);
        }else{
            res.json(item);
        }
    },//destroy

    
    addRelationships: (req,res) => {
        if (req.body.Relationships && req.body.Relationships.length > 0) {
            req.body.Relationships.forEach((it)=>{
                Person.findOrCreate({
                    where: {  numberId: it.numberId },
                    defaults: {
                        name : it.name,
                        lastName : it.lastName,
                        numberId : it.numberId,
                        TypeIDId : it.TypeIDId,
                        cellphone : it.cellphone,

                    }
                    
                }).then(([PersonResult]) =>{

                    Relationship.create({                                        
                        patient     : req.body.numberId,
                        PersonId    : PersonResult.id,
                        PatientId   : req.body.id,
                        companion   : PersonResult.numberId, 
                        TypeRelationshipId : it.TypeRelationshipId, 
                    }).catch(err => console.log("error create relationship ", err))
                }).catch(error3 => console.log("error create person ", error3))
            });
        }
    }

}//relation

const existRelationship  = async (req, res) => {
    try {
        const result = await Relationship.findAndCountAll({
            where : {
                companion: req.body.numberId,
                patient: req.body.patient
            }
        }) 

        if(result.count > 0){
            return {
                validation :  "Familiar existente, porfavor seleccionelo"
            }
        }
        return true
        
    } catch (error) {
        console.log('error existRelationship', error)
        res.status(404).json({error : error.message})
        
    }
}

const updateOrCreatePerson = async (req, res) => {
    try {
        const updated = await Person.update({
            name : req.body.name,
            lastName : req.body.lastName,
            numberId : req.body.numberId,
            TypeIDId : req.body.TypeIDId,
            cellphone : req.body.cellphone,
            Adult: req.body.Adult
        },{
            where: {  numberId: req.body.numberId }
        })
        //si no encontro nada que actualizar lo crea
        if(updated[0] == 0){
            const created = await Person.create({
                name : req.body.name,
                lastName : req.body.lastName,
                numberId : req.body.numberId,
                TypeIDId : req.body.TypeIDId,
                cellphone : req.body.cellphone,
                Adult: req.body.Adult
            }) 
                   
        }
        const finded = await Person.findOne({where: {numberId: req.body.numberId}})
        return finded

    } catch (error) {
        console.log("error relationship controller updateOrCreatePerson ", error)
        return {
            "error updating or creating companion ": error.message
        }
    }
}

module.exports =  relation