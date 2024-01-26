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
        name: "Secluded Home with Views of Twin Peaks",
        description: "Discover a quiet, secluded retreat at the end of a small cul-de-sac on the north slope of Bernal Heights.",
        price: 374.0
      },
      {
        ownerId: 2,
        address: '1286 Golden Bear Trail',
        city: 'South Lake Tahoe',
        state: 'California',
        country: 'US',
        lat: 25.231,
        lng: 60.123,
        name: "South Lake Tahoe Vacation Rental",
        description: "This beautiful log chalet in South Lake Tahoe is the perfect vacation rental for a nature-filled getaway! This 3-bedroom, 2-bath home is a resort-style oasis, featuring a dry sauna, sweeping sunset views on the west-facing deck, picturesque floor-to-ceiling windows, and a cozy gas fireplace in the living room. Discover year-round outdoor adventure nearby, whether you hit the slopes of Heavenly Mountain Resort, explore the local hiking trails, or have a beach day on the shore of Lake Tahoe.",
        price: 505.0
      },
      {
        ownerId: 2,
        address: '2241 Central Ave',
        city: 'South El Monte',
        state: 'California',
        country: 'US',
        lat: 50.231,
        lng: 30.563,
        name: "New Deco 1B1B",
        description: "Newly decorated private 1B1B. You have your own entrance, bath room, kitchen and lightly shared backyard. 5 minutes drive to interstate highway 1-10 and California Route I-60, 10 minutes drive to Costco, Walmart and Target. Very nearby you can find one of Los Angeles County's largest and most popular recreation areas Whittier Narrows Recreation Area. With great Vietnamese, Mexico and Chinese food just around the corner, you will never get bored with food choices.",
        price: 89.0
      },
      {
        ownerId: 8,
        address: '3235 Myrtle Ave',
        city: 'San Diego',
        state: 'California',
        country: 'US',
        lat: 30.131,
        lng: 70.363,
        name: "Bungalow in Walkable North Park",
        description: "Originally constructed in 1921, this authentic craftsman has been restored keeping its original design elements intact including original ceiling beams, shaker doors, and redwood siding, while adding new modern elements and vintage finds.",
        price: 153.0
      },
      {
        ownerId: 8,
        address: '6360 Reseda Blvd',
        city: 'Encino',
        state: 'California',
        country: 'US',
        lat: 30.431,
        lng: 20.369,
        name: "Lovely Home with Fire Pit",
        description: "Enjoy a fresh, relaxed and modern stay in the heart of Encino Village, a central suburb to LA attractions.",
        price: 262.0
      },
      {
        ownerId: 7,
        address: '1533 Sul Ross St',
        city: 'Houston',
        state: 'Texas',
        country: 'US',
        lat: 21.231,
        lng: 19.123,
        name: "Montrose Retreat w/ King, Queen & Sofa",
        description: "Enjoy our Richmond House, the experience of a centrally-located duplex home in the heart of Houston - Montrose/Galleria. The clean and comfortable furnishings in this home blend cozy and inviting style with modern design. Thoughtfully designed with eclectic and playful décor items adorn each space providing a vibrant and inviting feel that allow one to escape and wind down from an activity-filled day.",
        price: 105.0
      },
      {
        ownerId: 7,
        address: '3615 107th St NW',
        city: 'Gig Harbor',
        state: 'Washington',
        country: 'US',
        lat: 30.941,
        lng: 14.431,
        name: "Magical Treehouse Like Living",
        description: "Life is easy at Eagle's Nest - 1.5 miles from Gig Harbor Bay! Surrounded by tree and valley views out the 24 large windows on 4 sides. The 1200 sq ft 2nd floor is all yours to relax in. The huge fully stocked kitchen will delight and nourish you. The vaulted ceilings will help your spirit soar!",
        price: 179.0
      },
      {
        ownerId: 7,
        address: '3457 60th Ave SW',
        city: 'Seattle',
        state: 'Washington',
        country: 'US',
        lat: 31.941,
        lng: 50.231,
        name: "Sound View Cabana",
        description: "Relax with the whole family at this peaceful place to stay. Views of the sound boast spectacular sunsets year round. The beach is a short walk down the neighborhood stairs just past the quaint Italian restaurant, La Rustica. If you’re up for a longer excursion, then a 15-20 min walk will lead you to the center of Alki with plenty of restaurants and activities for all!",
        price: 215.0
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Luxury Vacation House", "Trailside Home", "Secluded Home with Views of Skyline and Twin Peaks", "South Lake Tahoe Vacation Rental", "New Deco 1B1B", "Modern Bungalow in Walkable North Park", "Lovely Home with Fire Pit", "Montrose Retreat w/ King, Queen & Sofa", "Magical Treehouse Like Living", "Sound View Cabana"]}
    }, {});
  }
};
