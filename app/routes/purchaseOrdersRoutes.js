import express from 'express'

import {
  createPurchaseOrder,
  deletePurchaseOrder
} from '../controllers/orders/purchaseOrdersController'
import {
  createPurchaseOrderValidationRules,
  validateRule
} from '../validations/order/purchaseOdersValidations'
import verifyAuth from '../middlewares/verifyAuth'
import {
  verifyAdmin,
  verifyUser
} from '../middlewares/verifyPermission'

const router = express.Router()

// Transactions Routes
router.post('/purchase-order', createPurchaseOrderValidationRules(), validateRule, verifyAuth, verifyUser, createPurchaseOrder)
router.delete('/purchase-order/:id', verifyAuth, verifyAdmin, deletePurchaseOrder)

export default router