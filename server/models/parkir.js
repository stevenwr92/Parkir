"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parkir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parkir.init(
    {
      type: DataTypes.STRING,
      entrance: DataTypes.DATE,
      exit: DataTypes.DATE,
      time: DataTypes.STRING,
      fee: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Parkir",
    }
  );
  return Parkir;
};
