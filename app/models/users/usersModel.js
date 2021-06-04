import runSQL from '../../helpers/runSQL'
import {
  errorMessage,
  successMessage,
  status
} from '../../helpers/status'

const getById = async (id) => {
  const getUserByEmailQuery = 'SELECT * FROM customers WHERE id = $1'
  try {
    const { rows } = await runSQL.query(getUserByEmailQuery, [id])
    const dbResponse = rows[0]
    return { status: status.success, data: dbResponse }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Operation was not successful'
    return { status: status.error, data: errorMessage }
  }
}

const updateBalance = async (id, newBalance) => {
  const updateQuery = `UPDATE customers SET
  balance=$1
  WHERE id=$2
  returning *`
  const values = [
    newBalance,
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

module.exports = {
  getById,
  updateBalance
}
