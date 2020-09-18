import { errorMessage, status } from '../../helpers/status'
import { body, validationResult } from 'express-validator'

const userTypesValidationRules = () => {
  return [
    // must not empty
    body('name').isLength({ min: 3 })
  ]
}

const validateUserTypes = (req, res, next) => {
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
  userTypesValidationRules,
  validateUserTypes
}
