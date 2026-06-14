import fs from 'fs';

async function generate() {
  const projectId = "gen-lang-client-0608307176";
  const databaseId = "ai-studio-03c302c4-8f40-4c2e-a342-096e1dbdf435";
  const apiKey = "AIzaSyASCS3JSKmro5NKYb6rUK3wLe4jaJCDG-g";
  try {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents:runQuery?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "posts" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "published" },
              op: "EQUAL",
              value: { booleanValue: true }
            }
          }
        }
      })
    });
    const results = await res.json();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Página Inicial -->
  <url>
    <loc>https://blog.flcolchoes.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Página do Blog -->
  <url>
    <loc>https://blog.flcolchoes.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Página de Links -->
  <url>
    <loc>https://blog.flcolchoes.com/links</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Página Sobre -->
  <url>
    <loc>https://blog.flcolchoes.com/sobre</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

    if (Array.isArray(results)) {
      results.forEach(res => {
        if (!res.document) return;
        const doc = res.document;
        // extract fields
        const fields = doc.fields;
        const docId = doc.name.split('/').pop();
        const slug = (fields.slug && fields.slug.stringValue) ? fields.slug.stringValue : docId;
        const updatedAt = fields.updatedAt ? new Date(fields.updatedAt.timestampValue).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
          
        xml += `
  <url>
    <loc>https://blog.flcolchoes.com/blog/${slug}</loc>
    <lastmod>${updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });
    }

    xml += `\n</urlset>`;
    
    fs.writeFileSync('public/sitemap.xml', xml);
    console.log('Sitemap generated successfully!');
  } catch (e) {
    console.error('Error generating sitemap:', e);
  }
}

generate();
