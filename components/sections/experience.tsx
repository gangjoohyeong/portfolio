import { Chip } from "@heroui/react";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { portfolioData } from "@/data/portfolio-data";

export function Experience() {
  const { experiences } = portfolioData;

  return (
    <Section id="experience" className="bg-surface/30">
      <SectionHeading title="경력" />

      <div className="relative">
        {/* 타임라인 세로선 */}
        <div className="absolute top-2 bottom-2 left-[15px] w-px bg-border sm:left-[19px]" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <Reveal key={i}>
              <div className="relative pl-12 sm:pl-16">
                {/* 노드 */}
                <span className="absolute top-1 left-0 grid size-8 place-items-center rounded-full bg-accent text-accent-foreground ring-4 ring-background sm:size-10">
                  <span className="size-2 rounded-full bg-accent-foreground" />
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {exp.company}
                  </h3>
                  <Chip variant="soft" color="accent" className="w-fit">
                    {exp.period}
                  </Chip>
                </div>

                <p className="mt-1 text-sm text-muted">
                  <span className="font-medium text-foreground">
                    {exp.position}
                  </span>{" "}
                  · {exp.department} · {exp.location}
                </p>

                <p className="mt-4 text-base leading-relaxed text-foreground/90">
                  {exp.description}
                </p>

                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {exp.responsibilities.map((r, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-muted"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
