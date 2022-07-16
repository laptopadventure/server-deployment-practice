"use strict";
const validator = (req, res, next) => {
  if(!req.query.name) {
    throw new Error("Bad request: No name provided.")
  }
  next();
}

module.exports = {
  validator,
}
