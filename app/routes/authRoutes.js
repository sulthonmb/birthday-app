import express from 'express'

import { signInValidationRules, validateSignIn } from '../validations/auth/signIn'
import { siginUsers } from '../controllers/auth/signInUsersController'

const router = express.Router()

// Users Routes
router.post('/users/signin', signInValidationRules(), validateSignIn, siginUsers)

export default router
