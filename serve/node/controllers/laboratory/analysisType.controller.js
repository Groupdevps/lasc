const {AnalysisType} =require('../../models')

//crea un tipo analisis
const create = async (req, res) => {
    try {
        const {name,description} = req.body
        const newData = await AnalysisType.create(req.body)
        res.status(201).json(newData)
    } catch (error) {
        console.log('error in create analysis type controller', error)
        res.status(404).json('no se pudo crear analisis')
    }
}

const get = async (req, res) => {
    try {
        const result = await AnalysisType.findAll()
        res.status(200).json(result)
    } catch (error) {
        console.log('error in get analysis type controller', error)
        res.status(404).json('sin resultados')
    }
}

const find = async (req, res) => {
    try {        
        const {id} = req.params
        const result = await AnalysisType.findByPk(id)
        res.status(200).json(result)
    } catch (error) {
        console.log('error in find analysis type controller', error)
        res.status(404).json('sin resultados')
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const result = await AnalysisType.update(req.body, {
            where: {
                id:id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log('error in update analysis type controller', error)
        res.status(404).json('no realizo la actualizacion ')
    }
}

const invalidate = async (req, res) => {
    try {
        const {id} = req.params
        const result = await AnalysisType.update({
            active: false
        }, {
            where: {
                id:id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log('error in invalidate analysis type controller', error)
        res.status(404).json('no realizo la eliminacion  ')
    }
}

module.exports = {create, get, find, update, invalidate}