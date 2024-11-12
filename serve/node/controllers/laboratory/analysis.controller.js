const {Analysis} =require('../../models')
const include = ['AnalysisType']
//crea un analisis
const create = async (req, res) => {
    try {
        const { name, units, referenceValue, AnalysisTypeId } = req.body
        const newData = await Analysis.create({ name, units, referenceValue, AnalysisTypeId })
        res.status(201).json(newData)
    } catch (error) {
        console.log('error in create analysis controller', error)
        res.status(404).json('no se pudo crear analisis')
    }
}

const get = async (req, res) => {
    try {
        //desde la url tipifica la lista de analisis        
        const {AnalysisTypeId} = req.query
        const where = {}
        if(AnalysisTypeId){
            where.AnalysisTypeId = AnalysisTypeId
        }        
        const result = await Analysis.findAll({where, include})
        res.status(200).json(result)
    } catch (error) {
        console.log('error in get analysis controller', error)
        res.status(404).json('sin resultados')
    }
}

const find = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Analysis.findByPk(id, include)
        res.status(200).json(result)
    } catch (error) {
        console.log('error in find analysis controller', error)
        res.status(404).json('sin resultados')
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Analysis.update(req.body, {
            where: {
                id:id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log('error in update analysis controller', error)
        res.status(404).json('no realizo la actualizacion ')
    }
}

const invalidate = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Analysis.update({
            active: false
        }, {
            where: {
                id:id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log('error in invalidate analysis controller', error)
        res.status(404).json('no realizo la eliminacion  ')
    }
}

module.exports = {create, get, find, update, invalidate}