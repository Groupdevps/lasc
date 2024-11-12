const { Attention, User, CAU}  = require('../models/index.js');
const helpers   =  require ("../lib/helpers.js");
//const status = {}
const attributes = ['CAU', 'Observation', 'createdAt']
const include = [{
    model: Attention,
    attributes: [],
    include: [{ model: User,attributes: ['username'] }]
},{
    model: User,
    attributes: ['username']
}]

const get = async(req, res) => {
    try {
        const result = await CAU.findOne({
            where: {id: req.params.id},
            attributes,
            include 
        })
        if(result){
            res.status(200).json(result)
        }else{
            res.status(204).json('no se encontro CAU')
        }
    } catch (error) {
        res.status(404).json(error.message)
        
    }
}
const findItem = async(req, res) => {
    try {
        const result = await CAU.findOne({
            where: {AttentionId: req.body.AttentionId},
            attributes,
            include
        })
        if(result){
            res.status(200).json(result)
        }else{
            res.status(204).json('no se encontro CAU')
        }
    } catch (error) {
        res.status(404).json(error.message)
        
    }
}
const create = async(req, res) => {
    try {
        const result = await CAU.create(req.body)
        if(result){
            res.status(201).json(result)
        }else{
            res.status(204).json('no se encontro CAU')
        }
    } catch (error) {
        res.status(404).json(error.message)
        
    }
}

module.exports = {
    get,
    findItem,
    create
    
}