import express from 'express'

import {
  getAllUserTypes,
  getSingleUserTypes,
  createUserTypes,
  updateUserTypes,
  deleteUserTypes
} from '../controllers/users/userTypesController'
import { userTypesValidationRules, validateUserTypes } from '../validations/users/userTypesValidations'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// User Types Routes
router.get('/user-types', verifyAuth, getAllUserTypes)
router.get('/user-types/:id', verifyAuth, getSingleUserTypes)
router.post('/user-types', userTypesValidationRules(), validateUserTypes, verifyAuth, createUserTypes)
router.put('/user-types/:id', userTypesValidationRules(), validateUserTypes, verifyAuth, updateUserTypes)
router.delete('/user-types/:id', verifyAuth, deleteUserTypes)

export default router
