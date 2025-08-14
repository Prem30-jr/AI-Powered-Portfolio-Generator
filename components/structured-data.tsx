export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    jobTitle: "Full-Stack Developer",
    description:
      "Full-stack developer with 5+ years experience specializing in React, Next.js, TypeScript, and AI integration.",
    url: "https://yourportfolio.com",
    image: "https://yourportfolio.com/profile-image.jpg",
    email: "hello@yourname.com",
    telephone: "+1-555-123-4567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: ["https://linkedin.com/in/yourname", "https://github.com/yourname", "https://twitter.com/yourname"],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "AWS",
      "Full-Stack Development",
      "AI Integration",
      "Web Development",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-Stack Developer",
      occupationLocation: {
        "@type": "City",
        name: "San Francisco",
      },
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "AWS",
        "Tailwind CSS",
      ],
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Your University",
    },
    award: ["Best Innovation Award 2023", "Tech Lead of the Year 2022"],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  }

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI-Powered Portfolio",
    url: "https://yourportfolio.com",
    description:
      "Professional portfolio showcasing full-stack development projects, skills, and AI integration expertise.",
    author: {
      "@type": "Person",
      name: "Your Name",
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    genre: "Portfolio",
    keywords: "full-stack developer, React, Next.js, TypeScript, AI integration, web development",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
    </>
  )
}
