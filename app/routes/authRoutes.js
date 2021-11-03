import express from 'express'

import { signInUserValidationRules, validateSignIn } from '../validations/auth/signIn'
import { siginUsers } from '../controllers/auth/signInUsersController'

const router = express.Router()

// Users Routes
router.post('/users/signin', signInUserValidationRules(), validateSignIn, siginUsers)

export default router
