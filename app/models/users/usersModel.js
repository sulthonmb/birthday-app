import runSQL from '../../helpers/runSQL'
import {
  errorMessage,
  successMessage,
  status
} from '../../helpers/status'

const getAllUsers = async () => {
  const getAllQuery = 'SELECT * FROM users ORDER BY id ASC'
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
    errorMessage.error = 'Unable to get all user types'
    return { status: status.error, data: errorMessage }
  }
}

const getSingleUser = async (id) => {
  const getSingleQuery = 'SELECT * FROM users WHERE id=$1 ORDER BY id DESC'
  const value = [
    id
  ]
  try {
    const { rows } = await runSQL.query(getSingleQuery, value)
    const resp = rows[0]
    if (resp === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no a user'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.success
    successMessage.data = resp
    return { status: status.success, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to get a user'
    return { status: status.error, data: errorMessage }
  }
}

const getByEmail = async (email) => {
  const getUserByEmailQuery = 'SELECT * FROM users WHERE email = $1'
  try {
    const { rows } = await runSQL.query(getUserByEmailQuery, [email])
    const dbResponse = rows[0]
    return { status: status.success, data: dbResponse }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Operation was not successful'
    return { status: status.error, data: errorMessage }
  }
}

const createUser = async (name, email, password, phone_number, gender, id_user_type) => {
  const createQuery = `INSERT INTO
          users (name, email, password, phone_number, gender, id_user_type)
          VALUES ($1, $2, $3, $4, $5, $6)
          returning *`
  const values = [
    name,
    email,
    password,
    phone_number,
    gender,
    id_user_type
  ]

  try {
    const { rows } = await runSQL.query(createQuery, values)
    const dbResponse = rows[0]
    successMessage.status_code = status.created
    successMessage.data = dbResponse
    return { status: status.created, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to add user'
    return { status: status.error, data: errorMessage }
  }
}

const updateUser = async (id, name, email, password, phone_number, gender, id_user_type) => {
  const updateQuery = `UPDATE users SET
          name=$1,
          email=$2,
          password=$3,
          phone_number=$4,
          gender=$5,
          id_user_type=$6
          WHERE id=$7
          returning *`
  const values = [
    name,
    email,
    password,
    phone_number,
    gender,
    id_user_type,
    id
  ]

  try {
    const { rows } = await runSQL.query(updateQuery, values)
    const dbResponse = rows[0]
    if (dbResponse === undefined) {
      errorMessage.status_code = status.notfound
      errorMessage.error = 'There are no user'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.created
    successMessage.data = dbResponse
    return { status: status.created, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to add user'
    return { status: status.error, data: errorMessage }
  }
}

const deleteUser = async (id) => {
  const deleteQuery = `DELETE FROM users WHERE
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
      errorMessage.error = 'There are no user'
      return { status: status.notfound, data: errorMessage }
    }
    successMessage.status_code = status.created
    successMessage.data = dbResponse
    return { status: status.created, data: successMessage }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Unable to add user'
    return { status: status.error, data: errorMessage }
  }
}
module.exports = {
  getAllUsers,
  getSingleUser,
  getByEmail,
  createUser,
  updateUser,
  deleteUser
}
