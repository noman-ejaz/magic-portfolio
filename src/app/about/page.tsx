import { JsonLd } from "@/components";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { about, person, social } from "@/resources";
import { breadcrumbSchema, faqSchema, profilePageSchema } from "@/utils/schema";
import { buildMetadata, socialImage } from "@/utils/seo";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Row,
  Tag,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: about.title,
    description: about.description,
    keywords: about.keywords,
    image: socialImage(about.title),
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: about.faq.title,
      display: about.faq.display,
      items: about.faq.items.map((item) => item.question),
    },
  ];

  return (
    <Column maxWidth="m">
      <JsonLd
        id="about"
        data={[
          profilePageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: about.path },
          ]),
          ...(about.faq.display ? [faqSchema(about.faq.items)] : []),
        ]}
      />

      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} subItems={about.tableOfContent.subItems} />
        </Column>
      )}

      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.locationLabel}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}

        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role} · {person.headline}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                            <Button
                              key={item.name}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ),
                  )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="4">
                      {experience.role}
                    </Text>
                    {experience.summary && (
                      <Text variant="body-default-s" onBackground="neutral-weak" marginBottom="m">
                        {experience.summary}
                      </Text>
                    )}
                    <ul
                      style={{
                        listStyle: "disc outside",
                        margin: 0,
                        paddingLeft: "20px",
                      }}
                    >
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <li
                            key={`${experience.company}-${index}`}
                            style={{ marginBottom: "8px" }}
                          >
                            <Text variant="body-default-m">{achievement}</Text>
                          </li>
                        ),
                      )}
                    </ul>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image) => (
                          <Row
                            key={image.src}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="16"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    {skill.description && (
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {skill.description}
                      </Text>
                    )}
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag
                            key={`${skill.title}-${tag.name}-${tagIndex}`}
                            size="l"
                            prefixIcon={tag.icon}
                          >
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.faq.display && (
            <>
              <Heading as="h2" id={about.faq.title} variant="display-strong-s" marginBottom="m">
                {about.faq.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.faq.items.map((item) => (
                  <Column key={item.question} fillWidth gap="8">
                    <Text as="h3" variant="heading-strong-m">
                      {item.question}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {item.answer}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
