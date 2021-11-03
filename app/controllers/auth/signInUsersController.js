/* eslint-disable camelcase */
import {
  errorMessage, successMessage, status
} from '../../helpers/status'
import { comparePassword, generateUserToken } from '../../helpers/validations'
import { getByEmail } from '../../models/users/usersModel'

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const siginUsers = async (req, res) => {
  const { email, password } = req.body
  try {
    const usersRecord = await getByEmail({ email })
    if (usersRecord.status === status.success) {
      const resultDb = usersRecord.data
      if (!resultDb) {
        errorMessage.status_code = status.notfound
        errorMessage.error = 'User with this email does not exist'
        return res.status(status.notfound).send(errorMessage)
      }

      if (!comparePassword(resultDb.password, password)) {
        errorMessage.status_code = status.forbidden
        errorMessage.error = 'The password you provided is incorrect'
        return res.status(status.forbidden).send(errorMessage)
      }

      const permission = {
        admin: false,
        user: true
      }
      const token = generateUserToken(resultDb.id, resultDb.id, permission)

      delete usersRecord.data.password
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
  siginUsers
}
