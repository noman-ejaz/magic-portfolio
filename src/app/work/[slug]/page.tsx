import { CustomMDX, JsonLd, ScrollToHash } from "@/components";
import { Projects } from "@/components/work/Projects";
import { person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { breadcrumbSchema, creativeWorkSchema } from "@/utils/schema";
import { buildMetadata, socialImage } from "@/utils/seo";
import { getProjects } from "@/utils/utils";
import { Button, Column, Heading, Media, Row, SmartLink, Tag, Text } from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getProjects().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug || "";

  const post = getProjects().find((entry) => entry.slug === slugPath);
  if (!post) return {};

  const { metadata } = post;

  return buildMetadata({
    title: metadata.title,
    description: metadata.summary,
    keywords: [...(metadata.keywords ?? []), ...(metadata.tags ?? [])],
    image: metadata.image || socialImage(metadata.title),
    path: `${work.path}/${post.slug}`,
    type: "article",
    publishedTime: metadata.publishedAt,
  });
}

export default async function Project({
  params,
}: { params: Promise<{ slug: string | string[] }> }) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug || "";

  const post = getProjects().find((entry) => entry.slug === slugPath);
  if (!post) {
    notFound();
  }

  const { metadata } = post;
  const hero = metadata.image || metadata.images?.[0];

  return (
    <Column as="article" maxWidth="m" horizontal="center" gap="l">
      <JsonLd
        id={`project-${post.slug}`}
        data={[
          creativeWorkSchema({ ...metadata, slug: post.slug }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: work.label, path: work.path },
            { name: metadata.title, path: `${work.path}/${post.slug}` },
          ]),
        ]}
      />

      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href={work.path} style={{ margin: "0" }}>
          <Text variant="label-strong-m">{work.label}</Text>
        </SmartLink>
        <Heading variant="display-strong-m" wrap="balance">
          {metadata.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          {metadata.summary}
        </Text>
      </Column>

      <Row fillWidth horizontal="center" wrap gap="12" paddingX="l" paddingY="8">
        {metadata.role && (
          <Text variant="label-default-m" onBackground="brand-weak">
            {metadata.role}
          </Text>
        )}
        {metadata.category && (
          <Text variant="label-default-m" onBackground="neutral-weak">
            {metadata.category}
          </Text>
        )}
        {metadata.publishedAt && (
          <Text variant="label-default-m" onBackground="neutral-weak">
            {formatDate(metadata.publishedAt)}
          </Text>
        )}
      </Row>

      {(metadata.link || metadata.repo) && (
        <Row fillWidth horizontal="center" gap="12" wrap paddingX="l">
          {metadata.link && (
            <Button
              href={metadata.link}
              prefixIcon="openLink"
              label="Live project"
              variant="secondary"
              size="s"
              arrowIcon
            />
          )}
          {metadata.repo && (
            <Button
              href={metadata.repo}
              prefixIcon="github"
              label="Source code"
              variant="secondary"
              size="s"
              arrowIcon
            />
          )}
        </Row>
      )}

      {hero && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt={`${metadata.title} — project interface screenshot`}
          src={hero}
        />
      )}

      {metadata.tags && metadata.tags.length > 0 && (
        <Column fillWidth paddingX="l" gap="8" align="center">
          <Row wrap gap="8" horizontal="center">
            {metadata.tags.map((tag) => (
              <Tag key={tag} size="m" variant="secondary">
                {tag}
              </Tag>
            ))}
          </Row>
        </Column>
      )}

      <Column style={{ margin: "auto" }} maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>

      {metadata.images && metadata.images.length > 1 && (
        <Column fillWidth gap="24" paddingX="l" paddingTop="24">
          <Heading as="h2" variant="heading-strong-xl">
            Screenshots
          </Heading>
          <Column fillWidth gap="16">
            {metadata.images.slice(0, 6).map((image, index) => (
              <Media
                key={image}
                aspectRatio="16 / 9"
                radius="m"
                alt={`${metadata.title} screenshot ${index + 1}`}
                src={image}
              />
            ))}
          </Column>
        </Column>
      )}

      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          More projects
        </Heading>
        <Projects exclude={[post.slug]} range={[1, 2]} />
        <Button
          data-border="rounded"
          href={work.path}
          variant="secondary"
          size="m"
          weight="default"
          arrowIcon
        >
          <Row gap="8" vertical="center">
            All projects by {person.name}
          </Row>
        </Button>
      </Column>

      <ScrollToHash />
    </Column>
  );
}
