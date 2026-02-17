# 빌드 및 배포 가이드

이 프로젝트는 **Next.js 15** 기반 정적 사이트이며, **pnpm**을 패키지 매니저로 사용합니다.

## 사전 요구사항

| 도구    | 최소 버전 | 설치                             |
| ------- | --------- | -------------------------------- |
| Node.js | 18 이상   | [nodejs.org](https://nodejs.org) |
| pnpm    | 9.x       | `npm install -g pnpm`            |

## 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:3000)
pnpm dev
```

## PDF 이력서 생성

포트폴리오 웹페이지를 PDF 형식의 이력서로 자동 변환할 수 있습니다.

```bash
# 방법 1: 개발 서버가 이미 실행 중인 경우
pnpm generate-pdf

# 방법 2: 개발 서버 자동 시작 + PDF 생성
pnpm pdf
```

생성된 PDF는 다음 위치에 저장됩니다:
- `public/portfolio/resume.pdf` - 최신 버전
- `public/portfolio/resume_YYYY-MM-DD.pdf` - 날짜별 백업

### PDF 커스터마이징

PDF 스타일을 수정하려면 [app/print.css](app/print.css) 파일을 편집하세요.

```css
/* 예: 페이지 여백 조정 */
@page {
  margin: 2cm 2cm 2.5cm 2cm;
}

/* 예: 폰트 크기 조정 */
body {
  font-size: 11pt;
}
```

## 빌드

```bash
pnpm build
```

- Next.js의 정적 내보내기(`output: "export"`)를 사용합니다.
- 빌드 결과물은 `out/` 디렉토리에 생성됩니다.
- `basePath`가 `/portfolio`로 설정되어 있어, GitHub Pages에서 `https://<username>.github.io/portfolio/` 경로로 서빙됩니다.

## 배포 (GitHub Pages)

```bash
pnpm gh-deploy
```

이 명령은 다음 단계를 자동으로 수행합니다:

1. `next build` — 정적 사이트 빌드
2. `out/.nojekyll` 파일 생성 — Jekyll 처리 비활성화
3. `out/` 디렉토리를 git에 강제 추가
4. 배포 커밋 생성
5. `gh-pages` 브랜치로 `out/` 서브트리 푸시

> [!IMPORTANT]
> 배포 전 모든 변경사항을 커밋해야 합니다. 커밋되지 않은 변경사항이 있으면 `git add -f out/` 단계에서 충돌이 발생할 수 있습니다.

## 주요 스크립트 요약

| 명령어              | 설명                               |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | 개발 서버 실행                     |
| `pnpm build`        | 프로덕션 빌드                      |
| `pnpm start`        | 빌드된 앱 로컬 서빙                |
| `pnpm lint`         | ESLint 실행                        |
| `pnpm gh-deploy`    | 빌드 + GitHub Pages 배포           |
| `pnpm pdf`          | 개발 서버 시작 + PDF 이력서 생성   |
| `pnpm generate-pdf` | PDF 이력서 생성 (서버 실행 중일 때) |

## 프로젝트 구조

```
portfolio/
├── app/              # Next.js App Router 페이지
│   ├── print.css     # PDF/인쇄용 스타일
│   └── globals.css   # 글로벌 CSS
├── components/       # React 컴포넌트 (shadcn/ui 포함)
├── data/             # 포트폴리오 데이터 (선택사항)
├── hooks/            # 커스텀 React 훅
├── lib/              # 유틸리티 함수
├── public/           # 정적 파일
│   └── portfolio/    # 이미지 및 생성된 PDF
├── scripts/          # 자동화 스크립트
│   └── generate-pdf.ts # PDF 생성 스크립트
├── styles/           # 추가 CSS 파일
├── out/              # 빌드 결과물 (git에서 무시됨)
├── .npmrc            # pnpm 설정
├── next.config.mjs   # Next.js 설정
├── tailwind.config.ts # Tailwind CSS 설정
└── package.json      # 의존성 및 스크립트
```
