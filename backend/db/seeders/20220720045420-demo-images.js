"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Images",
      [
        {
          spotId: 1,
          reviewId: null,
          url: "google.com/images",
        },
        {
          spotId: null,
          reviewId: 1,
          url: "google.com/images/nice",
        },
        {
          spotId: 2,
          reviewId: null,
          url: "google.com/images",
        },
        {
          spotId: null,
          reviewId: 2,
          url: "google.com/images/nice",
        },
        {
          spotId: 3,
          reviewId: null,
          url: "google.com/images",
        },
        {
          spotId: 4,
          reviewId: null,
          url: "google.com/images/nice",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", {}, {});
  },
};
