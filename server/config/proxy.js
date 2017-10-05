'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

const proxy = require('koa-proxies')





module.exports = function (koa, config) {

  /******************************************************************************\
    Proxy API requests
  \******************************************************************************/

//  koa.use(proxy('/token', {
//    auth: `${config.api.clientId}:${config.api.clientSecret}`,
//    changeOrigin: true,
//    rewrite: path => path.replace(/^\/token/, '/oauth2/token'),
//    secure: true,
//    target: config.api.url,
//  }))
}
