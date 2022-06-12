import api from '@/libs/api'

export const getAll = async () => {
  const { data, error } = await api.get('/book-status')
  if (error) {
    return { error }
  }
  return data
}
