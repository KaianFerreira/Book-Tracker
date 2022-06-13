import logger from '../config/logger'
import app from './app.js'
import http from 'http'

const server = http.createServer(app)
const port = process.argv[2] ? process.argv[2] : process.env.PORT
server.listen(port, () => logger.info(`Server listening on port ${port}`))