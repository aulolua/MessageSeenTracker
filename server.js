const http = require('http');
const fs = require('fs');

//console.log(process.argv)

const tr = http.createServer();

const app = http.createServer();

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

function getext(path) {
    return '.'+path.split('\\')[path.split('\\').length-1].split('.')[path.split('\\')[path.split('\\').length-1].split('.').length-1]
}


const clients = []
const rp = []

function iseven(n=0) {
    if (n % 2 == 0) return true;
    return false
}

let ts = []
let count = 0
let read = 0
tr.on('request',(req ,res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`<!DOCTYPE html><html><head><title>views</title><hta:application id="app" border="thin" showintaskbar="yes" caption="yes" contextmenu="yes" innerborder="no" windowstate="normal" scroll="no" scrollflat="no" singleinstance="yes" resizable="no" icon="your_icon.ico" /><style>body{margin:0;overflow:hidden;text-align: center;font-family:Arial,sans-serif;background-color:#333;color:#fff}h1{color:#f1f1f1}.htaIco{display:none}</style></head><body><h1>views: ${read.toString()}</h1><script>window.resizeTo(200,100);setTimeout(window.location.reload,4000)<\/script></body></html>`)
})
app.on('request' , (req , res) => {
    clients.push(req);
    rp.push(req.socket.remotePort)
    const t = Date.now()
    ts.push(t)
    //console.log(req.headers)
    //if (!req.headers['accept']) console.log('['+Date.now()+']:','Discord Request')
    console.log(count)
    if (Number(count) < 2) {
        if (Number(count) === 1) {
          console.log('['+Date.now()+']:',`You Just Read The Message. `)
        }
        count = Number(Number(count)+1)
    } else {
        if (iseven(count)) {
            console.log('['+Date.now()+']:',`Someone Just Read The Message.`)
            read++
        }
        count++
    }
    const file = fs.readFileSync(process.argv[2])
    console.log(req.url,req.socket.remoteFamily,req.headers['x-forwarded-for'],req.socket.remotePort);
    try {
        // Read the image file synchronously and send it in the response
        const imageFile = fs.readFileSync(process.argv[2]);
        res.writeHead(200, { 'Content-Type': types[getext(process.argv[2])] });
        res.end(imageFile);
      } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image not found');
    }
})

app.listen(4070)
tr.listen(4072)
