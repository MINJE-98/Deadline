import axios from 'axios';
import { config } from '../config/ApiURL'

// axios 기본 config 설정
const instance = axios.create({
    baseURL: config.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 3000,
})

// 에러 헨들
export const handleError = ({ message, data, status }) => {
    return Promise.reject({ message, data, status })
  }
  
  instance.interceptors.response.use(
    (response) => response,
    ({ message, response: { data, status } }) => {
      return handleError({ message, data, status })
    },
  )
  
  export default instance