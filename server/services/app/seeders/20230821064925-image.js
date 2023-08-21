'use strict';
const data = require("../data/images.json");

data.forEach((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  }
};
