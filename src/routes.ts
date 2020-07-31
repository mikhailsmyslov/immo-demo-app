// @ts-check

const host = ''
const prefix = 'api/v1'

/**
 * Build the route for AJAX calls
 */
export default {
  newsPath: (): string => [host, prefix, 'channels'].join('/')
}
