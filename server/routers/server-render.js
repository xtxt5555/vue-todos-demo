const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path }

  try {
    // 生成appString(body字符串), 并且丰富context对象
    const appString = await renderer.renderToString(context)

    const {
      title
    } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      styles: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })

    ctx.body = html
  } catch (e) {
    console.log('render error', e)
    throw e
  }
}
