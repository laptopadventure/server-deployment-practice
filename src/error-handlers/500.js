'use strict';
const error500 = (req, res) => {
  res.status(500).send('500: serverside error');
};

module.exports = {
  error500,
};
