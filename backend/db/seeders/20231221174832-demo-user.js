'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'Lition',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'chris.c.l@hotmail.com',
        firstName: 'Chris',
        lastName: 'Lee',
        username: 'Chrisl1219',
        hashedPassword: bcrypt.hashSync('secrectPassword')
      },
      {
        email: 'paul.m.h@gmail.com',
        firstName: 'Paul',
        lastName: 'Hemsworth',
        username: 'Paulh1113',
        hashedPassword: bcrypt.hashSync('secrectPassword1')
      },
      {
        email: 'janet.j@gmail.com',
        firstName: 'Janet',
        lastName: 'Jackson',
        username: 'jj0112',
        hashedPassword: bcrypt.hashSync('jjPassword!')
      },
      {
        email: 'sarah.d@gmail.com',
        firstName: 'Sarah',
        lastName: 'Dash',
        username: 'sdash0810',
        hashedPassword: bcrypt.hashSync('sdPassword')
      },
      {
        email: 'max.s@gmail.com',
        firstName: 'Max',
        lastName: 'Scherzer',
        username: 'mscherzer',
        hashedPassword: bcrypt.hashSync('msPassword')
      },
      {
        email: 'jay.z@gmail.com',
        firstName: 'Jay',
        lastName: 'Zhou',
        username: 'jzhou1019',
        hashedPassword: bcrypt.hashSync('jzPassword')
      },
      {
        email: 'annie.xie@gmail.com',
        firstName: 'Annie',
        lastName: 'Xia',
        username: 'axie2571',
        hashedPassword: bcrypt.hashSync('axPassword')
      },
      {
        email: 'alex.s@gmail.com',
        firstName: 'Alex',
        lastName: 'Smith',
        username: 'asmith7771',
        hashedPassword: bcrypt.hashSync('asPassword')
      },
      {
        email: 'alvin.t@gmail.com',
        firstName: 'Alvin',
        lastName: 'Thai',
        username: 'athai2364',
        hashedPassword: bcrypt.hashSync('atPassword')
      },
      {
        email: 'erica.m@gmail.com',
        firstName: 'Erica',
        lastName: 'Munsel',
        username: 'emunsel7854',
        hashedPassword: bcrypt.hashSync('emPassword')
      },

      {
        email: 'david.l@gmail.com',
        firstName: 'David',
        lastName: 'Liu',
        username: 'dliu8796',
        hashedPassword: bcrypt.hashSync('dlPassword')
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'Chrisl1219', 'Paulh1113', 'jj0112', 'sdash0810', 'mscherzer', 'jzhou1019', 'axie2571', 'asmith7771', 'athai2364', 'emunsel7854', 'dliu8796'] }
    }, {});
  }
};
