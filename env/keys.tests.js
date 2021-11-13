import dotenv from 'dotenv'

dotenv.config()

module.exports = {
  pg_database_host: process.env.PGHOST_TEST || '103.41.204.112',
  pg_database_port: process.env.PGPORT_TEST || '5432',
  pg_database_name: process.env.PGDATABASE_TEST || 'gaali_service_users_test',
  pg_database_user: process.env.PGUSER_TEST || 'admin',
  pg_database_pass: process.env.PGPASSWORD_TEST || 'blog)r2020',
  secret: process.env.SECRET || 's*#P+3asb*t*WMu?A&UX7%#LgQz$cA+XYnMu3vFYsJda!L@%9*sVcLZu_-Zv',
  port: process.env.PORT || '3006',
  environment: process.env.NODE_ENV || 'test',
  redis_host: process.env.REDIS_HOST_TEST || '103.41.204.112',
  redis_port: process.env.REDIS_PORT_TEST || '6739',
  round_salt: process.env.ROUND_SALT || '8',
  api_ip_geolocation: process.env.API_IP_GEOLOCATION,
  hookbin: process.env.HOOKBIN,
  user_docs: process.env.USER_DOCS || 'user',
  pass_docs: process.env.PASS_DOCS || '12345678',
  api_key: process.env.API_KEY || '****',
  expose_port: process.env.EXPOSE_PORT || '3007'
}