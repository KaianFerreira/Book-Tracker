import logger from '../config/logger'
import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

// routes import
import log from './log/routes'
import book from './book/routes'
import bookStatus from './book-status/routes'

// when node_env equalts test then load .env.test
if (String(process.env.NODE_ENV).trim() === 'test') {
	dotenv.config({ path: '.env.test' })
} else {
	console.log('NODE_ENV is not test')
	dotenv.config()
}


logger.info('Starting server...')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded  

// CORS
app.use(cors())

const router = express.Router()

router.get('/version', async (req, res) => {
	try {
		console.log('here')
		return res.send({ version: '1.0.0'})
	} catch (error) {
		error.component = `${req.method} /api${req.originalUrl}`
		res.status(400).send({ error: 'Internal error' })
	}
})

router.use('/log', log)
router.use('/book', book)
router.use('/book-status', bookStatus)

app.use('/data', express.static(path.join(process.cwd(), process.env.DATA)))
app.use('/', router)

module.exports = app