import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/site";

interface SmartImageProps {
  src: string;
  alt: string;
  /** 프레임 가로/세로 비율 (예: 16/10). 기본값 16/10 */
  ratio?: number;
  /** photo: 블러 배경으로 레터박스 채움 / logo: 깔끔한 surface 위 가운데 정렬 */
  variant?: "photo" | "logo";
  /** 프레임에 적용할 추가 클래스 */
  className?: string;
  /** 이미지 우선 로드 여부 */
  priority?: boolean;
  /** 모서리 둥글기 클래스 (기본 rounded-2xl) */
  rounded?: string;
}

/**
 * 비율·사이즈와 무관하게 이미지를 자연스럽게 담는 컴포넌트.
 *
 *  - 프레임 비율은 고정되어 레이아웃이 흔들리지 않습니다.
 *  - 이미지는 object-contain 으로 잘리지 않고 전체가 보입니다.
 *  - photo 모드는 같은 이미지를 블러 처리해 남는 여백(레터박스)을 자연스럽게 채웁니다.
 *  - logo 모드는 투명 배경 로고를 깔끔한 surface 위에 가운데 정렬합니다.
 *
 * 순수 CSS 로 동작하므로 서버 컴포넌트에서 그대로 사용할 수 있습니다.
 */
export default function SmartImage({
  src,
  alt,
  ratio = 16 / 10,
  variant = "photo",
  className,
  priority = false,
  rounded = "rounded-2xl",
}: SmartImageProps) {
  const resolved = withBasePath(src);
  const loading = priority ? "eager" : "lazy";

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden",
        "ring-1 ring-border/70 ring-inset",
        variant === "logo" ? "bg-surface" : "bg-surface-secondary",
        rounded,
        className,
      )}
      style={{ aspectRatio: String(ratio) }}
    >
      {variant === "photo" && (
        // 블러 배경 — 레터박스 영역을 자연스럽게 채움
        <img
          src={resolved}
          alt=""
          aria-hidden="true"
          loading={loading}
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full scale-110 object-cover opacity-35 blur-2xl saturate-150"
        />
      )}
      <img
        src={resolved}
        alt={alt}
        loading={loading}
        decoding="async"
        className={cn(
          "relative h-full w-full object-contain",
          variant === "logo" ? "p-6 sm:p-8" : "p-1",
        )}
      />
    </div>
  );
}
