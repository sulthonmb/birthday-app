import runSQL from '../../helpers/runSQL'
import {
  errorMessage,
  successMessage,
  status
} from '../../helpers/status'
// import redis from '../../config/redis'

const getAllTransactionsByRestaurantsModel = async (id) => {
  const getQuery = 'SELECT purchase_orders.id, customers.name, purchase_orders.amount, menu_restaurants.name as menu_name, restaurants.name as restaurant_name, purchase_orders.purchased_at FROM purchase_orders INNER JOIN menu_restaurants ON menu_restaurants.id=purchase_orders.id_menu INNER JOIN customers ON customers.id=purchase_orders.id_customer INNER JOIN restaurants ON restaurants.id=menu_restaurants.id_restaurant WHERE menu_restaurants.id_restaurant=$1 ORDER BY purchase_orders.purchased_at DESC'
  const value = [
    id
  ]
  try {
    const { rows } = await runSQL.query(getQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no transactions'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get transactions'
    return { status: status.error, data: errorMessage }
  }
}

const getAllTransactionsByCustomersModel = async (id) => {
  const getQuery = 'SELECT purchase_orders.id, menu_restaurants.name as menu_name, restaurants.name as restaurant_name, purchase_orders.amount, purchase_orders.purchased_at FROM purchase_orders INNER JOIN menu_restaurants ON menu_restaurants.id=purchase_orders.id_menu INNER JOIN customers ON customers.id=purchase_orders.id_customer INNER JOIN restaurants ON restaurants.id=menu_restaurants.id_restaurant WHERE customers.id = $1 ORDER BY purchase_orders.purchased_at DESC'
  const value = [
    id
  ]
  try {
    const { rows } = await runSQL.query(getQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no transactions'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get transactions'
    return { status: status.error, data: errorMessage }
  }
}

const getTopCustomersByTransactionsDateRangeModel = async (start, end, limit) => {
  const getQuery = 'SELECT customers.id, customers.name, ROUND(m.transactions_amount::numeric, 2) AS transactions_amount FROM customers LEFT JOIN LATERAL (SELECT SUM(purchase_orders.amount) AS transactions_amount FROM purchase_orders WHERE customers.id=purchase_orders.id_customer AND purchase_orders.purchased_at >= $1 AND purchase_orders.purchased_at <= $2 LIMIT 1) AS m ON TRUE WHERE m.transactions_amount IS NOT NULL ORDER BY m.transactions_amount DESC LIMIT $3 '
  const value = [
    start,
    end,
    limit
  ]
  try {
    const { rows } = await runSQL.query(getQuery, value)
    const resp = rows
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no transactions'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get transactions'
    return { status: status.error, data: errorMessage }
  }
}

const getTotalCustomersAboveOrBelowAmountWithDateRangeModel = async (condition, amount, startDate, endDate) => {
  let getQuery
  switch (condition) {
    case 'above':
      getQuery = 'SELECT COUNT(DISTINCT customers.id) AS total_customers FROM customers INNER JOIN purchase_orders ON purchase_orders.id_customer=customers.id WHERE purchase_orders.amount >= $1 AND purchase_orders.purchased_at >= $2 AND purchase_orders.purchased_at <= $3 '
      break
    case 'below':
      getQuery = 'SELECT COUNT(DISTINCT customers.id) AS total_customers FROM customers INNER JOIN purchase_orders ON purchase_orders.id_customer=customers.id WHERE purchase_orders.amount <= $1 AND purchase_orders.purchased_at >= $2 AND purchase_orders.purchased_at <= $3 '
      break
    default:
      successMessage.status_code = status.success
      successMessage.data = []
      return { status: status.success, data: successMessage }
  }

  const value = [
    amount,
    startDate,
    endDate
  ]
  try {
    const { rows } = await runSQL.query(getQuery, value)
    const resp = rows[0]
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no transactions'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get transactions'
    return { status: status.error, data: errorMessage }
  }
}

module.exports = {
  getAllTransactionsByRestaurantsModel,
  getAllTransactionsByCustomersModel,
  getTopCustomersByTransactionsDateRangeModel,
  getTotalCustomersAboveOrBelowAmountWithDateRangeModel
}
