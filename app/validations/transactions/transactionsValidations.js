import { errorMessage, status } from '../../helpers/status'
import { query, validationResult } from 'express-validator'

const getTopCustomersByTransactionsDateRangeValidationRules = () => {
  return [
    // must not empty
    query('start').notEmpty(),
    query('end').notEmpty(),
    query('limit').notEmpty().isNumeric()
  ]
}

const getTotalCustomersAboveOrBelowAmountWithDateRangeValidationRules = () => {
  return [
    // must not empty
    query('condition').notEmpty(),
    query('start_date').notEmpty(),
    query('end_date').notEmpty(),
    query('amount').notEmpty().isNumeric()
  ]
}

const validateRule = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  errorMessage.status_code = status.notvalid
  errorMessage.error = extractedErrors
  return res.status(status.notvalid).send(errorMessage)
}

module.exports = {
  getTopCustomersByTransactionsDateRangeValidationRules,
  getTotalCustomersAboveOrBelowAmountWithDateRangeValidationRules,
  validateRule
}