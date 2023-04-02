"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Resume);
      models.Resume.hasOne(User);

      User.belongsTo(models.Role);
      models.Role.hasOne(User);

      User.belongsTo(models.Clinic);
      models.Clinic.hasOne(User);
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      balance: DataTypes.FLOAT,
      lastName: DataTypes.STRING,
      image: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      resumeID: DataTypes.STRING,
      clinicID: DataTypes.STRING,
      roleID: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
