"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User);
      models.User.hasMany(Review);
    }
  }
  Review.init(
    {
      userID: DataTypes.STRING,
      reviewTitle: DataTypes.STRING,
      reviewContent: DataTypes.STRING,
      starNo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
