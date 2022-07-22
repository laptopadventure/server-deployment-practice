const { DataTypes } = require('sequelize');

function makeModels(db) {
  const Museum = db.define('Museum', {
    name: DataTypes.STRING,
  });

  const Painting = db.define('Painting', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    paintedDate: DataTypes.DATE,
  });

  const Antique = db.define('Antique', {
    name: DataTypes.STRING,
    importance: DataTypes.ENUM('aesthetic', 'historical'),
  });

  Museum.hasMany(Painting);
  Museum.hasMany(Antique);

  return { Museum, Painting, Antique };
}

module.exports = {
  makeModels,
};
