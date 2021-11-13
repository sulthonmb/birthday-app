import dotenv from 'dotenv'

dotenv.config()

module.exports = {
  pg_database_host: process.env.PGHOST,
  pg_database_port: process.env.PGPORT,
  pg_database_name: process.env.PGDATABASE,
  pg_database_user: process.env.PGUSER,
  pg_database_pass: process.env.PGPASSWORD,
  secret: process.env.SECRET,
  port: process.env.PORT || 5055,
  environment: process.env.NODE_ENV,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  api_ip_geolocation: process.env.API_IP_GEOLOCATION,
  hookbin: process.env.HOOKBIN,
  round_salt: process.env.ROUND_SALT,
  user_docs: process.env.USER_DOCS,
  pass_docs: process.env.PASS_DOCS,
  api_key: process.env.API_KEY,
  expose_port: process.env.EXPOSE_PORT
}