const Koa = require('koa')
const send = require('koa-send')
const { resolve } = require('path')
const router = require('./routes')

let app = new Koa()

const ROOT = resolve(__dirname, '../')  // project root
const PUBLIC = resolve(ROOT, 'dist/')  // serve static file here
const PORT = 3000

app.use(async (ctx, next) => {
    ctx.myLog = `[${new Date().toLocaleTimeString()}] ${ctx.method} ${ctx.path} => `
    await next()
    console.log(ctx.myLog)
})

app.use(router.routes())

app.use(async (ctx) => {
    ctx.myLog += ctx.path
    await send(ctx, ctx.path, { root: PUBLIC })  // TODO: error file request will not popup
})

app.listen(PORT, () => {
    console.log(`Koa server is listening on port ${PORT}...`)
})
