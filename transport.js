const http = require('http');
const fs = require('fs');



const imageFilePath = process.argv[2]; // Replace with the path of the image you want to send

fs.readFile(imageFilePath, (err, data) => {
  if (err) {
    console.error('Error reading the image:', err);
    return;
  }

  const options = {
    method: 'POST',
    host: 'localhost',
    port: 4070,
    path: '/image',
    headers: {
      'Content-Type': 'image/png', // Replace with the appropriate content type for your image
      'Content-Length': data.length,
    },
  };

  const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      //console.log('Server response:', responseData);
    });
  });

  req.on('error', (err) => {
    console.error('Error sending the request:', err);
  });

  req.write(data); // Send the image data
  req.end();       // End the request
});
