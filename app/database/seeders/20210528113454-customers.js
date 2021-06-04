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

    const customers = require('../../dataset/users.json')
    const customersArray = []
    customers.forEach((dataCustomer) => {
      const location = dataCustomer.location
      const loc = location.split(',')
      const latitude = loc[0].trim()
      const longitude = loc[1].trim()

      customersArray.push({
        name: dataCustomer.name,
        latitude: latitude,
        longitude: longitude,
        balance: dataCustomer.balance
      })
    })

    await queryInterface.bulkInsert('customers', customersArray, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('customers', null, {})
  }
}
