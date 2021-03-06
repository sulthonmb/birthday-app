import runSQL from '../../helpers/runSQL'
import {
  errorMessage,
  successMessage,
  status
} from '../../helpers/status'
// import redis from '../../config/redis'

const getAllUserTypes = async () => {
  const getAllQuery = 'SELECT * FROM user_types ORDER BY id ASC'
  try {
    const { rows } = await runSQL.query(getAllQuery)
    const dbResponse = rows
    if (dbResponse[0] === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no user types'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.success
    successMessage.data = dbResponse
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get all user types'
    return { status: status.error, data: errorMessage }
  }
}

const getSingleUserTypes = async (id) => {
  const getSingleQuery = 'SELECT * FROM user_types WHERE id=$1 ORDER BY id DESC'
  const value = [
    id
  ]
  try {
    const { rows } = await runSQL.query(getSingleQuery, value)
    const resp = rows[0]
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no a user type'
      return { status: status.notfound, data: errorMessage }
    }
    // await redis.set('single_user_type_' + id, JSON.stringify(resp))
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get a user typex'
    return { status: status.error, data: errorMessage }
  }
}

const createUserTypes = async (name) => {
  const createQuery = `INSERT INTO
          user_types (name)
          VALUES ($1)
          returning *`
  const values = [
    name
  ]

  try {
    const { rows } = await runSQL.query(createQuery, values)
    const dbResponse = rows[0]
    successMessage.status_code = status.created
    successMessage.data = dbResponse
    return { status: status.created, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to create user types'
    return { status: status.error, data: errorMessage }
  }
}

const updateUserTypes = async (id, name) => {
  const updateQuery = `UPDATE user_types SET
          name=$1
          WHERE id=$2 
          returning *`
  const values = [
    name,
    id
  ]

  try {
    const { rows } = await runSQL.query(updateQuery, values)
    const dbResponse = rows[0]
    if (dbResponse === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no user types'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.created
    successMessage.data = dbResponse
    return { status: status.created, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to update user types'
    return { status: status.error, data: errorMessage }
  }
}

const deleteUserTypes = async (id) => {
  const deleteQuery = `DELETE FROM user_types WHERE
          id=$1 
          returning *`
  const values = [
    id
  ]

  try {
    const { rows } = await runSQL.query(deleteQuery, values)
    const dbResponse = rows[0]
    if (dbResponse === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no user types'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.created
    successMessage.data = dbResponse
    return { status: status.created, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to delete user types'
    return { status: status.error, data: errorMessage }
  }
}
module.exports = {
  getAllUserTypes,
  getSingleUserTypes,
  createUserTypes,
  updateUserTypes,
  deleteUserTypes
}
