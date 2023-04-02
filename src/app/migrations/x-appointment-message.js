"use strict";
const { query } = require("express");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint("messages", {
      fields: ["appointmentID"],
      type: "foreign key",
      name: "appointment_message_association", // optional
      references: {
        table: "appointments",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
