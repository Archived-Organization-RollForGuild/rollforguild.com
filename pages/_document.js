// Module imports
import Document, { Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'





// Component constants
const { publicRuntimeConfig } = getConfig()
const fonts = ['Lora', 'Montserrat:400,700']
const googleTagManager = publicRuntimeConfig.analytics





export default class extends Document {
  render () {
    /* eslint-disable react/no-danger */
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, viewport-fit=cover, width=device-width" />

          <meta name="application-name" content="Roll For Guild" />
          <meta name="apple-mobile-web-app-title" content="Roll For Guild" />
          <meta name="msapplication-TileColor" content="#42dca3" />
          <meta name="msapplication-config" content="/static/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="alternate" href="//rollforguild.com" hrefLang="en-us" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png?v=2" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png?v=2" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png?v=2" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg?v=2" color="#42dca3" />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico?v=2" />

          <link rel="manifest" href="/static/manifest.json" />

          <script src="//cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.9/dialog-polyfill.min.js" />
          <script dangerouslySetInnerHTML={
            {
              __html: `
                (function (w, d, s, l, i) {
                  w[l] = w[l] || []
                  w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                  })
                  var f = d.getElementsByTagName(s)[0]
                  var j = d.createElement(s)
                  var dl = l != 'dataLayer' ? '&l=' + l : ''
                  j.async = true
                  j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl + '&gtm_auth=${googleTagManager.auth}&gtm_preview=env-${googleTagManager.envId}&gtm_cookies_win=x'
                  f.parentNode.insertBefore(j,f)
                })(window, document, 'script', 'dataLayer', '${googleTagManager.id}')
              `,
            }
          } />
        </Head>

        <body>
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="//www.googletagmanager.com/ns.html?id=${googleTagManager.id}&gtm_auth=${googleTagManager.auth}&gtm_preview=env-${googleTagManager.envId}&gtm_cookies_win=x" height="0" width="0" style="display:none; visibility:hidden;" />` }} />

          <noscript>Javascript is required to view this site.</noscript>

          <Main className="next-wrapper" />

          <div id="alert-container" />

          <div id="dialog-container" />

          <NextScript />

          <link
            href={`//fonts.googleapis.com/css?family=${fonts.join('|').replace(/\s/g, '+')}`}
            rel="stylesheet" />
        </body>
      </html>
    )
    /* eslint-enable */
  }
}
