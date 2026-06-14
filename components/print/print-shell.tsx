import { ArrowLeft } from "lucide-react";
import { withBasePath } from "@/lib/site";

/**
 * 인쇄 라우트(/print/*)의 화면 미리보기 래퍼.
 * 이 라우트는 PDF 생성(Puppeteer)의 렌더 소스이자 미리보기용입니다. 사용자에게는
 * 인쇄 대화상자 대신 사이트의 "내보내기"에서 생성된 PDF 파일을 제공합니다.
 * 인쇄 시(@media print)에는 상단 바(.no-print)가 사라지고 종이만 남습니다.
 */
export function PrintShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="print-stage">
      <div className="no-print fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 border-b border-white/10 bg-zinc-900/80 px-4 py-3 backdrop-blur">
        <a
          href={withBasePath("/")}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/10"
        >
          <ArrowLeft className="size-4" />
          포트폴리오로
        </a>
        <span className="hidden text-xs text-zinc-400 sm:block">
          미리보기 · PDF는 사이트의 “내보내기”에서 받을 수 있습니다
        </span>
      </div>
      {children}
    </div>
  );
}
