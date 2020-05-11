const net = require('net');

class Request {
    // method url = host + port + path
    // body: k/v
    // header
    
    constructor(options) {
        this.methods = options.methods || 'GET'
        this.host = options.host
        this.port = options.port || 80
        this.path = options.path || '/'
        this.body = options.body || {}
        this.headers = options.headers || {}

        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }

        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body)
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
        }

        this.headers['Content-Length'] = this.bodyText.length
    }

    toString() {
        return `
${this.methods} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            if (connection) {
                connection.write(this.toString())
            } else {
                connection = net.createConnection({ port: this.port, host: this.host }, () => {
                    connection.write(this.toString())
                })
            }
            connection.on('data', (data) => {
                resolve(data.toString());
                connection.end();
            });
            connection.on('end', () => {
                reject('已从服务器断开');
            });
        })
    }
}

void async function() {
    let request = new Request({
        methods: 'POST',
        host: '127.0.0.1',
        port: '8080',
        body: {
            name: 'winter'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'marz': 'come in'
        }
    })
    let data = await request.send()
    console.log(data)
}()

class Response {

}
/*
const client = net.createConnection({ port: 8080, host: '127.0.0.1' }, () => {
    // 'connect' 监听器
    console.log('已连接到服务器');
    // client.write('你好世界!\r\n');
    // 相当于http request请求
//     client.write(`
// POST / HTTP/1.1\r
// Content-Type: application/x-www-form-urlencoded\r
// Content-Length: 11\r
// \r
// name=winter`)
    let request = new Request({
        methods: 'POST',
        host: '127.0.0.1',
        port: '8080',
        body: {
            name: 'winter'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'marz': 'come in'
        }
    })
    client.write(request.toString())
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('已从服务器断开');
});
*/