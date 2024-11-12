const {AnalysisLaboratory, CupsList} =require('../../models')
const include = ['Analysis', 'CupsList']
//crea un tipo analisis
const create = async (req, res) => {
    try {
        const {AnalysisId,cup,CupsListId} = req.body
        const newData = await AnalysisLaboratory.create({AnalysisId,cup,CupsListId})
        res.status(201).json(newData)
    } catch (error) {
        console.log('error in create analysis laboratory controller', error)
        res.status(404).json('no se pudo crear analisis')
    }
}

const get = async (req, res) => {
    try {
        const {cup, AnalysisId} = req.query
        const where = {}
        if(AnalysisId){
            where.AnalysisId = AnalysisId
        }
        if(cup){
            where.cup = cup
        }
        const result = await AnalysisLaboratory.findAll({where,include})
        res.status(200).json(result)
    } catch (error) {
        console.log('error in get analysis laboratory controller', error)
        res.status(404).json('sin resultados')
    }
}

const find = async (req, res) => {
    try {
        const {id} = req.params
        const result = await AnalysisLaboratory.findByPk(id, {include})
        res.status(200).json(result)
    } catch (error) {
        console.log('error in find analysis laboratory controller', error)
        res.status(404).json('sin resultados')
    }
}
const getLaboratoryList = async (req, res) => {
    try {
        const result = await AnalysisLaboratory.findAll({
            attributes: ["CupsListId"],
            group: ["CupsListId", "CupsList.id", "CupsList.code", "CupsList.description", "CupsList.createdAt", "CupsList.updatedAt"],
            include: [{
                model: CupsList,
                attributes: ["id", "code", "description"]
            }]
        })
        res.status(200).json(result)
    } catch (error) {
        console.log('error in find analysis laboratory controller', error)
        res.status(404).json('sin resultados')
    }
}


const update = async (req, res) => {
    try {
        const {id} = req.params
        const result = await AnalysisLaboratory.update(req.body, {
            where: {
                id:id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log('error in update analysis laboratory controller', error)
        res.status(404).json('no realizo la actualizacion ')
    }
}

const invalidate = async (req, res) => {
    try {
        const {id} = req.params
        const result = await AnalysisLaboratory.update({
            active: false
        }, {
            where: {
                id:id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log('error in invalidate analysis laboratory controller', error)
        res.status(404).json('no realizo la eliminacion  ')
    }
}

module.exports = {create, get, find, update, invalidate, getLaboratoryList}