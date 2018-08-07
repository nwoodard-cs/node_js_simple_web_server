const http = require('http')

const port = 8087
const ip = '127.0.0.1'

http.createServer( (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World!')
}).listen(port, ip)

console.log(`Server running at ${ip}/${port}/`)