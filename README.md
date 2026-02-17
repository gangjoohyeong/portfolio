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

| 명령어           | 설명                     |
| ---------------- | ------------------------ |
| `pnpm dev`       | 개발 서버 실행           |
| `pnpm build`     | 프로덕션 빌드            |
| `pnpm start`     | 빌드된 앱 로컬 서빙      |
| `pnpm lint`      | ESLint 실행              |
| `pnpm gh-deploy` | 빌드 + GitHub Pages 배포 |

## 프로젝트 구조

```
portfolio/
├── app/              # Next.js App Router 페이지
├── components/       # React 컴포넌트 (shadcn/ui 포함)
├── hooks/            # 커스텀 React 훅
├── lib/              # 유틸리티 함수
├── public/           # 정적 파일
├── styles/           # 글로벌 CSS
├── out/              # 빌드 결과물 (git에서 무시됨)
├── .npmrc            # pnpm 설정
├── next.config.mjs   # Next.js 설정
├── tailwind.config.ts # Tailwind CSS 설정
└── package.json      # 의존성 및 스크립트
```
