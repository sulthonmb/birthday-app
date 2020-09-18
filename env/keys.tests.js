import dotenv from 'dotenv'

dotenv.config()

module.exports = {
  pg_database_host: process.env.PGHOST_TEST,
  pg_database_port: process.env.PGPORT_TEST,
  pg_database_name: process.env.PGDATABASE_TEST,
  pg_database_user: process.env.PGUSER_TEST,
  pg_database_pass: process.env.PGPASSWORD_TEST,
  secret: process.env.SECRET,
  port: 5000,
  environment: process.env.NODE_ENV,
  redis_host: process.env.REDIS_HOST_TEST,
  redis_port: process.env.REDIS_PORT_TEST,
  round_salt: process.env.ROUND_SALT,
  user_docs: process.env.USER_DOCS,
  pass_docs: process.env.PASS_DOCS
}