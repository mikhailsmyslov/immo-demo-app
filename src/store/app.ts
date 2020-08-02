import { createSlice } from '@reduxjs/toolkit'
import {
  postSession,
  deleteSession,
  PostSessionParams,
  getSession
} from '../api'
import { TOKEN_KEY } from '../constants'

interface AppState {
  uid: number | null
  isAuth: boolean | null
  userName: string | null
  isLoading: boolean
}

const slice = createSlice({
  name: 'app',
  initialState: {
    isAuth: null,
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
    setUserName: (state, action) => {
      state.userName = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

const {
  actions: { setIsAuth, setUid, setUserName, setIsLoading }
} = slice

const performLogin = (params: PostSessionParams) => async (
  dispatch: Function
) => {
  const response = await postSession(params)
  const { id: uid, token, userName } = response.data
  localStorage.setItem(TOKEN_KEY, token)
  dispatch(setIsAuth(Boolean(token)))
  dispatch(setUid(uid))
  dispatch(setUserName(userName))
}

const performLogout = () => async (dispatch: Function) => {
  dispatch(setIsLoading(true))
  await deleteSession().finally(() => {
    localStorage.removeItem(TOKEN_KEY)
    dispatch(setIsAuth(false))
    dispatch(setUid(null))
    dispatch(setUserName(null))
    dispatch(setIsLoading(false))
  })
}

const validateSession = () => async (dispatch: Function) => {
  dispatch(setIsLoading(true))
  try {
    const response = await getSession()
    const { id: uid, userName } = response.data
    dispatch(setIsAuth(true))
    dispatch(setUid(uid))
    dispatch(setUserName(userName))
  } catch (e) {
    localStorage.removeItem(TOKEN_KEY)
    dispatch(setIsAuth(false))
    dispatch(setUid(null))
    dispatch(setUserName(null))
    throw e
  } finally {
    dispatch(setIsLoading(false))
  }
}

export default {
  ...slice,
  actions: {
    ...slice.actions,
    performLogin,
    performLogout,
    validateSession
  }
}
