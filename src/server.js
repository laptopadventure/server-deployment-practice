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

const { db, Museum, Painting, Antique } = require('./db');
const { Collection } = require('./models/collection');

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

//models

new Collection(Museum, app, 'museum');
new Collection(Painting, app, 'painting');
new Collection(Antique, app, 'antique');

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
