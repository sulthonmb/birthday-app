'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const restaurants = require('../../dataset/restaurants.json')
    const restaurantsArray = []
    restaurants.forEach((dataRestaurant) => {
      const location = dataRestaurant.location
      const loc = location.split(',')
      const latitude = loc[0].trim()
      const longitude = loc[1].trim()

      restaurantsArray.push({
        name: dataRestaurant.name,
        latitude: latitude,
        longitude: longitude,
        balance: dataRestaurant.balance
      })
    })

    await queryInterface.bulkInsert('restaurants', restaurantsArray, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('restaurants', null, {})
  }
}
