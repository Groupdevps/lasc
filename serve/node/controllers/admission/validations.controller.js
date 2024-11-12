const { Person }    = require('../../models/index.js');
const person = require('./people.controller.js');
const moment = require('moment');

const validation 	= {
    Adult: (req,res) => {
        return new Promise((resolve, reject) => {
            try{
                const today = moment();
                const birthD = moment(req, 'YYYY-MM-DD');
                const age = today.diff(birthD, 'years');
                if (age >= 18) {
                    resolve (true);
                }else{
                    resolve (false)
                }
            }catch(errorValidation){
                console.log("errorValidation-Adult", errorValidation.message);
                reject (errorValidation); 
            }
        })
        
    },
	isAdult: (req, res) => {
        return new Promise((resolve, reject) => {
            Person.findOne({
                where: {
                    numberId: req
                },
            }).then(result => {
                if (result && result.dataValues && result.dataValues.Adult) {
                    resolve(result.dataValues.Adult);
                } else {
                    resolve(false);
                }
            }).catch(err => {
                console.log('error IsAdult validation', err);
                reject(err);
            });
        });
    },
    

    thereIsAdult : (req,res) => {
        //is patient an adult?
        return new Promise(async (resolve, reject) => {
            try {
                
                if (req.patient &&  await validation.isAdult(req.patient)) {
                     resolve (true)
                }else{
                    if (req.companion && await validation.isAdult(req.companion)){
                        resolve (true)
                    }
                    else{
                       
                        throw new Error("Mayor de edad es requerido como acompañante para generar la atencion por urgencia.");
                    }
                    
                }
             } catch (error) {
                    console.log('error thereIsAdult validation', error)
                    reject ( error)
             }
        })
    }

    
}

const validateAdultDocumentType = (birthDate, typeID) => {
    return new Promise((resolve, reject) => {
        try {
            const today = moment();
            const birthD = moment(birthDate, 'YYYY-MM-DD');
            const age = today.diff(birthD, 'years');
            const invalidTypes = ['Tarjeta de Identidad', 'Registro Civil', 'Menor sin Identificación', 'Certificado Nacido Vivo'];
            
            if (age >= 18 && invalidTypes.includes(typeID)) {
                reject(new Error('Paciente mayor de edad, coloque el tipo de documento de identidad correspondiente'));
            } else {
                resolve(true);
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports =  {
    ...validation,
    validateAdultDocumentType
}