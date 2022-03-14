/* const http = require('http'); */
const express=require('express');
const app= express();
const routes=require('./routes/routes');

/* const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Chat - bot visapline');
}); */

app.use('/api',routes)

app.listen(process.env.port||8560, () => {
  console.log(`El servidor se está ejecutando en http://${process.env.port}:${process.env.hostname}/`);
})

/* server.listen(process.env.port,process.env.hostname, () => {
  console.log(`El servidor se está ejecutando en http://${process.env.port}:${process.env.hostname}/`);
}); */