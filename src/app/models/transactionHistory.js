"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionHistory.belongsTo(models.User);
      models.User.hasMany(TransactionHistory);

      TransactionHistory.belongsTo(models.Appointment);
      models.Appointment.hasOne(TransactionHistory);
    }
  }
  TransactionHistory.init(
    {
      userID: DataTypes.STRING,
      appointmentID: DataTypes.STRING,
      balance: DataTypes.FLOAT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TransactionHistory",
    }
  );
  return TransactionHistory;
};
