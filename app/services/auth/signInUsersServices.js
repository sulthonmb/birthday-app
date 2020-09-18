import { getByEmail as getUsers } from '../../models/users/usersModel'
import { comparePassword, generateUserToken } from '../../helpers/validations'
import {
  errorMessage, successMessage, status
} from '../../helpers/status'

const signIn = async (email, password) => {
  try {
    const usersRecord = await getUsers(email)
    if (usersRecord.status === status.success) {
      const resultDb = usersRecord.data
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
        admin: false,
        director: false
      }
      const token = generateUserToken(resultDb.email, resultDb.id, permission)

      delete usersRecord.password
      successMessage.status_code = status.success
      successMessage.data = usersRecord.data
      successMessage.data.permission = permission
      successMessage.data.token = token
      return { status: usersRecord.status, data: successMessage }
    } else {
      return { status: usersRecord.status, data: usersRecord.data }
    }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

module.exports = {
  signIn
}
