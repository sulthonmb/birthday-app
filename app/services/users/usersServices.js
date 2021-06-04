import {
  getById,
  updateBalance
} from '../../models/users/usersModel'
import {
  errorMessage, status
} from '../../helpers/status'

const checkBalanceForOrder = async (id, total) => {
  try {
    const response = await getById(id)
    const data = response.data

    if (data.balance < total) {
      errorMessage.status_code = status.paymentRequired
      errorMessage.error = 'Sorry your balance not enough.'
      return { status: status.paymentRequired, data: errorMessage }
    } else {
      return { status: response.status, data: response.data }
    }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const changeBalanceForOrder = async (id, total) => {
  try {
    const response = await getById(id)
    const data = response.data

    const newBalance = data.balance - total

    const respUpdateBalance = await updateBalance(id, parseFloat(newBalance).toFixed(2))
    return { status: respUpdateBalance.status, data: respUpdateBalance.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

module.exports = {
  checkBalanceForOrder,
  changeBalanceForOrder
}
