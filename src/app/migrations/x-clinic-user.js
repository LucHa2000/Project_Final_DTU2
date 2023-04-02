"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint("users", {
      fields: ["clinicID"],
      type: "foreign key",
      name: "user_clinic_association", // optional
      references: {
        table: "clinics",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
