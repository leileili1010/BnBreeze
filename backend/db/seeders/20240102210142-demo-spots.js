'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 6,
        address: '456 Universal Lane',
        city: 'Orlando',
        state: 'Florida',
        country: 'US',
        lat: 25.123,
        lng: 12.123,
        name: "Luxury Vacation House",
        description: "This is a brand new, fully remodeled vacation house. We have a big backyard with an outside dining area for you to enjoy your holiday.",
        price: 323.0
      },
      {
        ownerId: 5,
        address: '4405 Foster St',
        city: 'Castro Valley',
        state: 'California',
        country: 'US',
        lat: 28.231,
        lng: 15.123,
        name: "Trailside Home",
        description: "Discover this secluded hideaway located in the serene hills of Castro Valley just steps away from dozens of maintained hiking and bike trails.",
        price: 550.0
      },
      {
        ownerId: 5,
        address: '2020 Broderick St',
        city: 'San Francisco',
        state: 'California',
        country: 'US',
        lat: 22.231,
        lng: 16.123,
        name: "Secluded Home with Views of Skyline and Twin Peaks",
        description: "Discover a quiet, secluded retreat at the end of a small cul-de-sac on the north slope of Bernal Heights.",
        price: 374.0
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Luxury Vacation House", "Trailside Home", "Secluded Home with Views of Skyline and Twin Peaks"]}
    }, {});
  }
};
