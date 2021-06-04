import runSQL from '../../helpers/runSQL'
import {
  errorMessage,
  status
} from '../../helpers/status'

const getMenuById = async (id) => {
  const getQuery = 'SELECT * FROM menu_restaurants WHERE id = $1'
  try {
    const { rows } = await runSQL.query(getQuery, [id])
    const dbResponse = rows[0]
    return { status: status.success, data: dbResponse }
  } catch (error) {
    errorMessage.status_code = status.error
    errorMessage.error = 'Operation was not successful'
    return { status: status.error, data: errorMessage }
  }
}

module.exports = {
  getMenuById
}
