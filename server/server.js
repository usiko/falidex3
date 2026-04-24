const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3001;
//const pathDist = __dirname + '\\..\\www\\browser';
const pathDist = 'www';
const configDist = `${pathDist}/assets/config/config.prod.json`;
console.log('dist path', pathDist);

// Route spéciale pour servir config.json avec les variables d'environnement remplacées
app.get('/assets/config/config.prod.json', (req, res) => {
    try {
        const configPath = path.join(__dirname, '..', configDist);
        let configContent = fs.readFileSync(configPath, 'utf8');

        // Remplacer tous les {ENV:VARIABLE_NAME} par les valeurs d'environnement
        configContent = configContent.replace(/\{ENV:([^}]+)\}/g, (match, envVar) => {
            return process.env[envVar] || match;
        });

        res.setHeader('Content-Type', 'application/json');
        res.send(configContent);
    } catch (error) {
        console.error('Error loading config:', error);
        res.status(500).json({ error: 'Failed to load configuration' });
    }
});

app.use(express.static(pathDist));

// Route pour servir index.html avec les variables d'environnement remplacées
app.get('/*splat', (req, res) => {
    try {
        console.log('try to replace env in index.html')
        const indexPath = path.join(__dirname, '..', pathDist, 'index.html');
        let indexContent = fs.readFileSync(indexPath, 'utf8');

        // Remplacer tous les {ENV:VARIABLE_NAME} par les valeurs d'environnement
        indexContent = indexContent.replace(/\{ENV:([^}]+)\}/g, (match, envVar) => {
            if (!process.env[envVar]) {
                console.log('want to replace', envVar, 'but not found in env');
            }
            return process.env[envVar] || match;
        });

        res.setHeader('Content-Type', 'text/html');
        res.send(indexContent);
    } catch (error) {
        console.error('Error loading index.html:', error);
        res.status(500).send('Failed to load page');
    }
});

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
