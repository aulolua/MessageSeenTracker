const http = require('http');
const fs = require('fs');
const cf = require('./cloudflare');

if (fs.existsSync('./tmp.log')) return console.log('already running');

fs.writeFileSync('./tmp.log','');

let imageData = null;
let jsondata = null;

const c = new cf(4070,4080);

setTimeout(function() {
  const options = {
    host: 'localhost',
    port: 4080,
    path: '/metrics',
  };
  
  http.get(options, (response) => {
    let data = '';
  
    response.on('data', (chunk) => {
      data += chunk;
    });
  
    response.on('end', () => {
      // Extract URLs that match the pattern *.trycloudflare.com
      const regex = /\bhttps:\/\/.*\.trycloudflare\.com\b/g;
      const urls = data.match(regex);
  
      if (urls && urls.length > 0) {
        console.log('Extracted URLs:');
        console.log(urls);
        jsondata = urls[0];
      } else {
        console.log('No URLs matching the pattern found in the response.');
      }
    });
  }).on('error', (error) => {
    console.error('Error while making the request:', error.message);
  });
},15000)

const server = http.createServer((req, res) => {
    const types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.bmp': 'image/bmp',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.tif': 'image/tiff',
        '.tiff': 'image/tiff',
        '.jp2': 'image/jp2',
        '.jxr': 'image/vnd.ms-photo',
        '.heic': 'image/heif',
        '.heif': 'image/heif',
    };
      
  console.log(req.url,req.socket.remoteFamily,req.socket.remoteAddress,req.socket.remotePort)
  let contenttype;
  if (req.method === 'POST' && req.url === '/image') {
    let imageDataChunks = [];

    req.on('data', (chunk) => {
      imageDataChunks.push(chunk);
    });

    req.on('end', () => {
      imageData = Buffer.concat(imageDataChunks);
      contenttype = req.headers['content-type'];
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Image received and stored in memory!');
    });
  } else if (req.method === 'GET' && req.url === '/image') {
    if (imageData) {
      res.writeHead(200, { 'Content-Type': contenttype }); // Replace with the appropriate content type for your image
      res.end(imageData);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Image not found');
    }
  }else if (req.method == 'GET' && req.url == '/url') {
    if (jsondata) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({url:jsondata}));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('JSON data not found');
    }
  }
});

function cleanup() {
    fs.rmSync('./tmp.log')
}

process.on('exit', (code) => (cleanup(), console.log(`Process is exiting with code ${code}`)));
process.on('SIGINT', () => (console.log("\nReceived SIGINT signal. Exiting gracefully..."), process.exit(0)));
process.on('SIGTERM', () => (console.log("\nReceived SIGTERM signal. Exiting gracefully..."), process.exit(0)));
process.on('uncaughtException', (error) => (console.error("Uncaught Exception. Exiting...", error), cleanup(), process.exit(1)));
process.on('unhandledRejection', (reason, promise) => (console.error("Unhandled Promise Rejection. Exiting...", reason), cleanup(), process.exit(1)));

server.listen(4070);
