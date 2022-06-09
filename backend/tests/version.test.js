import api from '../config/axios'
test('version endpoint', async () => {
  const { data, error } = await api.get('/version')
  expect(data.version).toBe('1.0.0')
  expect(!!error).toBe(false)
})
