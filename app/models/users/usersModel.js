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

const getSingleUser = async ({ id }) => {
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

const getByEmail = async ({ email }) => {
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

const getByEmailId = async ({ id, email }) => {
  const getUserByEmailQuery = 'SELECT * FROM users WHERE email = $1 AND id != $2'
  try {
    const { rows } = await runSQL.query(getUserByEmailQuery, [email, id])
    const dbResponse = rows[0]
    return { status: status.success, data: dbResponse }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Operation was not successful'
    return { status: status.error, data: errorMessage }
  }
}

const createUser = async ({ first_name, last_name, email, password, country_code, date_of_birth, phone_number, gender, id_user_type }) => {
  const createQuery = `INSERT INTO
          users (first_name, last_name, email, password, country_code, date_of_birth, phone_number, gender, id_user_type)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          returning *`
  const values = [
    first_name,
    last_name,
    email,
    password,
    country_code,
    date_of_birth,
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
    errorMessage.error = 'Unable to create user'
    return { status: status.error, data: errorMessage }
  }
}

const updateUser = async ({ id, first_name, last_name, email, password, country_code, date_of_birth, phone_number, gender, id_user_type }) => {
  const updateQuery = `UPDATE users SET
          first_name=$1,
          last_name=$2,
          email=$3,
          password=$4,
          country_code=$5, 
          date_of_birth=$6,
          phone_number=$7,
          gender=$8,
          id_user_type=$9
          WHERE id=$10
          returning *`
  const values = [
    first_name,
    last_name,
    email,
    password,
    country_code,
    date_of_birth,
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
    errorMessage.error = 'Unable to update user'
    return { status: status.error, data: errorMessage }
  }
}

const deleteUser = async ({ id }) => {
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
    errorMessage.error = 'Unable to delete user'
    return { status: status.error, data: errorMessage }
  }
}

const getUsersByBirthdate = async () => {
  const getAllQuery = 'SELECT * FROM users WHERE DATE_PART(\'day\', date_of_birth) = DATE_PART(\'day\', CURRENT_DATE) AND DATE_PART(\'month\', date_of_birth) = DATE_PART(\'month\', CURRENT_DATE) ORDER BY id ASC'
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

module.exports = {
  getAllUsers,
  getSingleUser,
  getByEmail,
  getByEmailId,
  createUser,
  updateUser,
  deleteUser,
  getUsersByBirthdate
}
