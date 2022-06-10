import request from 'supertest'
import app from '../src/server'

const api = request(app)
test('version endpoint', async () => {
  try {
    const res = await api.get('/version')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ version: '1.0.0' })
  } catch (error) {
    console.log(error)
  }
})
