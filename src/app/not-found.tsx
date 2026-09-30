import { work } from "@/resources";
import { Button, Column, Heading, Text } from "@once-ui-system/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Column as="section" fill gap="12" paddingY="128" paddingX="l" maxWidth="s" center>
      <Text marginBottom="s" variant="display-strong-xl" onBackground="brand-weak">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs" wrap="balance">
        Page not found
      </Heading>
      <Text onBackground="neutral-weak">
        That page does not exist. Try the projects, or get in touch if you were looking for
        something specific.
      </Text>
      <Column paddingTop="24" gap="8">
        <Button href="/" variant="secondary" size="m" arrowIcon>
          Back to home
        </Button>
        <Button href={work.path} variant="tertiary" size="m" arrowIcon>
          View projects
        </Button>
      </Column>
      <Text variant="body-default-xs" onBackground="neutral-weak" paddingTop="16">
        Looking for a Django, FastAPI or React developer? Check the projects page.
      </Text>
    </Column>
  );
}
