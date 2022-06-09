import { createLogger, format, transports } from 'winston'
import Transport from 'winston-transport'
import 'winston-daily-rotate-file'

import knex from './knex'

// Console log
const consoleTransport = new transports.Console()

// File log
const fileTransport = new (transports.DailyRotateFile)({
	filename: 'logs/application-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxSize: '20m',
	maxFiles: '30d'
})

// Database log
const dbTransport = new class DBTransport extends Transport {
	constructor(opts) {
		super(opts)
	}
	log(info, callback) {
		setImmediate(() => this.emit('logged', info))
		knex('log').insert({
			from: 'backend',
			level: info.level,
			message: info.message,
			stack: info.stack
		})
			.then(() => callback())
			.catch((err) => {
				console.log(err)
				callback()
			})
	}
}

// Log configuration
const logger = createLogger({
	level: process.env.LOG,
	format: format.printf(info => `[${(new Date()).toLocaleString()}] ${info.level}: ${info.message} ${info.stack ? '\r\n' + info.stack : ''}`),
	transports: [
		consoleTransport,
		fileTransport,
		dbTransport
	],
	exceptionHandlers: [
		consoleTransport,
		fileTransport,
		dbTransport
	]
})

export default logger
