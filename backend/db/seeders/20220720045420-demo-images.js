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
          url: "https://airbnb-project.s3.us-west-2.amazonaws.com/Spot+1/c21aad0e-876e-49b1-adb4-c08b2d5d1c96.webp",
        },
        {
          imageableId: 2,
          spotId: null,
          reviewId: 1,
          url: "https://airbnb-project.s3.us-west-2.amazonaws.com/Spot+1/99b68f26-5d8a-42c8-8c0f-0a7515d29e4e.webp",
        },
        {
          imageableId: 2,
          spotId: 2,
          reviewId: null,
          url: "https://airbnb-project.s3.us-west-2.amazonaws.com/Spot+2/8b49998c-569b-498d-8946-820a1a9f8633.webp",
        },
        {
          imageableId: 3,
          spotId: null,
          reviewId: 2,
          url: "https://airbnb-project.s3.us-west-2.amazonaws.com/Spot+2/dac827d9-764a-46ab-8a7a-949af4db4eeb.webp",
        },
        {
          imageableId: 4,
          spotId: 3,
          reviewId: null,
          url: "https://airbnb-project.s3.us-west-2.amazonaws.com/Spot+3/7d252638-d8aa-4e6f-93a6-655b0411c0a8.webp",
        },
        {
          imageableId: 2,
          spotId: 4,
          reviewId: null,
          url: "https://airbnb-project.s3.us-west-2.amazonaws.com/Spot+1/e016155e-6c0c-43dc-9b5d-56eda83cd9bf.webp",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", {}, {});
  },
};
