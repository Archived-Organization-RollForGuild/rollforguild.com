import Document, { Head, Main, NextScript } from 'next/document'





const fonts = ['Lora', 'Montserrat:400,700']
const gatmId = process.env.RFG_GOOGLE_TAG_MANAGER_API_KEY





export default class extends Document {
  render() {
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
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#42dca3" />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />

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
                  j.async=true
                  j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl
                  f.parentNode.insertBefore(j,f)
                })(window, document, 'script', 'dataLayer', '${gatmId}');
              `,
            }
          } />
          <script dangerouslySetInnerHTML={
            {
              __html: `
                window.twttr = (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                  if (d.getElementById(id)) return t;
                  js = d.createElement(s);
                  js.id = id;
                  js.src = "//platform.twitter.com/widgets.js";
                  fjs.parentNode.insertBefore(js, fjs);

                  t._e = [];
                  t.ready = function(f) {
                    t._e.push(f);
                  };

                  return t;
                }(document, "script", "twitter-wjs"));
              `,
            }
          } />
          {/* <script dangerouslySetInnerHTML={
            {
              __html: `
                window.fbAsyncInit = function() {
                  FB.init({
                    appId            : '${229428954285068}',
                    autoLogAppEvents : true,
                    xfbml            : true,
                    version          : 'v2.12'
                  });
                };

                (function(d, s, id){
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) {return;}
                  js = d.createElement(s); js.id = id;
                  js.src = "https://connect.facebook.net/en_US/sdk.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              `,
            }
          } /> */}
        </Head>

        <body>
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="//www.googletagmanager.com/ns.html?id=${gatmId}X" height="0" width="0" style="display:none; visibility:hidden;" />` }} />

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
