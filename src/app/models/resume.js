"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Resume.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      attachments: DataTypes.STRING,
      starNo: DataTypes.INTEGER,
      isVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Resume",
    }
  );
  return Resume;
};
