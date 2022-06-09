import express from 'express'
import Joi from 'joi'
import logger from '../../config/logger'
import { create } from './model'

const router = express.Router()


router.post('/', async (req, res) => {
  try {
    // Validate request
    const schema = Joi.object().keys({
      level: Joi.string().valid('debug', 'info', 'warn', 'error').required(),
      from: Joi.string().valid('web', 'api').required(),
      message: Joi.string().required(),
      stack: Joi.string().allow(null)
    })

    const { value, error } = schema.validate(req.body)
    if (error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }
    // Save log to database
    await create(
			value.from,
			value.level,
      value.message,
      value.stack
    )
    res.send({ status: true })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
