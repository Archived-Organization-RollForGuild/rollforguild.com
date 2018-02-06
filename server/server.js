/* eslint-env node */

/******************************************************************************\
  Module imports
\******************************************************************************/

const body = require('koa-body')
const compress = require('koa-compress')
const config = require('./config')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const Koa = require('koa')
const logger = require('koa-logger')
const path = require('path')
const robotsTxt = require('koa-robots.txt')
const SitemapGenerator = require('sitemap-generator')

const next = require('next')({
  dev: process.env.NODE_ENV !== 'production',
  dir: path.resolve('.'),
})

const proxy = require('./config/proxy')
const router = require('./config/router')

const koa = new Koa





/******************************************************************************\
  Initialize the app
\******************************************************************************/

next.prepare().then(() => {
  // Set up the logger
  koa.use(logger())

  // Configure proxies
  proxy(koa, config)

  // Compress responses
  koa.use(compress())

  // Parse request bodies
  koa.use(body())

  // Serve up the robots.txt
  koa.use(robotsTxt(['rollforguild.com']))

  // Configure the router
  router(next, koa, config)

  // Leverage ETags to enable browser caching
  koa.use(conditional())
  koa.use(etag())

  if (process.env.NODE_ENV === 'production') {
    SitemapGenerator('http://rollforguild.com', { filepath: './static/sitemap.xml' }).start()
  }

  // Start the server
  koa.listen(process.env.RFG_APP_PORT || 3000)
})
