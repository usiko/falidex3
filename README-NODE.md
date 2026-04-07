# Configuration Node.js pour ce projet

Ce projet Angular 13 nécessite **Node.js 16.14.0** avec **npm 8.3.1**.

## Installation rapide

```powershell
# Installer et utiliser la bonne version de Node.js
nvm install 16.14.0
nvm use 16.14.0

# Installer les dépendances
npm install --legacy-peer-deps

# Compiler le projet
npm run build

# Démarrer le serveur de développement
npm start
```

## Note importante

Si vous avez npm installé globalement avec une version récente (10.x), vous devrez utiliser le npm fourni avec Node.js 16.14.0 :

```powershell
# Vérifier que vous utilisez la bonne version
node --version  # doit afficher v16.14.0
npm --version   # doit afficher 8.3.1

# Si npm affiche 10.x, utilisez cette astuce :
$nodePath = (Get-Command node).Source
$nodeDir = Split-Path -Parent $nodePath
$npmCmd = "$nodeDir\npm.cmd"
& $npmCmd install --legacy-peer-deps
```

## Versions des dépendances

- Angular: 13.2.x
- Node.js: 16.14.0
- npm: 8.3.1
- TypeScript: 4.4.4
- Ionic: 6.0.0
