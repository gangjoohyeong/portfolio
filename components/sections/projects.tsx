import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { portfolioData } from "@/data/portfolio-data";
import { ProjectCard } from "./project-card";

export function Projects() {
  const { projects } = portfolioData;

  return (
    <Section id="projects">
      <SectionHeading title="프로젝트" />

      <div className="space-y-6 lg:space-y-8">
        {projects.map((project, i) => (
          <Reveal key={i}>
            <ProjectCard project={project} reverse={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
