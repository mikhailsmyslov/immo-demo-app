import NewsAPI from 'newsapi'

const newsapi = new NewsAPI(process.env.API_KEY)

export default (router) => {
  router.get('/news', (req, res) => {
    newsapi.v2
      .everything({
        q: 'javascript',
        language: 'ru',
        sortBy: 'relevancy'
      })
      .then((response) => {
        res.status(200).json(response)
      })
      .catch((e) => {
        console.error(e)
        res.sendStatus(500)
      })
  })

  return router
}
