import axios from 'axios'
const levels = ['debug', 'info', 'warn', 'error']

const log = (level, message, stack = null) => {
  const type = level === 'debug' ? 'log' : level
  // Console log for development
  if (process.env.NODE_ENV !== 'production') {
    console[type](message, stack)
  }
  // Send log to API
  axios.post(`${process.env.VUE_APP_API}/log`, {
    from: 'web',
    level,
    message,
    stack
  })
    .then(() => false)
    .catch(() => console.error('Error sending log'))
}

const logger = {
  level: process.env.VUE_APP_LOG
}

logger.debug = (message) => {
  if (levels.indexOf(logger.level) === 0) { log('debug', message) }
}

logger.info = (message) => {
  if (levels.indexOf(logger.level) <= 1) { log('info', message) }
}

logger.warn = (message, context) => {
  if (levels.indexOf(logger.level) <= 2) { log('warn', message, null, context) }
}

logger.error = (error, context) => {
  error.component = `component name: ${context.$options.name}, route: ${context.$route.fullPath}`
  if (levels.indexOf(logger.level) <= 3) { log('error', error.message, error.stack) }
}

export default logger
