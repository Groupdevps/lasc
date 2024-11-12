const { EmergencyMedicalHistory, HistoryPerson, HistoryInfoMedicPerson , SubDiagnoseList , PersonalBackground, PhysicalExam, User,Attention,Role,UserRole,Center}  	= require('../../models/index.js');
const paginate      = require('../../lib/paginate.js');

const generatePDF = require('../institutionalReports/generatePDF.lib.controller.js')
const emergencyMedicalHistoryField = require("../../lib/fields/emergencyMedicalHistoryField.js")
const headerField = require("../../lib/fields/headerLogoField.js");



const { addPersonalBackgrounds } = require('../folder/personalBackground.controller.js');
const { addPhysicalExams } = require('../folder/physicalExam.controller.js');
const { addSubDiagnoseList } = require('../folder/subDiagnoseList.controller.js');
const {updateStatus} = require('../admission/attentions.controller.js')
const include = [
	PhysicalExam, PersonalBackground, HistoryInfoMedicPerson,HistoryPerson, 
	{ model: SubDiagnoseList , as: 'SubDiagnoseLists', include: ['SubDiagnose']}, {
		model: User,
		include:{
			model: UserRole,
			include: Role
		}
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
	}
]
const EMH 		= {
	get : (req,res) => {
    	paginate(
    		EmergencyMedicalHistory,
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
    	EmergencyMedicalHistory.findAll({include}).then((result) => {  
	        res.status(200).json(result);        
	    }).catch((error) => {	        
	        res.status(404).json({
	        	message : error.message
	        });
	    });
    }, // getItems

    getItem  : (req,res) => {
    	EmergencyMedicalHistory.findOne({
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
    	EmergencyMedicalHistory.findOne({
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

	getMedicalHistoryDoc : (req,res) => {
		try {
			const result =  EmergencyMedicalHistory.findOne({
				where: {
					id: req.params.id
				},
				include
			})
			if (result) {
				return result;  // Devolver result en lugar de responder directamente
			} else {
				res.status(404).json({
					message: 'No se encontró ningún resultado.'
				});
			}
		} catch (error) {
			res.status(404).json({
	        	message : error
	        });
		}
    	
    },// find item but return

    create : (req,res) => {
    	HistoryInfoMedicPerson.create(req.body).then(HistoryInfoMedicPersonResult => {
			req.body.HistoryInfoMedicPersonId = HistoryInfoMedicPersonResult.id
			EmergencyMedicalHistory.create(req.body).then(async EmergencyMedicalHistoryResult => {
				await addPersonalBackgrounds(req,EmergencyMedicalHistoryResult.id, "EmergencyMedicalHistoryId")
				await addPhysicalExams(req,EmergencyMedicalHistoryResult.id, "EmergencyMedicalHistoryId")
				await addSubDiagnoseList (req, EmergencyMedicalHistoryResult.id, "EmergencyMedicalHistoryId")
				const statusObservation = await updateStatus("OBSERVACION", EmergencyMedicalHistoryResult.AttentionId)
				console.log("Observacion", statusObservation)
				if(statusObservation.message){
					EMH.findItem(req,res)
				}else{
					res.status(404).json(statusObservation);
				}
				//result with include
				
				//res.status(200).json(EmergencyMedicalHistoryResult);   
			}).catch((error) => {
				res.status(404).json({
					'error EmergencyMedicalHistory': error.message
				})
				
			})
			
		}).catch(err => {
			res.status(404).json({
				'error HistoryInfoMedicPerson': err.message
			})
		})
    }, // create

    update : (req,res) => {
    	EmergencyMedicalHistory.update(req.body,{
    		where: {
    			id: req.params.id
    		}
    	}).then(async EmergencyMedicalHistoryResult => {
			await addPersonalBackgrounds(req,req.params.id, "EmergencyMedicalHistoryId")
			await addPhysicalExams(req,req.params.id, "EmergencyMedicalHistoryId")
			await addSubDiagnoseList (req, req.params.id, "EmergencyMedicalHistoryId")
			//result with include

			const statusObservation = await updateStatus("OBSERVACION", req.body.AttentionId)
			console.log("Observacion", statusObservation)
			if(statusObservation.message){
				EMH.findItem(req,res)
			}else{
				res.status(404).json(statusObservation);
			}
    		//res.json(result);
    	}).catch(error => {
    		res.status(404).json({
    		 	message : error.message
    		});
    	});
    }, // update

    destroy : (req,res) => {
    	EmergencyMedicalHistory.destroy({
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

	findItems : (req,res) => {

		let sized = 0 ;
		const { size, page, order } = req.query;
		if (!size){
			sized = 30
		}else{
			sized = size
		}

 
    	console.log("query ", req.query);
		EmergencyMedicalHistory.findAndCountAll({
			where: {
				numberId : req.body.numberId
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
			
		},//findItems
	download: async (req,res)=>{
		// Ruta del PDF existente
	  	// const pdfPath = './public/anexos/furips.pdf'
	  	// Datos del JSON 
	  	const {AttentionId} = req.params
	  	// EmergencyMedicalHistory.findByPk(id)
	  	const jsonData = {
	  		AttentionId : 12231231,
	  		name : "test",	  		
	  	}

	  	const jsonHeader = {
	  		title : "Historia Clinica de Urgencia",
	  		logo :  ""
	  		//"../node/public/img/logoFunconstes.jpg",
	  	}
	  	// await EmergencyMedicalHistory.findOne({
    	// 	where: {
    	// 		AttentionId: AttentionId
    	// 	},
		// 	include
    	// })

	  	const modifiedPdfBytes = await generatePDF.createForm(jsonData, emergencyMedicalHistoryField, headerField, jsonHeader);

	  	// Configurar el encabezado de la respuesta
	  	res.setHeader('Content-Type', 'application/pdf');
	  	res.setHeader('Content-Disposition', `attachment; filename=EmergencyMedicalHistory-${AttentionId}.pdf`);

	   // Enviar el contenido del PDF como respuesta
	   res.end(modifiedPdfBytes, 'binary');
	},

	historical: async (req, res) => {
		let where = {};
		try {
			// Parámetro 'cedula' del paciente y query 'numerodeatencion'
			const { patient } = req.params;
			const { attention } = req.query;
	
			if (patient) {
				where.numberId = patient;
			}
			if (attention) {
				where.AttentionId = attention;
			}
	
			// Buscar las historias clínicas agrupadas por AttentionId
			const medicalHistories = await EmergencyMedicalHistory.findAll({
				where,
				attributes: {
					exclude: ['updatedAt', 'createdAt'] 
				},
				order: [['createdAt', 'DESC']],
				raw: true
			});
	
			res.status(200).json(medicalHistories);
	
		} catch (error) {
			console.log("Error en historical, EmergencyMedicalHistory controller", error);
			res.status(400).json({ message: error.message });
		}
	}
	
}//EMH

module.exports = EMH;
