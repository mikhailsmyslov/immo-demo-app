import isAuth from '../middleware/auth'
import getFakeUser from '../faker'

export default (router) => {
  router.use(isAuth)
  router.get('/profile', (req, res) => {
    res.status(200).json(getFakeUser(req.userId))
  })

  return router
}
