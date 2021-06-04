import runSQL from '../../helpers/runSQL'
import {
  errorMessage,
  successMessage,
  status
} from '../../helpers/status'
// import redis from '../../config/redis'

const getById = async (id) => {
  const getQuery = 'SELECT * FROM restaurants WHERE id = $1'
  try {
    const { rows } = await runSQL.query(getQuery, [id])
    const dbResponse = rows[0]
    return { status: status.success, data: dbResponse }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Operation was not successful'
    return { status: status.error, data: errorMessage }
  }
}

const getAllOpenRestaurantsModel = async (day, time) => {
  const getAllQuery = 'SELECT restaurants.id, restaurants.name, business_hours.day, business_hours.opening_time, business_hours.closing_time FROM restaurants INNER JOIN business_hours ON business_hours.id_restaurant = restaurants.id WHERE business_hours.day=$1 AND business_hours.opening_time <= $2 AND business_hours.closing_time >= $3 '
  const value = [
    day,
    time,
    time
  ]

  try {
    const { rows } = await runSQL.query(getAllQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no a user type'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get a user typex'
    return { status: status.error, data: errorMessage }
  }
}

const getAllRestaurantsByNumberDishesModel = async (start, end) => {
  const getAllQuery = 'SELECT restaurants.id, restaurants.name, m.min_price, m.max_price, m.number_dishes FROM restaurants LEFT JOIN LATERAL (SELECT MIN(menu_restaurants.price) AS min_price, MAX(menu_restaurants.price) AS max_price, COUNT(menu_restaurants.name) AS number_dishes FROM menu_restaurants WHERE id_restaurant=restaurants.id LIMIT 1) AS m ON TRUE WHERE m.number_dishes >= $1 AND m.number_dishes <= $2 ORDER BY restaurants.name'
  const value = [
    start,
    end
  ]

  try {
    const { rows } = await runSQL.query(getAllQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no a user type'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get a user typex'
    return { status: status.error, data: errorMessage }
  }
}

const getAllRestaurantsByPriceRangeModel = async (start_price, end_price) => {
  const getAllQuery = "SELECT restaurants.id, restaurants.name, restaurants.latitude, restaurants.longitude, restaurants.balance, '' AS list_dish FROM restaurants INNER JOIN menu_restaurants ON menu_restaurants.id_restaurant=restaurants.id WHERE menu_restaurants.price BETWEEN $1 AND $2 "
  const value = [
    start_price,
    end_price
  ]

  try {
    const { rows } = await runSQL.query(getAllQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no a user type'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get a user typex'
    return { status: status.error, data: errorMessage }
  }
}

const getAllDishRestaurantsByIdModel = async (id) => {
  const getAllQuery = 'SELECT menu_restaurants.id, menu_restaurants.name, menu_restaurants.price FROM menu_restaurants WHERE menu_restaurants.id_restaurant = $1 '
  const value = [
    id
  ]

  try {
    const { rows } = await runSQL.query(getAllQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no a user type'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get a user typex'
    return { status: status.error, data: errorMessage }
  }
}

const getAllRestaurantsBySearchTermsDishAndRestaurantModel = async (terms) => {
  const getAllQuery = 'SELECT menu_restaurants.id as id_menu, restaurants.name as restaurant_name, menu_restaurants.name as menu_name FROM menu_restaurants INNER JOIN restaurants ON restaurants.id=menu_restaurants.id_restaurant WHERE LOWER(menu_restaurants.name) LIKE LOWER($1) OR LOWER(restaurants.name) LIKE LOWER($2) '
  const value = [
    '%' + terms + '%',
    '%' + terms + '%'
  ]

  try {
    const { rows } = await runSQL.query(getAllQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no a user type'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get a user typex'
    return { status: status.error, data: errorMessage }
  }
}

const getAllRestaurantsBySearchTermsDishesModel = async (terms) => {
  const getAllQuery = 'SELECT menu_restaurants.id as id_menu, restaurants.name as restaurant_name, menu_restaurants.name as menu_name FROM menu_restaurants INNER JOIN restaurants ON restaurants.id=menu_restaurants.id_restaurant WHERE LOWER(menu_restaurants.name) LIKE LOWER($1) '
  const value = [
    '%' + terms + '%'
  ]

  try {
    const { rows } = await runSQL.query(getAllQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no a user type'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get a user typex'
    return { status: status.error, data: errorMessage }
  }
}

const getMostPopularRestaurantsByAmountOrVolumeTransactionsModel = async (orderBy) => {
  let getAllQuery = ''
  switch (orderBy) {
    case 'transaction_amount':
      getAllQuery = 'SELECT restaurants.id, restaurants.name, m.transaction_volume, ROUND(m.transactions_amount::numeric, 2) as transactions_amount FROM restaurants LEFT JOIN LATERAL (SELECT SUM(purchase_orders.amount) AS transactions_amount, COUNT(purchase_orders.id) AS transaction_volume FROM menu_restaurants INNER JOIN purchase_orders ON purchase_orders.id_menu=menu_restaurants.id WHERE id_restaurant=restaurants.id LIMIT 1) AS m ON TRUE WHERE m.transactions_amount IS NOT NULL ORDER BY m.transactions_amount DESC'
      break

    case 'transaction_volume':
      getAllQuery = 'SELECT restaurants.id, restaurants.name, m.transaction_volume, ROUND(m.transactions_amount::numeric, 2) as transactions_amount FROM restaurants LEFT JOIN LATERAL (SELECT SUM(purchase_orders.amount) AS transactions_amount, COUNT(purchase_orders.id) AS transaction_volume FROM menu_restaurants INNER JOIN purchase_orders ON purchase_orders.id_menu=menu_restaurants.id WHERE id_restaurant=restaurants.id LIMIT 1) AS m ON TRUE WHERE m.transactions_amount IS NOT NULL ORDER BY m.transaction_volume DESC'
      break

    default:
      successMessage.status_code = status.success
      successMessage.data = []
      return { status: status.success, data: successMessage }
  }

  try {
    console.log(getAllQuery)
    const { rows } = await runSQL.query(getAllQuery)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no a user type'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get a user typex'
    return { status: status.error, data: errorMessage }
  }
}

const getNearestAllRestauranstModel = async (latitude, longitude) => {
  const getAllQuery = "SELECT restaurants.id, restaurants.name, restaurants.latitude, restaurants.longitude, ROUND(calculate_distance( $1, $2, latitude, longitude, 'K')::numeric, 2) AS distance, 'kilometers' AS unit_distance FROM restaurants ORDER BY distance ASC"
  const value = [
    latitude,
    longitude
  ]

  try {
    const { rows } = await runSQL.query(getAllQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no restaurant'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get restaurant'
    return { status: status.error, data: errorMessage }
  }
}

const getOpenHourRestaurantsPerDayOrWeekModel = async (type, start_hour, end_hour) => {
  let getAllQuery
  switch (type) {
    case 'per_day':
      getAllQuery = `
            SELECT restaurants.id, restaurants.name, m.working_hours_per_day FROM restaurants LEFT JOIN LATERAL (SELECT floor(get_different_hour(business_hours.opening_time, business_hours.closing_time)) AS working_hours_per_day FROM business_hours WHERE business_hours.id_restaurant=restaurants.id LIMIT 1) AS m ON TRUE WHERE m.working_hours_per_day IS NOT NULL AND m.working_hours_per_day >= $1 AND m.working_hours_per_day <= $2 ORDER BY restaurants.name ASC            
            `
      break

    case 'per_week':
      getAllQuery = `
            SELECT restaurants.id, restaurants.name, m.working_hours_per_week FROM restaurants LEFT JOIN LATERAL (SELECT SUM(floor(get_different_hour(business_hours.opening_time, business_hours.closing_time))) AS working_hours_per_week FROM business_hours WHERE business_hours.id_restaurant=restaurants.id LIMIT 1) AS m ON TRUE WHERE m.working_hours_per_week IS NOT NULL AND m.working_hours_per_week >= $1 AND m.working_hours_per_week <= $2 ORDER BY restaurants.name ASC
            `
      break
    default:
      successMessage.status_code = status.success
      successMessage.data = []
      return { status: status.success, data: successMessage }
  }

  const value = [
    start_hour,
    end_hour
  ]

  try {
    const { rows } = await runSQL.query(getAllQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no restaurant'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get restaurant'
    return { status: status.error, data: errorMessage }
  }
}

const updateBalance = async (id, newBalance) => {
  const updateQuery = `UPDATE restaurants SET
    balance=$1
    WHERE id=$2
    returning *`
  const values = [
    newBalance,
    id
  ]

  try {
    const { rows } = await runSQL.query(updateQuery, values)
    const dbResponse = rows[0]
    if (dbResponse === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no user'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.created
    successMessage.data = dbResponse
    return { status: status.created, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to add user'
    return { status: status.error, data: errorMessage }
  }
}

module.exports = {
  getById,
  getAllOpenRestaurantsModel,
  getNearestAllRestauranstModel,
  getAllRestaurantsBySearchTermsDishAndRestaurantModel,
  getAllRestaurantsByNumberDishesModel,
  getAllRestaurantsByPriceRangeModel,
  getAllDishRestaurantsByIdModel,
  getAllRestaurantsBySearchTermsDishesModel,
  getMostPopularRestaurantsByAmountOrVolumeTransactionsModel,
  getOpenHourRestaurantsPerDayOrWeekModel,
  updateBalance
}
