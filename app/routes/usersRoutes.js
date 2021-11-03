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
import { verifyAdmin } from '../middlewares/verifyPermission'

const router = express.Router()

// User Types Routes
router.get('/users', verifyAuth, verifyAdmin, getAllUsers)
router.get('/user/:id', verifyAuth, verifyAdmin, getSingleUser)
router.post('/user', usersValidationRules(), validateUsers, verifyAuth, verifyAdmin, createUser)
router.put('/user/:id', usersValidationRules(), validateUsers, verifyAuth, verifyAdmin, updateUser)
router.delete('/user/:id', verifyAuth, verifyAdmin, deleteUser)

export default router
