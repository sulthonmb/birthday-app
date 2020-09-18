import {
  empty
} from '../../helpers/validations'

import {
  errorMessage, status
} from '../../helpers/status'

import {
  getAllUserTypesService,
  getSingleUserTypesService,
  createUserTypesService,
  updateUserTypesService,
  deleteUserTypesService
} from '../../services/users/userTypesServices'

/**
 * Get All User Types
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const getAllUserTypes = async (req, res) => {
  try {
    const resp = await getAllUserTypesService()
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

/**
 * Get Single User Types
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const getSingleUserTypes = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await getSingleUserTypesService(id)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

/**
 * Create A User Types
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const createUserTypes = async (req, res) => {
  const { name } = req.body

  const { permission } = req.user
  if (!permission.admin === true) {
    errorMessage.status_code = status.unauthorized
    errorMessage.error = 'Sorry You are unauthorized to add a bus details'
    return res.status(status.unauthorized).send(errorMessage)
  }

  try {
    const resp = await createUserTypesService(name)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

/**
 * Update A User Types
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const updateUserTypes = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const { permission } = req.user
  if (!permission.admin === true) {
    errorMessage.status_code = status.unauthorized
    errorMessage.error = 'Sorry You are unauthorized to add a bus details'
    return res.status(status.unauthorized).send(errorMessage)
  }

  try {
    const resp = await updateUserTypesService(id, name)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

/**
 * Delete A User Types
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const deleteUserTypes = async (req, res) => {
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
    const resp = await deleteUserTypesService(id)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

export {
  getAllUserTypes,
  getSingleUserTypes,
  createUserTypes,
  updateUserTypes,
  deleteUserTypes
}
