/* eslint-disable camelcase */
import { status } from '../../helpers/status'
import { signIn } from '../../services/auth/signInUsersServices'

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const siginUsers = async (req, res) => {
  const { email, password } = req.body
  try {
    const resp = await signIn(email, password)
    return res.status(resp.status).send(resp.data)
  } catch (e) {
    return res.status(status.error).send(e.message)
  }
}

export {
  siginUsers
}
