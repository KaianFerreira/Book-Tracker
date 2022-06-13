// Update with your config settings.
require('dotenv').config({
	path: String(process.env.NODE_ENV).trim() === 'test' ? '.env.test' : ''
})

module.exports = {
	client: 'postgresql',
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
}
