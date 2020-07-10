const path = require('path')
const fs = require('fs')

const Router = require('@koa/router')
const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../../public/vue-ssr-client-manifest.json')
const serverRender = require('./server-render')
const renderer = VueServerRenderer.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(
  path.join(__dirname, '../template.ejs'),
  'utf-8'
)

const router = new Router()

router.get('/(.*)', async ctx => {
  await serverRender(ctx, renderer, template)
})

module.exports = router
