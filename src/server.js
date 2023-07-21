const http = require('http');
const fs = require('fs');

if (fs.existsSync('./tmp.log')) return console.log('already running');

fs.writeFileSync('./tmp.log')
const server = http.createServer((req, res) => {
  console.log(req.url,req.socket.remoteFamily,req.socket.remoteAddress,req.socket.remotePort)
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

function cleanup() {
    //
}

server.listen(8000);
