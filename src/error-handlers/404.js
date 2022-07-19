'use strict';
const error404 = (req, res) => {
  res.status(404).send('404: not found');
};

module.exports = {
  error404,
};
