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
    const resp = await getSingleUserService({ id })
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
    first_name,
    last_name,
    email,
    password,
    country,
    city,
    date_of_birth,
    phone_number,
    gender,
    id_user_type
  } = req.body

  try {
    const resp = await createUserService({
      first_name,
      last_name,
      email,
      password: hashPassword(password),
      country,
      city,
      date_of_birth,
      phone_number,
      gender,
      id_user_type
    })

    // delete resp.data.data.password
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
    first_name,
    last_name,
    email,
    password,
    country,
    city,
    date_of_birth,
    phone_number,
    gender,
    id_user_type
  } = req.body

  if (empty(id)) {
    errorMessage.status_code = status.bad
    errorMessage.error = 'All fields are required'
    return res.status(status.bad).send(errorMessage)
  }

  try {
    const resp = await updateUserService({
      id,
      first_name,
      last_name,
      email,
      password: hashPassword(password),
      country,
      city,
      date_of_birth,
      phone_number,
      gender,
      id_user_type
    })

    // delete resp.data.data.password
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

  if (empty(id)) {
    errorMessage.status_code = status.bad
    errorMessage.error = 'All fields are required'
    return res.status(status.bad).send(errorMessage)
  }

  try {
    const resp = await deleteUserService({ id })
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
