// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };

'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1337 Kewl Avenue',
        city: 'Lelel',
        state: 'Demo-lition',
        country: 'United States of Boop',
        lat: 40.27107528136394,
        lng: -111.02102875668326,
        name: 'BoopBoopBaLooop',
        description: 'A weally weally cool place',
        price: 80.00
      },
      {
        ownerId: 2,
        address: '0000 Chill Avenue',
        city: 'Lelel',
        state: 'Demo-lition',
        country: 'United States of Boop',
        lat: 43.98711575011169,
        lng: -88.57833823015774,
        name: 'BoopBoopBaLooop',
        description: 'Waterfalls and unicorns',
        price: 80.00
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['1337 Kewl Avenue', '0000 Chill Avenue'] }
    }, {});
  }
};
