const Crawler = require('crawler')
const axios = require('axios')
const connction = require('./database')

let collector = new Crawler()

function uri2Res (uri) {
    return new Promise((resolve, reject) => {
        collector.queue([{
            uri: uri,
            callback: (error, res, done) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(res)
                }
                done()
            }
        }])
    })
}

const uris = {
    toutiao: 'http://www.toutiao.com/api/pc/feed/?category=news_hot',
    yidian: 'http://www.yidianzixun.com/home/q/news_list_for_channel?channel_id=hot'
}

let toutiao = axios.get(uris.toutiao, {
    headers: { 'Cookie': 'tt_webid=6416947689493251585' }   // important: avoid getting identical result
})
let yidian = axios.get(uris.yidian)

async function store() {
    let [toutiaoRes, yidianRes, conn] = await Promise.all([toutiao, yidian, connction])
    //let toutiaoRes = await toutiao

    let sql = `INSERT INTO news (id, title, url, timeline, category, summary, tags, source, image, origin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    toutiaoRes.data.data.forEach(item => {
        if (item.tag !== 'ad'
            && item.article_genre === 'article') {  // filter item without image url

            let insData = [
                item.group_id,
                item.title,
                'http://www.toutiao.com' + item.source_url,
                new Date(Number(item.behot_time + '000')).toLocaleString(),
                item.chinese_tag,
                item.abstract,
                JSON.stringify([item.chinese_tag]),
                item.source,
                item.image_url,
                1
            ]

            conn.query(sql, insData)
                .catch(err => {
                    console.log(err.code, err.message)
                    if (err.code !== 'ER_DUP_ENTRY') {
                        console.log(insData[0])
                    }
                })
        }
    })

    yidianRes.data.result.forEach(item => {
        if (item.ctype === 'news'   // filter ads
            && item.url.length <= 256) {    // filter weixin

            let imageUrl = typeof item.image === 'undefined'
                ? null : item.image.indexOf('http') !== -1
                    ? item.image : ('http://i1.go2yd.com/image.php?url=' + item.image)
            let category = item.category.split(',')[0]

            let insData = [
                item.docid,
                item.title,
                item.url,
                item.date,
                category,
                item.summary,
                JSON.stringify([item.category]),
                item.source,
                imageUrl,
                2
            ]

            conn.query(sql, insData)
                .catch(err => {
                    console.log(err.code, err.message)
                    if (err.code !== 'ER_DUP_ENTRY') {
                        console.log('-> ' + insData[0])
                    }
                })
        }
    })

    await conn.end()  // important!!!
    return 'succ'
}
store().then(res => {
    console.log(res)
}).catch(err => {
    console.log((err))
})
