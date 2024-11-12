const { where } = require('sequelize')
const {AnalysisResult} =require('../../models')

//crea un tipo analisis
const create = async (req, res) => {
    try {
        const {AnalysisLaboratoryId,LaboratoryResultId,result} = req.body
        const newData = await AnalysisResult.create({AnalysisLaboratoryId,LaboratoryResultId,result})
        res.status(201).json(newData)
    } catch (error) {
        console.log('error in create analysis result controller', error)
        res.status(404).json('no se pudo crear resultado')
    }
}

const get = async (req, res) => {
    try {
        const {LaboratoryResultId} = req.params
        const where = {}
       
        if(LaboratoryResultId){
            where.LaboratoryResultId = LaboratoryResultId
        }
        
        const result = await AnalysisResult.findAll(where)
        res.status(200).json(result)
    } catch (error) {
        console.log('error in get analysis result controller', error)
        res.status(404).json('sin resultados')
    }
}

const find = async (req, res) => {
    try {
        const {id} = req.params
        const result = await AnalysisResult.findByPk(id)
        res.status(200).json(result)
    } catch (error) {
        console.log('error in find analysis result controller', error)
        res.status(404).json('sin resultados')
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const result = await AnalysisResult.update(req.body, {
            where: {
                id:id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log('error in update analysis result controller', error)
        res.status(404).json('no realizo la actualizacion ')
    }
}

const invalidate = async (req, res) => {
    try {
        const {id} = req.params
        const result = await AnalysisResult.update({
            active: false
        }, {
            where: {
                id:id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log('error in invalidate analysis result controller', error)
        res.status(404).json('no realizo la eliminacion  ')
    }
}

module.exports = {create, get, find, update, invalidate}