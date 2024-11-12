const {AnexCups}= require("../../models")

const create = async (req, res) => {
    try {
        const {Anex3Id} = req.params
        const {cups, cant, description} = req.body
        const created = await AnexCups.create(Anex3Id, cups, cant, description)
        res.status(201).json(created)
    } catch (error) {
        console.log("error create anexCup controller", error)
        res.status(404).json("No se agrego cup en el anexo")
    }

}

const get = async (req, res) => {
    try {
        const {Anex3Id} = req.params
        const result = await AnexCups.findAll({
            where : {
                Anex3Id: Anex3Id,
                active: true
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log("error get anexCup controller", error)
        res.status(404).json("No se encontro cups relacionados al anexo")
    }

}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const {cups, cant, description} = req.body
        const result = await AnexCups.update(cups, cant, description, {
            where: {
                id: id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log("error update anexCup controller", error)
        res.status(404).json("error al actualizar cups relacionados al anexo")
    }

}

const deactivate = async (req, res) => {
    try {
        const {Anex3Id, id} = req.params
        const deactivated = await AnexCups.update({
            active : false
        }, {
            where: {
                id: id
            }
        })
        const result = await AnexCups.findAll({
            where : {
                Anex3Id: Anex3Id,
                active: true
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log("error deactivate anexCup controller", error)
        res.status(404).json("error al eliminar cups relacionados al anexo")
    }

}

module.exports = { create, get, update, deactivate}