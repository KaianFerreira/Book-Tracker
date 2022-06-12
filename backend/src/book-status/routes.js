import express from 'express'
import Joi from 'joi'
import logger from '../../config/logger'
import { 
  create,
  getAll,
  get,
  update,
  remove
 } from './model'

const router = express.Router()

// get all status
router.get('/', async (req, res) => {
  try {
    logger.info('GET /book-status')
    const allStatus = await getAll()
    return res.status(200).json(allStatus)
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    logger.info('GET /book-status/:id')
    // validate params
    const schema = Joi.object().keys({ id: Joi.number().required() })
    const { error } = schema.validate(req.params)
    if (error) {
      logger.error(error)
      return res.status(400).json({ error: 'Validation error', fields: ['id']  })
    }

    const status = await get(req.params.id)
    return res.status(200).json(status)
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ error: error.message })
  }
})

  // create a new status
router.post('/', async (req, res) => {
  try {
    logger.info('POST /book-status')
    const {
      name,
    } = req.body
    
    const schema = Joi.object().keys({
      name: Joi.string().required(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
      logger.error(error)
      return res.status(400).json({ error: 'Validation error', fields: [...error.details.map(x => x.path[0])]  })
    }

    const status = await create(name)

    res.status(201).json(status)
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ error: error.message })
  }
})

// update status
router.put('/:id', async (req, res) => {
  try {
    logger.info('PUT /book-status/:id')
    const { name } = req.body

    const paramsSchema = Joi.object().keys({ id: Joi.number().required() })
    const bodySchema = Joi.object().keys({
      name: Joi.string().required()
    })
    // validate req.params and req.body
    const { error: paramsError } = paramsSchema.validate(req.params)
    if (paramsError) {
      logger.error(paramsError)
      return res.status(400).json({ error: 'Validation error', fields: ['id']  })
    }
    const { error: bodyError } = bodySchema.validate(req.body)
    if (bodyError) {
      logger.error(bodyError)
      return res.status(400).json({ error: 'Validation error', fields: ['name']  })
    }

    const status = await update(
      req.params.id,
      name
    )

    return res.status(200).json(status[0])

  } catch (error) {
    logger.error(error)
    return res.status(400).json({ error: error.message })
  }
})

  // delete a status
router.delete('/:id', async (req, res) => {
  try {
    logger.info('DELETE /book-status/:id')
    const schema = Joi.object().keys({ id: Joi.number().required() })
    const { error } = schema.validate(req.params)
    if (error) {
      logger.error(error)
      return res.status(400).json({ error: 'Validation error', fields: ['id']  })
    }

    const status = await remove(req.params.id)
    
    return res.status(200).json(status)
  } catch (error) {
    logger.error(error)
    return res.status(400).json({ error: error.message })
  }
})

export default router
