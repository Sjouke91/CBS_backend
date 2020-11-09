"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "the day we went to Texel",
          content: "very interesting story about all we did that weekend",
          imageUrl:
            "https://media.nhnieuws.nl/cache/i/399000/images/399296.w2000.r3-1.e2faa3c.q90.jpg",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sunday story",
          content: "Let me tell you about sunday",
          imageUrl:
            "https://www.fontfabric.com/wp-content/uploads/2018/11/sunday03-300x222.jpg",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Walking in the forrest",
          content:
            "Forrest City is a city in St. Francis County, Arkansas, United States, and the county seat.[3] It was named for General Nathan Bedford Forrest, who used the location as a campsite for a construction crew completing a railroad between Memphis and Little Rock, shortly after the Civil War. The population was 15,371 at the 2010 census, an increase from 14,774 in 2000. The city refers to itself as the Jewel of the Delta.[4]",
          imageUrl:
            "https://yogalondon.net/monkey/wp-content/uploads/2015/04/17484746256_8bfc5f4899_k.jpg",
          spaceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "My experience with Corona",
          content: "It is absolutely a terrible experience",
          imageUrl:
            "https://www.witsenkade.nl/wp-content/uploads/2020/03/Covid-1200x671.jpg",
          spaceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
