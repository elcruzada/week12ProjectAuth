'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 5,
        review: 'Best place ever',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Love!',
        stars: 3
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Everyone was great here!',
        stars: 1
      },
      {
      spotId: 1,
      userId: 2,
      review: 'Wow!',
      stars: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
