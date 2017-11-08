/* eslint-env node */
'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

const body = require('koa-body')
const compress = require('koa-compress')
const logger = require('koa-logger')
const Koa = new (require('koa'))
const path = require('path')

const config = require('./config')
const proxy = require('./config/proxy')
const router = require('./config/router')

const koa = new Koa

const next = require('next')({
  dev: process.env.NODE_ENV !== 'production',
  dir: path.resolve('.')
})





/******************************************************************************\
  Initialize the app
\******************************************************************************/

next.prepare()
.then(() => {
  // Set up the logger
  koa.use(logger())

  // Configure proxies
  proxy(koa, config)

  // Compress responses
  koa.use(compress())

  // Parse request bodies
  koa.use(body())

  // Configure the router
  router(next, koa, config)

  // Start the server
//  console.log('Listening on port', process.env.PORT || 3000)
  koa.listen(process.env.PORT || 3000)
})
