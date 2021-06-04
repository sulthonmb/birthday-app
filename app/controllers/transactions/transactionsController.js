import {
  status
} from '../../helpers/status'

import {
  getAllTransactionsByRestaurantsModel,
  getAllTransactionsByCustomersModel,
  getTopCustomersByTransactionsDateRangeModel,
  getTotalCustomersAboveOrBelowAmountWithDateRangeModel
} from '../../models/transactions/transactionsModel'

const moment = require('moment')

const getAllTransactionsByRestaurants = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await getAllTransactionsByRestaurantsModel(id)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getAllTransactionsByCustomers = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await getAllTransactionsByCustomersModel(id)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getTopCustomersByTransactionsDateRange = async (req, res) => {
  try {
    const { start, end, limit } = req.query
    const dtStart = new Date(start)
    const dtEnd = new Date(end)
    if (dtStart.getTime() > 0 && dtEnd.getTime() > 0) {
      const dtStartFormat = moment(dtStart).format('YYYY-MM-DD HH:MM:SS')
      const dtEndFormat = moment(dtEnd).format('YYYY-MM-DD HH:MM:SS')

      const response = await getTopCustomersByTransactionsDateRangeModel(dtStartFormat, dtEndFormat, limit)
      return res.status(response.status).send(response.data)
    } else {
      return res.status(status.notvalid).send({
        status: 'error',
        status_code: status.notvalid,
        error: [{
          start: 'start must be in correct format yyyy-mm-dd hh:mm:ss',
          end: 'start must be in correct format yyyy-mm-dd hh:mm:ss'
        }]
      })
    }
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const getTotalCustomersAboveOrBelowAmountWithDateRange = async (req, res) => {
  try {
    const { condition, amount, start_date, end_date } = req.query
    const dtStart = new Date(start_date)
    const dtEnd = new Date(end_date)
    if (dtStart.getTime() > 0 && dtEnd.getTime() > 0) {
      const dtStartFormat = moment(dtStart).format('YYYY-MM-DD HH:MM:SS')
      const dtEndFormat = moment(dtEnd).format('YYYY-MM-DD HH:MM:SS')

      const response = await getTotalCustomersAboveOrBelowAmountWithDateRangeModel(condition, amount, dtStartFormat, dtEndFormat)
      return res.status(response.status).send(response.data)
    } else {
      return res.status(status.notvalid).send({
        status: 'error',
        status_code: status.notvalid,
        error: [{
          start_date: 'start must be in correct format yyyy-mm-dd hh:mm:ss',
          end_date: 'start must be in correct format yyyy-mm-dd hh:mm:ss'
        }]
      })
    }
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

export {
  getAllTransactionsByRestaurants,
  getAllTransactionsByCustomers,
  getTopCustomersByTransactionsDateRange,
  getTotalCustomersAboveOrBelowAmountWithDateRange
}
