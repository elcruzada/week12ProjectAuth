'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Bat',
        lastName: 'Boy',
        email: 'batboy@user.io',
        username: 'BatDeepDup',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ningning',
        lastName: 'Winter',
        email: 'giselle@sm.io',
        username: 'DreamsComeTrue',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Effie',
        lastName: 'Kwuzata',
        email: 'effie@boop.io',
        username: 'Ef',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Yeet',
        lastName: 'Yeeterson',
        email: 'yeet@yeetme.io',
        username: 'theYeet',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Suit',
        lastName: 'McSuiterson',
        email: 'metasuit@king.io',
        username: 'SuperSeriousBusinessDude',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Lisa',
        lastName: 'Manobal',
        email: 'lalisa@blackpink.io',
        username: 'Bestpink',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['BatDeepDup', 'DreamsComeTrue',
      'Ef', 'theYeet', 'SuperSeriousBusinessDude', 'Bestpink'] }
    }, {});
  }
};
