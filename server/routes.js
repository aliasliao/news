const Router = require('koa-router')
const connection = require('./database')

let router = new Router();

router.get('/', async (ctx, next) => {
    ctx.path = 'index.html'
    await next()
}).get('/message', async (ctx, next) => {
    ctx.body = new Date().toLocaleTimeString()
    await next()
}).get('/category', async (ctx, next) => {
    let conn = await connection
    let sql = `SELECT DISTINCT category FROM news`
    let [rows] = await conn.query(sql).catch(err => { console.log(err) })
    ctx.body = JSON.stringify(rows)
    await next()
})

module.exports = router
