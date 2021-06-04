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
    const listMenu = []

    const promises = restaurants.map(async (dataRestaurant, idx) => {
      const nameRestaurant = dataRestaurant.name
      const balanceRestaurant = dataRestaurant.balance
      const menuRestaurant = dataRestaurant.menu

      if (menuRestaurant !== null && menuRestaurant !== []) {
        await queryInterface.sequelize.query('SELECT * FROM "restaurants" WHERE name = ? AND balance = ?', {
          replacements: [nameRestaurant, balanceRestaurant],
          type: queryInterface.sequelize.QueryTypes.SELECT
        }).then(resp => {
          if (resp) {
            const idRestaurant = resp[0].id
            menuRestaurant.forEach(menu => {
              listMenu.push({
                id_restaurant: idRestaurant,
                name: menu.name,
                price: menu.price
              })
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    })

    await Promise.all(promises)
    if (listMenu) {
      await queryInterface.bulkInsert('menu_restaurants', listMenu, {})
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('menu_restaurants', null, {})
  }
}
