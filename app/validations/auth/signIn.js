import { errorMessage, status } from '../../helpers/status'
import { body, validationResult } from 'express-validator'

const signInValidationRules = () => {
  return [
    // must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 8 })
  ]
}

const signInUserValidationRules = () => {
  return [
    // must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 8 })
  ]
}

const validateSignIn = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  errorMessage.status_code = status.notvalid
  errorMessage.error = extractedErrors
  return res.status(status.notvalid).send(errorMessage)
}

module.exports = {
  signInValidationRules,
  signInUserValidationRules,
  validateSignIn
}