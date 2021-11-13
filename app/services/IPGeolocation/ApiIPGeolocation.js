import axios from 'axios'
import env from '../../../env'

const getTimeZone = async ({ country, city }) => {
  const timeZone = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${env.api_ip_geolocation}&location=${city},${country}`)
  return timeZone.data.timezone
}

module.exports = {
  getTimeZone
}