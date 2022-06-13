import { api } from './config'


test('Create a book', async () => {
  const book = {
    title: 'Universo em uma casca de nós',
    author: 'Stepphen hawking',
    finishDate: new Date(),
    rate: 5,
    status: 3
  }
  const { statusCode } = await api.post('/book').send(book)
  expect(statusCode).toBe(201)
})

// get the book
test('Get the book', async () => {
  const { body } = await api.get('/book/1')
  expect(body).toEqual(expect.objectContaining({
    id: expect.any(Number),
    title: expect.any(String),
    author: expect.any(String),
    rate: expect.any(Number),
    status: expect.any(Number)
  }))
})

// upate the book
test('Update the book', async () => {
  const book = {
    title: 'it a coisa',
    author: 'Stepphen hawking',
    finishDate: new Date(),
    rate: 5,
    status: 3
  }
  const { statusCode } = await api.put('/book/1').send(book)
  expect(statusCode).toBe(200)

  const { body } = await api.get('/book/1')
  expect(body).toEqual(expect.objectContaining({
    title: expect.any(String)
  }))
})

// updating only the status
test('Updating only book status', async () => {
  const { statusCode } = await api.patch('/book/1/status').send({ status: 2 })
  expect(statusCode).toBe(200)
  
  const { body } = await api.get('/book/1')
  expect(body).toEqual(expect.objectContaining({
    status: 2
  }))
})


// delete the book
test('Delete the book', async () => {
  const { statusCode } = await api.delete('/book/1')
  expect(statusCode).toBe(200)
})

