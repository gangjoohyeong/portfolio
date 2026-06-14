"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileImage, FileText } from "lucide-react";
import { withBasePath } from "@/lib/site";
import { cn } from "@/lib/utils";

interface ExportItem {
  key: string;
  icon: typeof FileText;
  title: string;
  desc: string;
  /** public/ 에 생성된 PDF 경로 */
  file: string;
  /** 저장될 파일명 */
  filename: string;
}

const EXPORT_ITEMS: ExportItem[] = [
  {
    key: "resume",
    icon: FileText,
    title: "이력서",
    desc: "핵심 요약 · A4 세로",
    file: "/resume.pdf",
    filename: "강주형_이력서.pdf",
  },
  {
    key: "portfolio",
    icon: FileImage,
    title: "포트폴리오",
    desc: "이미지 포함 · A4 가로",
    file: "/portfolio.pdf",
    filename: "강주형_포트폴리오.pdf",
  },
];

export function ExportMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        className="btn btn-primary btn-md"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Download className="size-4" />
        내보내기
      </button>

      <div
        role="menu"
        className={cn(
          "absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-2xl border border-border bg-surface p-2 shadow-2xl",
          "transition duration-150",
          open
            ? "visible scale-100 opacity-100"
            : "pointer-events-none invisible scale-95 opacity-0",
        )}
      >
        <p className="px-3 pt-2 pb-1.5 text-xs font-medium text-muted">
          PDF 다운로드
        </p>
        {EXPORT_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.key}
              role="menuitem"
              href={withBasePath(item.file)}
              download={item.filename}
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-surface-hover"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-soft-foreground">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground">
                  {item.title}
                </span>
                <span className="block text-xs text-muted">{item.desc}</span>
              </span>
            </a>
          );
        })}
        <p className="px-3 pt-1.5 pb-1 text-xs leading-relaxed text-muted">
          클릭하면 PDF 파일이 바로 다운로드됩니다.
        </p>
      </div>
    </div>
  );
}
