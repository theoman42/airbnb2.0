"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "111 Adam St.",
        city: "Dallas",
        state: "TX",
        country: "USA",
        lat: 38.8951,
        lng: -77.0364,
        name: "Homey Home for the Homies",
        description:
          "A home once enjoyed by the homies, now available to the homies.",
        price: 50.93,
      },
      {
        ownerId: 2,
        address: "222 Bill St.",
        city: "Dallas",
        state: "TX",
        country: "USA",
        lat: 41.8951,
        lng: -79.0364,
        name: "2nd Homey Home for the Homies",
        description:
          "Also a home once enjoyed by the homies, now available to the homies.",
        price: 55.93,
        previewImage:
          "https://airbnb-project.s3.us-west-2.amazonaws.com/Spot+2/0829d033-7374-4858-9450-28b53fdf4fb7.webp",
      },
      {
        ownerId: 3,
        address: "333 Carter St.",
        city: "Dallas",
        state: "TX",
        country: "USA",
        lat: 51.8251,
        lng: -29.0364,
        name: "3rd Homey Home for the Homies",
        description:
          "3rd home once enjoyed by the homies, now available to the homies.",
        price: 25.93,
        previewImage:
          "https://airbnb-project.s3.us-west-2.amazonaws.com/Spot+3/67355412-eee4-48bd-9151-1e31e49200d7.webp",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        address: {
          [Op.in]: ["111 Adam St.", "222 Bill St.", "333 Carter St."],
        },
      },
      {}
    );
  },
};
