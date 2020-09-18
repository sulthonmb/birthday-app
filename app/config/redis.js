import redis from 'redis'
import env from '../../env'

const redisClient = redis.createClient({
  host: env.redis_host,
  port: env.redis_port
})

redisClient.on('connect', function () {
  // console.log('Redis Database connected' + '\n')
})

redisClient.on('reconnecting', function () {
  // console.log('Redis client reconnecting')
})

redisClient.on('ready', function () {
  // console.log('Redis client is ready')
})

redisClient.on('error', function (err) {
  console.log('Something went wrong ' + err)
})

redisClient.on('end', function () {
  // console.log('\nRedis client disconnected')
  // console.log('Server is going down now...')
  // process.exit()
})

module.exports.set = (key, value) => {
  redisClient.set(key, value, redis.print)
  return 'done'
}

module.exports.get = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, function (error, result) {
      if (error) {
        console.log(error)
        reject(error)
      }
      resolve(result)
    })
  })
}

module.exports.close = async () => {
  await new Promise((resolve) => {
    redisClient.quit(() => {
      resolve()
    })
  })
  // redis.quit() creates a thread to close the connection.
  // We wait until all threads have been run once to ensure the connection closes.
  await new Promise(resolve => setImmediate(resolve))
  // redisClient.quit(callback)
}