import { createSlice } from '@reduxjs/toolkit'
import { getRandomImages } from '../api'

interface ImageItem {
  id?: string
  title?: string
  description?: string
  imageUrl?: string
}

interface ImagesState {
  isLoading: boolean
  data: ImageItem[]
}

const slice = createSlice({
  name: 'images',
  initialState: {
    isLoading: false,
    data: []
  } as ImagesState,
  reducers: {
    setImages: (state, action) => {
      state.data = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

const {
  actions: { setImages, setIsLoading }
} = slice

const fetchImages = () => async (dispatch: Function) => {
  dispatch(setIsLoading(true))
  const response = await getRandomImages().finally(() =>
    dispatch(setIsLoading(false))
  )
  dispatch(setImages(response.data))
}

export default {
  ...slice,
  actions: {
    ...slice.actions,
    fetchImages
  }
}
