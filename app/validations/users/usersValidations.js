import { errorMessage, status } from '../../helpers/status'
import { body, validationResult } from 'express-validator'

const usersValidationRules = () => {
  return [
    // must not empty
    body('first_name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('country_code').isLength({ min: 2, max: 2 }),
    body('date_of_birth').isDate(),
    body('phone_number').isLength({ min: 3 }),
    body('gender').isLength({ min: 1, max: 1 }),
    body('id_user_type').isLength({ min: 1 })
  ]
}

const validateUsers = (req, res, next) => {
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
  usersValidationRules,
  validateUsers
}
