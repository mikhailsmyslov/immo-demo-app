import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import configRouting from './routes'

const isProduction = process.env.NODE_ENV === 'production'

export default (options = {}) => {
  const app = express()
  const router = express.Router()

  app.set('port', options.port || 3001)
  app.disable('x-powered-by')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  if (isProduction) {
    app.use(express.static(path.join(__dirname, '..', '/build')))
  }

  configRouting(router)

  app.use('/api/v1', router)

  return app
}
