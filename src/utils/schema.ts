import { about, person, services, social } from "@/resources";
import { absoluteUrl } from "./seo";
import type { Project } from "./utils";

export type BreadcrumbEntry = { name: string; path: string };

export type ProjectMeta = Project["metadata"] & { slug: string };

/** Every capability the site targets, reused across schema nodes. */
const expertise = [
  "Full Stack Development",
  "Python",
  "Django",
  "Django REST Framework",
  "FastAPI",
  "Flask",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Celery",
  "AWS",
  "Docker",
  "Cloud Deployment",
  "AI Systems",
  "Workflow Automation",
  "REST API Development",
];

const socialLinks = social
  .filter((item) => !item.link.startsWith("mailto:"))
  .map((item) => item.link);

/**
 * `Person` node for the site owner.
 *
 * This is the entity Google uses to connect the site to a real person, which is
 * what makes ranking on name-based and "hire a developer" queries possible.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl("/")}#person`,
    url: absoluteUrl("/about"),
    name: person.name,
    alternateName: `${person.firstName} ${person.lastName}`,
    jobTitle: person.role,
    description: about.description,
    image: absoluteUrl(person.avatar),
    email: person.email,
    telephone: `+${person.phone}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    knowsLanguage: person.languages ?? [],
    knowsAbout: expertise,
    worksFor: {
      "@type": "Organization",
      name: "Digi Inn Solutions",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Mohi Ud Din Islamic University",
    },
    sameAs: socialLinks,
  };
}

/** `WebSite` node, used for the site-level entity and name. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: `${person.name} — Full Stack Developer`,
    description:
      "Portfolio of a full stack software engineer building web applications with Python, Django, FastAPI, React, Next.js, PostgreSQL, AWS and Docker.",
    image: absoluteUrl(person.avatar),
    inLanguage: "en",
    publisher: { "@id": `${absoluteUrl("/")}#person` },
  };
}

/** `ProfilePage` for /about, which Google treats as the canonical author bio. */
export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl("/about")}#webpage`,
    url: absoluteUrl("/about"),
    name: `About ${person.name}`,
    description: about.description,
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    primaryImageOfPage: absoluteUrl(person.avatar),
    mainEntity: { "@id": `${absoluteUrl("/")}#person` },
  };
}

/** `ItemList` of the project URLs, so the work index is machine readable. */
export function projectListSchema(projects: ProjectMeta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl("/work")}#projects`,
    name: "Projects by Noman Ejaz",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/work/${project.slug}`),
      name: project.title,
    })),
  };
}
/** `CreativeWork` for a single project page.
 *
 * Projects are work products, not blog posts, so `CreativeWork` is the correct
 * type — it is what qualifies the page for project and technology keywords.
 */
export function creativeWorkSchema(project: ProjectMeta) {
  const url = absoluteUrl(`/work/${project.slug}`);
  const images = project.images?.length ? project.images : project.image ? [project.image] : [];
  const sourceCode = project.repo ?? project.link;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#creativework`,
    name: project.title,
    alternateName: project.title,
    url,
    description: project.summary,
    image: images.map((image) => absoluteUrl(image)),
    datePublished: project.publishedAt,
    dateModified: project.publishedAt,
    inLanguage: "en",
    author: { "@id": `${absoluteUrl("/")}#person` },
    creator: { "@id": `${absoluteUrl("/")}#person` },
    keywords: [...(project.keywords ?? []), ...(project.tags ?? [])].join(", "),
    about: [...(project.tags ?? [])],
    programmingLanguage: project.tags ?? [],
    additionalType: "https://schema.org/SoftwareSourceCode",
    creativeWorkStatus: "Published",
    ...(project.category ? { genre: project.category } : {}),
    ...(sourceCode ? { codeRepository: sourceCode } : {}),
    ...(project.link ? { availableAt: project.link } : {}),
  };
}

/** `BreadcrumbList` — replaces the plain text link back to the index. */
export function breadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

/** `FAQPage` — eligible for rich results and strong for long-tail queries. */
export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** `Service` nodes for the services page, one per service group. */
export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/services")}#service`,
    name: "Full Stack Development Services",
    serviceType: services.groups.map((group) => group.title),
    description: services.description,
    url: absoluteUrl("/services"),
    provider: { "@id": `${absoluteUrl("/")}#person` },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/services"),
      servicePhone: {
        "@type": "ContactPoint",
        telephone: `+${person.phone}`,
        contactType: "sales",
        email: person.email,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development services",
      itemListElement: services.groups.map((group) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: group.title,
          description: group.description,
        },
      })),
    },
  };
}
