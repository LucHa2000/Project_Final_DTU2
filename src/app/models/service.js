"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.User);
      models.User.hasOne(Service);
    }
  }
  Service.init(
    {
      UserId: DataTypes.STRING,
      fee: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
