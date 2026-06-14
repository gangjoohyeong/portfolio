import { Card, Chip } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { ProjectGallery } from "@/components/project-gallery";
import type { Project } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

function Highlight({ text }: { text: string }) {
  const idx = text.indexOf(": ");
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      <span className="font-semibold text-foreground">
        {text.slice(0, idx)}
      </span>
      <span className="text-muted">{text.slice(idx + 1)}</span>
    </span>
  );
}

export function ProjectCard({
  project,
  reverse,
}: {
  project: Project;
  reverse?: boolean;
}) {
  const images = project.images ?? [];
  const hasMedia = images.length > 0;

  return (
    <Card variant="secondary" className="overflow-hidden">
      <Card.Content className="p-5 sm:p-7 lg:p-8">
        <div
          className={cn(
            "grid gap-7 lg:gap-10",
            hasMedia ? "lg:grid-cols-2" : "lg:grid-cols-1",
          )}
        >
          {/* 내용 */}
          <div className={cn("flex flex-col", reverse && "lg:order-2")}>
            <div className="min-w-0">
              {project.org && (
                <span className="text-xs font-medium text-muted">
                  {project.org}
                </span>
              )}
              <h3 className="text-lg leading-tight font-bold tracking-tight sm:text-xl">
                {project.title}
              </h3>
            </div>

            <p className="mt-1 text-xs text-muted">{project.period}</p>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground/90">
              {project.summary}
            </p>

            <ul className="mt-4 space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <Highlight text={h} />
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <Chip key={t} size="sm" variant="secondary">
                  {t}
                </Chip>
              ))}
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-md"
                  >
                    관련 자료
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-md"
                  >
                    <GithubIcon className="size-4" />
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>

          {/* 미디어 */}
          {hasMedia && (
            <div className={cn("flex", reverse && "lg:order-1")}>
              <div className="w-full self-center">
                <ProjectGallery images={images} title={project.title} />
              </div>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
