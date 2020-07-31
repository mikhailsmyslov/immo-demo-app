import { PUBLIC_TYPE, PROTECTED_TYPE } from './constants'
import { omit, values } from 'lodash-es'

const navigation = {
  main: {
    pathname: '/',
    type: PUBLIC_TYPE,
    text: 'main'
  },
  news: {
    pathname: '/news',
    type: PROTECTED_TYPE,
    text: 'news'
  },
  profile: {
    pathname: '/profile',
    type: PROTECTED_TYPE,
    text: 'profile'
  },
  login: {
    pathname: '/login',
    type: PUBLIC_TYPE,
    text: 'login'
  }
}

export const navBarTabsSet = values(omit(navigation, 'login'))
export default navigation
