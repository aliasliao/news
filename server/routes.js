const Router = require('koa-router')
const pool = require('./database')

let router = new Router();

router.get('/', async (ctx, next) => {
    ctx.path = 'index.html'
    await next()
}).get('/message', async (ctx, next) => {
    ctx.body = new Date().toLocaleTimeString()
    await next()
}).get('/category', async (ctx, next) => {
    let conn = await pool.getConnection()
    let sql = `SELECT DISTINCT category FROM news`
    let [rows] = await conn.query(sql).catch(err => { console.log(err) })
    ctx.body = JSON.stringify(rows)
    await conn.release()
    await next()
}).get('/cat/:name', async (ctx, next) => {
    let conn = await pool.getConnection()
    let name = decodeURI(ctx.params.name)
    let sql =  `SELECT * FROM news WHERE category='${name}' ORDER BY time DESC`
    let [rows] = await conn.query(sql).catch(err => { console.log('>>' + err) })
    ctx.body = rows
    await conn.release()
    await next()
}).get('/news/:id', async (ctx, next) => {
    let conn = await pool.getConnection()
    let id = ctx.params.id
    let sql =  `SELECT title, time, source, content FROM news WHERE id='${id}'`
    let [article] = await conn.query(sql).catch(err => { console.log(err) })
    ctx.body = article[0]  // query result is array
    await conn.release()
    await next()
})

module.exports = router
