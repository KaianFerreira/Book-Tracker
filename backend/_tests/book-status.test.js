import { api } from './config'


test('Create a status', async () => {
  const status = {
    name: 'this is a test',
  }
  const { statusCode } = await api.post('/book-status').send(status)
  expect(statusCode).toBe(201)
})

// get the book
test('Get the status', async () => {
  const { body } = await api.get('/book-status/4')
  expect(body).toEqual(expect.objectContaining({
    name: 'this is a test'
  }))
})

// upate the book
test('Update the status', async () => {
  const status = {
    name: 'test has changed',
  }
  const { statusCode } = await api.put('/book-status/4').send(status)
  expect(statusCode).toBe(200)

  const { body } = await api.get('/book-status/4')
  expect(body).toEqual(expect.objectContaining({
    name: status.name
  }))
})

// delete the book
test('Delete the status', async () => {
  const { statusCode } = await api.delete('/book-status/4')
  expect(statusCode).toBe(200)

  const { body } = await api.get('/book-status/4')
  // expect to be empty
  expect(body).toBe('')
})

