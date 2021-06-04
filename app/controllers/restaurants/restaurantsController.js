import {
  status
} from '../../helpers/status'

import {
  getAllOpenRestaurantsModel,
  getNearestAllRestauranstModel,
  getAllRestaurantsBySearchTermsDishAndRestaurantModel,
  getAllRestaurantsByNumberDishesModel,
  getAllRestaurantsByPriceRangeModel,
  getAllDishRestaurantsByIdModel,
  getAllRestaurantsBySearchTermsDishesModel,
  getMostPopularRestaurantsByAmountOrVolumeTransactionsModel,
  getOpenHourRestaurantsPerDayOrWeekModel
} from '../../models/restaurants/restaurantModel'

const getAllOpenRestaurant = async (req, res) => {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  try {
    const { datetime } = req.query
    const dt = new Date(datetime)
    if (dt.getTime() > 0) {
      const day = days[dt.getDay()]
      const time = dt.toLocaleTimeString()

      const response = await getAllOpenRestaurantsModel(day, time)
      return res.status(response.status).send(response.data)
    } else {
      return res.status(status.notvalid).send({
        status: 'error',
        status_code: status.notvalid,
        error: [{ datetime: 'start must be in correct format yyyy-mm-dd hh:mm:ss' }]
      })
    }
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getNearestAllRestauranst = async (req, res) => {
  try {
    const { lat, long } = req.query
    const response = await getNearestAllRestauranstModel(lat, long)
    return res.status(response.status).send(response.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getAllRestaurantByNumberDishes = async (req, res) => {
  try {
    const { start, end } = req.query
    const response = await getAllRestaurantsByNumberDishesModel(start, end)
    return res.status(response.status).send(response.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getAllRestaurantByPriceRange = async (req, res) => {
  try {
    const { start_price, end_price } = req.query
    const respAllRestaurantsByPriceRange = await getAllRestaurantsByPriceRangeModel(start_price, end_price)
    const data = respAllRestaurantsByPriceRange.data.data
    if (data && data !== []) {
      let i = 0
      for (i = 0; i < data.length; i++) {
        const id_restaurant = data[i].id
        const listDish = await getAllDishRestaurantsByIdModel(id_restaurant)
        data[i].list_dish = listDish.data.data
      }
    }
    respAllRestaurantsByPriceRange.data.data = data

    return res.status(respAllRestaurantsByPriceRange.status).send(respAllRestaurantsByPriceRange.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getAllRestaurantsBySearchTermsDishAndRestaurant = async (req, res) => {
  try {
    const { terms } = req.query
    const response = await getAllRestaurantsBySearchTermsDishAndRestaurantModel(terms)
    return res.status(response.status).send(response.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getAllRestaurantBySearchTermsDishes = async (req, res) => {
  try {
    const { terms } = req.query
    const response = await getAllRestaurantsBySearchTermsDishesModel(terms)
    return res.status(response.status).send(response.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getAllMostRestaurantByAmountOrVolumeTransactions = async (req, res) => {
  try {
    const { order_by } = req.query
    const response = await getMostPopularRestaurantsByAmountOrVolumeTransactionsModel(order_by)
    return res.status(response.status).send(response.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getOpenHourRestaurantsPerDayOrWeek = async (req, res) => {
  try {
    const { type, start_hour, end_hour } = req.query
    const response = await getOpenHourRestaurantsPerDayOrWeekModel(type, start_hour, end_hour)
    return res.status(response.status).send(response.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

export {
  getAllOpenRestaurant,
  getNearestAllRestauranst,
  getAllRestaurantByNumberDishes,
  getAllRestaurantByPriceRange,
  getAllRestaurantsBySearchTermsDishAndRestaurant,
  getAllRestaurantBySearchTermsDishes,
  getAllMostRestaurantByAmountOrVolumeTransactions,
  getOpenHourRestaurantsPerDayOrWeek
}
