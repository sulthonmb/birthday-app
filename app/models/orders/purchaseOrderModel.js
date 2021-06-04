import runSQL from '../../helpers/runSQL'
import {
  errorMessage,
  successMessage,
  status
} from '../../helpers/status'

const createPurchaseOrderModel = async (id_customer, id_menu, amount, purchased_at) => {
  const createQuery = `INSERT INTO
            purchase_orders (id_customer, id_menu, amount, purchased_at)
            VALUES ($1, $2, $3, $4)
            returning *`
  const values = [
    id_customer,
    id_menu,
    amount,
    purchased_at
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

const deletePurchaseOrderModel = async (id) => {
  const deleteQuery = `DELETE FROM purchase_orders WHERE
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
    errorMessage.error = 'Unable to add user types'
    return { status: status.error, data: errorMessage }
  }
}

export {
  createPurchaseOrderModel,
  deletePurchaseOrderModel
}