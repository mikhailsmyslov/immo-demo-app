import crypto from 'crypto'

export default (content: string) => {
  return crypto.createHash('sha1').update(content).digest('hex')
}
