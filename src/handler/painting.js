'use strict';

const { Painting } = require('../db');

const createPainting = (req, res) => {
  const { name, author, paintedDate } = req.body;
  const painting = Painting.build({
    name,
    author,
    paintedDate,
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

const listPainting = (req, res) => {
  Painting.findAll()
    .then((models) => {
      res.status(200).send(models);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getPainting = (req, res) => {
  Painting.findAll({
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

const updatePainting = (req, res) => {
  const { name, author, paintedDate } = req.body;
  Painting.findOne({
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
      if (author) {
        updateTarget.author = author;
      }
      if (paintedDate) {
        updateTarget.paintedDate = paintedDate;
      }
      return updateTarget.save();
    })
    .then((updated) => {
      res.status(200).send(updated);
    });
};

const deletePainting = (req, res) => {
  Painting.destroy({
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
  createPainting,
  listPainting,
  getPainting,
  updatePainting,
  deletePainting,
};
