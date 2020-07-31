import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import routes from '../routes'

interface NewsState {
  isLoading: boolean
  data: Object[]
}

const slice = createSlice({
  name: 'news',
  initialState: {
    isLoading: false,
    data: []
  } as NewsState,
  reducers: {
    addNews: (state, action) => {
      state.data.push(action.payload)
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

const {
  actions: { addNews, setIsLoading }
} = slice

const fetchNews = (token: string) => async (dispatch: Function) => {
  dispatch(setIsLoading(true))
  const response = await axios
    .get(routes.newsPath(), { params: { token } })
    .finally(() => dispatch(setIsLoading(false)))
  const news = response.data
  dispatch(addNews(news))
}

export default {
  ...slice,
  actions: {
    ...slice.actions,
    fetchNews
  }
}
