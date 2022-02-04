const http = require('http');
const path = require('path');
const express = require('express');
require('dotenv').config();

function main() {
  const app = express();

  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  const server = http.createServer(app);
  const port = process.env.APP_PORT;

  server.listen(port, () => {
    console.log(port);
  });
}

main();
