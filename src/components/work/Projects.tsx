import { ProjectCard } from "@/components";
import { formatDate } from "@/utils/formatDate";
import { getProjects } from "@/utils/utils";
import { Column } from "@once-ui-system/core";

interface ProjectsProps {
  /** 1-based slice bounds, e.g. `[1, 3]` renders the three newest projects. */
  range?: [number, number?];
  /** Project slugs to leave out, used by the "more projects" block. */
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let projects = getProjects();

  if (exclude && exclude.length > 0) {
    projects = projects.filter((project) => !exclude.includes(project.slug));
  }

  const displayed = range ? projects.slice(range[0] - 1, range[1] ?? projects.length) : projects;

  return (
    <Column fillWidth gap="xl" paddingX="l">
      {displayed.map((project, index) => {
        const { metadata } = project;

        return (
          <ProjectCard
            key={project.slug}
            href={`/work/${project.slug}`}
            images={metadata.images ?? []}
            title={metadata.title}
            description={metadata.summary}
            tags={metadata.tags}
            role={metadata.role}
            category={metadata.category}
            date={metadata.publishedAt ? formatDate(metadata.publishedAt) : undefined}
            link={metadata.link}
            repo={metadata.repo}
            priority={index < 2}
          />
        );
      })}
    </Column>
  );
}
