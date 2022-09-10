"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 1,
          spotId: 2,
          review:
            "Beautiful house with a cool doc. I recommend coming up when the lake is full.",
          stars: 4,
        },
        {
          userId: 1,
          spotId: 3,
          review:
            "Beautiful house. Perfect with plenty of beds and easy lake access. Great deck and yard with a nearby bbq makes for a perfect evening! Close walk to town with a fun bar aswell.",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 1,
          review: "Nice place for the homies",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 2,
          review: "Nice place for the home dawgs",
          stars: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Reviews", {}, {});
  },
};
