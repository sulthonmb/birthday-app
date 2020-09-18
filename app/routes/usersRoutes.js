import express from 'express'

import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/users/usersController'
import { usersValidationRules, validateUsers } from '../validations/users/usersValidations'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// User Types Routes
router.get('/users', verifyAuth, getAllUsers)
router.get('/users/:id', verifyAuth, getSingleUser)
router.post('/users', usersValidationRules(), validateUsers, verifyAuth, createUser)
router.put('/users/:id', usersValidationRules(), validateUsers, verifyAuth, updateUser)
router.delete('/users/:id', verifyAuth, deleteUser)

export default router
