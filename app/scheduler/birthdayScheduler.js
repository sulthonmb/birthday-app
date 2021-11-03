import cron from 'node-cron'
import axios from 'axios'
import { getUsersByBirthdate } from '../models/users/usersModel'
import {
    status,
    errorMessage
  } from '../helpers/status'

const checkUserBirthday = async () => {
    const users = await getUsersByBirthdate()
    if(users.status === status.success && users.data.status_code === status.success && users.data.data){
        // console.log(users.data.data)
        // console.log()
        users.data.data.forEach( async ({ first_name, last_name}) => {
            let messages = `Hey, ${first_name} ${last_name} it’s your birthday`
            // console.log(messages)
            await axios.get('https://hookb.in/DrJRBqzPLPCPajxxaXpD', {
                params: {
                    messages: messages
                }
            }).then(function (response) {
                // console.log(response);
                console.log('success send message')
            }).catch(function (error) {
                // console.log(error);
            })
        })
    }
}

const setCheckUserBirthday = async () => {
    try {
        await checkUserBirthday()
    } catch (error) {

    }
}

const init = () => {

    cron.schedule('* * * * *', () => {
        checkUserBirthday()
    })
}

module.exports = {
    init,
}