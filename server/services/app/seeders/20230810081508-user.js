"use strict";
const data = require("../data/users.json");
const { hashSync } = require("bcryptjs");

data.forEach((el) => {
  el.password = hashSync(el.password);
  el.createdAt = new Date();
  el.updatedAt = new Date();
  delete el.id;
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  },
};
