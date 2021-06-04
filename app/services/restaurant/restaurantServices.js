import {
  getById,
  updateBalance
} from '../../models/restaurants/restaurantModel'
import {
  status
} from '../../helpers/status'

const changeBalanceRestaurantForOrder = async (id, total) => {
  try {
    const response = await getById(id)
    const data = response.data

    const newBalance = data.balance + total

    const respUpdateBalance = await updateBalance(id, parseFloat(newBalance).toFixed(2))
    return { status: respUpdateBalance.status, data: respUpdateBalance.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

module.exports = {
  changeBalanceRestaurantForOrder
}
