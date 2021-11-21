import cron from 'node-cron'
import axios from 'axios'
import moment from 'moment-timezone'
import { updateLastYearSentBirthdayUser, getUsersByBirthdate, getUsersUnsentBirthdayMessage } from '../models/users/usersModel'
import {
  status
} from '../helpers/status'
import env from '../../env'

const checkUserBirthday = async ({ timezone = null }) => {
  let users = null
  if (timezone) {
    users = await getUsersByBirthdate({ timezone })
  } else {
    users = await getUsersUnsentBirthdayMessage()
  }
  if (users.status === status.success && users.data.status_code === status.success && users.data.data) {
    users.data.data.forEach(async ({ id, first_name, last_name }) => {
      const messages = `Hey, ${first_name} ${last_name} it’s your birthday`
      console.log(messages)
      await axios.get(`https://hookb.in/${env.hookbin}`, {
        params: {
          messages: messages
        }
      }).then(async (response) => {
        await updateLastYearSentBirthdayUser({ id })
      })
    })
  }
}

const birthdaySchedulerInit = () => {
  checkUserBirthday({ timezone: null })

  const listTimeZone = moment.tz.names()
  listTimeZone.forEach((timezone) => {
    cron.schedule('* 9 * * *', () => {
      checkUserBirthday({ timezone })
    }, { timezone })
  })
}

module.exports = {
  birthdaySchedulerInit,
  checkUserBirthday
}