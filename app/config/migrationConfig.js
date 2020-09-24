require('dotenv').config()

const conf = {}
conf.environment = process.env.NODE_ENV
conf.sequelize = {}
conf.sequelize.username = process.env.PGUSER || 'admin'
conf.sequelize.password = process.env.PGPASSWORD || 'blog)r2020'
conf.sequelize.database = process.env.PGDATABASE || 'gaali_service_users_test'
conf.sequelize.host = process.env.PGHOST || '103.41.204.112'
conf.sequelize.dialect = 'postgres'
conf.sequelize.port = process.env.PGPORT || '5432'
conf.sequelize.define = {
  charset: 'utf8mb4',
  dialectOptions: {
    collate: 'utf8mb4_unicode_ci'
  }
}
conf.ROUND_SALT = process.env.ROUND_SALT || '8'

const cfg = {}
cfg[process.env.NODE_ENV] = conf.sequelize

module.exports = cfg
