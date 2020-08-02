import { createSlice } from '@reduxjs/toolkit'
import { getNews, GetNewsParams } from '../api'
import getHashFromContent from '../helper/hash'
import { Subtract } from 'utility-types'

interface RawNewsItem extends Subtracted {
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
}

type SourceId = string | number | null

type Subtracted = {
  source: {
    id: SourceId
    name: string
  }
  content: string
}

export interface NewsItem extends Subtract<RawNewsItem, Subtracted> {
  id: string
  sourceName: string
  sourceId: SourceId
}

interface NewsState {
  isLoading: boolean
  data: NewsItem[]
}

const slice = createSlice({
  name: 'news',
  initialState: {
    isLoading: false,
    data: []
  } as NewsState,
  reducers: {
    addNews: {
      reducer: (state, action) => {
        state.data = action.payload
      },
      prepare: (payload) => {
        const { articles } = payload
        const data = articles.map((article: RawNewsItem) => {
          const { content, source, ...restFields } = article
          const { id: sourceId, name: sourceName } = source
          const id = getHashFromContent(article.description)
          return { ...restFields, sourceName, sourceId, id }
        })
        return { payload: data } as any
      }
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
