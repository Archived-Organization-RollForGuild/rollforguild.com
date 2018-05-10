// Module imports
import React from 'react'





// Component imports
import Component from '../components/Component'
import Hero from '../components/Hero'
import Main from '../components/Main'
import Page from '../components/Page'
import PageDescription from '../components/PageDescription'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import wordpressService from '../services/wordpress'





class WordpressProxy extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  static async getInitialProps ({ query }) {
    const { page } = query

    if (page.featured_media) {
      const imageResponse = await wordpressService.get(`/wp-json/wp/v2/media/${page.featured_media}`)

      page.featured_media = { url: imageResponse.data.source_url }

      if (imageResponse.data.acf.hero_gravity) {
        page.featured_media.gravity = imageResponse.data.acf.hero_gravity
      }
    }

    return { page }
  }

  render () {
    const { page } = this.props
    const title = page.acf.page_title || page.title.rendered

    return (
      <React.Fragment>
        <PageTitle>{title}</PageTitle>

        {Boolean(page.acf.page_description) && (
          <PageDescription>{page.acf.page_description}</PageDescription>
        )}

        <PageHeader>
          <h1>{page.title.rendered}</h1>
        </PageHeader>

        <Main title={title}>
          {Boolean(page.featured_media) && (
            <Hero
              gravity={page.featured_media.gravity}
              src={page.featured_media.url} />
          )}

          {/* eslint-disable react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
          {/* eslint-enable */}
        </Main>
      </React.Fragment>
    )
  }
}





export default Page(WordpressProxy)
