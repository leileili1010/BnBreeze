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
        stars: 2
      },
      {
        spotId: 1,
        userId: 11,
        review: 'Fair price and nice place, although it is kinda far away from the city.',
        stars: 3
      },
      {
        spotId: 1,
        userId: 12,
        review: 'This place is light, bright, and airy! The kitchen is well-stocked, and toiletries are available in the bathrooms',
        stars: 4
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Amazing house. Love it!!!!',
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: 'This place is convenient located to many local attractions, amazing restaurants and the university.',
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
      {
        spotId: 4,
        userId: 5,
        review: 'Wonderful place for us to stay. It has such a good view!',
        stars: 4
      },
      {
        spotId: 4,
        userId: 6,
        review: 'This home was cozy and super clean! Highly recommend for vacation!',
        stars: 5
      },
      {
        spotId: 6,
        userId: 12,
        review: 'We loved the host, such a sweet and nice person. Very kind and responsive if we ever needed anything!',
        stars: 5
      },
      {
        spotId: 7,
        userId: 9,
        review: 'Not a very pleasant experience here...',
        stars: 3
      },
      {
        spotId: 7,
        userId: 10,
        review: 'This place was excellent! We loved the easy access to LA attractions!',
        stars: 5
      },
      {
        spotId: 8,
        userId: 9,
        review: 'The area is a great place to stay in! Everything is clean and neighborhood is a nice area! Host was responsive. Would recommend staying here in Houston!',
        stars: 4
      },
      {
        spotId: 8,
        userId: 8,
        review: 'Very nicely decorated and clean but the toilet was not working which took the hose some time to got it fixed...',
        stars: 2
      },
      {
        spotId: 9,
        userId: 8,
        review: 'Beautiful space—clean and new with views of the trees and the bay. Looks like the pictures',
        stars: 5
      },
      {
        spotId: 10,
        userId: 5,
        review: 'So peaceful and serene. It was a great place to unwind and relax from the stress of life',
        stars: 4
      },
      {
        spotId: 10,
        userId: 8,
        review: 'A place to relax in the nature, while can still have close access to good restaurant ',
        stars: 5
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 6, 7, 8, 9, 10]}
    }, {});
  }
};
