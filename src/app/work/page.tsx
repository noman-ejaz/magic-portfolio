import { JsonLd } from "@/components";
import { Projects } from "@/components/work/Projects";
import { work } from "@/resources";
import { breadcrumbSchema, projectListSchema } from "@/utils/schema";
import { buildMetadata, socialImage } from "@/utils/seo";
import { getProjectTechIndex, getProjects } from "@/utils/utils";
import { Column, Heading, Text } from "@once-ui-system/core";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: work.title,
    description: work.description,
    keywords: work.keywords,
    image: socialImage(work.title),
    path: work.path,
  });
}

export default function Work() {
  const projects = getProjects();
  const techIndex = getProjectTechIndex(projects);
  const projectMeta = projects.map(({ metadata, slug }) => ({ ...metadata, slug }));

  return (
    <Column maxWidth="m" paddingTop="24">
      <JsonLd
        id="work"
        data={[
          projectListSchema(projectMeta),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: work.label, path: work.path },
          ]),
        ]}
      />

      <Column fillWidth maxWidth="s" gap="12" marginBottom="32" paddingX="l">
        <Heading variant="display-strong-m">{work.title}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {work.intro}
        </Text>
      </Column>

      <Projects />

      <Column fillWidth gap="12" paddingX="l" paddingTop="40" paddingBottom="24">
        <Heading as="h2" variant="heading-strong-l">
          Technologies used across these projects
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak">
          A working index of the stack behind the case studies above, from Python and Django
          back-ends to React and Next.js front-ends, PostgreSQL data and AWS and Docker deployment.
        </Text>
        <Text variant="body-default-s" onBackground="neutral-weak" id="tech-index">
          {techIndex.join(" · ")}
        </Text>
      </Column>
    </Column>
  );
}
