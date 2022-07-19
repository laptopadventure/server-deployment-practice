'use strict';

const { Antique } = require('../db');

const createAntique = (req, res) => {
  const { name, importance } = req.body;
  const painting = Antique.build({
    name,
    importance,
  });
  painting
    .save()
    .then((saved) => {
      res.status(200).send(saved);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const listAntique = (req, res) => {
  Antique.findAll()
    .then((models) => {
      res.status(200).send(models);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getAntique = (req, res) => {
  Antique.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((models) => {
      if (models.length) {
        res.status(200).send(models[0]);
      } else {
        res.status(404).send(`Couldn't find id ${req.params.id}.`);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateAntique = (req, res) => {
  const { name, importance } = req.body;
  Antique.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((updateTarget) => {
      if (!updateTarget) {
        res.status(404).send(`Couldn't find id ${req.params.id}.`);
        return;
      }
      if (name) {
        updateTarget.name = name;
      }
      if (importance) {
        updateTarget.importance = importance;
      }
      return updateTarget.save();
    })
    .then((updated) => {
      res.status(200).send(updated);
    });
};

const deleteAntique = (req, res) => {
  Antique.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((destroyedCount) => {
      if (destroyedCount > 0) {
        res.status(200).send('Deleted.');
      } else {
        res.status(404).send(`Couldn't find id ${req.params.id}.`);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  createAntique,
  listAntique,
  getAntique,
  updateAntique,
  deleteAntique,
};
