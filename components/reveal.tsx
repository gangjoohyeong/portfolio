import { cn } from "@/lib/utils";

/**
 * 스크롤 등장 래퍼. CSS scroll-driven 애니메이션(animation-timeline)으로 동작하므로
 * JS 가 필요 없고, 미지원 브라우저나 reduced-motion 환경에서는 콘텐츠가 그대로
 * 보입니다(빈 화면 방지). globals.css 의 `.reveal` 참고.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
