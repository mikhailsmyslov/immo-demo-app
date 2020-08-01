import { createSlice } from '@reduxjs/toolkit'
import { getProfile } from '../api'

interface ProfileState {
  isLoading: boolean
  data: {
    firstName?: string
    lastName?: string
    jobTitle?: string
    companyName?: string
    county?: string
    city?: string
    avatar?: string
    phone?: string
    email?: string
  }
}

const slice = createSlice({
  name: 'profile',
  initialState: {
    isLoading: false,
    data: []
  } as ProfileState,
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

const {
  actions: { setProfile, setIsLoading }
} = slice

const fetchProfile = () => async (dispatch: Function) => {
  dispatch(setIsLoading(true))
  const response = await getProfile().finally(() =>
    dispatch(setIsLoading(false))
  )
  const profile = response.data
  dispatch(setProfile(profile))
}

export default {
  ...slice,
  actions: {
    ...slice.actions,
    fetchProfile
  }
}
