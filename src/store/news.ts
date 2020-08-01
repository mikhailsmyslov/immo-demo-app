import { createSlice } from '@reduxjs/toolkit'
import { getNews, GetNewsParams } from '../api'

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

const fetchNews = (params: GetNewsParams) => async (dispatch: Function) => {
  dispatch(setIsLoading(true))
  const response = await getNews(params).finally(() =>
    dispatch(setIsLoading(false))
  )
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
