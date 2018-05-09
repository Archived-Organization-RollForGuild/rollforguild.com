// Module imports
import NextHead from 'next/head'
import NProgress from 'nprogress'
import React from 'react'





// Component imports
import { Router } from '../routes'
import appStylesheet from '../scss/app.scss'
import libStylesheet from '../scss/lib.scss'





NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

Router.onRouteChangeComplete = () => {
  if ('twttr' in window) {
    window.twttr.widgets.load()
  }

  NProgress.done()
}




/* eslint-disable react/no-danger */
export default () => (
  <NextHead>
    <meta property="og:site_name" content="Roll For Guild" />

    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    <style dangerouslySetInnerHTML={{ __html: libStylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: appStylesheet }} />
  </NextHead>
)
