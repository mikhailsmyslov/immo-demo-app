import { createSlice } from '@reduxjs/toolkit'
import { postSession, deleteSession, PostSessionParams } from '../api'
import { TOKEN_KEY } from '../constants'

interface AppState {
  uid: number | null
  isAuth: boolean
  isLoading: boolean
}

const slice = createSlice({
  name: 'app',
  initialState: {
    isAuth: false,
    uid: null,
    isLoading: false
  } as AppState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setUid: (state, action) => {
      state.uid = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

const {
  actions: { setIsAuth, setUid, setIsLoading }
} = slice

const performLogin = (params: PostSessionParams) => async (
  dispatch: Function
) => {
  dispatch(setIsLoading(true))
  const response = await postSession(params).finally(() =>
    dispatch(setIsLoading(false))
  )
  const { id: uid, token } = response.data.data.id
  localStorage.setItem(TOKEN_KEY, token)
  dispatch(setIsAuth(Boolean(token)))
  dispatch(setUid(uid))
}

const performLogout = () => async (dispatch: Function) => {
  dispatch(setIsLoading(true))
  await deleteSession().finally(() => dispatch(setIsLoading(false)))
  localStorage.removeItem(TOKEN_KEY)
  dispatch(setIsAuth(false))
  dispatch(setUid(null))
}

export default {
  ...slice,
  actions: {
    ...slice.actions,
    performLogin,
    performLogout
  }
}
