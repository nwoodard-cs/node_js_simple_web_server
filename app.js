const http = require('http')
const url = require('url')
const path = require('path')
let fs = require('fs')

let mimeTypes = {
    html: 'text/html',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    js: 'text/javascript',
    css: 'text/css'
}

const port = 8087
const ip = '127.0.0.1'

http.createServer( (req, res) => {
    const uri = url.parse(req.url).pathname
    const fileName = path.join(process.cwd(),unescape(uri))
    console.log(`Loading ${uri}`)
    let stats

    try {
        stats = fs.lstatSync(fileName)
    }
    catch (err) {
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found\n')
        res.end()
        return
    }

    if (stats.isFile()) {
        const mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]]
        res.writeHead(200, { 'Content-type': mimeType })

        let fileStream = fs.createReadStream(fileName)
        fileStream.pipe(res)
    }
    else if (stats.isDirectory()) {
        res.writeHead(302, { Location: 'index.html' })
        res.end()
    }
    else {
        res.writeHead(500, { 'Content-type': 'text/plain' })
        res.write('500 Internal error')
        res.end()
    }

}).listen(port)

console.log(`Server running at localhost:${port}/`)