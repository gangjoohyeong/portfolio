// =============================================================================
// 사이트 기술 설정 (콘텐츠가 아닌 동작/배포 관련 값)
// =============================================================================

export const siteConfig = {
  name: "강주형 · Portfolio",
  shortName: "강주형",
  description:
    "AI 솔루션 개발과 인프라 구성을 하는 소프트웨어 엔지니어 강주형의 포트폴리오.",
  /** 배포 URL (GitHub Pages) */
  url: "https://gangjoohyeong.github.io/portfolio",
  /** GitHub Pages 배포 대상 레포 (owner/name) */
  repo: "gangjoohyeong/portfolio",
  /** 연락 폼 (Formspree) 엔드포인트 */
  formspreeEndpoint: "https://formspree.io/f/meogwyja",
  /** 상단 내비게이션 항목 (섹션 id 기준) */
  nav: [
    { id: "about", label: "소개" },
    { id: "experience", label: "경력" },
    { id: "projects", label: "프로젝트" },
    { id: "skills", label: "기술" },
    { id: "academic", label: "학력" },
    { id: "contact", label: "연락" },
  ],
} as const;

/**
 * 정적 자산/내부 경로에 basePath 를 붙입니다.
 * next.config 의 basePath 와 동기화된 NEXT_PUBLIC_BASE_PATH 를 사용합니다.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export interface ExperienceDuration {
  years: number;
  months: number;
  /** "2년 8개월" 형태의 한글 표기 */
  label: string;
}

/**
 * 경력 시작 시점(YYYY-MM)부터 기준일까지의 기간을 계산합니다.
 * 정적 빌드 시점의 날짜를 기준으로 합니다.
 */
export function calcExperience(
  since: string,
  now: Date = new Date(),
): ExperienceDuration {
  const [y, m] = since.split("-").map(Number);
  const start = new Date(y, (m ?? 1) - 1);
  let total =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (total < 0) total = 0;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const label =
    [years > 0 ? `${years}년` : "", months > 0 ? `${months}개월` : ""]
      .filter(Boolean)
      .join(" ") || "신입";
  return { years, months, label };
}
