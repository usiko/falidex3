const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;
//const pathDist = __dirname + '\\..\\www\\browser';
const pathDist = 'www';
console.log('dist path', pathDist);
app.use(express.static(pathDist));

app.get('/*splat', (req, res) => res.sendFile(path.join(__dirname, '..', pathDist, 'index.html')));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
