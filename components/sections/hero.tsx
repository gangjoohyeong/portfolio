import { ArrowDown, FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { portfolioData } from "@/data/portfolio-data";
import { calcExperience, withBasePath } from "@/lib/site";

export function Hero() {
  const { personal, experiences } = portfolioData;
  const exp = calcExperience(personal.experienceSince);
  const company = experiences[0]?.company;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[84rem] px-5 pt-24 pb-20 sm:px-6 lg:pt-32 lg:pb-28">
        <p className="animate-rise text-sm font-medium text-muted">
          {personal.title}
          {company ? ` · ${company}` : ""} · {personal.location}
        </p>

        <h1 className="animate-rise-1 mt-6 text-[clamp(2.5rem,7vw,5rem)] leading-[1.04] font-extrabold tracking-[-0.03em]">
          안녕하세요,
          <br />
          개발자 <span className="text-accent">{personal.name}</span>입니다.
        </h1>

        <p className="animate-rise-2 measure mt-7 text-lg leading-relaxed text-muted sm:text-xl">
          {exp.label}의 {personal.heroDescription}
        </p>

        <div className="animate-rise-3 mt-10 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn btn-primary btn-lg">
            프로젝트 보기
            <ArrowDown className="size-4" />
          </a>
          <a
            href={withBasePath("/resume.pdf")}
            download="강주형_이력서.pdf"
            className="btn btn-outline btn-lg"
          >
            <FileText className="size-4" />
            이력서 다운로드
          </a>
          <div className="ml-1 flex items-center gap-2">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="GitHub"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="icon-btn"
              aria-label="Email"
            >
              <Mail className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
