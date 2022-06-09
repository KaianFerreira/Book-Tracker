import api from '@/libs/api'

export const getVersion = async () => {
  const { data, error } = await api.get('/version')
  if (error) {
    return { error }
  }
  return data
}
