import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { portfolioData } from "@/data/portfolio-data";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const { personal } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-[84rem] px-5 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <span className="font-semibold tracking-tight">
              {personal.name}
              <span className="text-muted"> · {personal.title}</span>
            </span>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {siteConfig.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
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

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personal.name}. All rights reserved.
          </p>
          <p>
            Built with Next.js · HeroUI v3 · Tailwind CSS · Powered by Claude
            Code
          </p>
        </div>
      </div>
    </footer>
  );
}
