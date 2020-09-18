import 'babel-polyfill'
import env from './env'
import app from './app'
import http from 'http'
import clusterLoader from './app/config/cluster'
import cluster from 'cluster'

const setupServer = (isClusterRequired) => {
  // if it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    clusterLoader()
  } else {
    // to setup server configurations and share port address for incoming requests
    app.server = http.createServer(app)
    app.listen(env.port, () => console.log(`Listening on port: ${env.port}, Worker ${cluster.worker.process.pid}`))
  }
}

setupServer(true)

module.exports = app