import { generateToken } from '../hash'
import isAuth from '../middleware/auth'
import { addToBlackList } from '../blackList'

export default (router) => {
  router.get('/session', isAuth, (req, res) => {
    const userId = process.env.USER_ID
    res.status(200).json({
      id: userId
    })
  })

  router.post('/session', (req, res) => {
    const { login, password } = req.body
    if (
      login === process.env.USER_LOGIN &&
      password === process.env.USER_PASSWORD
    ) {
      const userId = process.env.USER_ID
      res.status(200).json({
        id: userId,
        token: generateToken({ userId }, { subject: userId })
      })
    } else {
      res.sendStatus(401)
    }
  })

  router.delete('/session', isAuth, (req, res) => {
    const token = req.token
    addToBlackList(token)
    res.sendStatus(200)
  })

  return router
}
