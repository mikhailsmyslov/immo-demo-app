import jwt from 'jsonwebtoken'

const issuer = 'immo'
const privateKey = process.env.PRIVATE_KEY

export const generateToken = (payload, options = {}) => {
  const token = jwt.sign(payload, privateKey, {
    issuer,
    subject: 'user',
    expiresIn: '1h',
    ...options
  })
  return token
}

export const decodeToken = (token, options = {}) => {
  return jwt.verify(token, privateKey, { issuer, ...options })
}
