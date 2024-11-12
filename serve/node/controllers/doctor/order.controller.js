const { Order,Inability,Status,Role, LevelTriage, Product,OrderProduct, Triage, TypeService,OrderCupsList, OrderManualTariff, OrderSubDiagnose, CupsList, Medicine, TariffManual, Gender, SubDiagnose, MedicationList, Attention, HistoryPerson, Person, Center, User, TypeOrder, Recommendation, OrderMaterial } = require('../../models');

const { Op } = require('sequelize');

const paginate      = require('../../lib/paginate.js');
const { where } = require('sequelize');
const { updateStatus } = require('../admission/attentions.controller.js');
/* const include = [{
	model: CupsList,
	attributes: ['code','description' ]
},
{
	model: OrderLab,
	attributes : ['numberId', 'AttentionId'],
	include: [{
		model:Attention, 
		include: [{
			model: HistoryPerson,
			attributes: ['name', 'lastName', 'fullName']
			
		}],
		attributes: ['HistoryPersonId']
	}]
}] */

	const includeOptions = [
		{
			model: Attention,
			as: 'Attention', // Asegúrate de que este alias sea el correcto
			include: [
			  {
				model: HistoryPerson,
				as: 'HistoryPerson',
				required: true, // Asegúrate de que este alias sea el correcto
				include: [Gender]
			  },
			  {
				model: Triage,
				as: 'Triage',
				include: [{
					model: LevelTriage,
					as: 'LevelTriage'
				}],
				required: true // Asegúrate de que este alias sea el correcto
			  },
			  {
				model: TypeService
			  },
			  
			],
			required: true
		},
		{
		  model: Person,
		},
		{
			model: Status,
		  },
		{
		  model: Center,
		},
		{
		  model: User,
		  as: 'Doctor',
		  include: [{model: Role, as: 'Role'}]
		},
		{
		  model: TypeOrder,
		  as: "TypeOrder"
		},
		{
		  model: OrderCupsList,
		  include: [CupsList],
		},
		{
		  model: OrderManualTariff,
		  include: [TariffManual],
		},
		{
			model: OrderProduct,
			include: [Product],
		  }, 
		{
		  model: OrderSubDiagnose,
		  include: [SubDiagnose],
		},
		 {
		  model: Medicine,
		  include: [MedicationList],
		}, 
		{
		  model: Recommendation,
		},
		{
		  model: Inability,
		},
	  ];
	  
attributes = ['date', 'order', 'id']
module.exports 		= {
	get : (req,res) => {
    	paginate(
    		Order,
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

    getItems: async (req, res) => {
		const { triage, type, service,status, attention, patient, name, page = 1, itemsPerPage = 30 } = req.query;

		const where = {};

		if (triage) {
			where['$Attention.Triage.LevelTriageId$'] = triage;
		  }
		if (status) {
			where.StatusId = status;
		  }
		if (type) {
		  where.OrderTypeId = type;
		}
		if (service) {
		  where['$Attention.TypeServiceId$'] = service; // Aquí asegúrate de que el alias esté correcto
		}
		if (attention) {
		  where.AttentionId = attention; 
		}
		if (patient) {
		  where['$Attention.HistoryPerson.numberId$'] = patient; // Verifica que el alias HistoryPerson sea correcto
		}
		if (name) {
		  where['$Attention.HistoryPerson.fullName$'] = { [Sequelize.Op.iLike]: `%${name}%` };
		}


		try {
			const { count, rows: orders } = await Order.findAndCountAll({
				where,
				include: includeOptions,
				limit: parseInt(itemsPerPage, 10),
				offset: (parseInt(page, 10) - 1) * parseInt(itemsPerPage, 10),
				order: [['createdAt', 'DESC']],
				logging: console.log, // Agrega esto para ver la consulta SQL generada
			});
			
	  
			res.status(200).json({
				totalItems: count,
				totalPages: Math.ceil(count / itemsPerPage),
				currentPage: parseInt(page, 10),
				orders,
			});
		} catch (error) {
		  console.error('Error getting Orders:', error);
		  res.status(500).json({ message: 'Error al consultar órdenes' });
		}
	  },
	  
	  
	   // getItems

		//metodo para buscar ordenes para generacion de pdf
	getOrderToPdf: async (req, res) => {
		try {
			const {id} = req.params
			const result = await Order.findOne({
				where: {
					id: id
				},
				include: includeOptions
			});
	
			if (result) {
				return result;  // Devolver result en lugar de responder directamente
			} else {
				res.status(404).json({
					message: 'No se encontró ningún resultado.'
				});
			}
		} catch (error) {
			console.error('Error al buscar order en controller:', error.message);
			res.status(500).json({
				message: error ? error.message : "Error desconocido"
			});
		}
	},//findItemTotal

	getLabOrders : (req,res) => {
    	Order.findAll({include, attributes, where: {
				OrderLabId: { 
					[Op.ne]: null // Op.ne significa "no igual" en Sequelize
				}
			}
		}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getLabOrdersAttention : (req,res) => {
    	Order.findAll({include, attributes, where: {
    			AttentionId : req.params.AttentionId,
				OrderLabId: { 
					[Op.ne]: null // Op.ne significa "no igual" en Sequelize
				}
			}
		}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	Order.findOne({
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
    	Order.findOne({
    		where: {
    			id: req.body.id
    		}
    	}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    },// find item

    create : async (req, res) =>  {
		const {
		  AttentionId,
		  PersonId,
		  CenterId,
		  UserId,
		  OrderTypeId,
		  OrderCupsLists,
		  OrderManualTariffs,
		  OrderSubDiagnoses,
		  Medicines,
		  Recommendations,
		  Inabilities,
		  OrderProducts,
		  OrderMaterials,
		  OrderReference
		} = req.body;
	  
		try {
		  //Status PENDIENTE
		  const status = await Status.findOne({
			where: {name: "PENDIENTE"}
		  });
		  // Crea la orden principal
		  const newOrder = await Order.create({
			AttentionId,
			PersonId,
			CenterId,
			UserId,
			OrderTypeId,
			OrderReference,
			StatusId: status.id
			// No se pasa orderNumber aquí ya que se genera automáticamente en el hook
		  });
	  
		  if (OrderCupsLists && OrderCupsLists.length > 0) {
			for (const item of OrderCupsLists) {
			  await OrderCupsList.create({
				OrderId: newOrder.id,
				CupsListId: item.CupsListId,
				StatusId: status.id
			  });
			}
		  }
	  
		  if (OrderManualTariffs && OrderManualTariffs.length > 0) {
			for (const item of OrderManualTariffs) {
			  await OrderManualTariff.create({
				OrderId: newOrder.id,
				TariffManualId: item.TariffManualId,
				StatusId: status.id
			  });
			}
		  }
	  
		  if (OrderSubDiagnoses && OrderSubDiagnoses.length > 0) {
			for (const item of OrderSubDiagnoses) {
			  await OrderSubDiagnose.create({
				OrderId: newOrder.id,
				SubDiagnoseId: item.SubDiagnoseId
			  });
			}
		  }

		  if (OrderMaterials && OrderMaterials.length > 0) {
			for (const item of OrderMaterials) {
			  await OrderMaterial.create({
				OrderId: newOrder.id,
				MaterialId: item.MaterialId,
				cant : item.cant,
				note: item.note
			  });
			}
		  }
		  if (OrderProducts && OrderProducts.length > 0) {
			for (const item of OrderProducts) {
			  await OrderProduct.create({
				OrderId: newOrder.id,
				ProductId: item.ProductId,
				cant: item.amount, //cant
				pendingCant: item.amount, //cant
				StatusId: status.id
			  });
			}
		  }
		  if (Medicines && Medicines.length > 0) {
			for (const item of Medicines) {
			  await Medicine.create({
				OrderId: newOrder.id,
				MedicationListId: item.MedicationListId, //medicamento
				amount: item.amount, //cant
				pendingCant: item.amount, //cant
				dosage: item.dosage, //dosis,
				StatusId: status.id
			  });
			}
		  }

		  if (Recommendations && Recommendations.length > 0) {
			for (const item of Recommendations) {
			  await Recommendation.create({
				OrderId: newOrder.id,
				recommendation: item.recommendation
			  });
			}
			await updateStatus("ALTA MEDICA", AttentionId);

		  }

		  if (Inabilities && Inabilities.length > 0) {
			for (const item of Inabilities) {
			  await Inability.create({
				OrderId: newOrder.id,
				startDate: item.startDate,
				endDate: item.endDate, 
				disabilityDays: item.disabilityDays,
				observation: item.observation
			  });
			}
		  }
	  
		  res.status(201).json(newOrder);
		} catch (error) {
		  console.error(error);
		  res.status(500).json({ message: 'Error al crear la orden' });
		}
	  },
	  

    update : (req,res) => {
        let nameForm = ""

        if (req.body.nameForm == 'medical_order'){
            nameForm = 'MedicalOrderId'
        }
       

    	Order.update({
            [nameForm]: null
        }, {
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
    	Order.destroy({
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

    addOrders : (req, reqId, attribute, res) => {
        return new Promise((resolve,reject)=>{
        //verificar si existe la observacion
        
        
            console.log('id',reqId, "attribute ", attribute)
            if(req.body.Orders && req.body.Orders.length > 0){
                req.body.Orders.forEach((it, index, len) => {
                    if(!it.id){
						console.log('create id : ' ,it)
						it[attribute]= reqId
                        Order.create(it).then(resultOrder=> {
                            console.log("len ", len.length, index)
                            if((len.length - 1) == index ){
                                resolve(true);
                            }  
                        }).catch(err => {
                            reject(err);
							if((len.length - 1) == index ){												
                            	console.log("error Order", err.message)
							}
                        })
                    }else{
                        console.log('existe id : ' ,it.id)
						if((len.length - 1) == index ){					
                        	resolve(true)
						}
                    }
                   
                })
            }else{
                resolve(true);
            }
        })

    },//addOrders
	
	//listar ordenes de procedimientos no quirurgicos generados por el medico
	ProcedureNoQxOrderList: async (req, res) => {
		try {
			const { attention } = req.query;
			
			// Consulta las órdenes que pertenecen a la atención especificada y tipo "SOLICITUD INSUMOS MEDICOS"
			const orders = await Order.findAll({
				where: {
					AttentionId: attention, // Filtra por la atención especificada
				},
				include: [
					{
						model: OrderCupsList, // Incluye el modelo OrderCupsList
						required: true,
						include: [
							{
								model: CupsList,
								required: true,
								attributes: ['id','code', 'description'],
							},
							{
								model: Status,
								required: true,
								where: {
									name: 'PENDIENTE',
								},
								attributes: ['name']
							}
						],
					},
					{
						model: TypeOrder, // Incluye el modelo TypeOrder
						required: true,
						where: {
							name: 'ORDEN PROCEDIMIENTOS',
						},
					},
				],
			});
	
			// Mapea los resultados para incluir solo los campos requeridos
			const formattedOrders = orders.map(order => ({
				CupsListId: order.OrderCupsLists.map(ocl => ocl.CupsList?.id).join(', '), // Solo si necesitas concatenar los códigos
				code: order.OrderCupsLists.map(ocl => ocl.CupsList?.code).join(', '), // Solo si necesitas concatenar los códigos
				description: order.OrderCupsLists.map(ocl => ocl.CupsList?.description).join(', '),
				orderNumber: order.orderNumber,
				OrderId: order.id
			}));
	
			// Responde con la lista de órdenes
			res.json(formattedOrders);
		} catch (error) {
			console.log("Error ProcedureNoQxOrderList, order controller", error.message);
			res.status(404).json({ message:"Error al generar lista de órdenes de procedimientos no quirúrgicos"});
		}
	}
	
	
}
