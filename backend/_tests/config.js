import request from 'supertest'
import dotenv from 'dotenv'
import app from '../src/app'

dotenv.config({ path: '../.env.test' })

export const api = request(app)

