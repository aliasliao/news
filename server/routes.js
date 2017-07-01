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
    ctx.body = JSON.stringify(rows.map(item => item.category))
    await conn.release()
    await next()
}).get('/cat/:name', async (ctx, next) => {
    let conn = await pool.getConnection()
    let name = decodeURI(ctx.params.name)
    if (name === '推荐') {
        let sql = 'SELECT `interest` FROM `user` WHERE `username`=?'
        let rawUsername = ctx.cookies.get('username')
        let username = decodeURI(rawUsername)
        let [res] = await conn.query(sql, [username]).catch(err => { console.log('[@_@]' + err.message) })
        let interest = res[0].interest
        let rows = []
        for (let cat of interest) {
            let sql = 'SELECT `id`, `title`, `abstract`, `image`, `time`, `source`, `url`, `abstract` FROM `news` WHERE `category`=? ORDER BY `time` DESC LIMIT 1'  // no content here
            let row = await conn.query(sql, [cat]).catch(err => { console.log('[@_@]' + err.message) })
            rows.push(row[0][0])
            ctx.body = rows
        }
    }
    else {
        let sql = 'SELECT `id`, `title`, `abstract`, `image`, `time`, `source`, `url`, `abstract` FROM `news` WHERE `category`=? ORDER BY `time` DESC'  // no content here
        let rows = await conn.query(sql, [name]).catch(err => { console.log('[@_@]' + err.message) })
        ctx.body = rows[0]
    }
    await conn.release()
    await next()
}).get('/news/:id', async (ctx, next) => {
    let conn = await pool.getConnection()
    let rawUsername = ctx.cookies.get('username')
    let id = ctx.params.id
    let sql =  'SELECT `title`, `category`, `time`, `source`, `content` FROM `news` WHERE `id`=?'
    let [article] = await conn.query(sql, [id]).catch(err => { console.log('[@_@1]' + err.message) })
    ctx.body = article[0]  // query result is array
    // user habit
    if (rawUsername !== undefined) {
        let category = article[0].category
        let username = decodeURI(rawUsername)
        let getCntSql = `SELECT habit->"$.${category}" AS count FROM user WHERE username='${username}'`
        console.log(getCntSql)
        let [rows] = await conn.query(getCntSql).catch(err => { console.log('[@_@2]' + err.message) })
        let count = rows[0].count
        // count = count === null ? 0 : count
        let updateSql = `UPDATE user SET habit=JSON_SET(habit, "$.${category}", ${count+1}) WHERE username='${username}'`
        await conn.query(updateSql).catch(err => { console.log('[@_@3]' + err.message) })
    }
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
    let sql = 'INSERT INTO `user` (`username`, `password`, `email`, `habit`) VALUES (?, ?, ?, ?)'
    let data = [formData.username, formData.password, formData.email, '{}']
    let result = await conn.query(sql, data)
        .catch(err => {
            ctx.body = `[${err.code}] ${err.message}`
        })
    if (result) {  // if err, result = undefined
        ctx.body = 'success'
        ctx.cookies.set('username', encodeURI(formData.username))
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
            ctx.cookies.set('username', encodeURI(formData.username))
        }
        else {
            ctx.body = '密码不正确'
        }
    }
    else ctx.body = `用户名 ${formData.username} 不存在`
    await conn.release()
    await next()
}).get('/logout', async (ctx, next) => {
    let rawUsername = ctx.cookies.get('username')
    if (rawUsername !== undefined) {
        ctx.cookies.set('username')
        ctx.body = 'success'
    }
    else {
        ctx.body = `用户未登录！`
    }
    await next()
}).get('/getCurrentUser', async (ctx, next) => {
    let rawUsername = ctx.cookies.get('username')
    ctx.body = rawUsername === undefined ? undefined : decodeURI(ctx.cookies.get('username'))
    await next()
}).get('/getUserInfo', async (ctx, next) => {
    let conn = await pool.getConnection()
    let rawUsername = ctx.cookies.get('username')
    let username = rawUsername === undefined ? undefined : decodeURI(ctx.cookies.get('username'))
    if (username !== undefined) {
        let sql = 'SELECT `username`, `email`, `interest`, `habit` FROM `user` WHERE `username`=?'
        let [rows] = await conn.query(sql, [username]).catch(err => {
            console.log('[@_@]' + err.message)
        })
        ctx.body = rows[0]
    }
    else {
        ctx.body = {username:undefined, email: '', interest:[], habit:{}}
    }
    await conn.release()
    await next()
}).post('/setInterest', async (ctx, next) => {
    let conn = await pool.getConnection()
    let checkedCatsStr = JSON.stringify(ctx.request.body)
    let rawUsername = ctx.cookies.get('username')
    let username = decodeURI(rawUsername)
    let sql = 'UPDATE `user` SET `interest`=? WHERE `username`=?'
    await conn.query(sql, [checkedCatsStr, username]).catch(err => {
        console.log('[@_@] fail set interest:')
        console.log(err.code, err.message)
    })
    ctx.body = 'success'
    await conn.release()
    await next()
})

module.exports = router
