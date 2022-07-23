"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Images",
      [
        {
          imageableId: 1,
          spotId: 1,
          reviewId: null,
          url: "google.com/images",
        },
        {
          imageableId: 2,
          spotId: null,
          reviewId: 1,
          url: "google.com/images/nice",
        },
        {
          imageableId: 2,
          spotId: 2,
          reviewId: null,
          url: "google.com/images",
        },
        {
          imageableId: 3,
          spotId: null,
          reviewId: 2,
          url: "google.com/images/nice",
        },
        {
          imageableId: 4,
          spotId: 3,
          reviewId: null,
          url: "google.com/images",
        },
        {
          imageableId: 2,
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
