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
        address: '555 Wayne Lane',
        city: 'Gothamhattan',
        state: 'New Gotham Jersey',
        country: 'United States of Boop',
        lat: 40.27107528136394,
        lng: -111.02102875668326,
        name: 'Ultimately Abyssal Alcove',
        description: 'Neo-noir darkness darking up the dark.',
        price: 50003.00
      },
      {
        ownerId: 2,
        address: '4444 NewJeans StillBetter Av',
        city: 'Kwangya',
        state: 'Virtual Wilderness State',
        country: 'Republic of Aespa',
        lat: 78.98711575011169,
        lng: -95.57833823015774,
        name: 'SYNK dive',
        description: 'Formless, limitless place of infinite energy and data',
        price: 4444.00
      }, {
        ownerId: 3,
        address: '1337 Poets Street',
        city: 'Fluffy Bear City',
        state: 'Neo Texas',
        country: 'United States of Boop',
        lat: 55.98711575011169,
        lng: -80.57833823015774,
        name: 'Shelves of Curiosities',
        description: 'Read for fun and your brain will be 1.15x bigger',
        price: 3000.00
      },
      {
        ownerId: 1,
        address: '782 Discus',
        city: 'New Yeet City',
        state: 'Yeetah',
        country: 'United States of Boop',
        lat: 43.98711575011169,
        lng: -88.57833823015774,
        name: 'Yeeting Paradise',
        description: "Yeet here and reach yeetlightenment",
        price: 1000.00
      },
      {
        ownerId: 3,
        address: '4156 Rage Street',
        city: 'Empire City',
        state: 'Arcadia',
        country: 'United States of Boop',
        lat: 35.98711575011169,
        lng: -90.57833823015774,
        name: 'Barcade',
        description: "Button mash harder the more wasted you are",
        price: 400.00
      },
      {
        ownerId: 5,
        address: '999 Imean Business Lane',
        city: 'Dollarville',
        state: 'Moneyland',
        country: 'United States of Boop',
        lat: 77.98711575011169,
        lng: -82.57833823015774,
        name: 'Skyscraper Social',
        description: "Feel important while flaunting a fake Rolex",
        price: 25.00
      },
      {
        ownerId: 6,
        address: '9000 Boombayah Av',
        city: 'Blinktown',
        state: 'Yeetah',
        country: 'United States of Boop',
        lat: 43.98711575011169,
        lng: -88.57833823015774,
        name: 'Blackpink House',
        description: "We must kill this love. Sad. But True.",
        price: 4342.00
      },
      {
        ownerId: 2,
        address: '1753 Bassoon Road',
        city: 'Karaokeville',
        state: 'Singtucky',
        country: 'United States of Boop',
        lat: 43.98711575011169,
        lng: -88.57833823015774,
        name: 'Offkey Noteroom',
        description: "Bellow until your voice is mellow",
        price: 325.00
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['555 Wayne Lane', '4444 NewJeans StillBetter Av',
      '1337 Poets Street', '782 Discus', '4156 Rage Street', '999 Imean Business Lane',
    '9000 Boombayah Av', '1753 Bassoon Road'] }
    }, {});
  }
};
