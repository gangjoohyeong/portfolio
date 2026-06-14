import { Section, SectionHeading } from "@/components/section";
import { TimelineList } from "@/components/timeline-list";
import { portfolioData } from "@/data/portfolio-data";

export function Activities() {
  return (
    <Section id="activities" className="bg-surface/40">
      <SectionHeading title="대외활동" />
      <TimelineList entries={portfolioData.activities} />
    </Section>
  );
}
