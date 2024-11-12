const { DetailType } = require('../../models')
const { attributesDetailType } = require('../includes')

const get = async (req, res ) => {
    try {
        const detailTypes = await DetailType.findAll({ where: { active : true}, attributes:attributesDetailType })
        res.status(200).json(detailTypes)
    } catch (error) {
        console.log('error in DetailType get', error)
        res.status(404).json({ message : error.message})
    }
}

module.exports = {
    get
}