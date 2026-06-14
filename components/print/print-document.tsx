import { portfolioData, type Project } from "@/data/portfolio-data";
import { calcExperience, withBasePath } from "@/lib/site";

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="p-list">
      {items.map((h, i) => {
        const idx = h.indexOf(": ");
        return (
          <li key={i}>
            {idx === -1 ? (
              h
            ) : (
              <>
                <b>{h.slice(0, idx)}</b>
                {h.slice(idx + 1)}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function ProjectShots({ project }: { project: Project }) {
  const images = project.images ?? [];
  if (images.length === 0) return null;
  const [featured, ...rest] = images;
  return (
    <div className={`p-shots ${rest.length === 0 ? "one" : ""}`}>
      <div className="p-shot featured">
        <img src={withBasePath(featured)} alt={`${project.title} 대표`} />
      </div>
      {rest.map((img, i) => (
        <div key={i} className="p-shot">
          <img src={withBasePath(img)} alt={`${project.title} 상세 ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

export function PrintDocument({
  variant,
}: {
  variant: "resume" | "portfolio";
}) {
  const d = portfolioData;
  const includeImages = variant === "portfolio";
  const orientation = includeImages ? "landscape" : "portrait";
  const exp = calcExperience(d.personal.experienceSince);

  const Header = (
    <div className="p-header">
      <h1>
        {d.personal.name} <span className="en">{d.personal.nameEn}</span>
      </h1>
      <div className="p-title">
        {d.personal.title} · {variant === "resume" ? "이력서" : "포트폴리오"}
      </div>
      <div className="p-contact">
        <span>
          ✉ <a href={`mailto:${d.personal.email}`}>{d.personal.email}</a>
        </span>
        <span>☎ {d.personal.phone}</span>
        <span>⚲ {d.personal.location}</span>
      </div>
      <div className="p-contact">
        <span>GitHub · {d.personal.github}</span>
        <span>LinkedIn · {d.personal.linkedin}</span>
      </div>
      <span className="p-badge">경력 {exp.label}</span>
    </div>
  );

  const Summary = (
    <div className="p-section">
      <h2 className="p-section-title">소개</h2>
      <div className="p-summary">
        {d.personal.summary.map((s, i) => (
          <p key={i}>{s}</p>
        ))}
      </div>
    </div>
  );

  const ExperienceBlock = (
    <div className="p-section">
      <h2 className="p-section-title">경력</h2>
      {d.experiences.map((e, i) => (
        <div className="p-exp" key={i}>
          <div className="p-row">
            <span className="p-org">{e.company}</span>
            <span className="p-period">{e.period}</span>
          </div>
          <div className="p-meta">
            <b>{e.position}</b> · {e.department} · {e.location}
          </div>
          <div className="p-desc">{e.description}</div>
          <ul className="p-list">
            {e.responsibilities.map((r, j) => (
              <li key={j}>{r}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const Academic = (
    <div className="p-section">
      <h2 className="p-section-title">학력사항</h2>
      {d.academicBackground.map((a, i) => (
        <div className="p-entry" key={i}>
          <div className="p-row">
            <span className="p-entry-title">{a.title}</span>
            <span className="p-period">{a.period}</span>
          </div>
          <div className="p-entry-sub">{a.subtitle}</div>
          <div className="p-entry-detail">{a.details.join(" · ")}</div>
        </div>
      ))}
    </div>
  );

  const Skills = (
    <div className="p-section">
      <h2 className="p-section-title">활용 기술</h2>
      {d.skillCategories.map((c, i) => (
        <div className="p-skill-cat" key={i}>
          <div className="p-skill-head">{c.category}</div>
          <div className="p-chiplist">
            {c.skills.map((s) => (
              <span className="p-chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const Activities = (
    <div className="p-section">
      <h2 className="p-section-title">대외활동</h2>
      {d.activities.map((a, i) => (
        <div className="p-entry" key={i}>
          <div className="p-row">
            <span className="p-entry-title">{a.title}</span>
            <span className="p-period">{a.period}</span>
          </div>
          <div className="p-entry-sub">{a.subtitle}</div>
          <div className="p-entry-detail">{a.details.join(" · ")}</div>
        </div>
      ))}
    </div>
  );

  const Certificates = (
    <div className="p-section">
      <h2 className="p-section-title">자격사항</h2>
      {d.certificates.map((c, i) => (
        <div className="p-entry" key={i}>
          <div className="p-row">
            <span className="p-entry-title">{c.title}</span>
            <span className="p-period">{c.acquired}</span>
          </div>
          <div className="p-entry-sub">{c.issuer}</div>
        </div>
      ))}
    </div>
  );

  const ProjectsBlock = (
    <div className="p-section">
      <h2 className="p-section-title">프로젝트</h2>
      {d.projects.map((p, i) => (
        <div className="p-proj" key={i}>
          <div className="p-row">
            <span className="p-proj-title">{p.title}</span>
            <span className="p-period">{p.period}</span>
          </div>
          {p.org && <div className="p-proj-org">{p.org}</div>}
          <div className="p-desc">{p.summary}</div>
          <Highlights items={p.highlights} />
          <div className="p-tags">
            {p.technologies.map((t) => (
              <span className="p-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          {includeImages && <ProjectShots project={p} />}
        </div>
      ))}
    </div>
  );

  return (
    <article className={`paper ${orientation} doc-${variant}`}>
      {Header}

      {variant === "resume" ? (
        <>
          {Summary}
          {ExperienceBlock}
          {Academic}
          {ProjectsBlock}
          {Skills}
          <div className="p-grid-2">
            {Activities}
            {Certificates}
          </div>
        </>
      ) : (
        <>
          <div className="p-cols">
            <div>
              {Summary}
              {ExperienceBlock}
              {Academic}
            </div>
            <div>
              {Skills}
              {Activities}
              {Certificates}
            </div>
          </div>
          {ProjectsBlock}
        </>
      )}
    </article>
  );
}
