import { RootState } from '../store'

export const isAuthSelector = (state: RootState) => state.app.isAuth
export const aisAppLoadingSelector = (state: RootState) => state.app.isLoading
export const userNameSelector = (state: RootState) => state.app.userName
export const imagesSelector = (state: RootState) => state.images
export const newsSelector = (state: RootState) => state.news
export const profileSelector = (state: RootState) => state.profile
