const {Bill, Detail, DetailType ,sequelize } = require('../../models')
const { includeDetail, includeBill } = require('../includes')


const detailsByBill = async (req, res) => {
    try {
        const { BillId } = req.params
        const details = await Detail.findAll({
            where: {
                BillId: BillId
            },
            include,
            attributes: { exclude } 
        })
        res.status(200).json(details)
    } catch (error) {
        console.log('error detailsByBill in detailController', error)
        res.status(404).json(error.message)
    }
}
const createDetail = async (req, res) => {
    try {
        let bill = {}

        const {billNumber,BillId,  UserId, attentionCode, DetailTypeId, description, cant, unityValue } = req.body;
        
        if (billNumber){
            // Verifica si existe un Bill con el billNumber
            bill = await Bill.findOne({ where: { billNumber } });
        }
        
  
        // Crear el nuevo detalle
        const detail = await Detail.create({
            UserId: UserId,
            attentionCode,
            DetailTypeId: DetailTypeId,
            BillId: BillId  || bill.id || null, // Asociar con el ID del Bill encontrado
            description,
            cant,
            unityValue: unityValue || 0
        });


        // Crear el nuevo detalle
        const result = await Detail.findByPk(detail.id, { include: includeDetail});
  
        res.status(201).json(result);
    } catch (error) {
        console.log('error en create detail ', error)
        res.status(500).json({ message: error.message });
    }
  };

  const getDetailsByBill = async (req, res) => {
    try {
        const { bill, attention } = req.query;

        // Asegúrate de que bill esté definido
        if (!bill && !attention) {
            throw new Error ("Debe proporcionar 'bill' o 'attention'")
        }

        // Primero intentar obtener detalles por BillId
        let result = bill ? await Bill.findOne({ where: { BillId: bill } }) : null;
        let details;

        if (result) {
            // Si la factura existe, obtener detalles por BillId
            details = await Detail.findAll({ where: { BillId: result.id } , include: includeDetail});
        } else if (attention) {
            // Si no hay factura, buscar por attentionCode
            details = await Detail.findAll({ where: { attentionCode: attention }, include: includeDetail});
        }

        res.status(200).json(details);
    } catch (error) {
        console.log('error en getDetailsByBill detail ', error);
        res.status(500).json({ message: error.message });
    }
};



const updateDetail = async (req, res) => {
    try {
      const {  id } = req.params; 

      const {UserId, attentionCode, DetailTypeId, description, cant, unityValue } = req.body;
  
      const detail = await Detail.findByPk(id);
      if (!detail) {
        throw new error ('Detalle no encontrado') 
      }
      
      // Actualizar campos
      detail.UserId =  UserId;
      detail.attentionCode = attentionCode;
      detail.DetailTypeId = DetailTypeId;
      detail.description = description;
      detail.cant = cant;
      detail.unityValue = unityValue;
  
      await detail.save();
  
      res.status(200).json(detail);
    } catch (error) {
        console.log('error en updateDetail detail ', error)
        res.status(500).json({ message: error.message });
    }
  };

const deleteDetail = async (req, res) => {
    try {
      const { id } = req.params;  
      const detail = await Detail.findByPk(id, {includeBill});
  
      if (!detail) {
        throw new Error ('Detalle no encontrado') 
      }
  
      await detail.destroy();
  
      res.status(204).json({ message: 'Detalle eliminado exitosamente' });
    } catch (error) {
        console.log('error en updateDetail detail ', error)
        res.status(500).json({ message: error.message });
    }
  };

const addDetail = async (ConceptId, Cant, AttentionId) => {
    try {
        //busca o crea la factura de esta atencion
        const [bill, createdBill] = await Bill.findOrCreate({
            where: {
                AttentionId : AttentionId
            },
            defaults:{
                AttentionId : AttentionId,
                billNumber : AttentionId, //temporal usando el numero de atencion como numero de factura

            }
        })
        //busca si este concepto ya se encuentra en la atencion
        const [newDetail, created] = await Detail.findOrCreate({
            where: {
                BillId : bill.id,
                ConceptId: ConceptId
            },
            defaults:{
                AttentionId : AttentionId,
                ConceptId : ConceptId,
                cant : Cant,
                BillId : bill.id,

            }
        })
        // si se creo , listo se retorna 200
        if (!created) {
            //si no se creo, entonces se debe actualizar la cantidad del concepto
            const  newCant  = newDetail.cant + Cant
            //y se actualiza la cantidad en el detalle
            const detailUpdated = await Detail.update({
                AttentionId: AttentionId,
                cant: newCant
            },{
                where:{
                    id: newDetail.id
                }
            })
            console.log('DETAIL UPDATED')
            return detailUpdated
        }else{
            console.log('DETAIL CREATED')

            return newDetail
        }
    } catch (error) {
        console.log('error addDetail in Detail controller ', error)
        return false
    }
}

const addingBillNumber = async (AttentionId, billNumber, BillId) => {
    try {
        const updated = await Detail.update(billNumber,BillId, {
            where: {
                AttentionId : AttentionId
            }
        })
        if(!updated){
            return false
        }
        return true
    } catch (error) {
        console.log('error addingBillNumber in Detail controller ', error)
        return false
    }
}

const getTotalValue = async (unityValue, cant) => {
    try {
        const result = await unityValue * cant
    } catch (error) {
        console.log('error getTotalValue in Detail controller ', error)
        return 0
    }
}
module.exports =  {getDetailsByBill, createDetail, updateDetail,deleteDetail, addingBillNumber, addDetail, detailsByBill }