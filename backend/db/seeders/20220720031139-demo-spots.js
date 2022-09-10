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
        name: "Entire vacation home hosted by Sherrie And Chris",
        description:
          "This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove.",
        price: 50.93,
        previewImage:
          "https://airbnb-project.s3.us-west-2.amazonaws.com/Spot+1/0425a5a1-394e-4371-8bf8-506016d39fd6.webp",
      },
      {
        ownerId: 2,
        address: "222 Bill St.",
        city: "Dallas",
        state: "TX",
        country: "USA",
        lat: 41.8951,
        lng: -79.0364,
        name: "A Homey Home for the Homies",
        description:
          "You have found your ultimate romantic getaway! Peaceful and serene, be at one with nature and the wildlife on the lake.",
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
        name: "Rubicon Bay Lake Front - Private Dock, Buoy, Playground and Sandy Beach",
        description:
          "IMPORTANT - All Rates and Cleaning Fee Include all local Occupancy Taxes. A Damage Waiver Fee is also included.",
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
