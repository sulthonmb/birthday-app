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
    const purchasesArray = []

    const promises = customers.map(async (dataCustomer, idx) => {
      const nameCustomer = dataCustomer.name
      const balanceCustomer = dataCustomer.balance
      const purchasesCustomer = dataCustomer.purchases
      let idCustomer = ''

      if (purchasesCustomer !== null && purchasesCustomer !== []) {
        await queryInterface.sequelize.query('SELECT * FROM "customers" WHERE name = ? AND balance = ?', {
          replacements: [nameCustomer, balanceCustomer],
          type: queryInterface.sequelize.QueryTypes.SELECT
        }).then((respCustomer) => {
          if (respCustomer) {
            idCustomer = respCustomer[0].id
          }
        }).then(async () => {
          if (idCustomer) {
            const promisesPurchases = purchasesCustomer.map(async (dataPurchase, idx) => {
              const dish = dataPurchase.dish
              const restaurantName = dataPurchase.restaurant_name
              const amount = dataPurchase.amount
              const date = dataPurchase.date

              await queryInterface.sequelize.query('SELECT menu_restaurants.id, menu_restaurants.name as menu, restaurants.name as restaurant_name  FROM restaurants INNER JOIN menu_restaurants ON restaurants.id = menu_restaurants.id_restaurant WHERE restaurants.name = ? AND menu_restaurants.name = ?', {
                replacements: [restaurantName, dish],
                type: queryInterface.sequelize.QueryTypes.SELECT
              }).then(async (respRestaurant) => {
                if (respRestaurant) {
                  const idMenu = respRestaurant[0].id

                  purchasesArray.push({
                    id_customer: idCustomer,
                    id_menu: idMenu,
                    amount: amount,
                    purchased_at: date
                  })
                }
              })
            })

            await Promise.all(promisesPurchases)
          }
        })
      }
    })

    await Promise.all(promises)
    if (purchasesArray) {
      await queryInterface.bulkInsert('purchase_orders', purchasesArray, {})
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('purchase_orders', null, {})
  }
}
