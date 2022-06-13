import { api } from './config'
test('version endpoint', async () => {
  const res = await api.get('/version')
  expect(res.statusCode).toBe(200)
  expect(res.body).toEqual({ version: '1.0.0' })
})
