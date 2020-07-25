import express from 'express';

import { signInValidationRules, validateSignIn } from '../validations/signIn'
import { siginAdmin } from '../controllers/adminController';

const router = express.Router();

// Admin Routes
router.post('/admin/signin', signInValidationRules(), validateSignIn, siginAdmin);

export default router;