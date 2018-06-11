// Module imports
import Head from 'next/head'
import React from 'react'




// Component imports
import { actions } from '../store'
import Component from '../components/Component'
import connect from '../helpers/connect'
import Hero from '../components/Hero'
import Main from '../components/Main'
import PageDescription from '../components/PageDescription'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import wordpressStylesheet from '../scss/wordpress.scss'





class WordpressProxy extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  static async getInitialProps (ctx) {
    const {
      asPath,
      query,
      res,
      store,
    } = ctx
    let { slug } = query

    if (asPath === '/') {
      slug = 'home'
    }

    if (!store.getState().wordpress.page[slug]) {
      const { status } = await actions.getWordpressPage(slug)(store.dispatch)

      if (status === 'error' && res) {
        res.statusCode = 404
      }
    }

    return {
      query: {
        ...query,
        slug,
      },
    }
  }

  render () {
    const { page } = this.props
    const title = page.acf.page_title || page.title.rendered

    return (
      <React.Fragment>
        <Head>
          <link href="/static/slider-revolution/css/slider-revolution.css" rel="stylesheet" />

          <script src="/static/slider-revolution/js/jquery.js" />
          <script src="/static/slider-revolution/js/jquery-migrate.min.js" />
          <script src="/static/slider-revolution/js/jquery.themepunch.tools.min.js" />
          <script src="/static/slider-revolution/js/jquery.themepunch.revolution.min.js" />
          <script src="/static/slider-revolution/js/revolution.extension.actions.min.js" />
          <script src="/static/slider-revolution/js/revolution.extension.carousel.min.js" />
          <script src="/static/slider-revolution/js/revolution.extension.kenburn.min.js" />
          <script src="/static/slider-revolution/js/revolution.extension.layeranimation.min.js" />
          <script src="/static/slider-revolution/js/revolution.extension.migration.min.js" />
          <script src="/static/slider-revolution/js/revolution.extension.navigation.min.js" />
          <script src="/static/slider-revolution/js/revolution.extension.parallax.min.js" />
          <script src="/static/slider-revolution/js/revolution.extension.slideanims.min.js" />
          <script src="/static/slider-revolution/js/revolution.extension.video.min.js" />
          <script src="/static/slider-revolution/js/slider-revolution.js" />

          {/* eslint-disable react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: wordpressStylesheet }} />
          {/* eslint-enable */}
        </Head>

        <PageTitle>{title}</PageTitle>

        {Boolean(page.acf.page_description) && (
          <PageDescription>{page.acf.page_description}</PageDescription>
        )}

        <PageHeader>
          <h1>{page.title.rendered}</h1>
        </PageHeader>

        <Main
          className="wordpress-proxy"
          title={title}>
          {Boolean(page.featured_media) && (
            <Hero
              gravity={page.featured_media.gravity}
              src={page.featured_media.url} />
          )}

          {/* eslint-disable react/no-danger */}
          <div
            className="wordpress-content"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
          {/* eslint-enable */}
        </Main>
      </React.Fragment>
    )
  }
  static mapStateToProps = ({ wordpress }, { query }) => ({
    page: wordpress.page[query.slug] || null,
  })
}


export default connect(WordpressProxy)
