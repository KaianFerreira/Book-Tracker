import express from 'express'
import Joi from 'joi'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import logger from '../../config/logger'
import { 
  create,
  getAll,
  get,
  update,
  updateStatus,
  remove
 } from './model'

const router = express.Router()

const upload = multer({
  dest: path.join(process.cwd(), process.env.DATA, 'book-temp'),
  limits: {
    // limit size of file to 20MB
    fileSize: 20 * 1024 * 1024
  }
})
const files = upload.fields([ { name: 'cover' } ]) // only one file

// get all books
router.get('/', async (req, res) => {
  try {
    logger.info('GET /book')

    const books = await getAll()
    res.status(200).json(books)

  } catch (error) {
    logger.error(error)
    res.status(400).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    logger.info('GET /book/:id')

    const schema = Joi.object().keys({ id: Joi.number().required() })
    const { error } = schema.validate(req.params)
    if (error) {
      logger.error(error)
      res.status(400).json({ error: 'Validation error', fields: ['id']  })
    }

    const book = await get(req.params.id)
    res.status(200).json(book)

  } catch (error) {
    logger.error(error)
    res.status(400).json({ error: error.message })
  }
})

  // create a new book
router.post('/', files, async (req, res) => {
  try {
    logger.info('POST /book')
    const {
      title,
      author,
      finishDate,
      rate,
      status
    } = req.body
    
    let cover = null
    if (req.files && req.files['cover']) cover = 'cover.jpg'

    const schema = Joi.object().keys({
      title: Joi.string().required(),
      author: Joi.string().required(),
      finishDate: Joi.date().allow(null),
      rate: Joi.number().required(),
      status: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
      logger.error(error)
      res.status(400).json({ error: 'Validation error', fields: [...error.details.map(x => x.path[0])] })
    }

    const book = await create(
      title,
      author,
      finishDate,
      rate,
      status,
      cover
    )
    
    if (cover) {
      fs.mkdirSync(path.join(process.cwd(), process.env.DATA, 'book', book[0].id), { recursive: true })
      fs.copyFileSync(
        path.join(process.cwd(), process.env.DATA, 'book-temp', cover),
        path.join(process.cwd(), process.env.DATA, 'book', book[0].id, cover)
      )
      fs.unlinkSync(path.join(process.cwd(), process.env.DATA, 'book-temp', cover))
    }

    res.status(201).json(book[0])
  } catch (error) {
    logger.error(error)
    res.status(400).json({ error: error.message })
  }
})

// update a book
router.put('/:id', files, async (req, res) => {
  try {
    logger.info('PUT /book/:id')
    const {
      title,
      author,
      finishDate,
      rate,
      status
    } = req.body

    let cover = null
    if (req.files && req.files['cover']) cover = 'cover.jpg'

    // schemas for validation
    const paramsSchema = Joi.object().keys({ id: Joi.number().required() })
    const bodySchema = Joi.object().keys({
      title: Joi.string().required(),
      author: Joi.string().required(),
      finishDate: Joi.date().allow(null),
      rate: Joi.number().required(),
      status: Joi.number().required()
    })

    const { error: paramsError } = paramsSchema.validate(req.params)
    if (paramsError) {
      logger.error(paramsError)
      res.status(400).json({ error: 'Validation error', fields: ['id']  })
    }
    const { error: bodyError } = bodySchema.validate(req.body)
    if (bodyError) {
      logger.error(bodyError)
      res.status(400).json({ error: 'Validation error', fields: [...bodyError.details.map(x => x.path[0])] })
    }

    const book = await update(
      req.params.id,
      title,
      author,
      finishDate,
      rate,
      status,
      cover
    )

    // if has images
    if (cover) {
      fs.mkdirSync(path.join(process.cwd(), process.env.DATA, 'book', book[0].id), { recursive: true })
      fs.copyFileSync(
        path.join(process.cwd(), process.env.DATA, 'book-temp', cover),
        path.join(process.cwd(), process.env.DATA, 'book', book[0].id, cover)
      )
      fs.unlinkSync(path.join(process.cwd(), process.env.DATA, 'book-temp', cover))
    }

    res.status(200).json(book[0])

  } catch (error) {
    logger.error(error)
    res.status(400).json({ error: error.message })
  }
})

  // update a book status
router.patch('/:id/status', async (req, res) => {
  try {
    logger.info('PUT /book/:id/status')
    const { status } = req.body

    const paramsSchema = Joi.object().keys({ id: Joi.number().required() })
    const { error: paramsError } = paramsSchema.validate(req.params)
    if (paramsError) {
      logger.error(paramsError)
      res.status(400).json({ error: 'Validation error', fields: ['id']  })
    }

    const bodySchema = Joi.object().keys({ status: Joi.number().required() })
    const { error: bodyError } = bodySchema.validate(req.body)
    if (bodyError) {
      logger.error(bodyError)
      res.status(400).json({ error: 'Validation error', fields: ['status'] })
    }

    const book = await updateStatus(req.params.id, status)
    res.status(200).json(book[0])

  } catch (error) {
    logger.error(error)
    res.status(400).json({ error: error.message })
  }
})

  // delete a book
router.delete('/:id', async (req, res) => {
  try {
    logger.info('DELETE /book/:id')

    const schema = Joi.object().keys({ id: Joi.number().required() })
    const { error } = schema.validate(req.params)
    if (error) {
      logger.error(error)
      res.status(400).json({ error: 'Validation error', fields: ['id']  })
    }

    await remove(req.params.id)
    res.status(200).json(true)

  } catch (error) {
    logger.error(error)
    res.status(400).json({ error: error.message })
  }
})

export default router
