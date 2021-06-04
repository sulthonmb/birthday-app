/* eslint-disable camelcase */
import {
  errorMessage, successMessage, status
} from '../../helpers/status'
import { generateUserToken } from '../../helpers/validations'
import { getById } from '../../models/restaurants/restaurantModel'

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const siginRestaurant = async (req, res) => {
  const { username, password } = req.body
  try {
    const usersRecord = await getById(username)
    if (usersRecord.status === status.success) {
      const resultDb = usersRecord.data
      if (!resultDb) {
        errorMessage.status_code = status.notfound
        errorMessage.error = 'User with this username does not exist'
        return res.status(status.notfound).send(errorMessage)
      }

      if (password !== 'hungry12345678') {
        errorMessage.status_code = status.forbidden
        errorMessage.error = 'The password you provided is incorrect'
        return res.status(status.forbidden).send(errorMessage)
      }

      const permission = {
        admin: false,
        user: false,
        restaurant: true
      }
      const token = generateUserToken(resultDb.id, resultDb.id, permission)

      delete usersRecord.password
      successMessage.status_code = status.success
      successMessage.data = usersRecord.data
      successMessage.data.permission = permission
      successMessage.data.token = token
      return res.status(usersRecord.status).send(successMessage)
    } else {
      return res.status(usersRecord.status).send(usersRecord.data)
    }
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

export {
  siginRestaurant
}
