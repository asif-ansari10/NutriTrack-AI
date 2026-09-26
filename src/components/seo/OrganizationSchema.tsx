export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NutriTrack AI",
    url: "https://www.nutritrackai.co.in",
    logo: "https://www.nutritrackai.co.in/logo-512.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}