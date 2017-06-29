const Crawler = require('crawler')
const axios = require('axios')
const moment = require('moment')
const pool = require('./database')

let collector = new Crawler()

function urlToContent (uri) {
    return new Promise((resolve) => {
        collector.queue([{
            uri: uri,
            jQuery: {
                name: 'cheerio',
                options: {
                    normalizeWhitespace: true,
                    xmlMode: true,
                    decodeEntities: false  // important for chinese characters
                }
            },
            callback: (error, res, done) => {
                if (error) {
                    console.log(`[@_@]${uri} ${error}`)
                    reject(error)
                }
                else {
                    let $ = res.$
                    resolve($('.article-content').html())
                }
                done()
            }
        }])
    })
}

const headlineUrl = 'http://www.toutiao.com/api/pc/feed/?category=news_hot';

let headlinePromise = axios.get(headlineUrl, {
    headers: { 'Cookie': 'tt_webid=6416947689493251585' }   // important: avoid getting identical result
})

let addCnt=0, badCnt=0

async function main() {
    let headlineRes = await headlinePromise
    let conn = await pool.getConnection()

    let sql = `INSERT INTO news (id, title, url, time, category, abstract, source, image, content)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

    for (let item of headlineRes.data.data) {

        if (item.tag === 'ad'
            || item.article_genre !== 'article') {  // filter item without image url // wrong
            badCnt++
            continue
        }

        let contentUrl = 'http://www.toutiao.com/a' + item.group_id
        let content
        try {
            content = await urlToContent(contentUrl)
        } catch (error) {
            badCnt++
            continue
        }

        let insData = [
            item.group_id,
            item.title,
            contentUrl,
            moment(Number(item.behot_time + '000')).format('YYYY-MM-DD hh:mm:ss'),  // fit server env
            item.chinese_tag,
            item.abstract,
            item.source,
            item.image_url,
            content,
        ]

        conn.query(sql, insData)
            .then(() => {
                addCnt++
            })
            .catch(err => {
                console.log(err.code, err.message + ' [@_@]' + insData[0])
                badCnt++
            })
    }

    // clean old news
    let oldDate = moment().subtract(30, 'days').format('YYYY-MM-DD')  // remove news that is 30 days ago
    let cleanSql = `DELETE FROM news WHERE time<'${oldDate}'`
    conn.query(cleanSql)
        .then(([result]) => {
            console.log(`[clean] ${result.affectedRows} rows cleaned`)
        })
        .catch(err => {
            console.log(err.code, err.message)
        })

    await conn.release()  // important!!!
    await pool.end();
    return '>_< successful'
}

main().then(res => {
    console.log(`[headline] ${addCnt} rows added, ${badCnt} rows abandoned`)
    console.log(`[${new Date().toLocaleString()}] ${res}`)
    console.log('****************************************\n')
}).catch(err => {
    console.log((err))
})
