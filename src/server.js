const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url,req.socket.remoteFamily,req.socket.remoteAddress,req.socket.remotePort)
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
