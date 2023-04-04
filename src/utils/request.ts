import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '',
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log('request error ===', error)
  throw Error(error)
})

// 返回拦截器
service.interceptors.response.use(
  response => {
    if (response.status !== 200 || response.data.code !== 0) {
      // 返回错误处理
      ElMessage({
        message: response.data.msg || 'request error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(response.status.toString()))
    }

    return response.data
  },
  error => {
    console.log('response ===', error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export interface Response<T> {
  code: number,
  data: T,
  msg: string
}

const request = <T>(options: AxiosRequestConfig) => {
  return service<Response<T>, Response<T>>(options)
}

export default request
