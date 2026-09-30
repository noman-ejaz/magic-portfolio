import { JsonLd } from "@/components";
import { person, services } from "@/resources";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/utils/schema";
import { buildMetadata, socialImage } from "@/utils/seo";
import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: services.title,
    description: services.description,
    keywords: services.keywords,
    image: socialImage(services.title),
    path: services.path,
  });
}

const GROUP_TONES = ["brand-weak", "accent-weak", "info-weak"] as const;

export default function Services() {
  return (
    <Column maxWidth="m" paddingTop="24" paddingBottom="48" gap="32">
      <JsonLd
        id="services"
        data={[
          serviceSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: services.label, path: services.path },
          ]),
          ...(services.faq.display ? [faqSchema(services.faq.items)] : []),
        ]}
      />

      <Column fillWidth maxWidth="s" gap="16" paddingX="l">
        <Heading variant="display-strong-m" wrap="balance">
          {services.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {services.intro}
        </Text>
        <Row paddingTop="8" wrap gap="8">
          <Button href={services.cta.href} variant="secondary" size="m" arrowIcon>
            {services.cta.label}
          </Button>
        </Row>
      </Column>

      <Column fillWidth gap="16" paddingX="l">
        {services.groups.map((group, index) => (
          <Column
            key={group.id}
            as="section"
            fillWidth
            border="neutral-alpha-weak"
            background="neutral-alpha-weak"
            radius="l"
            padding="l"
            gap="12"
          >
            <Heading
              as="h2"
              id={group.id}
              variant="heading-strong-xl"
              onBackground={GROUP_TONES[index % GROUP_TONES.length]}
              wrap="balance"
            >
              {group.title}
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {group.description}
            </Text>
            <ul
              style={{
                listStyle: "disc outside",
                margin: "4px 0 0",
                paddingLeft: "20px",
              }}
            >
              {group.items.map((item) => (
                <li key={item} style={{ marginBottom: "4px" }}>
                  <Text variant="body-default-s">{item}</Text>
                </li>
              ))}
            </ul>
          </Column>
        ))}
      </Column>

      {services.process.display && (
        <Column as="section" fillWidth gap="16" paddingX="l" paddingTop="16">
          <Heading
            as="h2"
            id={services.process.id}
            variant="heading-strong-xl"
            onBackground="success-weak"
            wrap="balance"
          >
            {services.process.title}
          </Heading>
          <Row fillWidth gap="16" wrap>
            {services.process.steps.map((step) => (
              <Column
                key={step.title}
                fillWidth
                border="neutral-alpha-weak"
                background="neutral-alpha-weak"
                radius="m"
                padding="20"
                gap="8"
                style={{ minWidth: "220px", flex: "1 1 220px" }}
              >
                <Text variant="heading-strong-m">{step.title}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {step.description}
                </Text>
              </Column>
            ))}
          </Row>
        </Column>
      )}

      <Column as="section" fillWidth gap="12" paddingX="l" paddingTop="16">
        <Heading
          as="h2"
          id={services.cta.id}
          variant="heading-strong-xl"
          onBackground="brand-weak"
          wrap="balance"
        >
          {services.cta.title}
        </Heading>
        <Column maxWidth={48}>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {services.cta.description}
          </Text>
        </Column>
        <Row paddingTop="8" wrap gap="8">
          <Button href={services.cta.href} variant="secondary" size="m" arrowIcon>
            {services.cta.label}
          </Button>
          <Button
            href={`mailto:${person.email}`}
            prefixIcon="email"
            label={person.email}
            variant="tertiary"
            size="m"
          />
        </Row>
      </Column>

      {services.faq.display && (
        <Column as="section" fillWidth gap="16" paddingX="l" paddingTop="16">
          <Heading
            as="h2"
            id={services.faq.id}
            variant="heading-strong-xl"
            onBackground="accent-weak"
            wrap="balance"
          >
            {services.faq.title}
          </Heading>
          {services.faq.items.map((item) => (
            <Column key={item.question} as="section" fillWidth gap="8">
              <Text as="h3" variant="heading-strong-m">
                {item.question}
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {item.answer}
              </Text>
            </Column>
          ))}
        </Column>
      )}
    </Column>
  );
}
