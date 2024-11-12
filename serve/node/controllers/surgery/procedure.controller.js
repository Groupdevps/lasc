const { Procedure, CupList, Supply, User, Person, Attention } = require('../../models');

const create = async (req, res) => {
  try {
    const newProcedure = await Procedure.create(req.body);
    res.status(201).json(newProcedure);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const procedures = await Procedure.findAll({
      include: [CupList, Supply, User, Person, Attention]
    });
    res.status(200).json(procedures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const procedure = await Procedure.findByPk(req.params.id, {
      include: [CupList, Supply, User, Person, Attention]
    });
    if (procedure) {
      res.status(200).json(procedure);
    } else {
      res.status(404).json({ error: 'Procedure not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const [updated] = await Procedure.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProcedure = await Procedure.findByPk(req.params.id, {
        include: [CupList, Supply, User, Person, Attention]
      });
      res.status(200).json(updatedProcedure);
    } else {
      res.status(404).json({ error: 'Procedure not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await Procedure.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Procedure not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
