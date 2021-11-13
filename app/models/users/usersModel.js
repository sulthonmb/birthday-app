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

const createUser = async ({ first_name, last_name, email, password, country, city, timezone, date_of_birth, phone_number, gender, id_user_type }) => {
  const createQuery = `INSERT INTO
          users (first_name, last_name, email, password, country, city, timezone, date_of_birth, phone_number, gender, id_user_type)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          returning *`
  const values = [
    first_name,
    last_name,
    email,
    password,
    country,
    city,
    timezone,
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

const updateUser = async ({ id, first_name, last_name, email, password, country, city, timezone, date_of_birth, phone_number, gender, id_user_type }) => {
  const updateQuery = `UPDATE users SET
          first_name=$1,
          last_name=$2,
          email=$3,
          password=$4,
          country=$5, 
          city=$6,
          timezone=$7,
          date_of_birth=$8,
          phone_number=$9,
          gender=$10,
          id_user_type=$11
          WHERE id=$12
          returning *`
  const values = [
    first_name,
    last_name,
    email,
    password,
    country,
    city,
    timezone,
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

const updateLastYearSentBirthdayUser = async ({ id }) => {
  const year = new Date().getFullYear()
  const updateQuery = `UPDATE users SET
          last_year_sent_birhtday=$1
          WHERE id=$2
          returning *`
  const values = [
    year,
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

const getUsersByBirthdate = async ({ timezone }) => {
  const yearNow = new Date().getFullYear()
  const getAllQuery = 'SELECT * FROM users WHERE DATE_PART(\'day\', date_of_birth) = DATE_PART(\'day\', CURRENT_DATE) AND DATE_PART(\'month\', date_of_birth) = DATE_PART(\'month\', CURRENT_DATE) AND timezone=$1 AND ( last_year_sent_birhtday IS NULL OR last_year_sent_birhtday < $2 ) ORDER BY id ASC'
  const values = [
    timezone,
    yearNow
  ]
  try {
    const { rows } = await runSQL.query(getAllQuery, values)
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

const getUsersUnsentBirthdayMessage = async () => {
  const yearNow = new Date().getFullYear()
  const getAllQuery = 'SELECT * FROM users WHERE DATE_PART(\'day\', date_of_birth) < DATE_PART(\'day\', CURRENT_DATE) AND DATE_PART(\'month\', date_of_birth) < DATE_PART(\'month\', CURRENT_DATE) AND ( last_year_sent_birhtday IS NULL OR last_year_sent_birhtday < $1 ) ORDER BY id ASC'
  const values = [
    yearNow
  ]
  try {
    const { rows } = await runSQL.query(getAllQuery, values)
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
  updateLastYearSentBirthdayUser,
  deleteUser,
  getUsersByBirthdate,
  getUsersUnsentBirthdayMessage
}
