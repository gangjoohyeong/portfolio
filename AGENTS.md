# AGENTS.md

강주형 포트폴리오 — AI 에이전트용 작업 가이드. 이 프로젝트를 수정하기 전에 먼저 읽으세요.
디자인 의도는 [PRODUCT.md](PRODUCT.md) / [DESIGN.md](DESIGN.md)에 있습니다.

## 한눈에 보기

- **스택**: Next.js 16 (App Router, `output: "export"` 정적 사이트) · HeroUI **v3** · Tailwind CSS **v4** · React 19 · next-themes · TypeScript
- **성격**: 1인 포트폴리오(브랜드 register). 디자인 자체가 결과물.
- **배포**: GitHub Pages (basePath `/portfolio`), `gangjoohyeong/portfolio`
- **패키지 매니저**: pnpm

## 명령어

| 명령                                   | 설명                                                        |
| -------------------------------------- | ----------------------------------------------------------- |
| `pnpm dev`                             | 개발 서버 (http://localhost:3000, dev 에서는 basePath 없음) |
| `pnpm build`                           | 정적 빌드 → `out/` (프로덕션은 basePath `/portfolio`)       |
| `pnpm lint` / `pnpm lint:fix`          | ESLint (flat config)                                        |
| `pnpm format` / `pnpm format:check`    | Prettier                                                    |
| `pnpm pdf`                             | dev 서버 자동 실행 + 이력서/포트폴리오 PDF 생성             |
| `pnpm export:pdf[:resume\|:portfolio]` | (서버 실행 중) PDF 생성 → `public/*.pdf`                    |

변경 후에는 `pnpm lint && pnpm format && pnpm build`로 검증하세요.

## 디렉토리 지도

```
app/
  layout.tsx, page.tsx, providers.tsx, globals.css, icon.svg
  print/                # 인쇄 라우트 = 이력서/포트폴리오 PDF 의 단일 소스
    print.css, resume/page.tsx, portfolio/page.tsx
components/
  sections/             # 화면 섹션 (hero, about, experience, projects, project-card, skills, academic, activities, certificates, contact)
  print/                # PrintDocument(변형: resume|portfolio), PrintShell
  section.tsx           # Section / SectionHeading
  smart-image.tsx       # 비율 무관 이미지
  project-gallery.tsx   # 프로젝트 갤러리 + 라이트박스(확대)
  timeline-list.tsx     # 학력·대외활동 목록
  site-header.tsx, site-footer.tsx, export-menu.tsx, theme-switch.tsx, reveal.tsx, brand-icons.tsx
data/portfolio-data.ts  # ⭐ 모든 콘텐츠 (단일 소스)
lib/site.ts             # siteConfig, withBasePath, calcExperience
lib/utils.ts            # cn
scripts/                # generate-pdf.ts (Puppeteer PDF 생성)
.claude/skills/impeccable/  # 디자인 스킬 + detector (아래 참고)
```

## 콘텐츠를 바꾸려면

거의 모든 텍스트·프로젝트·이미지 참조는 **[data/portfolio-data.ts](data/portfolio-data.ts) 한 파일**에 있습니다. 고치면 **웹사이트는 즉시** 반영됩니다.

> ⚠️ **PDF는 자동 반영되지 않습니다.** 이력서/포트폴리오 PDF(`public/*.pdf`)는 미리 생성된 정적 파일이라, 데이터를 바꾼 뒤 **`pnpm pdf`로 재생성**해야 다운로드에 반영됩니다.

- 경력 기간(예: "2년 8개월")은 `personal.experienceSince`로 자동 계산(`lib/site.ts:calcExperience`).
- 프로젝트 `images`(스크린샷 갤러리): 화면에서 클릭하면 라이트박스로 확대됩니다([components/project-gallery.tsx](components/project-gallery.tsx)). 프로젝트 로고 기능은 없습니다.
- **이미지 추가**: 파일을 `public/images/`에 두고 데이터에 `/images/파일명`으로 참조.
  basePath 는 `SmartImage`가 `withBasePath`로 자동으로 붙이므로 신경 쓰지 말 것.
- 마케팅성 미사여구를 임의로 추가하지 말 것. 사실 기반 카피만. (PRODUCT.md의 anti-references)

## 내보내기(이력서/포트폴리오)

웹과 PDF가 **같은 컴포넌트**([components/print/print-document.tsx](components/print/print-document.tsx))를 공유합니다. 사용자에게는 인쇄 대화상자 대신 **PDF 파일을 직접 다운로드**시킵니다.

- 사용자: 헤더 **내보내기** → 이력서/포트폴리오 PDF 다운로드(`public/*.pdf`). 히어로의 "이력서 PDF" 버튼도 동일.
- PDF 생성: `pnpm pdf` (Puppeteer가 `/print/*` 라우트를 렌더 → `public/resume.pdf`, `public/portfolio.pdf`). **콘텐츠 변경 후 재생성·커밋**(다운로드 대상이라 git·배포에 포함).
- `/print/resume`·`/print/portfolio`는 PDF 렌더 소스 겸 미리보기 (인쇄 대화상자 없음).
- 인쇄/PDF 스타일은 [app/print/print.css](app/print/print.css). resume=A4 세로/이미지 없음, portfolio=A4 가로/이미지 포함.

## 배포

`main` 에 push 하면 [.github/workflows/deploy.yml](.github/workflows/deploy.yml) 가 빌드 후 GitHub Pages 로 자동 배포합니다. Pages 소스는 **GitHub Actions**(`build_type: workflow`)로 설정되어 있습니다. 라이브: https://gangjoohyeong.github.io/portfolio/

- 레포명이 바뀌면 [next.config.mjs](next.config.mjs)의 `REPO_BASE_PATH`와 [lib/site.ts](lib/site.ts)의 `repo`/`url`을 함께 수정.

## ⚠️ HeroUI v3 주의 (v2/NextUI와 API가 완전히 다름)

- **Provider 불필요** (테마는 순수 CSS). next-themes 만 다크모드용.
- **dot-notation 서브컴포넌트**: `Card.Header` / `Card.Content`(`CardBody` 아님) / `Card.Title` / `Card.Footer`, `Tabs.Tab` 등.
- **브랜드색은 `accent`** (`primary` 아님). `<Chip color="accent">`, 토큰 `--accent`.
- **제거된 컴포넌트**: `Navbar`·`Image`·`Snippet` → 네이티브로 구현. `Divider` → `Separator`.
- **`Button`은 `<a>`로 렌더 불가**(React Aria 제약). 링크형 버튼은 globals 의 `.btn` 클래스를 `<a>`에 적용.
- **상호작용은 `onPress`**(`onClick` 아님), `isPending`(`isLoading` 아님), `isDisabled`.
- `Card.Content`는 기본 `display:flex; flex-direction:column`. 가로 배치가 필요하면 `flex-row` 명시.
- 색 커스터마이즈는 토큰(`--accent` 등) 오버라이드로만. 컴포넌트를 갈아엎지 말 것.

## 기타 함정

- **Tailwind v4**: 설정 파일 없음. 토큰·유틸은 [app/globals.css](app/globals.css)의 `@theme`/`@layer`에. HeroUI가 `@import "@heroui/styles"`로 tailwind까지 포함.
- **basePath**: dev=빈 문자열, prod=`/portfolio`. 네이티브 `<img src>`나 내부 링크에는 `withBasePath()`를 써야 prod에서 깨지지 않음(next/image 미사용).
- **정적 export**: 서버 액션·동적 라우트 불가. 상호작용 컴포넌트는 `"use client"`.
- **lucide-react v1.x는 브랜드 아이콘 미제공** → GitHub/LinkedIn은 [brand-icons.tsx](components/brand-icons.tsx) 커스텀 SVG.
- **모션**: 스크롤 등장은 `.reveal`(CSS scroll-timeline, JS 없음). 기본 가시 상태를 가두지 말 것 — 헤드리스/숨은 탭에서 빈 화면이 됨.

## 디자인 작업 시 (impeccable)

[impeccable](https://github.com/pbakaus/impeccable) 디자인 스킬을 로컬에 설치해 사용합니다(`.claude/`는 gitignore — 저장소 미포함). 없으면 `npx impeccable skills install` 로 설치하세요. UI를 바꾸기 전에 규정을 따르세요.

- 규정: `.claude/skills/impeccable/reference/`의 `brand.md`(포트폴리오=brand register), `layout.md`, `typeset.md`.
- 자동 검사(41개 결정적 규칙):
  ```bash
  node .claude/skills/impeccable/scripts/detect.mjs http://localhost:3000/   # 라이브
  node .claude/skills/impeccable/scripts/detect.mjs out/index.html           # 빌드 산출물
  ```
- 알려진 수용 항목: `single-font`(Pretendard 단일, DESIGN.md 참고)는 의도적.
- 피해야 할 것(이 프로젝트에서 이미 제거함): 보라/네온 그라데이션, 카드 남용·중첩, 제목 위 아이콘 박스, 섹션마다 mono eyebrow, 숫자 마커, stats+gradient 히어로, 균일 fade-on-scroll.

## 코드 컨벤션

- Prettier(2 spaces, double quotes, semicolons, trailing comma, `prettier-plugin-tailwindcss`로 클래스 정렬). 커밋 전 `pnpm format`.
- ESLint flat config([eslint.config.mjs](eslint.config.mjs)) = `eslint-config-next` + prettier. `pnpm lint` 통과 유지.
- 주석·UI 카피는 한국어, 코드 식별자는 영어.
