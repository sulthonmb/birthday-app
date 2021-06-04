import { errorMessage, status } from '../../helpers/status'
import { query, validationResult } from 'express-validator'

const getAllOpenRestaurantValidationRules = () => {
  return [
    // must not empty
    query('datetime').notEmpty()
  ]
}

const getOpenHourRestaurantsPerDayOrWeekValidationRules = () => {
  return [
    // must not empty
    query('type').notEmpty(),
    query('start_hour').notEmpty(),
    query('end_hour').notEmpty()

  ]
}

const getNearestAllRestauranstValidationRules = () => {
  return [
    // must not empty
    query('lat').notEmpty().trim().toFloat().isFloat().withMessage('Must be a float number'),
    query('long').notEmpty().trim().toFloat().isFloat().withMessage('Must be a float number')
  ]
}

const getAllRestaurantByNumberDishesValidationRules = () => {
  return [
    // must not empty
    query('start').notEmpty().isNumeric(),
    query('end').notEmpty().isNumeric()
  ]
}

const getAllRestaurantByPriceRangeValidationRules = () => {
  return [
    // must not empty
    query('start_price').notEmpty().trim().toFloat().isFloat().withMessage('Must be a float number'),
    query('end_price').notEmpty().trim().toFloat().isFloat().withMessage('Must be a float number')
  ]
}

const getAllRestaurantBySearchTermsDishesValidationRules = () => {
  return [
    // must not empty
    query('terms').notEmpty().isString()
  ]
}

const getAllMostRestaurantByAmountOrVolumeTransactionsValidationRules = () => {
  return [
    // must not empty
    query('order_by').notEmpty().isString()
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
  getAllOpenRestaurantValidationRules,
  getOpenHourRestaurantsPerDayOrWeekValidationRules,
  getNearestAllRestauranstValidationRules,
  getAllRestaurantByNumberDishesValidationRules,
  getAllRestaurantByPriceRangeValidationRules,
  getAllRestaurantBySearchTermsDishesValidationRules,
  getAllMostRestaurantByAmountOrVolumeTransactionsValidationRules,
  validateRule
}