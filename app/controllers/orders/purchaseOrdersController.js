
import {
  errorMessage, status
} from '../../helpers/status'

import {
  checkBalanceForOrder,
  changeBalanceForOrder
} from '../../services/users/usersServices'

import { getMenuById } from '../../models/restaurants/menuRestaurantModel'
import { createPurchaseOrderModel, deletePurchaseOrderModel } from '../../models/orders/purchaseOrderModel'
import { changeBalanceRestaurantForOrder } from '../../services/restaurant/restaurantServices'

const createPurchaseOrder = async (req, res) => {
  const {
    id_menu,
    amount_order
  } = req.body

  const { id } = req.user

  try {
    const menu = await getMenuById(id_menu)
    if (menu.status === status.success) {
      const menuDb = menu.data
      if (!menuDb) {
        errorMessage.status_code = status.notfound
        errorMessage.error = 'Menu does not exist'
        return res.status(status.notfound).send(errorMessage)
      }

      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

      const id_restaurant = menuDb.id_restaurant
      const amount = menuDb.price
      const total = amount_order * amount
      const purchased_at = date + ' ' + time
      let response
      let i

      const respCheckBalanceForOrder = await checkBalanceForOrder(id, total)
      if (respCheckBalanceForOrder.status !== status.success) {
        return res.status(respCheckBalanceForOrder.status).send(respCheckBalanceForOrder.data)
      }

      for (i = 0; i < amount_order; i++) {
        response = await createPurchaseOrderModel(id, id_menu, amount, purchased_at)
      }

      const respChangeBalanceForOrder = await changeBalanceForOrder(id, total)
      if (respChangeBalanceForOrder.status !== status.created) {
        return res.status(respChangeBalanceForOrder.status).send(respChangeBalanceForOrder.data)
      }

      const respChangeBalanceRestaurantForOrder = await changeBalanceRestaurantForOrder(id_restaurant, total)
      if (respChangeBalanceRestaurantForOrder.status !== status.created) {
        return res.status(respChangeBalanceRestaurantForOrder.status).send(respChangeBalanceRestaurantForOrder.data)
      }

      menuDb.amount_order = amount_order

      if (response.status === status.created) {
        return res.status(response.status).send({
          status: 'success',
          status_code: status.created,
          data: menuDb
        })
      } else {
        return res.status(status.success).send({
          status: 'success',
          status_code: status.success,
          message: 'empty data'
        })
      }
    } else {
      return res.status(menu.status).send(menu.data)
    }
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

const deletePurchaseOrder = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await deletePurchaseOrderModel(id)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

export {
  createPurchaseOrder,
  deletePurchaseOrder
}
