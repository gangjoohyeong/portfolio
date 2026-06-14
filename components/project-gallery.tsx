"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import SmartImage from "@/components/smart-image";
import { withBasePath } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * 프로젝트 스크린샷 갤러리 + 라이트박스.
 * 썸네일을 누르면 큰 이미지를 오버레이로 보여주고, 좌우/키보드로 탐색합니다.
 * 오버레이는 조상의 transform 에 갇히지 않도록 body 로 포털 렌더합니다.
 */
export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const [featured, ...rest] = images;

  return (
    <div className="flex flex-col gap-3">
      <Thumb
        src={featured}
        alt={`${title} 대표 이미지`}
        ratio={16 / 10}
        onOpen={() => setIndex(0)}
      />
      {rest.length > 0 && (
        <div
          className={cn(
            "grid gap-3",
            rest.length === 1 ? "grid-cols-1" : "grid-cols-2",
          )}
        >
          {rest.map((img, i) => (
            <Thumb
              key={img}
              src={img}
              alt={`${title} 상세 ${i + 1}`}
              ratio={4 / 3}
              rounded="rounded-xl"
              onOpen={() => setIndex(i + 1)}
            />
          ))}
        </div>
      )}

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} 이미지 보기`}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:duration-200 motion-safe:fade-in sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="이전 이미지"
                className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="size-6" />
              </button>
            )}

            <img
              src={withBasePath(images[index])}
              alt={`${title} ${index + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl motion-safe:animate-in motion-safe:duration-200 motion-safe:zoom-in-95"
            />

            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="다음 이미지"
                className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="size-6" />
              </button>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white tabular-nums">
                {index + 1} / {images.length}
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}

function Thumb({
  src,
  alt,
  ratio,
  rounded,
  onOpen,
}: {
  src: string;
  alt: string;
  ratio: number;
  rounded?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${alt} 크게 보기`}
      className={cn(
        "group relative block w-full cursor-zoom-in overflow-hidden",
        rounded ?? "rounded-2xl",
      )}
    >
      <SmartImage src={src} alt={alt} ratio={ratio} rounded={rounded} />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
        <span className="grid size-11 place-items-center rounded-full bg-white/90 text-zinc-900">
          <ZoomIn className="size-5" />
        </span>
      </span>
    </button>
  );
}
