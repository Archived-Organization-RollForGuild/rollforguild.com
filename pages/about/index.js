// Module imports
import React from 'react'





// Component imports
import wordpressService from '../../services/wordpress'
import Component from '../../components/Component'
import Hero from '../../components/Hero'
import Main from '../../components/Main'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'





// Component constants
const title = 'About Us'





class About extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  static async getInitialProps () {
    const response = await wordpressService.get('/wp-json/wp/v2/pages/31')

    if (response.data.featured_media) {
      const imageResponse = await wordpressService.get(`/wp-json/wp/v2/media/${response.data.featured_media}`)

      response.data.featured_media = {
        url: imageResponse.data.source_url,
      }

      if (imageResponse.data.acf.hero_gravity) {
        response.data.featured_media.gravity = imageResponse.data.acf.hero_gravity
      }
    }

    return { page: response.data }
  }

  render () {
    const { page } = this.props

    return (
      <React.Fragment>
        <PageHeader>
          <h1>{page.title.rendered}</h1>
        </PageHeader>

        <Main title={title}>
          <Hero
            gravity={page.featured_media.gravity}
            src={page.featured_media.url} />

          {/* eslint-disable react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
          {/* eslint-enable */}
        </Main>
      </React.Fragment>
    )
  }
}





export default Page(About, title)
