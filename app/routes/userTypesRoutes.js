import express from 'express'

import {
  getAllUserTypes,
  getSingleUserTypes
} from '../controllers/users/userTypesController'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// User Types Routes
router.get('/user-types', verifyAuth, getAllUserTypes)
router.get('/user-types/:id', verifyAuth, getSingleUserTypes)

export default router
