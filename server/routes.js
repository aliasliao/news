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
    let sql = 'SELECT DISTINCT `category` FROM `news`'
    let [rows] = await conn.query(sql).catch(err => { console.log('[@_@]' + err.message) })
    ctx.body = JSON.stringify(rows)
    await conn.release()
    await next()
}).get('/cat/:name', async (ctx, next) => {
    let conn = await pool.getConnection()
    let name = decodeURI(ctx.params.name)
    let sql =  'SELECT * FROM `news` WHERE `category`=? ORDER BY `time` DESC'
    let [rows] = await conn.query(sql, [name]).catch(err => { console.log('[@_@]' + err.message) })
    ctx.body = rows
    await conn.release()
    await next()
}).get('/news/:id', async (ctx, next) => {
    let conn = await pool.getConnection()
    let id = ctx.params.id
    let sql =  'SELECT `title`, `time`, `source`, `content` FROM `news` WHERE `id`=?'
    let [article] = await conn.query(sql, [id]).catch(err => { console.log('[@_@]' + err.message) })
    ctx.body = article[0]  // query result is array
    await conn.release()
    await next()
}).get('/exist/:field/:value', async (ctx, next) => {
    let conn = await pool.getConnection()
    let field = ctx.params.field
    let value = decodeURI(ctx.params.value)
    let sql = 'SELECT * FROM `user` WHERE ??=?'
    let [rows] = await conn.query(sql, [field, value]).catch(err => { console.log('[@_@]' + err.message) })
    ctx.body = rows.length > 0
    await conn.release()
    await next()
}).post('/register', async (ctx, next) => {
    let conn = await pool.getConnection()
    let formData = ctx.request.body
    let sql = 'INSERT INTO `user` (`username`, `password`, `email`) VALUES (?, ?, ?)'
    let data = [formData.username, formData.password, formData.email]
    let result = await conn.query(sql, data)
        .catch(err => {
            ctx.body = `[${err.code}] ${err.message}`
        })
    if (result) {  // if err, result = undefined
        ctx.body = 'success'
        ctx.cookies.set('username', formData.username)
    }
    await conn.release()
    await next()
}).post('/login', async (ctx, next) => {
    let conn = await pool.getConnection()
    let formData = ctx.request.body
    let sql = 'SELECT `username`, `password` FROM `user` WHERE `username`=?'
    let [rows] = await conn.query(sql, [formData.username]).catch(err => { console.log('[@_@]' + err.message) })
    if (rows.length > 0) {
        if (rows[0].password === formData.password){
            ctx.body = 'success'
            ctx.cookies.set('username', formData.username)
        }
        else {
            ctx.body = '密码不正确'
        }
    }
    else ctx.body = `用户名 ${formData.username} 不存在`
    await conn.release()
    await next()
}).get('/logout/:username', async (ctx, next) => {
    let username = decodeURI(ctx.params.username)
    if (ctx.cookies.get('username') === username) {
        ctx.cookies.set('username')
        ctx.body = 'success'
    }
    else {
        ctx.body = `用户 ${username} 未登录`
    }
    await next()
}).get('/get/username', async (ctx, next) => {
    ctx.body = ctx.cookies.get('username')
    await next()
}).get('/info/:username', async (ctx, next) => {
    let conn = await pool.getConnection()
    let username = decodeURI(ctx.params.username)
    let sql = 'SELECT `email`, `interest` FROM `user` WHERE `username`=?'
    let [rows] = await conn.query(sql, [username]).catch(err => { console.log('[@_@]' + err.message) })
    rows[0].interest = JSON.parse(rows[0].interest)
    ctx.body = rows[0]
    await conn.release()
    await next()
})

module.exports = router
