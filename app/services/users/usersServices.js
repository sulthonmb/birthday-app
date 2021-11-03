import {
  getAllUsers,
  getSingleUser,
  getByEmail,
  getByEmailId,
  createUser,
  updateUser,
  deleteUser
} from '../../models/users/usersModel'
import {
  status,
  errorMessage
} from '../../helpers/status'

const getAllUsersService = async () => {
  try {
    const response = await getAllUsers()
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const getSingleUserService = async ({ id }) => {
  try {
    const response = await getSingleUser({ id })
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const createUserService = async ({ first_name, last_name, email, password, country_code, date_of_birth, phone_number, gender, id_user_type }) => {
  try {
    const usersRecord = await getByEmail({ email })
    if (usersRecord.status === status.success && usersRecord.data) {
      errorMessage.status_code = status.bad
      errorMessage.error = 'Email is exists'
      return { status: status.bad, data: errorMessage }
    }

    const response = await createUser({
      first_name,
      last_name,
      email,
      password,
      country_code,
      date_of_birth,
      phone_number,
      gender,
      id_user_type
    })
    delete response.data.data.password
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const updateUserService = async ({ id, first_name, last_name, email, password, country_code, date_of_birth, phone_number, gender, id_user_type }) => {
  try {
    const checkUser = await getSingleUser({ id })
    if (checkUser.status !== status.success || !checkUser.data) {
      errorMessage.status_code = status.bad
      errorMessage.error = 'User is not exists'
      return { status: status.bad, data: errorMessage }
    }

    const usersRecord = await getByEmailId({ id, email })
    console.log(usersRecord)
    if (usersRecord.status === status.success && usersRecord.data) {
      errorMessage.status_code = status.bad
      errorMessage.error = 'Email is exists'
      return { status: status.bad, data: errorMessage }
    }

    const response = await updateUser({
      id,
      first_name,
      last_name,
      email,
      password,
      country_code,
      date_of_birth,
      phone_number,
      gender,
      id_user_type
    })

    delete response.data.data.password
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const deleteUserService = async ({ id }) => {
  try {
    const usersRecord = await getSingleUser({ id })
    if (usersRecord.status !== status.success || !usersRecord.data) {
      errorMessage.status_code = status.bad
      errorMessage.error = 'User is not exists'
      return { status: status.bad, data: errorMessage }
    }

    const response = await deleteUser({ id })
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}
module.exports = {
  getAllUsersService,
  getSingleUserService,
  createUserService,
  updateUserService,
  deleteUserService
}
