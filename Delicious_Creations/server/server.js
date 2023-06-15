const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  // Set the response headers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Send the response body
  res.end('Hello, World!');
});

server.listen(port, hostname, () => {
  console.log(`Server is listening on http://${hostname}:${port}`);
});