import { baseURL } from "@/resources";
import type { Metadata } from "next";

/** Strips a trailing slash so URLs never end up with a double slash. */
export const origin = baseURL.replace(/\/+$/, "");

/**
 * Builds an absolute, canonical URL for a path.
 * "/" resolves to the bare origin, which is the form Google expects.
 */
export function absoluteUrl(path = "/"): string {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return clean ? `${origin}/${clean}` : origin;
}

/**
 * Returns a per-page Open Graph image, falling back to the dynamic
 * social-card generator so every page always has a shareable preview.
 */
export function socialImage(title: string, image?: string): string {
  if (image) {
    return image.startsWith("http") ? image : absoluteUrl(image);
  }
  return absoluteUrl(`/api/og/generate?title=${encodeURIComponent(title)}`);
}

type BuildMetadataArgs = {
  /** Page title. Rendered with the `%s | Noman Ejaz` template from the root layout. */
  title: string;
  /** Meta description. Google truncates around 155–160 characters. */
  description: string;
  /** Route path, used for the canonical URL. */
  path: string;
  /** Optional explicit OG image. Falls back to the generated social card. */
  image?: string;
  /** Meta keywords. These supplement on-page content, they do not replace it. */
  keywords?: string[];
  /** Open Graph type. Use "article" for projects, "website" everywhere else. */
  type?: "website" | "article";
  /** ISO publish date, only valid alongside `type: "article"`. */
  publishedTime?: string;
  /** Hide the route from search engines. */
  noindex?: boolean;
  /** Set on the home page so the root title template is not appended. */
  absoluteTitle?: boolean;
};

/**
 * Single source of truth for page metadata.
 *
 * Guarantees every route gets a self-referencing canonical URL, an Open Graph
 * block, a Twitter card and keyword coverage — the four things that most often
 * end up half-configured when metadata is written per page.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  keywords,
  type = "website",
  publishedTime,
  noindex = false,
  absoluteTitle = false,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);
  const ogImage = socialImage(title, image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: "Noman Ejaz — Full Stack Developer",
      locale: "en_US",
      title,
      description,
      images: [{ url: ogImage, width: 1280, height: 720, alt: title }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
