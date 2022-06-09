import logger from '../config/logger'
import express from 'express'
import cors from 'cors'
import http from 'http'
import path from 'path'
import dotenv from 'dotenv'

// routes import
import log from './log/routes'

// load env variables based on node_env
dotenv.config()
logger.info('Starting server...')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded  

// CORS
app.use(cors())

const router = express.Router()

router.get('/version', async (req, res) => {
	try {
		return res.send({ version: '1.0.0'})
	} catch (error) {
		error.component = `${req.method} /api${req.originalUrl}`
		res.status(400).send({ error: 'Internal error' })
	}
})

router.use('/log', log)

app.use('/data', express.static(path.join(process.cwd(), process.env.DATA)))
app.use('/', router)

const server = http.createServer(app)
const port = process.argv[2] ? process.argv[2] : process.env.PORT
server.listen(port, () => logger.info(`Server listening on port ${port}`))