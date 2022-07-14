const person = (req, res) => {
  res.status(200).send({name: `${req.query.name} provided`})
}

module.exports = {
  person,
}
