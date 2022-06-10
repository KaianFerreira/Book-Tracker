import request from 'supertest'
import app from '../src/server'

export const api = request(app)

