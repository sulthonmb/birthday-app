import express from 'express'
import compression from 'compression'
import 'babel-polyfill'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import basicAuth from 'basic-auth'
import responseTime from 'response-time'
import morgan from 'morgan'
import winston from './app/config/winston'
import env from './env'
import adminRoutes from './app/routes/adminRoutes'
import authRoutes from './app/routes/authRoutes'
import userTypes from './app/routes/userTypesRoutes'
import usersRoutes from './app/routes/usersRoutes'

import swaggerDocument from './docs/swagger.json'

const auth = function (req, res, next) {
  const user = basicAuth(req)
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    res.sendStatus(401)
    return
  }
  if (user.name === env.user_docs && user.pass === env.pass_docs) {
    next()
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    res.sendStatus(401)
  }
}

const helmet = require('helmet')
const app = express()

app.use(compression())

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(helmet())
app.use(responseTime())
app.use(cors())
// Add logging
if (env.environment === 'development' || env.environment === 'production') {
  app.use(morgan('combined', { stream: winston.stream }))
}
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/* Route Docs */
app.use('/docs', auth, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/* Route App */
app.use('/api/v1', adminRoutes)
app.use('/api/v1', authRoutes)
app.use('/api/v1', userTypes)
app.use('/api/v1', usersRoutes)

module.exports = app