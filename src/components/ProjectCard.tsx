"use client";

import { Carousel, Column, Flex, Heading, Row, SmartLink, Tag, Text } from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  description: string;
  tags?: string[];
  role?: string;
  category?: string;
  date?: string;
  link?: string;
  repo?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  description,
  tags = [],
  role,
  category,
  date,
  link,
  repo,
}) => {
  return (
    <Column fillWidth gap="m">
      {images.length > 0 && (
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: `${title} interface screenshot`,
          }))}
        />
      )}
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        <Flex flex={5} gap="16" vertical="center" wrap>
          <Heading as="h2" wrap="balance" variant="heading-strong-xl">
            {title}
          </Heading>
        </Flex>
        <Column flex={7} gap="12">
          <Flex gap="12" wrap>
            {role && (
              <Text variant="label-default-s" onBackground="brand-weak">
                {role}
              </Text>
            )}
            {category && (
              <Text variant="label-default-s" onBackground="neutral-weak">
                {category}
              </Text>
            )}
            {date && (
              <Text variant="label-default-s" onBackground="neutral-weak">
                {date}
              </Text>
            )}
          </Flex>
          {description?.trim() && (
            <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
              {description}
            </Text>
          )}
          {tags.length > 0 && (
            <Row wrap gap="8">
              {tags.map((tag) => (
                <Tag key={tag} size="s" variant="secondary">
                  {tag}
                </Tag>
              ))}
            </Row>
          )}
          <Flex gap="24" wrap>
            <SmartLink
              suffixIcon="arrowRight"
              style={{ margin: "0", width: "fit-content" }}
              href={href}
            >
              <Text variant="body-default-s">Read case study</Text>
            </SmartLink>
            {link && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={link}
              >
                <Text variant="body-default-s">Live project</Text>
              </SmartLink>
            )}
            {repo && (
              <SmartLink
                prefixIcon="github"
                style={{ margin: "0", width: "fit-content" }}
                href={repo}
              >
                <Text variant="body-default-s">Source code</Text>
              </SmartLink>
            )}
          </Flex>
        </Column>
      </Flex>
    </Column>
  );
};
