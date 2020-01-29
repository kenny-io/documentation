'use strict';
module.exports = (sequelize, DataTypes) => {
  const Algolia = sequelize.define('Algolia', {
    path: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Algolia.associate = function(models) {
    // associations can be defined here
  };
  return Algolia;
};