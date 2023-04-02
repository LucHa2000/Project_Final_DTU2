"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //addColumn
    queryInterface.addConstraint("users", {
      fields: ["resumeID"],
      type: "foreign key",
      name: "document_role_association", // optional
      references: {
        table: "resumes",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
