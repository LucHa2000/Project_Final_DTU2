"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.User);
      models.User.hasMany(Notification);

      Notification.belongsTo(models.Appointment);
      models.Appointment.hasMany(Notification);
    }
  }
  Notification.init(
    {
      AppointmentId: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      link: DataTypes.STRING,
      fromUserID: DataTypes.STRING,
      UserId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
