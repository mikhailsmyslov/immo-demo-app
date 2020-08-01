import news from './news'
import session from './session'
import profile from './profile'
import isAuth from '../middleware/auth'

const publicRoutes = [session]
const privateRoutes = [news, profile]

export default (router) => {
  publicRoutes.forEach((controller) => controller(router))
  router.use(isAuth)
  privateRoutes.forEach((controller) => controller(router))
}
