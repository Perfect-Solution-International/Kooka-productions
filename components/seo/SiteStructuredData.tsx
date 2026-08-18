import { JsonLd } from "@/components/seo/JsonLd";
import { contact, site, socials } from "@/data/site";

export function SiteStructuredData({ solutions }: { readonly solutions: readonly { title: string }[] }) {
  const organizationId = `${site.url}/#organization`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["Organization", "LocalBusiness"],
            "@id": organizationId,
            name: site.name,
            url: site.url,
            logo: {
              "@type": "ImageObject",
              url: `${site.url}/Logo-kooka.png`,
              width: 483,
              height: 517,
            },
            description: site.description,
            slogan: site.tagline,
            telephone: contact.phone,
            email: contact.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "PO Box 415",
              addressLocality: "Croydon",
              addressRegion: "VIC",
              postalCode: "3136",
              addressCountry: "AU",
            },
            areaServed: {
              "@type": "Country",
              name: "Australia",
            },
            sameAs: socials.map((social) => social.href),
            knowsAbout: solutions.map((service) => service.title),
          },
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: site.url,
            name: site.name,
            description: site.description,
            inLanguage: "en-AU",
            publisher: { "@id": organizationId },
          },
        ],
      }}
    />
  );
}
