import NextHead from 'next/head'
import NProgress from 'nprogress'
import React from 'react'





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
  if (window.twttr) {
    window.twttr.widgets.load()
  }

  NProgress.done()
}




/* eslint-disable react/no-danger */
export default (props) => (
  <NextHead>
    <title>{props.title} | Roll for Guild</title>

    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

    <style dangerouslySetInnerHTML={{ __html: libStylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: appStylesheet }} />
  </NextHead>
)
