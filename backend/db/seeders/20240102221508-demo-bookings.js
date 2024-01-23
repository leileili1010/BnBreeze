'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-12-19',
        endDate: '2023-12-22'
      },
      {
        spotId: 1,
        userId: 11,
        startDate: '2023-5-2',
        endDate: '2023-5-7'
      },
      {
        spotId: 1,
        userId: 12,
        startDate: '2023-3-2',
        endDate: '2023-3-4'
      },
      {
        spotId: 2,
        userId: 4,
        startDate: '2023-11-19',
        endDate: '2023-11-24'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-2-19',
        endDate: '2023-2-22'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-10-11',
        endDate: '2023-10-17'
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2023-12-21',
        endDate: '2023-12-25'
      },
      {
        spotId: 4,
        userId: 5,
        startDate: '2023-1-21',
        endDate: '2023-1-24'
      },
      {
        spotId: 4,
        userId: 6,
        startDate: '2023-12-1',
        endDate: '2023-12-5'
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2024-3-21',
        endDate: '2024-3-25'
      },
      {
        spotId: 6,
        userId: 12,
        startDate: '2023-4-10',
        endDate: '2023-4-15'
      },
      {
        spotId: 6,
        userId: 11,
        startDate: '2024-7-15',
        endDate: '2024-7-21'
      },
      {
        spotId: 7,
        userId: 12,
        startDate: '2024-6-15',
        endDate: '2024-6-20'
      },
      {
        spotId: 7,
        userId: 9,
        startDate: '2024-1-1',
        endDate: '2024-1-5'
      },
      {
        spotId: 7,
        userId: 10,
        startDate: '2024-1-10',
        endDate: '2024-1-16'
      },
      {
        spotId: 8,
        userId: 9,
        startDate: '2023-8-1',
        endDate: '2023-8-5'
      },
      {
        spotId: 8,
        userId: 8,
        startDate: '2023-9-10',
        endDate: '2023-9-14'
      },
      {
        spotId: 8,
        userId: 10,
        startDate: '2024-5-1',
        endDate: '2024-5-16'
      },
      {
        spotId: 9,
        userId: 8,
        startDate: '2023-10-1',
        endDate: '2023-10-7'
      },
      {
        spotId: 9,
        userId: 1,
        startDate: '2024-5-7',
        endDate: '2024-5-19'
      },
      {
        spotId: 10,
        userId: 5,
        startDate: '2023-11-7',
        endDate: '2023-11-18'
      },
      {
        spotId: 10,
        userId: 8,
        startDate: '2023-3-7',
        endDate: '2023-3-12'
      },
      {
        spotId: 10,
        userId: 2,
        startDate: '2024-6-21',
        endDate: '2024-6-25'
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    }, {});
  }
};
