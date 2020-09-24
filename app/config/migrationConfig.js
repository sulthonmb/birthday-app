import env from '../../env'

const conf = {}
conf.environment = env.environment
conf.sequelize = {}
conf.sequelize.username = env.pg_database_user
conf.sequelize.password = env.pg_database_pass
conf.sequelize.database = env.pg_database_name
conf.sequelize.host = env.pg_database_host
conf.sequelize.dialect = 'postgres'
conf.sequelize.port = env.pg_database_port
conf.sequelize.define = {
  charset: 'utf8mb4',
  dialectOptions: {
    collate: 'utf8mb4_unicode_ci'
  }
}
conf.ROUND_SALT = env.round_salt

const cfg = {}
cfg[env.environment] = conf.sequelize

module.exports = cfg
