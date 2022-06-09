import dotenv from 'dotenv'
import knex from 'knex'
import pg from 'pg'
dotenv.config()

const knexStringcase = require('knex-stringcase')

// Converts Postgres snake_case to camelCase
const options = knexStringcase({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	},
	pool: {
		min: 2,
		max: 10
	}
})

const db = knex(options)

// Connects to Database
pg.types.setTypeParser(20, 'text', parseInt)

export default db
