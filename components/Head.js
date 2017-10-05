import NextHead from 'next/head'
import React from 'react'
import ReactGA from 'react-ga'
import Router from 'next/router'





import appStylesheet from '../scss/app.scss'
import libStylesheet from '../scss/lib.scss'





const gaTrackingId = 'UA-106962187-1'





Router.onRouteChangeComplete = () => {
  let userId = localStorage.getItem('userId')

  ReactGA.initialize(gaTrackingId)

  if (userId) {
    ReactGA.set({ userId })
  }

  ReactGA.pageview(window.location.pathname)
}





export default class extends React.Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <NextHead>
        <title>{this.props.title} | Roll for Guild</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

        <style dangerouslySetInnerHTML={{ __html: libStylesheet }} />
        <style dangerouslySetInnerHTML={{ __html: appStylesheet }} />

        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || []
          function gtag(){
            dataLayer.push(arguments)
          }
          gtag('js', new Date())
          gtag('config', '${gaTrackingId}')
        `}} />
      </NextHead>
    )
  }
}
