"use strict";
const { query } = require("express");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint("notifications", {
      fields: ["AppointmentId"],
      type: "foreign key",
      name: "appointment_notification_association",
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
