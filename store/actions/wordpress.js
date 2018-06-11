// Component imports
import { createWpAction } from '../actionCreators'
import actionTypes from '../actionTypes'
import wpService from '../../services/wordpress'




export const getWordpressPage = slug => createWpAction({
  actionType: actionTypes.GET_WORDPRESS_PAGE,
  url: '/wp-json/wp/v2/pages',
  params: {
    slug,
  },
  onSuccess: async res => {
    if (res.data && !res.data.length) {
      throw new Error('No page in response')
    }

    const page = res.data[0]

    if (page && page.featured_media) {
      const imageResponse = await wpService.get(`/wp-json/wp/v2/media/${page.featured_media}`)

      page.featured_media = { url: imageResponse.data.source_url }

      if (imageResponse.data.acf.hero_gravity) {
        page.featured_media.gravity = imageResponse.data.acf.hero_gravity
      }
    }

    return [page]
  },
})
