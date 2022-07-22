class Collection {
  constructor(model, app, routeName) {
    this.model = model;
    this.addRoutes(app, routeName);
  }

  //C
  createModel(req, res) {
    const created = this.model.build(req.body);
    created
      .save()
      .then((saved) => {
        res.status(200).send(saved);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
  //R
  readModel(req, res) {
    const found = this.model.findAll({
      where: {
        id: req.params.id,
      },
    });
    found
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
  }
  readModels(req, res) {
    const foundArray = this.model.findAll();
    foundArray
      .then((models) => {
        res.status(200).send(models);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
  //U
  updateModel(req, res) {
    let toUpdate = this.model.findOne({
      where: {
        id: req.params.id,
      },
    });
    toUpdate
      .then((updateTarget) => {
        if (!updateTarget) {
          res.status(404).send(`Couldn't find id ${req.params.id}.`);
          return;
        }
        //for every key in the model, get
        Object.keys(req.body).forEach((key) => {
          if (!updateTarget[key]) {
            //skip non provided update values, or just incorrect stuff
            return;
          }
          updateTarget[key] = req.body[key];
        });
        return updateTarget.save();
      })
      .then((saved) => {
        res.status(200).send(saved);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
  //D
  deleteModel(req, res) {
    const destroyed = this.model.destroy({
      where: {
        id: req.params.id,
      },
    });
    destroyed
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
  }

  addRoutes(app, routeName) {
    app.post(`/${routeName}`, this.createModel.bind(this));
    app.get(`/${routeName}/:id`, this.readModel.bind(this));
    app.get(`/${routeName}`, this.readModels.bind(this));
    app.put(`/${routeName}/:id`, this.updateModel.bind(this));
    app.delete(`/${routeName}/:id`, this.deleteModel.bind(this));
  }
}

module.exports = {
  Collection,
};
