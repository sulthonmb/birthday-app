import express from 'express'

import { signInUserValidationRules, validateSignIn } from '../validations/auth/signIn'
import { siginUsers } from '../controllers/auth/signInUsersController'
import { siginRestaurant } from '../controllers/auth/signInRestaurantsController'

const router = express.Router()

// Users Routes
router.post('/users/signin', signInUserValidationRules(), validateSignIn, siginUsers)
router.post('/restaurants/signin', signInUserValidationRules(), validateSignIn, siginRestaurant)

export default router
