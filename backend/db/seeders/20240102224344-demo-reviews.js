'use strict';

const { Review} = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: 'The location is not very convenient.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Amazing house. Love it!!!!',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Best vacation house ever.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: 'The place is very clean and cozy!',
        stars: 4
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
