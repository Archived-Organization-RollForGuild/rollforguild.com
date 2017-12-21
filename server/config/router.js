/* eslint-env node */

/******************************************************************************\
  Module imports
\******************************************************************************/

const cookie = require('koa-cookie')
const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const validate = require('uuid-validate')





module.exports = function foo (nextjs, koa) {
  /******************************************************************************\
    Router setup
  \******************************************************************************/

  const handle = nextjs.getRequestHandler()

  router.use(cookie.default())





  /******************************************************************************\
    Authenticated routes
  \******************************************************************************/

  // let authenticatedRoutes = ['LIST_OF_ROUTES_THAT_REQUIRE_AUTHENTICATION']

  // router.get(authenticatedRoutes, async (ctx, next) => {
  //   if ('VERIFY_USER_IS_AUTHENTICATED_HERE') {
  //     await next()
  //   } else {
  //     await ctx.redirect(`URL_TO_REDIRECT_UNAUTHENTICATED_REQUESTS_TO`)
  //   }
  // })





  /******************************************************************************\
    Redirects
  \******************************************************************************/

  // router.get('ROUTE_THE_USER_REQUESTED', async (ctx, next) => {
  //   ctx.status = 301
  //   await ctx.redirect(`[ROUTE_TO_REDIRECT_THE_USER_TO]`)
  // })





  /******************************************************************************\
    Parameterized routes
  \******************************************************************************/

  router.get(['/character/:id'], async ctx => {
    await nextjs.render(ctx.request, ctx.res, '/character', Object.assign({}, ctx.query, ctx.params))
  })





  /******************************************************************************\
    Temporary API
  \******************************************************************************/

  // Create entity
  router.post(['/api/:entityType'], async ctx => {
    const { body } = ctx.request

    if (!body.id || !validate(body.id)) {
      return ctx.status = 400
    }

    fs.writeFileSync(path.resolve('data', ctx.params.entityType, `${body.id}.json`), JSON.stringify(body), 'utf8')

    return ctx.status = 201
  })

  // Get a list of entities
  router.get(['/api/:entityType'], async ctx => {
    const entityTypePath = path.resolve('data', ctx.params.entityType)
    ctx.body = fs.readdirSync(entityTypePath)

    ctx.body = ctx.body.map(entityFileName => JSON.parse(fs.readFileSync(path.resolve(entityTypePath, entityFileName), 'utf8')))

    return ctx.status = 200
  })

  // Get a specific entity
  router.get(['/api/:entityType/:id'], async ctx => {
    const entityFilePath = path.resolve('data', ctx.params.entityType, `${ctx.params.id}.json`)

    try {
      ctx.body = fs.readFileSync(entityFilePath, 'utf8')
    } catch (error) {
      return ctx.status = 404
    }

    if (!ctx.body) {
      return ctx.status = 404
    }

    ctx.body = JSON.parse(ctx.body)

    return ctx.status = 200
  })





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
