import {
  getAllUserTypes,
  getSingleUserTypes,
  createUserTypes,
  updateUserTypes,
  deleteUserTypes
} from '../../models/users/userTypesModel'
import {
  successMessage,
  status
} from '../../helpers/status'
// import redis from '../../config/redis'

const getAllUserTypesService = async () => {
  try {
    const response = await getAllUserTypes()
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const getSingleUserTypesService = async (id) => {
  try {
    // let response = await redis.get('single_user_type_' + id)
    let response = null
    if (response == null) {
      response = await getSingleUserTypes(id)
      return { status: response.status, data: response.data }
    } else {
      response = JSON.parse(response)
      successMessage.status_code = status.success
      successMessage.data = response
      return { status: status.success, data: successMessage }
    }

    // var promise = new Promise(function (resolve, reject) {
    //   redis.redisClient.get('single_user_type_' + id, function (err, val) {
    //     if (err) {
    //       reject(Error(err))
    //     } else {
    //       resolve(val)
    //     }
    //   })
    // })

    // const response = await promise.then(async function (result) {
    //   let respCache = result
    //   if (respCache == null) {
    //     respCache = await getSingleUserTypes(id)
    //     return respCache
    //   } else {
    //     respCache = JSON.parse(respCache)
    //     successMessage.data = respCache
    //     return { status: status.success, data: successMessage.data }
    //   }
    // }).catch(function (err) {
    //   console.log(err)
    //   errorMessage.error = 'Unable to get a user type'
    //   return { status: status.error, data: errorMessage }
    // })

    // return { status: response.status, data: response }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const createUserTypesService = async (name) => {
  try {
    const response = await createUserTypes(name)
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const updateUserTypesService = async (id, name) => {
  try {
    const response = await updateUserTypes(id, name)
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}

const deleteUserTypesService = async (id) => {
  try {
    const response = await deleteUserTypes(id)
    return { status: response.status, data: response.data }
  } catch (e) {
    return { status: status.error, data: e.message }
  }
}
module.exports = {
  getAllUserTypesService,
  getSingleUserTypesService,
  createUserTypesService,
  updateUserTypesService,
  deleteUserTypesService
}
