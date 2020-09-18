import dotenv from 'dotenv'
import devKeys from './env/keys.dev'
import testsKeys from './env/keys.tests'
import prodKeys from './env/keys.prod'

dotenv.config()

if (process.env.NODE_ENV === 'production') {
  module.exports = prodKeys
} else if (process.env.NODE_ENV === 'development') {
  module.exports = devKeys
} else {
  module.exports = testsKeys
}