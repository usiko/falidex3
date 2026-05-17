# Configuration SEO pour Heroku + Express.js

## 🚀 Déploiement sur Heroku

### Structure Actuelle
- **Runtime** : Node.js + Express.js
- **Frontend** : Angular (compilé dans le dossier `www/`)
- **Serveur** : `server/server.js`

### Configuration Heroku (Procfile)

Le fichier `Procfile` est configuré pour :
```
web: npm run serve:app
```

**Heroku exécute automatiquement avant le Procfile :**
```json
"postinstall": "ng build"  // À ajouter au package.json si absente
```

### Setup Initial Heroku

```bash
# 1. Installer Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# 2. Se connecter
heroku login

# 3. Créer l'app (si pas encore fait)
heroku create falidex

# 4. Déployer
git push heroku main

# 5. Voir les logs
heroku logs --tail
```

## ✅ SEO Améliorations Intégrées

### 1. **Routes Express SEO**
Votre serveur (`server/server.js`) génère maintenant dynamiquement :
- ✓ `/robots.txt` - Directives de crawling
- ✓ `/sitemap.xml` - Index des pages avec timestamps

### 2. **Headers de Cache Optimisés**
```javascript
// HTML (1 heure)
Cache-Control: public, max-age=3600

// JS/CSS (7 jours)
Cache-Control: public, max-age=604800

// Images/Fonts (1 an)
Cache-Control: public, max-age=31536000, immutable

// Service Worker & Manifest (1 heure)
Cache-Control: public, max-age=3600
```

### 3. **Headers de Sécurité**
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
```

## 📊 Soumettre à Google/Bing

### Google Search Console
1. Aller sur : https://search.google.com/search-console
2. Ajouter : https://app.falidex.fr
3. Vérifier la propriété
4. Soumettre le sitemap : https://app.falidex.fr/sitemap.xml
5. Demander l'indexation

### Bing Webmaster Tools
1. Aller sur : https://www.bing.com/webmasters
2. Ajouter le site
3. Soumettre le sitemap

## 🔧 Maintenance Express

### Ajouter une page au sitemap

Modifier `server/server.js`, fonction `/sitemap.xml` :

```javascript
app.get('/sitemap.xml', (req, res) => {
  const domain = 'https://app.falidex.fr';
  const today = new Date().toISOString().split('T')[0];
  
  const urls = [
    { loc: `${domain}/`, priority: 1.0, changefreq: 'weekly' },
    { loc: `${domain}/about`, priority: 0.8, changefreq: 'monthly' },
    // Ajouter d'autres URLs ici
  ];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += `  <url>\n    <loc>${url.loc}</loc>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n  </url>\n`;
  });
  
  xml += '</urlset>';
  res.type('application/xml');
  res.send(xml);
});
```

### Vérifier les routes SEO en local

```bash
# Lancer le serveur
npm run build
npm run serve:app

# Tester les routes
curl http://localhost:3001/robots.txt
curl http://localhost:3001/sitemap.xml
```

## 📱 Meta Tags Dynamiques (Angular)

Pour les pages individuelles, utilisez Angular Meta Service :

```typescript
import { Meta, Title } from '@angular/platform-browser';

constructor(
  private titleService: Title,
  private metaService: Meta
) {
  this.titleService.setTitle('Page Spécifique - Falidex');
  
  this.metaService.updateTag({
    name: 'description',
    content: 'Description unique pour cette page'
  });
  
  this.metaService.addTag({
    property: 'og:title',
    content: 'Titre OG pour cette page'
  });
}
```

## 🧪 Tests SEO

### Performance
- **PageSpeed Insights** : https://pagespeed.web.dev/
  - Tester : https://app.falidex.fr
  - Objectif : Score > 80/100

### Mobile-Friendly
- **Test Mobile** : https://search.google.com/test/mobile-friendly
  - Tester : https://app.falidex.fr

### Validation HTML
- **W3C Validator** : https://validator.w3.org/

### Structured Data
- **Schema.org Validator** : https://validator.schema.org/

## 📈 Monitoring

### Google Analytics (déjà configuré)
```javascript
// Suivi des Core Web Vitals
web-vital@latest
```

### Heroku Metrics
```bash
heroku metrics
heroku logs --tail
```

## 🚨 Troubleshooting

### robots.txt pas accessible
```bash
# Vérifier la route
curl -I https://app.falidex.fr/robots.txt
# Devrait retourner 200
```

### Sitemap pas trouvé
```bash
# Vérifier la génération
curl https://app.falidex.fr/sitemap.xml
# Devrait retourner un XML valide
```

### Cache issues sur Heroku
```bash
# Purger le cache
heroku builds:cancel
heroku restart
```

---

**Notes Importantes :**
- ✓ HTTPS automatique sur app.falidex.fr
- ✓ Node version configurée dans package.json
- ✓ Express handles all routing for Angular SPA
- ✓ Service Worker served with correct headers
- ✓ PWA installable sur tous les appareils

**Dernière mise à jour** : 17 mai 2026
