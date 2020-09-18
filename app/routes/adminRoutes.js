import express from 'express'

import { signInValidationRules, validateSignIn } from '../validations/admin/signIn'
import { siginAdmin } from '../controllers/admin/adminController'

const router = express.Router()

// Admin Routes
router.post('/admin/signin', signInValidationRules(), validateSignIn, siginAdmin)

export default router
