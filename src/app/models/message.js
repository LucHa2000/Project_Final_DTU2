"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Message.belongsTo(models.User);
      // models.User.hasMany(Message);

      Message.belongsTo(models.Appointment);
      models.Appointment.hasMany(Message);
    }
  }
  Message.init(
    {
      userID: DataTypes.STRING,
      appointmentID: DataTypes.STRING,
      message: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
