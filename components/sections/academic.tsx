import { Section, SectionHeading } from "@/components/section";
import { TimelineList } from "@/components/timeline-list";
import { portfolioData } from "@/data/portfolio-data";

export function Academic() {
  return (
    <Section id="academic">
      <SectionHeading title="학력사항" />
      <TimelineList entries={portfolioData.academicBackground} />
    </Section>
  );
}
