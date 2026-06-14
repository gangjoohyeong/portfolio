# 강주형 포트폴리오

**Next.js 16 · HeroUI v3 · Tailwind CSS v4** 기반의 정적 포트폴리오 사이트입니다.
하나의 데이터 파일로 **웹사이트 · 이력서 PDF · 포트폴리오 PDF** 를 모두 구동합니다.

| 항목       | 내용                                                    |
| ---------- | ------------------------------------------------------- |
| 프레임워크 | Next.js 16 (App Router, `output: "export"` 정적 사이트) |
| UI         | HeroUI v3 + Tailwind CSS v4                             |
| 테마       | 라이트/다크 (next-themes), 웜 클레이 액센트             |
| 내보내기   | 브라우저 인쇄 / Puppeteer PDF 생성                      |
| 배포       | GitHub Pages (Actions 자동 배포 + 수동 스크립트)        |
| 품질       | ESLint(flat) · Prettier · impeccable 디자인 검사        |

> 🤖 코드를 수정하는 에이전트/기여자는 먼저 **[AGENTS.md](AGENTS.md)** 를 읽으세요.
> 디자인 의도는 [PRODUCT.md](PRODUCT.md) · [DESIGN.md](DESIGN.md) 참고.

---

## 빠른 시작

```bash
pnpm install      # 의존성 설치
pnpm dev          # 개발 서버 (http://localhost:3000)
```

> 사전 요구: Node.js 18+ · pnpm 9+

---

## ✏️ 콘텐츠 수정 (가장 중요)

모든 내용은 **[`data/portfolio-data.ts`](data/portfolio-data.ts) 한 파일**에만 있습니다.
이 파일을 고치면 웹·이력서·포트폴리오 PDF 에 **자동으로 동시 반영**됩니다.

```ts
export const portfolioData = {
  personal: { name, title, tagline, email, summary, experienceSince, ... },
  experiences: [ ... ],     // 경력
  projects: [ ... ],        // 프로젝트
  skillCategories: [ ... ], // 기술
  activities: [ ... ],      // 대외활동
  academicBackground: [ ... ], // 학력
  certificates: [ ... ],    // 자격
};
```

- **경력 기간**(예: "2년 8개월")은 `personal.experienceSince` 기준으로 자동 계산됩니다.
- **프로젝트 이미지**: `logo`(브랜드 로고, 작게)와 `images`(스크린샷 갤러리)를 구분해 넣습니다. 둘 다 선택입니다.
- **링크**: 프로젝트의 `liveUrl`, `githubUrl` 만 넣으면 버튼이 자동으로 생깁니다.

### 이미지 추가

1. 이미지를 [`public/images/`](public/images) 에 넣습니다.
2. 데이터에서 `/images/파일명` 으로 참조합니다. (basePath 는 코드가 알아서 붙입니다)

> [`SmartImage`](components/smart-image.tsx) 가 **비율·사이즈에 관계없이** 이미지를 자연스럽게 배치합니다.
> 고정 프레임 + `object-contain` + 블러 배경 채움으로, 어떤 이미지든 잘리지 않고 깔끔하게 들어갑니다.

---

## 📄 이력서 / 포트폴리오 내보내기 (PDF 다운로드)

웹과 PDF 가 같은 컴포넌트([`components/print/print-document.tsx`](components/print/print-document.tsx))를 사용합니다. 사용자는 상단 **내보내기** 버튼에서 **이력서/포트폴리오 PDF 파일을 바로 다운로드**합니다(인쇄 대화상자 없음).

- 이력서: A4 세로, 핵심 요약 → `public/resume.pdf`
- 포트폴리오: A4 가로, 이미지 포함 → `public/portfolio.pdf`

### PDF 생성·갱신

PDF 는 Puppeteer 가 `/print/*` 라우트를 렌더해 만듭니다. **콘텐츠를 바꾸면 재생성 후 커밋**하세요(다운로드 대상이라 git·배포에 포함됩니다).

```bash
pnpm pdf                    # 개발 서버 자동 실행 + 두 PDF 생성
# 또는 서버가 이미 떠 있다면:
pnpm export:pdf             # 둘 다
pnpm export:pdf:resume      # 이력서만
pnpm export:pdf:portfolio   # 포트폴리오만
```

> `/print/resume?preview=1`, `/print/portfolio?preview=1` 로 PDF 레이아웃을 미리볼 수 있습니다.

---

## 🚀 GitHub Pages 배포

### 방법 A — GitHub Actions (권장, 자동)

`main` 브랜치에 push 하면 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 가 자동으로 빌드·배포합니다.

> 최초 1회: 레포 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정하세요.

### 방법 B — 수동 스크립트

```bash
pnpm gh-deploy             # next build 후 out/ 을 gh-pages 브랜치로 강제 푸시
```

배포 주소: `https://gangjoohyeong.github.io/portfolio/`

> 레포명이 다르면 [`next.config.mjs`](next.config.mjs) 의 `REPO_BASE_PATH` 와 환경변수 `GH_PAGES_REPO` 를 바꾸세요.

---

## 🎨 디자인 / 테마 커스터마이징

- **액센트 색상**: [`app/globals.css`](app/globals.css) 의 `--accent` 한 줄만 바꾸면 hover/soft/focus 등 파생 색이 자동 재계산됩니다.
- **섹션 순서/구성**: [`app/page.tsx`](app/page.tsx) 에서 섹션 컴포넌트 순서를 바꾸면 됩니다.
- **인쇄 스타일**: [`app/print/print.css`](app/print/print.css).

---

## 📁 프로젝트 구조

```
.
├── app/
│   ├── layout.tsx, page.tsx, globals.css, providers.tsx, icon.svg
│   └── print/                 # 인쇄 라우트 (이력서/포트폴리오 단일 소스)
│       ├── print.css, resume/page.tsx, portfolio/page.tsx
├── components/
│   ├── sections/              # 화면 섹션 (hero, about, projects, ...)
│   ├── print/                 # PrintDocument, PrintShell
│   ├── smart-image.tsx        # 비율 무관 이미지 컴포넌트
│   ├── timeline-list.tsx      # 학력·대외활동 목록
│   └── section.tsx, site-header.tsx, site-footer.tsx, export-menu.tsx, ...
├── data/portfolio-data.ts     # ⭐ 모든 콘텐츠 (단일 소스)
├── lib/                       # site 설정, 유틸 (basePath, 경력 계산)
├── public/images/             # 프로젝트 이미지
├── scripts/                   # generate-pdf.ts, gh-deploy.mjs
├── AGENTS.md, PRODUCT.md, DESIGN.md, CLAUDE.md   # 에이전트·디자인 문서
├── eslint.config.mjs, .prettierrc.json
└── .github/workflows/deploy.yml
```

---

## 스크립트 요약

| 명령                                   | 설명                   |
| -------------------------------------- | ---------------------- |
| `pnpm dev`                             | 개발 서버              |
| `pnpm build`                           | 정적 빌드 (`out/`)     |
| `pnpm lint` / `pnpm lint:fix`          | ESLint                 |
| `pnpm format` / `pnpm format:check`    | Prettier               |
| `pnpm pdf`                             | 개발 서버 + PDF 생성   |
| `pnpm export:pdf[:resume\|:portfolio]` | PDF 생성               |
| `pnpm gh-deploy`                       | GitHub Pages 수동 배포 |
