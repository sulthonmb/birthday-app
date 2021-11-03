/* eslint-disable camelcase */
import { comparePassword, generateUserToken } from '../../helpers/validations'
import {
  errorMessage, successMessage, status
} from '../../helpers/status'
import { get as getAdmin } from '../../models/admin/adminModel'

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const siginAdmin = async (req, res) => {
  const { email, password } = req.body
  try {
    const adminRecord = await getAdmin(email)
    if (adminRecord.status === status.success) {
      const resultDb = adminRecord.data
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
        admin: true,
        user: false
      }
      const token = generateUserToken(resultDb.email, resultDb.id, permission)

      delete adminRecord.data.password
      successMessage.status_code = status.success
      successMessage.data = adminRecord.data
      successMessage.data.permission = permission
      successMessage.data.token = token
      return res.status(adminRecord.status).send(successMessage)
    } else {
      return res.status(adminRecord.status).send(adminRecord.data)
    }
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

export {
  siginAdmin
}
