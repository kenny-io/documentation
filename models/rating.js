'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    url: DataTypes.STRING,
    thumbs_up: DataTypes.INTEGER,
    thumbs_down: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};