import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
} from '../../models/users/usersModel'
import {
  status
} from '../../helpers/status'

const getAllUsersService = async () => {
  try {
    const response = await getAllUsers()
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const getSingleUserService = async (id) => {
  try {
    const response = await getSingleUser(id)
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const createUserService = async (name, email, password, phone_number, gender, id_user_type) => {
  try {
    const response = await createUser(name, email, password, phone_number, gender, id_user_type)
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const updateUserService = async (id, name, email, password, phone_number, gender, id_user_type) => {
  try {
    const response = await updateUser(id, name, email, password, phone_number, gender, id_user_type)
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const deleteUserService = async (id) => {
  try {
    const response = await deleteUser(id)
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
