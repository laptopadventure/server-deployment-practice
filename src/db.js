'use strict';
const { Sequelize } = require('sequelize');
require('dotenv').config();
const { painting } = require('./models/painting');
const { antique } = require('./models/antique');

let connection_string;
let shouldLog = true;
switch (process.env.NODE_ENV) {
  case 'production':
    console.log('using production');
    connection_string = process.env.POSTGRES_URI;
    break;
  case 'test':
    //notably does not break here
    shouldLog = false;
  case 'dev':
    console.log('using dev');
    connection_string = 'sqlite::memory:';
    break;
  case 'staging':
  default:
    console.log('using staging');
    connection_string = `sqlite:${process.env.SQLITE_FILE}`;
}

const db = new Sequelize(connection_string, {
  dialectOptions: {
    require: true,
    rejectUnauthorized: false,
  },
  logging: (shouldLog && console.log) || null,
});

module.exports = {
  db,
  Painting: painting(db),
  Antique: antique(db),
};
