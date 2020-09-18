import {
  hashPassword,
  empty
} from '../../helpers/validations'

import {
  errorMessage, status
} from '../../helpers/status'

import {
  getAllUsersService,
  getSingleUserService,
  createUserService,
  updateUserService,
  deleteUserService
} from '../../services/users/usersServices'

/**
   * Get All Users
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const getAllUsers = async (req, res) => {
  try {
    const resp = await getAllUsersService()
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

/**
   * Get Single User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await getSingleUserService(id)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone_number,
    gender,
    id_user_type
  } = req.body

  const { permission } = req.user
  if (!permission.admin === true) {
    errorMessage.status_code = status.unauthorized
    errorMessage.error = 'Sorry You are unauthorized to add a bus details'
    return res.status(status.unauthorized).send(errorMessage)
  }

  try {
    const resp = await createUserService(name, email, hashPassword(password), phone_number, gender, id_user_type)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

/**
   * Update A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const updateUser = async (req, res) => {
  const { id } = req.params
  const {
    name,
    email,
    password,
    phone_number,
    gender,
    id_user_type
  } = req.body

  const { permission } = req.user

  if (!permission.admin === true) {
    errorMessage.status_code = status.unauthorized
    errorMessage.error = 'Sorry You are unauthorized to add a bus details'
    return res.status(status.unauthorized).send(errorMessage)
  }

  if (empty(id)) {
    errorMessage.status_code = status.bad
    errorMessage.error = 'All fields are required'
    return res.status(status.bad).send(errorMessage)
  }

  try {
    const resp = await updateUserService(id, name, email, password, phone_number, gender, id_user_type)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

/**
   * Delete A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const deleteUser = async (req, res) => {
  const { id } = req.params

  const { permission } = req.user
  if (!permission.admin === true) {
    errorMessage.status_code = status.unauthorized
    errorMessage.error = 'Sorry You are unauthorized to add a bus details'
    return res.status(status.unauthorized).send(errorMessage)
  }

  if (empty(id)) {
    errorMessage.status_code = status.bad
    errorMessage.error = 'All fields are required'
    return res.status(status.bad).send(errorMessage)
  }

  try {
    const resp = await deleteUserService(id)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

export {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
}
