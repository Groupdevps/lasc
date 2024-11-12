const { Attention , ClinicHistory, EvolutionNote, OrderLab, OutPatientOrder, Invoice}  	= require('../models');
const { Op }            = require("sequelize");
const moment            = require("moment");

//{"module":"admissions","startDate":"2022-12-01","finalDate":"2022-12-02"}

const options = ['admissions', 'médico', 'facturacion', 'farmacia']
const stadistic = {

    main : (req,res) => {

        startDate = new Date(req.body.startDate + "T00:00:00")//moment(req.body.startDate).valueOf().toString()// + "T00:00:00" // new Date(req.body.startDate + " 00:00:00");
        finalDate = new Date(req.body.finalDate + "T23:59:59")//moment(req.body.finalDate).valueOf().toString()// + "T00:00:00" // new Date(req.body.finalDate + " 00:00:00");//new Date(new Date(req.body.finalDate).getTime() + 60 * 60 * 24 * 1000 - 1)

        console.log( startDate, finalDate)
        if (req.body.module == options[0]){
            console.log("cant attention and patient created between dates ")
            stadistic.cantAttention(startDate,finalDate,res).then(result => {
                res.json(result)
            })

            //res.json({ "message": "cant attention and patient created between dates "})

        }//module admision

        if (req.body.module == options[1]){
            console.log("cant histories, notes, orders,incapacity created between dates ")
            stadistic.cantHistories(startDate,finalDate,res).then(resultHistories)
            stadistic.cantNotes(startDate,finalDate,res).then(resultNotes)
            stadistic.cantOrderLab(startDate,finalDate,res).then(resultOrderLab)
            stadistic.cantOutPatientOrder(startDate,finalDate,res).then(resultOutPatientOrder)
            //pending incapacity
            res.json([resultHistories,resultNotes,resultOrderLab, resultOutPatientOrder])
        }//modulo medico
        if (req.body.module == options[2]){
            console.log("cant invoice created between dates ")
            stadistic.cantInvoice(startDate,finalDate,res).then(result)
            res.json(result)
        }// modulo facturacion
        if (req.body.module == options[3]){
            console.log("cant dispatch created between dates ")
        }//modulo farmacia

    },//main

    //cant of attentions between two dates
    cantAttention : (startDate,finalDate,res) => {
        new Promise((resolve, reject) => {
            Attention.findAll({
                where:{
                     //[Op.between] : [startDate, finalDate]
                    // [Op.and]:{
    
                        createdAt: {
                             [Op.gte]: startDate,
                             [Op.lte]: finalDate
                        }
                    // }
                    
                },
                attributes: ["createdAt"],
                order : [["createdAt", "DESC"]]
            }).then(result => {
                console.log("RESULT ", result.length)
                resolve({
                    "nameForm": "Atenciones",
                    "Amount": result.length
                })
            }).catch(err => {console.log(err); resolve (0)})
    
            
        })
        
    },//cantAttention

     //cant of histories between two dates
     cantHistories : (startDate,finalDate,res) => {
        new Promise((resolve, reject) => {
            ClinicHistory.findAll({
                where:{
                     //[Op.between] : [startDate, finalDate]
                    // [Op.and]:{
    
                        createdAt: {
                             [Op.gte]: startDate,
                             [Op.lte]: finalDate
                        }
                    // }
                    
                },
                attributes: ["createdAt"],
                order : [["createdAt", "DESC"]]
            }).then(result => {
                console.log("RESULT ", result.length)
                resolve({
                    "nameForm": "historia_clinica",
                    "Amount": result.length
                })
            }).catch(err => {console.log(err); resolve (0)})
    
            
        })
        
    },//cantHistories
    //cant medic notes
    cantNotes : (startDate,finalDate,res) => {
        new Promise((resolve, reject) => {
            EvolutionNote.findAll({
                where:{
                     //[Op.between] : [startDate, finalDate]
                    // [Op.and]:{
    
                        createdAt: {
                             [Op.gte]: startDate,
                             [Op.lte]: finalDate
                        }
                    // }
                    
                },
                attributes: ["createdAt"],
                order : [["createdAt", "DESC"]]
            }).then(result => {
                console.log("RESULT ", result.length)
                resolve({
                    "nameForm": "notas_medicas",
                    "Amount": result.length
                })
            }).catch(err => {console.log(err); resolve (0)})
    
            
        })
        
    },//cantNotes

    //cant order lab 
    cantOrderLab : (startDate,finalDate,res) => {
        new Promise((resolve, reject) => {
            OrderLab.findAll({
                where:{
                     //[Op.between] : [startDate, finalDate]
                    // [Op.and]:{
    
                        createdAt: {
                             [Op.gte]: startDate,
                             [Op.lte]: finalDate
                        }
                    // }
                    
                },
                attributes: ["createdAt"],
                order : [["createdAt", "DESC"]]
            }).then(result => {
                console.log("RESULT ", result.length)
                resolve({
                    "nameForm": "orden_laboratorio",
                    "Amount": result.length
                })
            }).catch(err => {console.log(err); resolve (0)})
    
            
        })
        
    },//cantOrderLab

    cantOutPatientOrder : (startDate,finalDate,res) => {
        new Promise((resolve, reject) => {
            OutPatientOrder.findAll({
                where:{
                     //[Op.between] : [startDate, finalDate]
                    // [Op.and]:{
    
                        createdAt: {
                             [Op.gte]: startDate,
                             [Op.lte]: finalDate
                        }
                    // }
                    
                },
                attributes: ["createdAt"],
                order : [["createdAt", "DESC"]]
            }).then(result => {
                console.log("RESULT ", result.length)
                resolve({
                    "nameForm": "orden_ambulatoria",
                    "Amount": result.length
                })
            }).catch(err => {console.log(err); resolve (0)})
    
            
        })
        
    },//cantOutPatientOrder

    cantInvoice : (startDate,finalDate,res) => {
        new Promise((resolve, reject) => {
            Invoice.findAll({
                where:{
                     //[Op.between] : [startDate, finalDate]
                    // [Op.and]:{
    
                        createdAt: {
                             [Op.gte]: startDate,
                             [Op.lte]: finalDate
                        }
                    // }
                    
                },
                attributes: ["createdAt"],
                order : [["createdAt", "DESC"]]
            }).then(result => {
                console.log("RESULT ", result.length)
                resolve({
                    "nameForm": "factura",
                    "Amount": result.length
                })
            }).catch(err => {console.log(err); resolve (0)})
    
            
        })
        
    }//cantInvoice

}//stadistic

module.exports = stadistic