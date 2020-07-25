import dotenv from 'dotenv';

dotenv.config();

export default {
  pg_database_host: process.env.PGHOST,
  pg_database_port: process.env.PGPORT,
  pg_database_name: process.env.PGDATABASE,
  pg_database_user: process.env.PGUSER,
  pg_database_pass: process.env.PGPASSWORD,
  secret: process.env.SECRET,
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV,
  round_salt: process.env.ROUND_SALT,
}