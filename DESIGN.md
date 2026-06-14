# Design

시각 시스템 요약. 전략/원칙은 [PRODUCT.md](PRODUCT.md) 참고. 토큰의 단일 소스는
[app/globals.css](app/globals.css)이며, 이 문서는 그 의도를 설명한다.

## Theme

따뜻한 중성(웜 뉴트럴) 캔버스 + 단일 클레이(cinnabar) 액센트. 라이트가 기본,
다크는 웜 espresso. HeroUI v3 토큰을 덮어쓰는 방식이라 컴포넌트는 그대로 두고
색만 바뀐다. 모든 색은 OKLCH, 순수 회색/검정 없이 항상 미세하게 틴트.

## Color (OKLCH)

| 토큰                       | Light               | Dark              | 용도                       |
| -------------------------- | ------------------- | ----------------- | -------------------------- |
| `--background`             | `0.981 0.006 75`    | `0.19 0.011 55`   | 페이지 배경                |
| `--foreground`             | `0.24 0.012 55`     | `0.93 0.008 80`   | 본문 잉크                  |
| `--surface` / `-secondary` | 거의 흰색 / `0.967` | `0.231` / `0.258` | 패널·카드                  |
| `--muted`                  | `0.474 0.014 55`    | `0.715 0.016 70`  | 보조 텍스트 (AA 대비 확보) |
| `--accent`                 | `0.575 0.16 42`     | `0.7 0.152 46`    | 유일한 강조색(클레이)      |
| `--border` / `--separator` | `0.90` / `0.92`     | `0.32` / `0.28`   | 경계·hairline              |

`--accent` 하나만 바꾸면 hover/soft/focus 파생색이 `color-mix`로 자동 재계산된다.
그라데이션·네온 글로우는 사용하지 않는다.

## Typography

- **단일 패밀리: Pretendard Variable** (CDN, `font-display: swap`). 굵기·크기 대비로
  위계를 만든다(디스플레이 800 / 본문 400–600).
- **단일 폰트는 의도된 선택이다.** impeccable 가이드는 "굵기 대비를 둔 단일 패밀리가
  어설픈 2종 페어링보다 강하다"고 명시하며, 제목이 대부분 한글이라 라틴 디스플레이
  폰트를 더해도 한글에는 적용되지 않는다. (detector의 `single-font`는 이 맥락에서
  의도적으로 수용.)
- 본문 ≥16px, 측정폭 `.measure`(68ch), 제목 `text-wrap: balance`·본문 `pretty`,
  다크에서 본문 letter-spacing 소폭 보정.

## Layout

- 컨테이너 `max-w-[84rem]`(1344px) + 좌우 패딩(16:9 와이드에서 중앙 쏠림 완화). 본문 폭은 `.measure`(68ch)로 별도 제한. 섹션 수직 리듬 `py-20…28`.
- **카드는 최소화.** 스킬·학력·대외활동·자격은 카드 대신 hairline 구분 목록.
  프로젝트는 이미지+본문 블록이라 카드가 적절(좌우 교차). 소개·연락은 카드 대신
  테두리 패널. 카드 중첩 금지.
- 제목 위 아이콘 박스·반복 eyebrow·숫자 마커 없음.

## Components

- HeroUI v3: `Card`(절제), `Chip`, `Button`(액션), `Separator` 등. `className`으로만
  소폭 보정(예: Chip 상하 패딩). 컴포넌트 구조 재작성은 하지 않음.
- 링크형 버튼은 `.btn`(globals) — HeroUI Button이 `<a>`로 렌더 불가하기 때문.
- [SmartImage](components/smart-image.tsx): 고정 프레임 + `object-contain` + 블러 배경으로
  비율 무관 자연 배치. 프로젝트 갤러리는 클릭 시 라이트박스로 확대([project-gallery.tsx](components/project-gallery.tsx)).
- 내보내기는 인쇄 대화상자 대신 **PDF 파일 다운로드**(`public/*.pdf`).
- 아이콘: lucide-react + 브랜드 마크는 커스텀 SVG([brand-icons.tsx](components/brand-icons.tsx),
  lucide v1.x는 브랜드 아이콘 미제공).

## Motion

- 스크롤 등장은 CSS `animation-timeline: view()`(JS 없음). 기본 상태는 항상 가시 →
  미지원 브라우저·헤드리스·reduced-motion에서도 콘텐츠가 보인다(빈 화면 방지).
- 히어로는 로드 시 `animate-rise` 스태거. 모든 모션에 exponential ease-out, bounce 금지,
  `prefers-reduced-motion` 대안 제공.
