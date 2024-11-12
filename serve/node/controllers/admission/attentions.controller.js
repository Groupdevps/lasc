const {sequelize, Attention, User,Triage, TypeService, Relationship, CurrentAdministrator, ServiceProvider , Person , HistoryPerson ,Status}  = require('../../models/index.js');
const { Op }            = require("sequelize");
const paginate      = require('../../lib/paginate.js');
const helpers   =  require ("../../lib/helpers.js");
// const currentAdministrator = require('../models/currentAdministrator');
const { thereIsAdult } = require('./validations.controller.js')
const moment = require('moment');

const { saveHistoryPerson } = require('./historyPerson.controller.js');
const { includeAttention, attributesAttention, includeAttentionById } = require('../includes.js');

// Función para generar el attentionCode
// Función para generar el attentionCode
async function generateAttentionCode(typeServiceId) {
    try {
      console.log('Generating attention code...');
  
      // Obtener el tipo de servicio dinámicamente
      const serviceType = await TypeService.findOne({
        where: { id: typeServiceId },
        attributes: ['code']
      });
  
      const typeServiceCode = serviceType ? serviceType.code : 'ATEN';
      console.log(`Type service code: ${typeServiceCode}`);
  
      // Obtener el último código de atención
      const lastAttention = await Attention.findOne({
        order: [['createdAt', 'DESC']],
        attributes: ['attentionCode', 'id']
      });
  
      let lastNumber = 0;
  
      if (lastAttention) {
        if (lastAttention.attentionCode) {
          const parts = lastAttention.attentionCode.split('-');
          lastNumber = parseInt(parts[2], 10);
        } else {
          lastNumber = lastAttention.id;
        }
      }
  
      console.log(`Last number: ${lastNumber}`);
  
      // Generar el siguiente número secuencial
      const nextNumber = lastNumber + 1;
      const paddedNumber = nextNumber.toString().padStart(6, '0');
  
      // Obtener el año actual
      const year = moment().format('YY');
  
      // Construir el código de atención
      const attentionCode = `${year}-${typeServiceCode}-${paddedNumber}`;
  
      console.log(`Generated attentionCode: ${attentionCode}`);
      return attentionCode;
    } catch (error) {
      console.error('Error generating attentionCode:', error);
      throw error;
    }
  }
  
//Read Attention
const getItems = (req, res) => {
    let sized = 0 ;
    const { size, page, order } = req.query;
    if (!size){
        sized = 30
    }else{
        sized = size
    }
    //orderAttribute ||
 
    Attention.findAndCountAll({
        limit: size  || 30 ,
        offset: ((page - 1  ) * sized )|| 0,
        order: [[ 'assignedDate' , order || 'DESC']],
        include: includeAttention
        }).then(result => {
            res.json(result)
        }).catch(err => {
            res.status(404).json({"error": err.message})
        })
}

const findItems = (req, res)=>{
    let where = {}
    
     const { patient, assignedDate, StatusId, TriageId } = req.body;
     if(patient){
        where.patient = patient
     }
     if(assignedDate){
        where.assignedDate = {
            [Op.gte]: assignedDate[0],
            [Op.lte]: assignedDate[1]
       }
     }
     if(StatusId){
        where.StatusId = StatusId
     }
     if (TriageId) {
        where['$Triage.LevelTriage.id$'] = TriageId; // Filtrar por el ID de LevelTriage
    }
     let sized = 0 ;
     const { size, page, order } = req.query;
        if (!size){
        sized = 30
     }else{
        sized = size
     }
    Attention.findAndCountAll({
        limit: size  || 30 ,
        offset: ((page - 1  ) * sized )|| 0,
        order: [['assignedDate', order || 'DESC']],
        where ,
        attributes: attributesAttention,
        include: includeAttention
        }).then(result => {
            res.json(result)
        }).catch(err => {
            res.status(404).json({"error": err.message})
        })
} // findItems


//Create Attention
const create = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { PersonId, companion } = req.body;

        // Validar si existe una atención activa
        await noCurrentAtention(req.body.patient, transaction);

        // Verifica si es Adulto o tiene un acompañante adulto
        const resultThereIsAdult = await thereIsAdult(req.body);

        if (!resultThereIsAdult) {
            throw new Error('Es necesario un Adulto o Acompañante Adulto');
        }

        // Guarda la persona en la historia
        const resultHistoryPersonId = await saveHistoryPerson(PersonId, companion, transaction);

        if (!resultHistoryPersonId) {
            throw new Error('No se logró guardar los datos requeridos para la creación del servicio');
        }

        // Asigna el ID de HistoryPerson al cuerpo de la solicitud
        req.body.HistoryPersonId = resultHistoryPersonId;
        //buscar el tipo de servicio
        const serviceType = await TypeService.findOne({
            where: { name: req.body.TypeService },
            attributes: ['id']
          });
          //buscar el estado

          req.body.TypeServiceId = serviceType.id
        //buscar el tipo de servicio
         const status = await Status.findOne({
            where: { name: req.body.Status },
            attributes: ['id']
          });

          req.body.StatusId = status.id
        const attentionCode = await generateAttentionCode(req.body.TypeServiceId);
         // Crea la atención
        const result = await Attention.create({
            ...req.body,
            attentionCode: attentionCode
        }, { transaction });

        if (result) {
            await transaction.commit();
            return res.status(200).json({ Attention: result });
        } else {
            throw new Error('La atención no fue creada');
        }
    } catch (error) {
        await transaction.rollback();
        console.log('Error in create attention:', error);
        return res.status(404).json({ message: error.message });
    }
};


//Search by numberId
const getItem = (req, res) => {
    
    Attention.findOne( {where: {
        id: req.params.id
    },
    include: includeAttentionById

}).then((attention) => {
        
        res.json(attention).status(200)
    }).catch(error => {
        res.json({message: error.message}).status(400)

    }) 
    
}
const get = (req,res) => {
    	paginate(
    		Attention,
    		req.query.size || 30,
    		req.query.limit || 30,
	    	req.body.search,
	    	//req.query.order || ['DESC'],
	    	null,
    	).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
}



const update =  (req, res) => {
    Attention.update(req.body,{
            where: {id: req.params.id}
        }).then((result) => {  
            res.status(200).json({ 
                Attention : result,
            });
            console.log('updated Attention');
        }).catch((err) => {
            console.log('error', err.message )
            res.status(404).json(err.message)
        })
        
        
}

const destroy = async (req, res) => {
    const attention = await Attention.destroy({where: {id: req.query.id}});
     if (attention.error) {
        res.status(404).json(attention.error);
    }else{
        res.json(attention);
    }
}


const noCurrentAtention = async (patient, transaction) => {
    try {
        const lastAttention = await Attention.findOne({
            where: {
                patient: patient,
                Active: true
            },
            include: {
                model: TypeService,
                where: {
                    name: {
                        [Op.or]: ["URGENCIA", "HOSPITALIZACION"]
                    }
                }
            },
            order: [['createdAt', 'DESC']], 
            transaction  
        });

        if (lastAttention) {
            const activeTypeName = lastAttention.TypeService.name;

            if (activeTypeName === "URGENCIA") {
                throw new Error("Paciente ya cuenta con un servicio de urgencia activo.");
            } else if (activeTypeName === "HOSPITALIZACION") {
                throw new Error("Paciente ya cuenta con un servicio de hospitalización activo.");
            }
        }

        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};




const updateStatus = async (newStatus, AttentionId) => {
    try {
      const result = await Status.findOne({
        where: { name: newStatus }
      });
      if (result) {
        const [updated] = await Attention.update(
          {
            StatusId: result.id,
            stateString: result.name
          },
          {
            where: { id: AttentionId }
          }
        );
        if (updated) {
          return { message: `New status for attention: ${result.name}` };
        }
        return { message: 'No rows updated' };
      } else {
        return { message: 'Status not found' };
      }
    } catch (error) {
      console.log({ "error at updateStatus": error.message });
      return { message: error.message };
    }
  };
//verifica si es una entrada
const verifyReEntry = async (req, res) => {
    try {

        //consulto la ultima actualizacion
        const lastAttention = await Attention.findOne({
            where : { PersonId : req.body.PersonId },
            order: [['egressDate' || 'desc']],
            include: [{
                model: Triage,
                include: ['HistoryInfoMedicPerson']
            }]
        })
        if(lastAttention && lastAttention.egressDate){
            //valido si tiene menos de 72 horas de haber salido
            const today = await moment();
            const lastEgress = await moment(lastAttention.egressDate); 
            const isReEntry = await today.diff(lastEgress, 'hours');
            if (isReEntry < 72 ){
                return {
                    ReEntry : lastAttention.id,
                    motive: lastAttention.Triage.HistoryInfoMedicPerson.motive
                }
                //devuelvo el id del ultimo ingreso y el motivo
            }
        }
        return false
        //devuelvo que false porque no es Reingreso

    } catch (error) {
        console.log('error verifyReEntry controller attention', error )
        return "error al verificar reentrada"
    }

}

const CreateUrgency = async (req, res) => {
    try {

        req.body.Status= "EN ESPERA"
        req.body.TypeService= "URGENCIA"
        if (req.body.ReEntry) {
            await create(req, res);
        } else {
            // Validar si existe reingreso
            const isReEntry = await verifyReEntry(req);
            if (isReEntry) {
                res.status(200).json(isReEntry);
            } else {
                await create(req, res);
            }
        }
    } catch (error) {
        console.log('error CreateUrgency controller attention', error);
        res.status(404).json({ message : error.message });
    }
};


module.exports = {
    get,
    getItems,
    findItems,
    getItem,
    create,
    update,
    destroy,
    updateStatus,
    CreateUrgency
    
}