import { Pool } from 'pg'
import env from '../../env'

const pool = new Pool({
  host: env.pg_database_host,
  user: env.pg_database_user,
  database: env.pg_database_name,
  password: env.pg_database_pass,
  port: env.pg_database_port,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

export default pool
