import { Chip } from "@heroui/react";
import { Section, SectionHeading } from "@/components/section";
import { portfolioData } from "@/data/portfolio-data";

const FOCUS = ["AI Agent", "Backend", "MLOps", "RAG", "Kubernetes"];

export function About() {
  const { personal, experiences } = portfolioData;
  const [lead, ...rest] = personal.summary;
  const current = experiences[0];

  const facts: Array<{ label: string; value: string }> = [
    { label: "현재", value: `${current.company} · ${current.position}` },
    { label: "지역", value: personal.location },
    { label: "이메일", value: personal.email },
  ];

  return (
    <Section id="about">
      <SectionHeading title="소개" />

      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <p className="measure text-2xl leading-snug font-semibold tracking-tight text-pretty sm:text-[1.75rem]">
            {lead}
          </p>
          <div className="measure mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
            {rest.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {FOCUS.map((f) => (
              <Chip key={f} color="accent" variant="soft">
                {f}
              </Chip>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border p-6">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              {personal.name}
            </p>
            <p className="text-sm text-muted">{personal.nameEn}</p>
          </div>
          <dl className="mt-6 divide-y divide-border">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="shrink-0 text-sm text-muted">{f.label}</dt>
                <dd className="truncate text-right text-sm font-medium">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
