// Configuration pour générateur de sitemap dynamique
// À intégrer dans votre server.js ou backend

const express = require('express');
const router = express.Router();

/**
 * Génère dynamiquement le sitemap XML
 * Route: GET /sitemap.xml
 */
router.get('/sitemap.xml', (req, res) => {
    const domain = 'https://app.falidex.fr';
    const today = new Date().toISOString().split('T')[0];

    // Définissez vos URLs de base
    const urls = [
        {
            loc: domain,
            lastmod: today,
            changefreq: 'weekly',
            priority: 1.0,
        },
        // Ajoutez d'autres pages principales ici
        // {
        //   loc: `${domain}/about`,
        //   lastmod: today,
        //   changefreq: 'monthly',
        //   priority: 0.8,
        // },
    ];

    // Générez le XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">\n';

    urls.forEach(url => {
        xml += '  <url>\n';
        xml += `    <loc>${url.loc}</loc>\n`;
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += '    <mobile:mobile/>\n';
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    res.type('application/xml');
    res.send(xml);
});

/**
 * Génère dynamiquement le robots.txt
 * Route: GET /robots.txt
 */
router.get('/robots.txt', (req, res) => {
    const robotsTxt = `# robots.txt for Falidex PWA
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private
Disallow: /assets/js/

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
Crawl-delay: 1`;

    res.type('text/plain');
    res.send(robotsTxt);
});

module.exports = router;

// Usage dans server.js:
// const seoRouter = require('./routes/seo.js');
// app.use('/', seoRouter);
