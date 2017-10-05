'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

const { URL } = require('url')
const cookie = require('koa-cookie')
const fetch = require('isomorphic-fetch')
const fs = require('fs')
const next = require('next')
const path = require('path')
const router = require('koa-router')()





module.exports = function (nextjs, koa, config) {

  /******************************************************************************\
    Router setup
  \******************************************************************************/

  let handle = nextjs.getRequestHandler()

  router.use(cookie.default())





  /******************************************************************************\
    Authenticated routes
  \******************************************************************************/

//  let authenticatedRoutes = ['LIST_OF_ROUTES_THAT_REQUIRE_AUTHENTICATION']

//  router.get(authenticatedRoutes, async (ctx, next) => {
//    if ('VERIFY_USER_IS_AUTHENTICATED_HERE') {
//      await next()
//
//    } else {
//      await ctx.redirect(`URL_TO_REDIRECT_UNAUTHENTICATED_REQUESTS_TO`)
//    }
//  })





  /******************************************************************************\
    Redirects
  \******************************************************************************/

//  router.get('ROUTE_THE_USER_REQUESTED', async (ctx, next) => {
//    ctx.status = 301
//    await ctx.redirect(`[ROUTE_TO_REDIRECT_THE_USER_TO]`)
//  })





  /******************************************************************************\
    Parameterized routes
  \******************************************************************************/

//  router.get(['INSERT_ROUTE_HERE'], async (ctx, next) => {
//    await nextjs.render(ctx.request, ctx.res, 'ACTUAL_DESTINATION_IN_NEXT_LAND', Object.assign({}, ctx.query, ctx.params))
//  })





  /******************************************************************************\
    Fallthrough routes
  \******************************************************************************/

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  koa.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })





  /******************************************************************************\
    Attach the router to the app
  \******************************************************************************/

  koa.use(router.routes())
  koa.use(router.allowedMethods())
}
