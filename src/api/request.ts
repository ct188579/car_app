import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

const baseURL = 'http://124.93.196.45:10001'

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) {
      const data = response.data as { code?: number; msg?: string }
      if (data.code !== undefined && data.code !== 200 && data.code !== 0) {
        return Promise.reject(response)
      }
      return response.data
    }
    return Promise.reject(response)
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default instance