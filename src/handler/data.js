"use strict";
const data = (req, res) => {
  res.status(200).send({
      name: "David",
      role: "Instructor",
  });
};

module.exports = {
  data,
}
