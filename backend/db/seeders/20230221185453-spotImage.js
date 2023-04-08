'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://www.rollingstone.com/wp-content/uploads/2021/06/aespa-group-image-no-watermark.jpg?w=1581&h=1054&crop=1',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://media.easemytrip.com/media/Blog/International/636951810748079878/636951810748079878tEhaoI.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i0.wp.com/unusualplaces.org/wp-content/uploads/2020/11/214-bubble-palace.jpg?ssl=1',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
