'use strict';

const express = require('express');
require('dotenv').config();
const { hello } = require('./handler/hello');
const { data } = require('./handler/data');
const { person } = require('./handler/person');
const { logger } = require('./middleware/logger');
const { validator } = require('./middleware/validator');
const { error404 } = require('./error-handlers/404');
const { error500 } = require('./error-handlers/500');
const {
  getPainting,
  createPainting,
  listPainting,
  updatePainting,
  deletePainting,
} = require('./handler/painting');
const {
  createAntique,
  listAntique,
  getAntique,
  updateAntique,
  deleteAntique,
} = require('./handler/antique');

const { db } = require('./db');

const app = express();

//global middleware

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(logger);
}

//general routes

app.get('/', hello);
app.get('/data', data);
app.get('/person', validator, person);

//painting routes

app.post('/painting', createPainting);
app.get('/painting', listPainting);
app.get('/painting/:id', getPainting);
app.put('/painting/:id', updatePainting);
app.delete('/painting/:id', deletePainting);

//antique routes

app.post('/antique', createAntique);
app.get('/antique', listAntique);
app.get('/antique/:id', getAntique);
app.put('/antique/:id', updateAntique);
app.delete('/antique/:id', deleteAntique);

app.use(error404);
app.use(error500);

const shouldSyncOnStart = true;
async function start(port) {
  if (shouldSyncOnStart) {
    await db.sync();
  }
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
  app,
  start,
};
