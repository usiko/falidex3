const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;
const pathDist = 'www';

app.use(express.static(pathDist));

// Serve index.html for all routes for Angular routing
app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '..', pathDist, 'index.html'));
});

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
