import express from 'express'

import {
  getAllTransactionsByRestaurants,
  getAllTransactionsByCustomers,
  getTopCustomersByTransactionsDateRange,
  getTotalCustomersAboveOrBelowAmountWithDateRange
} from '../controllers/transactions/transactionsController'
import {
  getTopCustomersByTransactionsDateRangeValidationRules,
  getTotalCustomersAboveOrBelowAmountWithDateRangeValidationRules,
  validateRule
} from '../validations/transactions/transactionsValidations'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Transactions Routes
router.get('/transactions-by-restaurants/:id', verifyAuth, getAllTransactionsByRestaurants)
router.get('/transactions-by-customers/:id', verifyAuth, getAllTransactionsByCustomers)
router.get('/top-customers-by-transactions-date-range', getTopCustomersByTransactionsDateRangeValidationRules(), validateRule, verifyAuth, getTopCustomersByTransactionsDateRange)
router.get('/total-customers-by-transactions-date-range-and-amount', getTotalCustomersAboveOrBelowAmountWithDateRangeValidationRules(), validateRule, verifyAuth, getTotalCustomersAboveOrBelowAmountWithDateRange)

export default router