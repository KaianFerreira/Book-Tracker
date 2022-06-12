import api from '@/libs/api'

export const getAll = async () => {
  const { data, error } = await api.get('/book')
  if (error) {
    return { error }
  }
  return data
}

export const get = async (id) => {
  const { data, error } = await api.get(`/book/${id}`)
  if (error) {
    return { error }
  }
  return data
}

export const create = async ({
  title,
  author,
  finishDate = null,
  rate,
  status,
  cover
}) => {
  const formData = new FormData()
  if (title) formData.append('title', title)
  if (author) formData.append('author', author)
  if (finishDate) formData.append('finishDate', finishDate)
  if (rate) formData.append('rate', rate)
  if (status) formData.append('status', status)
  if (cover) formData.append('cover', cover)

  const { data, error } = await api.post('/book', formData)
  if (error) {
    return { error }
  }
  return data
}

export const update = async (
  id,
  {
    title,
    author,
    finishDate,
    rate,
    status,
    cover
  }
) => {
  const formData = new FormData()
  if (title) formData.append('title', title)
  if (author) formData.append('author', author)
  if (finishDate) formData.append('finishDate', finishDate)
  if (rate) formData.append('rate', rate)
  if (status) formData.append('status', status)
  if (cover) formData.append('cover', cover)
  const { data, error } = await api.put(`/book/${id}`, formData)
  if (error) {
    return { error }
  }
  return data
}

export const remove = async (id) => {
  const { data, error } = await api.delete(`/book/${id}`)
  if (error) {
    return { error }
  }
  return data
}
