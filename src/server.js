const http = require('http');
const fs = require('fs');

if (fs.existsSync('./tmp.log')) return console.log('already running');

fs.writeFileSync('./tmp.log','');

const server = http.createServer((req, res) => {
  console.log(req.url,req.socket.remoteFamily,req.socket.remoteAddress,req.socket.remotePort)
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

function cleanup() {
    fs.rmSync('./tmp.log')
}

process.on('exit', (code) => (cleanup(), console.log(`Process is exiting with code ${code}`)));
process.on('SIGINT', () => (console.log("\nReceived SIGINT signal. Exiting gracefully..."), process.exit(0)));
process.on('SIGTERM', () => (console.log("\nReceived SIGTERM signal. Exiting gracefully..."), process.exit(0)));
process.on('uncaughtException', (error) => (console.error("Uncaught Exception. Exiting...", error), cleanup(), process.exit(1)));
process.on('unhandledRejection', (reason, promise) => (console.error("Unhandled Promise Rejection. Exiting...", reason), cleanup(), process.exit(1)));

server.listen(8000);
