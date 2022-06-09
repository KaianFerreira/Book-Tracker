import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const api = axios.create({
  baseURL: process.env.URL_API
})

export default api