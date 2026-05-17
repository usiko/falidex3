const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;
const pathDist = 'www';

// Cache middleware for static assets
const cacheMiddleware = (maxAge) => (req, res, next) => {
    res.set('Cache-Control', `public, max-age=${maxAge}`);
    next();
};

// Security headers
app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Static assets with long-term caching
app.use(express.static(pathDist, {
    maxAge: '1y', // 1 year for versioned assets
    etag: false,
    setHeaders: (res, path) => {
        // Cache control for different file types
        if (path.endsWith('.html')) {
            res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
        } else if (path.match(/\.(js|css)$/)) {
            res.set('Cache-Control', 'public, max-age=604800'); // 7 days
        } else if (path.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|ttf|otf|woff|woff2)$/)) {
            res.set('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
        } else if (path.endsWith('manifest.webmanifest')) {
            res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
        } else if (path.endsWith('ngsw-worker.js')) {
            res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
            res.set('Service-Worker-Allowed', '/');
        }
    }
}));

// Robots.txt route
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`# robots.txt for Falidex PWA - Codex de la Faluche
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

# Sitemaps
Sitemap: https://app.falidex.fr/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1`);
});

// Sitemap.xml route
app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    const domain = 'https://app.falidex.fr';
    const today = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <mobile:mobile/>
  </url>
</urlset>`;

    res.send(xml);
});

// Serve index.html for all routes for Angular routing
app.get('/*', (req, res) => {
    res.set('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.join(__dirname, '..', pathDist, 'index.html'));
});

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
