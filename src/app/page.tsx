import { JsonLd } from "@/components";
import { Projects } from "@/components/work/Projects";
import { about, home, person, services, work } from "@/resources";
import { personSchema, projectListSchema, webSiteSchema } from "@/utils/schema";
import { buildMetadata } from "@/utils/seo";
import { getProjects } from "@/utils/utils";
import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Line,
  RevealFx,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: home.title,
    description: home.description,
    keywords: home.keywords,
    image: home.image,
    path: home.path,
    absoluteTitle: true,
  });
}

export default function Home() {
  const featuredProjects = getProjects()
    .slice(0, 3)
    .map(({ metadata, slug }) => ({ ...metadata, slug }));

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <JsonLd
        id="home"
        data={[personSchema(), webSiteSchema(), projectListSchema(featuredProjects)]}
      />

      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="16">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                About me
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      <Column fillWidth gap="24" paddingX="l">
        <Row fillWidth paddingRight="64">
          <Line maxWidth={48} />
        </Row>
        <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
          <Row flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              {home.capabilities.title}
            </Heading>
          </Row>
          <Row flex={3} paddingX="20">
            <Column fillWidth gap="l">
              {home.capabilities.items.map((capability) => (
                <Column key={capability.title} fillWidth gap="8">
                  <Text variant="heading-strong-l">{capability.title}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {capability.description}
                  </Text>
                  <Row wrap gap="8" paddingTop="4">
                    {capability.tags.map((tag) => (
                      <Tag key={`${capability.title}-${tag}`} size="s" variant="secondary">
                        {tag}
                      </Tag>
                    ))}
                  </Row>
                </Column>
              ))}
            </Column>
          </Row>
        </Row>
        <Row fillWidth paddingLeft="64" horizontal="end">
          <Line maxWidth={48} />
        </Row>
      </Column>

      <Column fillWidth gap="16" paddingX="l">
        <Heading as="h2" variant="heading-strong-xl" align="center">
          {home.stats.title}
        </Heading>
        <Row fillWidth gap="16" wrap horizontal="center">
          {home.stats.items.map((stat) => (
            <Column
              key={stat.label}
              border="neutral-alpha-weak"
              background="neutral-alpha-weak"
              radius="m"
              paddingX="20"
              paddingY="16"
              gap="4"
              style={{ minWidth: "150px", flex: "1 1 150px" }}
            >
              <Text variant="heading-strong-xl" onBackground="brand-weak">
                {stat.value}
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {stat.label}
              </Text>
            </Column>
          ))}
        </Row>
      </Column>

      <Column fillWidth gap="l" paddingX="l" paddingTop="24">
        <Row fillWidth horizontal="between" vertical="end" wrap gap="16">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            Featured projects
          </Heading>
          <SmartLink href={work.path} suffixIcon="arrowRight">
            <Text variant="label-default-s">All projects</Text>
          </SmartLink>
        </Row>
        <Projects range={[1, 3]} />
      </Column>

      <Column fillWidth horizontal="center" gap="12" paddingTop="8">
        <Button
          data-border="rounded"
          href={work.path}
          variant="secondary"
          size="m"
          weight="default"
          arrowIcon
        >
          View all projects
        </Button>
        <Button
          data-border="rounded"
          href={services.path}
          variant="tertiary"
          size="m"
          weight="default"
          arrowIcon
        >
          What I can build for you
        </Button>
      </Column>
    </Column>
  );
}
