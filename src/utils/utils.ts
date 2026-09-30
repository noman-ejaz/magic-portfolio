import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

/** Contributor credit rendered on a project page. */
export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

/**
 * Frontmatter contract for a project case study.
 *
 * Every field except `title`, `summary` and `publishedAt` is optional, so a
 * project can be published quickly and enriched as detail becomes available.
 */
export type ProjectMetadata = {
  /** Project name — used as the page `<title>` and heading */
  title: string;
  /** One or two sentence pitch. Feeds the meta description and social cards. */
  summary: string;
  /** ISO date the project was delivered */
  publishedAt: string;
  /** Your responsibility on the project */
  role?: string;
  /** Project type, e.g. "Web application" */
  category?: string;
  /** Technologies used, rendered as tags and as schema.org `programmingLanguage` */
  tags?: string[];
  /** Long-tail search phrases this page should rank for */
  keywords?: string[];
  /** Primary image, used for Open Graph and the page hero */
  image?: string;
  /** Additional screenshots, used by the card carousel and gallery */
  images?: string[];
  /** Live deployment URL */
  link?: string;
  /** Public source repository URL */
  repo?: string;
  /** Featured projects are highlighted on the home page */
  featured?: boolean;
  /** Contributors, when the project was not built alone */
  team?: TeamMember[];
};

export type Project = {
  metadata: ProjectMetadata;
  slug: string;
  content: string;
};

/** Normalises a frontmatter value that may be a string, a list, or absent. */
function toArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return String(value)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string): { metadata: ProjectMetadata; content: string } {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: ProjectMetadata = {
    title: data.title ?? "",
    summary: data.summary ?? "",
    publishedAt: data.publishedAt ?? "",
    role: data.role ?? "",
    category: data.category ?? "",
    tags: toArray(data.tags),
    keywords: toArray(data.keywords),
    image: data.image ?? "",
    images: toArray(data.images),
    link: data.link ?? "",
    repo: data.repo ?? "",
    featured: Boolean(data.featured),
    team: data.team ?? [],
  };

  return { metadata, content };
}

function getMDXData(dir: string): Project[] {
  return getMDXFiles(dir).map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    return { metadata, slug: path.basename(file, path.extname(file)), content };
  });
}

/** Reads every project case study from a directory, newest first. */
export function getPosts(customPath = ["", "", "", ""]): Project[] {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
}

/** Shorthand for the project directory used across the site. */
export function getProjects(): Project[] {
  return getPosts(["src", "app", "work", "projects"]);
}

/** Collapses the tag list across every project into a de-duplicated tech index. */
export function getProjectTechIndex(projects: Project[]): string[] {
  const tags = projects.flatMap((project) => project.metadata.tags ?? []);
  return Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b));
}
