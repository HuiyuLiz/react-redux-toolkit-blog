import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'

import { showMessage } from './showMessage'

axios.defaults.timeout = 60000
axios.defaults.baseURL = import.meta.env.VITE_API_URL
// 請求攔截
axios.interceptors.request.use(
  config => {
    // 配置請求頭
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  async error => {
    return await Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const { response } = error
    if (response != null) {
      showMessage(response.status)
      return await Promise.reject(response.data)
    } else {
      console.log('server connection error')
    }
  }
)

export async function request(data: AxiosRequestConfig): Promise<unknown> {
  return await new Promise((resolve, reject) => {
    const promise = axios(data)
    promise
      .then((res: AxiosResponse) => {
        resolve(res.data)
      })
      .catch((err: AxiosError) => {
        reject(err.response?.data)
      })
  })
}
