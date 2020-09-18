import { get as getAdmin } from '../../models/admin/adminModel'
import { comparePassword, generateUserToken } from '../../helpers/validations'
import {
  errorMessage, successMessage, status
} from '../../helpers/status'

const signIn = async (email, password) => {
  try {
    const adminRecord = await getAdmin(email)
    if (adminRecord.status === status.success) {
      const resultDb = adminRecord.data
      if (!resultDb) {
        errorMessage.status_code = status.notfound
        errorMessage.error = 'User with this email does not exist'
        return { status: status.notfound, data: errorMessage }
      }

      if (!comparePassword(resultDb.password, password)) {
        errorMessage.status_code = status.forbidden
        errorMessage.error = 'The password you provided is incorrect'
        return { status: status.forbidden, data: errorMessage }
      }

      const permission = {
        admin: true,
        director: false
      }
      const token = generateUserToken(resultDb.email, resultDb.id, permission)

      delete adminRecord.password
      successMessage.status_code = status.success
      successMessage.data = adminRecord.data
      successMessage.data.permission = permission
      successMessage.data.token = token
      return { status: adminRecord.status, data: successMessage }
    } else {
      return { status: adminRecord.status, data: adminRecord.data }
    }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

module.exports = {
  signIn
}
