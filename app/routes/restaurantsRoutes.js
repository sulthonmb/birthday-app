import express from 'express'

import {
  getAllOpenRestaurant,
  getNearestAllRestauranst,
  getAllRestaurantByNumberDishes,
  getAllRestaurantByPriceRange,
  getAllRestaurantsBySearchTermsDishAndRestaurant,
  getAllRestaurantBySearchTermsDishes,
  getAllMostRestaurantByAmountOrVolumeTransactions,
  getOpenHourRestaurantsPerDayOrWeek
} from '../controllers/restaurants/restaurantsController'
import {
  getAllOpenRestaurantValidationRules,
  getOpenHourRestaurantsPerDayOrWeekValidationRules,
  getNearestAllRestauranstValidationRules,
  getAllRestaurantByNumberDishesValidationRules,
  getAllRestaurantByPriceRangeValidationRules,
  getAllRestaurantBySearchTermsDishesValidationRules,
  getAllMostRestaurantByAmountOrVolumeTransactionsValidationRules,
  validateRule
} from '../validations/restaurants/restaurantsValidations'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Restaurants Routes
router.get('/open-restaurants', getAllOpenRestaurantValidationRules(), validateRule, verifyAuth, getAllOpenRestaurant)
router.get('/nearest-restaurants', getNearestAllRestauranstValidationRules(), validateRule, verifyAuth, getNearestAllRestauranst)
router.get('/open-restaurants-within-working-hours', getOpenHourRestaurantsPerDayOrWeekValidationRules(), validateRule, verifyAuth, getOpenHourRestaurantsPerDayOrWeek)
router.get('/number-dishes-restaurants', getAllRestaurantByNumberDishesValidationRules(), validateRule, verifyAuth, getAllRestaurantByNumberDishes)
router.get('/restaurants-by-price-range', getAllRestaurantByPriceRangeValidationRules(), validateRule, verifyAuth, getAllRestaurantByPriceRange)
router.get('/search-terms-dish', getAllRestaurantBySearchTermsDishesValidationRules(), validateRule, verifyAuth, getAllRestaurantBySearchTermsDishes)
router.get('/search-terms-dish-and-restaurant', getAllRestaurantBySearchTermsDishesValidationRules(), validateRule, verifyAuth, getAllRestaurantsBySearchTermsDishAndRestaurant)
router.get('/most-popular-restaurants', getAllMostRestaurantByAmountOrVolumeTransactionsValidationRules(), validateRule, verifyAuth, getAllMostRestaurantByAmountOrVolumeTransactions)

export default router
