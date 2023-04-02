"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //addColumn
    queryInterface.addConstraint("users", {
      fields: ["roleID"],
      type: "foreign key",
      name: "user_role_association", // optional
      references: {
        table: "roles",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
