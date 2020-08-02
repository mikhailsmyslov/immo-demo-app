import axios from 'axios'
import faker from 'faker'
import { capitalize } from 'lodash'

const randomImageApi = axios.create({
  baseURL: 'https://api.unsplash.com'
})

const fallBack = [
  {
    id: 'HxuAQ5yJ_Yo',
    imageUrl:
      'https://images.unsplash.com/photo-1584958175520-fc862fb9924b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1MzgyOX0',
    title: 'Ullam quia dicta',
    description: 'Starbucks'
  },
  {
    id: 'j8dzUBbZM5Q',
    imageUrl:
      'https://images.unsplash.com/photo-1594823093208-029e2802b9cf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1MzgyOX0',
    title: 'Aut et voluptatem',
    description:
      'Woman in white dress standing on pink flower field during daytime'
  },
  {
    id: 'kKIewwdtSGg',
    imageUrl:
      'https://images.unsplash.com/photo-1591634903069-8690df4a8e12?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1MzgyOX0',
    title: 'Tenerife, spanje',
    description: 'Person holding white and blue round ball'
  }
]

export default (router) => {
  router.get('/randomImages', async (req, res) => {
    try {
      const result = await randomImageApi.get('/photos/random', {
        params: {
          count: 3,
          client_id: process.env.IMAGES_API_KEY,
          orientation: 'landscape'
        }
      })
      const { data } = result

      const processed = data.map((item) => {
        const { id, urls, description, alt_description, location } = item
        return {
          id,
          imageUrl: [urls.raw, 'w=900', 'h=400', 'fit=clip'].join('&'),
          title: capitalize(
            location.title || location.name || faker.lorem.words()
          ),
          description: capitalize(
            description || alt_description || faker.lorem.sentence()
          )
        }
      })

      res.status(200).json(processed)
    } catch (e) {
      res.status(200).json(fallBack)
    }
  })

  return router
}
