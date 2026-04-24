const fs = require('fs');
const path = require('path');
try {
    require('dotenv').config();
} catch (e) {
    // dotenv not installed, relying purely on process.env
}

// Fonction pour remplacer les variables d'environnement dans un fichier JSON
function replaceEnvVariables(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Remplace les occurences de {ENV:VAR_NAME} par la valeur de process.env.VAR_NAME
    // S'il s'agit d'une chaîne de caractères (qui nécessite des guillemets dans le JSON), 
    // assurez-vous de formater correctement.
    content = content.replace(/"?\{ENV:([^}]+)\}"?/g, (match, envVar) => {
        const value = process.env[envVar] || '';

        // Si la valeur est vide, on doit retourner une chaîne vide avec des guillemets
        if (value === '') {
            return '""';
        }

        // Si c'est un booléen ou un nombre (déjà sans guillemets dans le JSON original ou le JS)
        if (value === 'true' || value === 'false' || (!isNaN(Number(value)) && value.trim() !== '')) {
            return value;
        }

        // Sinon, on rajoute les guillemets (pour les chaînes de caractères)
        return `"${value}"`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated environment variables in ${path.basename(filePath)}`);
}

// Fonction pour remplacer les variables d'environnement dans les fichiers HTML/texte (sans gestion de guillemets)
function replaceEnvVariablesInHtml(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Remplace les occurences de {ENV:VAR_NAME} par la valeur de process.env.VAR_NAME directement
    content = content.replace(/\{ENV:([^}]+)\}/g, (match, envVar) => {
        return process.env[envVar] || '';
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated environment variables in ${path.basename(filePath)}`);
}

// Fichiers de configuration à traiter
const configProdPath = path.join(__dirname, 'src', 'assets', 'config', 'config.prod.json');
const configPath = path.join(__dirname, 'src', 'assets', 'config', 'config.json');
const envProdPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');
const envPath = path.join(__dirname, 'src', 'environments', 'environment.ts');
const indexPath = path.join(__dirname, 'src', 'index.html');

replaceEnvVariables(configProdPath);
replaceEnvVariables(configPath);
replaceEnvVariables(envProdPath);
replaceEnvVariables(envPath);
replaceEnvVariablesInHtml(indexPath);
