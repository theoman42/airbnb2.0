"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Adam",
          lastName: "McDonald",
          email: "Adam@user.io",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Bill",
          lastName: "Johnson",
          email: "Bill@user.io",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Carter",
          lastName: "Lones",
          email: "Carter@user.io",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "David",
          lastName: "Starch",
          email: "David@user.io",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "Users",
      {
        email: {
          [Op.in]: [
            "Adam@user.io",
            "Bill@user.io",
            "Carter@user.io",
            "David@user.io",
          ],
        },
      },
      {}
    );
  },
};
