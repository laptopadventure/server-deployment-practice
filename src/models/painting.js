const { DataTypes } = require('sequelize');

function painting(db) {
  return db.define('Painting', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    paintedDate: DataTypes.DATE,
  });
}

module.exports = {
  painting,
};
