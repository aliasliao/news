const Router = require('koa-router')

let router = new Router();

router.get('/message', async (ctx, next) => {
    ctx.body = new Date().toLocaleTimeString()
    await next
})

module.exports = router