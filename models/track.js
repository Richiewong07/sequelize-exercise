'use strict';
module.exports = (sequelize, DataTypes) => {
  var track = sequelize.define('track', {
    name: DataTypes.STRING,
    duration: DataTypes.TEXT,
  });

  track.associate = function(models) {
    track.belongsTo(models.album);
  };
  return track;
};
