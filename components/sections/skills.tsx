import { Chip } from "@heroui/react";
import { Section, SectionHeading } from "@/components/section";
import { portfolioData } from "@/data/portfolio-data";

export function Skills() {
  const { skillCategories } = portfolioData;

  return (
    <Section id="skills" className="bg-surface/40">
      <SectionHeading title="활용 기술" />

      <dl className="border-t border-border">
        {skillCategories.map((cat) => (
          <div
            key={cat.category}
            className="grid gap-3 border-b border-border py-6 sm:grid-cols-[14rem_1fr] sm:gap-8"
          >
            <dt className="text-lg font-semibold tracking-tight">
              {cat.category}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <Chip key={s} variant="secondary">
                  {s}
                </Chip>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
