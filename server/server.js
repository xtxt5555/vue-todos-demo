const path = require('path')

const Koa = require('koa')
const staticRouter = require('./routers/static.js')
const isDev = process.env.NODE_ENV === 'development'
const send = require('koa-send')

const app = new Koa()
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app
  .use(staticRouter.routes())
  .use(staticRouter.allowedMethods())

let pageRouter

if (isDev) {
  pageRouter = require('./routers/dev-ssr.js')
} else {
  pageRouter = require('./routers/ssr.js')
}

// 处理 icon
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app
  .use(pageRouter.routes())
  .use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log('server is listening on ' + HOST + ':' + PORT)
})
