import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../config';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  article?: boolean;
  type?: 'website' | 'article' | 'business';
}

export default function SEO({ 
  title, 
  description, 
  canonical, 
  article,
  type = 'website' 
}: SEOProps) {
  const seoTitle = title ? `${title} | ${SITE_CONFIG.salesSiteName}` : `${SITE_CONFIG.salesSiteName} | Móveis e Colchões em Aracaju`;
  const seoDescription = description || `Especialista em ${SITE_CONFIG.niche} em Aracaju e Socorro. Qualidade, conforto e o melhor preço para sua casa.`;
  const siteUrl = "https://blog.flcolchoes.com";
  const seoCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  // JSON-LD for Local Business (Critical for Local Search)
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": SITE_CONFIG.salesSiteName,
    "description": seoDescription,
    "url": SITE_CONFIG.salesUrl,
    "logo": "https://blog.flcolchoes.com/brand-icon.png",
    "image": "https://cdn.vendizap.com/vendizap-produtos/e0eedcfbb8ccac591c81d6cad08bce00.webp",
    "telephone": "(79) 99146-0156",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Rua Itabaianinha, 199",
        "addressLocality": "Aracaju",
        "addressRegion": "SE",
        "postalCode": "49010-190",
        "addressCountry": "BR"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Av José Carlos Silva, 416",
        "addressLocality": "Aracaju",
        "addressRegion": "SE",
        "postalCode": "49040-010",
        "addressCountry": "BR"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Av. Nossa Sra. do Socorro, 665",
        "addressLocality": "Nossa Senhora do Socorro",
        "addressRegion": "SE",
        "postalCode": "49160-000",
        "addressCountry": "BR"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-10.9126",
      "longitude": "-37.0504"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/flcolchoes",
      SITE_CONFIG.salesUrl
    ]
  };

  return (
    <Helmet>
      {/* General Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={seoCanonical} />
      <meta property="og:site_name" content={SITE_CONFIG.salesSiteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
