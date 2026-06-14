import { Section, SectionHeading } from "@/components/section";
import { portfolioData } from "@/data/portfolio-data";

export function Certificates() {
  const { certificates } = portfolioData;

  return (
    <Section id="certificates">
      <SectionHeading title="자격사항" />
      <ul className="border-t border-border">
        {certificates.map((cert, i) => (
          <li
            key={i}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border py-5"
          >
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-lg font-semibold tracking-tight">
                {cert.title}
              </span>
              <span className="text-sm text-muted">{cert.issuer}</span>
            </div>
            <span className="shrink-0 text-sm text-muted tabular-nums">
              {cert.acquired}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
