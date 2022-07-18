const { DataTypes } = require('sequelize');

const antique = (db) => {
  return db.define('Antique', {
    name: DataTypes.STRING,
    importance: DataTypes.ENUM('aesthetic', 'historical'),
  });
};

module.exports = {
  antique,
};
