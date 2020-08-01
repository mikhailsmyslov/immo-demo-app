import { decodeToken } from '../hash'
import { blackList } from '../blackList'

export default (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization || ''
  const value = token.replace(/bearer/i, '').trim()
  if (blackList.includes(value)) {
    res.sendStatus(401)
    return
  }
  try {
    const { userId } = decodeToken(value)
    req.userId = Number(userId)
    req.token = value
    next()
  } catch (err) {
    res.sendStatus(401)
  }
}
