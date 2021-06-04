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
    function parseDay (day) {
      if (day.length <= 5) {
        switch (day) {
          case 'Sun':
            return 'Sunday'

          case 'Mon':
            return 'Monday'

          case 'Tue':
            return 'Tuesday'

          case 'Tues':
            return 'Tuesday'

          case 'Wed':
            return 'Wednesday'

          case 'Weds':
            return 'Wednesday'

          case 'Thu':
            return 'Thursday'

          case 'Thur':
            return 'Thursday'

          case 'Thurs':
            return 'Thursday'

          case 'Fri':
            return 'Friday'

          case 'Sat':
            return 'Saturday'

          default:
            return null
        }
      } else {
        return day
      }
    }

    function parseTime (timeString) {
      if (timeString === '') return null

      var time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i)
      if (time === null) return null

      var hours = parseInt(time[1], 10)
      if (hours === 12 && !time[4]) {
        hours = 0
      } else {
        hours += (hours < 12 && time[4]) ? 12 : 0
      }
      var d = new Date()
      d.setHours(hours)
      d.setMinutes(parseInt(time[3], 10) || 0)
      d.setSeconds(0, 0)
      return ((d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds())
    }

    function getListDay (day) {
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      if (day.includes('-')) {
        const tmp = day.split('-')
        const indexStart = days.indexOf(parseDay(tmp[0].trim()))
        const indexEnd = days.indexOf(parseDay(tmp[1].trim()))

        let listDays = []
        if (indexStart <= indexEnd) {
          for (let index = indexStart; index <= indexEnd; index++) {
            listDays.push(days[index])
          }
        } else if (indexStart - indexEnd === 1) {
          listDays = days
        } else if (indexStart - indexEnd === 0) {
          listDays.push(days[indexStart])
        } else {
          for (let index = indexStart; index !== (indexEnd + 1); index++) {
            listDays.push(days[index])
            if (index === (days.length - 1)) {
              index = 0
              listDays.push(days[index])
            }
          }
        }

        return listDays
      } else {
        const listDays = day.split(',')
        listDays.forEach((val, index) => {
          listDays[index] = parseDay(val.trim())
        })

        return listDays
      }
    }

    const restaurants = require('../../dataset/restaurants.json')
    const listBusinessHours = []

    const promises = restaurants.map(async (dataRestaurant, idx) => {
      const nameRestaurant = dataRestaurant.name
      const balanceRestaurant = dataRestaurant.balance
      const businessHours = dataRestaurant.business_hours

      if (businessHours != null) {
        const dayTime = businessHours.split('|')
        await queryInterface.sequelize.query('SELECT * FROM "restaurants" WHERE name = ? AND balance = ?', {
          replacements: [nameRestaurant, balanceRestaurant],
          type: queryInterface.sequelize.QueryTypes.SELECT
        }).then(id_restaurant => {
          if (id_restaurant) {
            dayTime.forEach((timeOpen) => {
              const tmp = timeOpen.trim().split(': ')
              const day = tmp[0].trim()
              const listDays = getListDay(day)

              const time = tmp[1].trim().split('-')
              const opening = parseTime(time[0].trim())
              const closing = parseTime(time[1].trim())

              listDays.forEach((getDay) => {
                listBusinessHours.push({
                  id_restaurant: id_restaurant[0].id,
                  day: getDay,
                  opening_time: opening,
                  closing_time: closing
                })
              })
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        console.log(nameRestaurant)
        console.log('kosong')
      }
    })

    await Promise.all(promises)
    if (listBusinessHours) {
      await queryInterface.bulkInsert('business_hours', listBusinessHours, {})
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('business_hours', null, {})
  }
}
