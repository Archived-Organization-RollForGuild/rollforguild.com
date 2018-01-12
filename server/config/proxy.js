/* eslint-env node */

/******************************************************************************\
  Module imports
\******************************************************************************/

const proxy = require('koa-proxies')





module.exports = (koa, config) => {
  /******************************************************************************\
    Proxy API requests
  \******************************************************************************/

  koa.use(proxy('/api', {
    // auth: `${config.api.clientId}:${config.api.clientSecret}`,
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, ''),
    secure: true,
    target: config.api.url,
  }))
}
