'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-973239840641845086/original/28e11a9e-140b-4e1c-babd-2441977590f6.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-973239840641845086/original/7f8e449f-9636-4fb3-a963-89be0cc1a9b3.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-973239840641845086/original/b4ff9dee-d09d-4c0e-9c60-279449177732.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-973239840641845086/original/e4dec042-67d0-42db-ab61-72bd713afdf6.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-973239840641845086/original/b2e911a0-1c66-40d2-b3b6-0f452f68799e.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-946008157830698720/original/4a225834-53ad-4b7b-a923-619dba164b57.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-946008157830698720/original/05b67e81-359e-4a4e-8584-3d95195af530.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-946008157830698720/original/462db298-c809-4c95-86e5-f4e73d232fd1.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-946008157830698720/original/5a5def7c-4e78-48de-8bca-57aa181f8f9c.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-946008157830698720/original/64aa0773-f469-4bd4-8c6f-86158d34657f.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-873277610140325106/original/470b36e6-196b-402d-9df0-d765e4395c96.png?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-924767829543969861/original/2a01127f-665a-4580-b2c3-b608733cddfa.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-924767829543969861/original/a7e1ceec-dd75-4f58-a4ac-1c53d31333e9.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-924767829543969861/original/1f616fcc-5ebe-464b-9412-6da20bcefbb0.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-28867857/original/d6dc2145-3f62-492f-9c01-33077c417646.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-28867857/original/ac33dbd7-69d9-453f-8d09-2f5775783a0a.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-28867857/original/37fc00cf-5f0d-4ad3-ad0d-d18f36f667be.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-28867857/original/80153d58-c792-450e-8b28-77520e5c7c6e.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-28867857/original/c25f53ef-7934-4822-a9df-5326fc5bf6c1.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-28867857/original/e7698803-f551-4e30-bacd-0bcead461c03.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/95fcd070-1916-4aa4-b2dd-67c83f0b6cd3.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/86ba4bda-59fb-4d1a-b52c-5156984a166d.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/8909a5df-9df1-4eda-b0de-454c6378058d.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-4580677/original/580b1f23-8176-4892-96e5-44027378e5a1.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-4580677/original/50a69679-84a8-4687-b421-886a978dfb75.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-4580677/original/630732d8-70fb-47b7-a750-58fa83ad902e.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-699310106330789891/original/f42ef35e-6de7-4a50-aeaa-8ad88a5338dd.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-699310106330789891/original/506b004f-5f9b-453d-8b23-46a7f5dc65cb.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-699310106330789891/original/ad50ae34-129b-47ae-b3ef-5667b7c96aa2.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-699310106330789891/original/70234783-2076-41ed-84f1-e86de016c0d2.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-699310106330789891/original/3de89c53-b906-4de5-a685-5bb7222150ad.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-54119513/original/ec64fefb-862c-4f46-a6c4-31dc2618a5b2.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-54119513/original/ff395259-a4c7-4994-97b8-a38d462678be.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-54119513/original/f0a62946-1d10-4dd5-b2d0-450101b41f5f.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-54119513/original/b38c0c49-e19f-45d7-8bcc-f1ecf01ee019.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-54119513/original/7306ad37-6567-4cff-bee9-797d6ce58100.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-951364248872914376/original/3a68e4a3-e512-428a-957c-af4359c1f315.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-951364248872914376/original/10056b50-602e-4c50-b8ca-4a09d6db5f58.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-951364248872914376/original/f21edd26-34a4-4007-b25e-78cf42900807.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-951364248872914376/original/b08fb20d-2c39-4ff0-80bd-142e600ac134.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-776989445803494118/original/eb203c0d-d1d1-4501-a63a-2456f722f192.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-776989445803494118/original/8a385773-08cb-4116-a972-99ff2b1201b1.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-776989445803494118/original/aaa03399-159b-4dcd-90ff-5085e70b16d4.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-776989445803494118/original/d54d0e20-57a9-4220-b8ab-4bbfd26569e5.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-776989445803494118/original/c28a75a2-c8b1-497b-bf0e-2ede0545afe3.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-776989445803494118/original/c28a75a2-c8b1-497b-bf0e-2ede0545afe3.jpeg?im_w=1200",
        preview: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    }, {});
  }
};
