const http = require('http')

const server = http.createServer((req, res) => {
    console.log('---------------------')
    console.log(req.headers)
    console.log('---------------------')
    
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('X-Foo', 'bar')
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`
<html meaa=a>
    <head>
        <style>
            div {
                width: 100px;
            }
        </style>
    </head>
    <body>
<div>this is div</div>
<img />
    </body>
</html>`)
})

server.listen(8080)