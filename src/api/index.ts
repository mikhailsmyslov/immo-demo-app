import axios from 'axios'
import { TOKEN_KEY } from '../constants'

const api = () =>
  axios.create({
    baseURL: '/api/v1',
    headers: (() => {
      const token = localStorage.getItem(TOKEN_KEY)
      return token
        ? {
            Authorization: `Bearer ${token}`
          }
        : {}
    })()
  })

export interface PostSessionParams {
  login: string
  password: string
}

export interface GetNewsParams {
  page?: number
}

export const postSession = (params: PostSessionParams) =>
  api().post('/session', params)

export const getSession = () => api().get('/session')

export const deleteSession = () => api().delete('/session')

export const getNews = (params?: GetNewsParams) =>
  api().get('/news', { params })

export const getProfile = () => api().get('/profile')

export const getRandomImages = () => api().get('/randomImages')
