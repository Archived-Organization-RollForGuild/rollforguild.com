/* eslint-env node */

/******************************************************************************\
  Module imports
\******************************************************************************/

require('isomorphic-fetch')

const cookie = require('koa-cookie')
const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const send = require('koa-send')
const uuid = require('uuid/v4')

const routes = require('../../routes')
const recursivelyConvertDirectoryStructureIntoJSON = require('../helpers/recursivelyConvertDirectoryStructureIntoJSON')





module.exports = function foo (nextjs, koa) {
  /******************************************************************************\
    Router setup
  \******************************************************************************/

  const handle = routes.getRequestHandler(nextjs)

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

  router.get('/browserconfig.xml', async ctx => {
    await send(ctx, '/static/browserconfig.xml')
  })

  router.get('/sitemap.xml', async ctx => {
    await send(ctx, '/static/sitemap.xml')
  })

  router.get('/sw.js', async ctx => {
    await send(ctx, '/static/sw.js')
  })





  /******************************************************************************\
    Temporary API
  \******************************************************************************/

  // Get all rulesets
  router.get(['/local-api/rulesets'], async ctx => {
    const rulesetsPath = path.resolve('data', 'rulesets')

    ctx.body = {
      data: fs.readdirSync(rulesetsPath),
    }

    return ctx.status = 200
  })

  // Get a ruleset
  router.get(['/local-api/rulesets/:ruleset'], async ctx => {
    const rulesetsPath = path.resolve('data', 'rulesets')
    const availableRulesets = fs.readdirSync(rulesetsPath)

    if (availableRulesets.includes(ctx.params.ruleset)) {
      const rulesetPath = path.resolve(rulesetsPath, ctx.params.ruleset)

      ctx.body = {
        data: {
          [ctx.params.ruleset]: recursivelyConvertDirectoryStructureIntoJSON(rulesetPath),
        },
      }

      return ctx.status = 200
    }

    return ctx.status = 404
  })

  // Create entity
  router.post(['/local-api/:entityType'], async ctx => {
    const { body } = ctx.request

    body.id = uuid()

    fs.writeFileSync(path.resolve('data', ctx.params.entityType, `${body.id}.json`), JSON.stringify(body))

    ctx.body = { data: body }
    return ctx.status = 201
  })

  // Get a list of entities
  router.get(['/local-api/:entityType'], async ctx => {
    const entityTypePath = path.resolve('data', ctx.params.entityType)
    ctx.body = fs.readdirSync(entityTypePath)

    ctx.body = ctx.body.map(entityFileName => JSON.parse(fs.readFileSync(path.resolve(entityTypePath, entityFileName), 'utf8')))

    return ctx.status = 200
  })

  // Get a specific entity
  router.get(['/local-api/:entityType/:id'], async ctx => {
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

  router.get('/:slug?', async (ctx, next) => {
    if (ctx.req.url === '/') {
      ctx.params.slug = 'home'
    }

    const response = await fetch(`${process.env.RFG_WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=${ctx.params.slug}`)

    if (!response.ok) {
      return next()
    }

    const [page] = await response.json()

    if (!page) {
      return next()
    }

    await nextjs.render(ctx.request, ctx.res, '/wordpress-proxy', Object.assign({ page }, ctx.query, ctx.params))

    ctx.respond = false

    return ctx.status = 200
  })

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
