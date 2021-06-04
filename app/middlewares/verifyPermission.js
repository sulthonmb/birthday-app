/* eslint-disable max-len */
import {
  errorMessage, status
} from '../helpers/status'

/**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */

const verifyAdmin = async (req, res, next) => {
  try {
    const { permission } = req.user
    if (!permission.admin === true) {
      errorMessage.status_code = status.unauthorized
      errorMessage.error = 'Sorry You are unauthorized.'
      return res.status(status.unauthorized).send(errorMessage)
    }

    next()
  } catch (error) {
    errorMessage.error = 'Authentication Failed'
    return res.status(status.unauthorized).send(errorMessage)
  }
}

const verifyUser = async (req, res, next) => {
  try {
    const { permission } = req.user
    if (!permission.user === true) {
      errorMessage.status_code = status.unauthorized
      errorMessage.error = 'Sorry You are unauthorized.'
      return res.status(status.unauthorized).send(errorMessage)
    }

    next()
  } catch (error) {
    errorMessage.error = 'Authentication Failed'
    return res.status(status.unauthorized).send(errorMessage)
  }
}

const verifyRestaurant = async (req, res, next) => {
  try {
    const { permission } = req.user
    if (!permission.restaurant === true) {
      errorMessage.status_code = status.unauthorized
      errorMessage.error = 'Sorry You are unauthorized.'
      return res.status(status.unauthorized).send(errorMessage)
    }

    next()
  } catch (error) {
    errorMessage.error = 'Authentication Failed'
    return res.status(status.unauthorized).send(errorMessage)
  }
}

export {
  verifyAdmin,
  verifyUser,
  verifyRestaurant
}
